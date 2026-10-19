'use client';
// THE STORY PLAYER. A scene from `@apsite/diagrams` is a pure component driven by a `beat` prop; this wrapper is the
// only client code: it advances the beat on a timer, pauses when the figure is off screen or the reader prefers
// reduced motion, and lets the reader scrub by clicking a beat or using the keyboard.
//   scene="street" → TownScene (the flat eight beats: how the street works)
//   scene="day"    → IsoTown   (the isometric town: one person's agent, many contexts)
//   scene="message" → MemberMessageScene (a message between two agents under an anonymous credential)
//   scene="scripture" → PrivateScriptureScene (asking Scripture privately: unnamed payment, reader's credential, a pen name per question)
//   scene="translation" → TranslationLoopScene (how the Bible is translated: sources → ontology → skills/tools → the harness steps → evals → the workbench → round again)
//   narration="/audio/<dir>" → one MP3 per beat (`<nn>-<id>.mp3`); the clip's end advances the beat, and the beat's
//   `narration` text is the transcript. Audio needs a gesture, so a narrated story starts paused on the Play button.
import { ISO_BEATS, IsoTown, MESSAGE_BEATS, MemberMessageScene, PrivateScriptureScene, SCRIPTURE_BEATS, TOWN_BEATS, TRANSLATION_BEATS, TownScene, TranslationLoopScene, type IsoBeat, type MessageBeat, type ScriptureBeat, type TownBeat, type TranslationBeat } from '@apsite/diagrams';
import { Volume2, VolumeX } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type SceneId = 'street' | 'day' | 'message' | 'scripture' | 'translation';
const BEATS = { street: TOWN_BEATS, day: ISO_BEATS, message: MESSAGE_BEATS, scripture: SCRIPTURE_BEATS, translation: TRANSLATION_BEATS } as const;

