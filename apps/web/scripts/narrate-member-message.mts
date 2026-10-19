// Generates the spoken walkthrough for a town story from the `narration` text on each beat, one MP3 per scene, into
// public/audio/<story>/. The text on the page and the words in the clip come from the same source, so they cannot
// drift. Re-run when a beat's narration changes.
//
//   GEMINI_API_KEY=… pnpm --filter @apsite/web narrate                          # member-message (default)
//   GEMINI_API_KEY=… pnpm --filter @apsite/web narrate translation-loop         # the Bible-translation loop
//   GEMINI_API_KEY=… pnpm --filter @apsite/web narrate radar-loop               # the radar-design loop
//
// Requires ffmpeg on PATH. Clips are committed; the site never calls the model at run time.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { MESSAGE_BEATS, RADAR_BEATS, TRANSLATION_BEATS } from '@apsite/diagrams';

const STORIES = { 'member-message': MESSAGE_BEATS, 'translation-loop': TRANSLATION_BEATS, 'radar-loop': RADAR_BEATS } as const;
const story = (process.argv.filter((a) => a !== '--')[2] ?? 'member-message') as keyof typeof STORIES;
const BEATS = STORIES[story];
if (!BEATS) { console.error(`unknown story ${story}; one of ${Object.keys(STORIES).join(', ')}`); process.exit(1); }

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) { console.error('GEMINI_API_KEY is required'); process.exit(1); }
const MODEL = process.env.TTS_MODEL ?? 'gemini-3.8-flash-tts';
const VOICE = process.env.TTS_VOICE ?? 'Kore';
const OUT = join(process.cwd(), 'public/audio', story);
mkdirSync(OUT, { recursive: true });

// No style directive: this TTS model reads any preamble aloud (checked by transcribing the output), and it accepts no
// system instruction. The narration text is written to be spoken as-is; the voice carries the tone.

for (const [i, b] of BEATS.entries()) {
  const name = `${String(i + 1).padStart(2, '0')}-${b.id}`;
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: b.narration }] }],
      generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE } } } },
    }),
  });
  if (!res.ok) { console.error(name, res.status, await res.text()); process.exit(1); }
  const json = (await res.json()) as { candidates?: { content?: { parts?: { inlineData?: { mimeType: string; data: string } }[] } }[] };
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part?.inlineData) { console.error(name, 'no audio in response'); process.exit(1); }
  const raw = Buffer.from(part.inlineData.data, 'base64');
  const tmp = join(OUT, `${name}.tmp`);
  writeFileSync(tmp, raw);
  const mime = part.inlineData.mimeType;
  const input = mime.startsWith('audio/wav') ? ['-i', tmp] : ['-f', 's16le', '-ar', '24000', '-ac', '1', '-i', tmp];
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...input, '-codec:a', 'libmp3lame', '-b:a', '64k', join(OUT, `${name}.mp3`)]);
  execFileSync('rm', ['-f', tmp]);
  const dur = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', join(OUT, `${name}.mp3`)]).toString().trim();
  console.log(`${name}.mp3  ${Number(dur).toFixed(1)}s`);
}