export function TownStory({ id = 'town-story', scene = 'street', autoplay = true, narration }: { id?: string; scene?: SceneId; autoplay?: boolean; narration?: string }) {
  const beats = BEATS[scene];
  const LAST = beats.length - 1;
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [voice, setVoice] = useState(!!narration);
  const audioRef = useRef<HTMLAudioElement>(null);
  const narrated = !!narration && voice;
  const clipFor = (i: number) => `${narration}/${String(i + 1).padStart(2, '0')}-${beats[i]!.id}.mp3`;
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  // Start when the figure scrolls into view; honour prefers-reduced-motion by starting paused.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => {
      const on = !!e?.isIntersecting;
      setVisible(on);
      if (on && autoplay && !narration && !reduced && !started.current) { started.current = true; setPlaying(true); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [autoplay, narration]);

  // Advance on a timer while playing and visible. Progress is a cheap per-frame tick for the bar under the figure.
  useEffect(() => {
    if (!playing || !visible || narrated) return;
    const dwell = beats[beat]?.ms ?? 5000;
    const t0 = performance.now();
    let raf = 0;
    const tick = () => { setProgress(Math.min(1, (performance.now() - t0) / dwell)); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    const timer = window.setTimeout(() => setBeat((b) => (b + 1) % beats.length), dwell);
    return () => { window.clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [playing, visible, beat, beats, narrated]);

  // Narrated: the clip for this beat plays; when it ends the next beat starts; the last clip ends the story.
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !narrated) return;
    if (!playing) { a.pause(); return; }
    const src = clipFor(beat);
    if (!a.src.endsWith(src)) { a.src = src; a.currentTime = 0; }
    const onTime = () => { if (a.duration) setProgress(a.currentTime / a.duration); };
    const onEnd = () => { if (beat === LAST) { setPlaying(false); setProgress(1); } else { setProgress(0); setBeat(beat + 1); } };
    a.addEventListener('timeupdate', onTime); a.addEventListener('ended', onEnd);
    void a.play().catch(() => setPlaying(false));
    return () => { a.removeEventListener('timeupdate', onTime); a.removeEventListener('ended', onEnd); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, beat, narrated, LAST]);

  const go = useCallback((b: number, keepPlaying = false) => { setProgress(0); setBeat(b); if (!keepPlaying) setPlaying(false); const a = audioRef.current; if (a) { a.pause(); a.currentTime = 0; } }, []);
  const prev = useCallback(() => go(beat === 0 ? LAST : beat - 1), [beat, go, LAST]);
  const next = useCallback(() => go(beat === LAST ? 0 : beat + 1), [beat, go, LAST]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    else if (e.key === ' ') { e.preventDefault(); setPlaying((p) => !p); }
  };

  const info = beats[beat]!;
  const below = scene !== 'street'; // the isometric scenes are read large, caption underneath
  const big = scene === 'message' || scene === 'scripture' || scene === 'translation';

  return (
    <div id={id} ref={rootRef} className={below ? 'grid gap-5' : 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]'} tabIndex={0} onKeyDown={onKey} aria-roledescription="animated walkthrough" aria-label={scene === 'day' ? 'A day in the town' : scene === 'message' ? 'A message between two agents' : scene === 'scripture' ? 'Asking Scripture privately' : scene === 'translation' ? 'How the Bible is translated' : 'Meet the town'}>
      <div>
        <div className={below ? 'relative overflow-hidden rounded-xl border border-white/10' : 'figure-dark relative'}>
          {scene === 'day' ? <IsoTown beat={beat as IsoBeat} /> : scene === 'message' ? <MemberMessageScene beat={beat as MessageBeat} /> : scene === 'scripture' ? <PrivateScriptureScene beat={beat as ScriptureBeat} /> : scene === 'translation' ? <TranslationLoopScene beat={beat as TranslationBeat} /> : <TownScene beat={beat as TownBeat} />}
          <div className={`absolute inset-x-3 bottom-3 h-[3px] overflow-hidden rounded bg-white/10 ${below ? '' : 'md:inset-x-5 md:bottom-5'}`}>
            <div className="h-full bg-brass" style={{ width: `${((beat + (playing ? progress : 1)) / beats.length) * 100}%`, transition: playing ? 'none' : 'width .4s ease' }} />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => { if (!playing && beat === LAST && progress >= 1) { setProgress(0); setBeat(0); } setPlaying((p) => !p); }} className="btn-brass !px-4 !py-2" aria-pressed={playing}>
            {playing ? 'Pause' : beat === LAST && progress >= 1 ? 'Replay' : narration ? (beat === 0 ? 'Play with narration' : 'Play') : 'Play'}
          </button>
          <button type="button" onClick={prev} className="rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5" aria-label="Previous beat">←</button>
          <button type="button" onClick={next} className="rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5" aria-label="Next beat">→</button>
          {narration && (
            <button type="button" onClick={() => setVoice((v) => !v)} className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5" aria-pressed={voice} aria-label={voice ? 'Turn narration off' : 'Turn narration on'}>
              {voice ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />} {voice ? 'Narration on' : 'Narration off'}
            </button>
          )}
          <p className="ml-1 text-xs text-slate-400">{beat + 1} / {beats.length} · <span className="text-slate-200">{info.title}</span> · ← → to step, space to pause</p>
          {narration && <audio ref={audioRef} preload="auto" />}
        </div>
      </div>

      {below ? (
        <div className={big ? 'grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start' : 'grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start'}>
          <div className={big ? 'rounded-xl border border-brass/40 bg-white/[0.05] p-6 md:p-7' : 'rounded-xl border border-brass/40 bg-white/[0.05] p-5'} aria-live="polite">
            <p className="font-mono text-[10px] tracking-[0.14em] text-brass">{String(beat + 1).padStart(2, '0')} · {info.title.toUpperCase()}</p>
            {'from' in info && info.to !== '—' && (
              <p className="mt-3 text-sm text-teal-300"><span className="font-semibold text-white">{info.from}</span> <span className="text-slate-400">→</span> <span className="font-semibold text-white">{info.to}</span><span className="text-slate-400"> · </span>{info.what}</p>
            )}
            <p className={big ? 'mt-3 text-lg leading-relaxed text-slate-100 md:text-xl' : 'mt-2 text-[15px] leading-relaxed text-slate-100'}>{'narration' in info ? info.narration : info.caption}</p>
            <p className={big ? 'mt-4 text-lg font-semibold leading-snug text-brass md:text-xl' : 'mt-3 text-[15px] font-semibold leading-snug text-brass'}>{info.rule}</p>
          </div>
          <ol className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-2" aria-label="Beats">
            {beats.map((b, i) => {
              const on = i === beat;
              return (
                <li key={b.id}>
                  <button type="button" onClick={() => go(i)} aria-current={on ? 'step' : undefined}
                    className={`flex w-full items-baseline gap-2 rounded-lg border px-3 py-2 text-left transition ${on ? 'border-brass/60 bg-white/[0.06]' : 'border-white/10 hover:border-white/25 hover:bg-white/[0.03]'}`}>
                    <span className={`font-mono text-[10px] tracking-[0.14em] ${on ? 'text-brass' : 'text-slate-500'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={`text-[13px] font-semibold ${on ? 'text-white' : 'text-slate-300'}`}>{b.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
      <ol className="flex flex-col gap-1" aria-label="Beats">
        {beats.map((b, i) => {
          const on = i === beat;
          return (
            <li key={b.id}>
              <button type="button" onClick={() => go(i)} aria-current={on ? 'step' : undefined}
                className={`w-full rounded-lg border px-3.5 py-2.5 text-left transition ${on ? 'border-brass/60 bg-white/[0.06]' : 'border-transparent hover:border-white/10 hover:bg-white/[0.03]'}`}>
                <div className="flex items-baseline gap-2">
                  <span className={`font-mono text-[10px] tracking-[0.14em] ${on ? 'text-brass' : 'text-slate-500'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`text-sm font-semibold ${on ? 'text-white' : 'text-slate-300'}`}>{b.title}</span>
                </div>
                <div className={`grid transition-[grid-template-rows] duration-300 ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300">{b.caption}</p>
                    <p className="mt-1.5 text-[13px] font-semibold leading-snug text-brass">{b.rule}</p>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
      )}
    </div>
  );
}
