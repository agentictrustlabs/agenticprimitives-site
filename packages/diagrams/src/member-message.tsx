// A MESSAGE BETWEEN TWO AGENTS — drawn as a town, for the reader who will never open a spec. Hannah lives on the
// south side of the street with her Home, her vault and the estate's key safe. The organization is across the
// street: its agent at the door, the steward inside, a membership office that is never asked. On the corner, a
// public notice board (the chain) where the organization has posted its stamp and the list of cards it still vouches
// for. Hannah signs one permission; her agent does the rest; the steward reads a message from "an adult member".
//
// Same contract as `IsoTown`: a `beat` prop, CSS transitions for everything that changes, CSS motion paths for the
// walkers. A static render is a still of that beat. Plain words on the drawing; the technical names live on the page.
import type { ReactNode } from 'react';
import { Box, District, EASE, ISO_H, ISO_W, Lane, PAL, Reply, Tag, Tile, Tree, Walker, iso, pathOf, shade } from './iso-town';
import { FONT, tw } from './primitives';

export type MessageBeat = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface MessageBeatInfo {
  id: string;
  title: string;
  /** What is on screen, in one plain sentence. */
  caption: string;
  /** The line that makes ours different, said to a non-technical reader. */
  rule: string;
  /** Autoplay dwell, ms — used when narration is off. */
  ms: number;
  /** The interaction, made explicit: who is acting, who receives, what passes between them. */
  from: string;
  to: string;
  what: string;
  /** The spoken walkthrough for this scene (also shown as the transcript). */
  narration: string;
}

export const MESSAGE_BEATS: readonly MessageBeatInfo[] = [
  {
    id: 'meet', title: 'Meet everyone', ms: 9000,
    caption: "Hannah lives on the near side of the street with her agent. Her vault holds the membership card her organization gave her — adult, member. The key that card is tied to sits in a key safe and never comes out. Across the street: the organization, its agent at the door, the steward inside. On the corner, a public notice board where the organization has posted its stamp and the list of cards it still vouches for.",
    rule: 'Three things never leave her side of the street: the card, the key, and her name.',
    from: 'Nobody yet', to: '—', what: 'Who is where, and what each of them holds',
    narration: "Let's meet everyone. On the near side of the street lives Hannah. Beside her stands her agent — a piece of software that runs errands for her. Next to her home is her vault, where she keeps private things, including a membership card her organization gave her. It says two things: she's an adult, and she's a member. The card is tied to a key, and that key sits in a key safe that never opens. Across the street is the organization. Its own agent waits at the door, and inside, the steward reads the mail. On the corner is a public notice board, where the organization has posted its stamp, and the list of cards it still vouches for. Keep your eye on three things that will never cross the street: the card, the key, and Hannah's name.",
  },
  {
    id: 'permission', title: 'Hannah signs one permission', ms: 7400,
    caption: 'At her own front door, once, Hannah signs: "My agent may prove I am an adult member — to this organization, until spring." The permission goes into her vault. It says where, what and until when. It does not say who she is.',
    rule: 'A person signs. Everything that follows runs under that one signature.',
    from: 'Hannah', to: 'her vault', what: 'one signed permission: prove "adult member" to this organization, until spring',
    narration: "Everything starts with a person. At her own front door, Hannah signs one permission: \"My agent may prove I'm an adult member — to this organization, and only until spring.\" That permission goes into her vault. Notice what it says, and what it doesn't. It says where her agent may speak, what it may prove, and for how long. It never says who she is.",
  },
  {
    id: 'question', title: 'The organization asks its own question', ms: 7000,
    caption: 'The organization\'s agent reads mail only from adult members. It sends a fresh question to her gate: "Adult member? Prove it. Question #4821, for this door only." It does not ask for a name, a card or a birthday.',
    rule: 'The receiver asks its own question. It never sees the card.',
    from: "the organization's agent", to: "Hannah's gate", what: '"Adult member? Prove it." — question #4821, good at this door only',
    narration: "Now the organization's agent does its job. It reads mail only from adult members, so before it reads anything, it asks a question. It sends a note across to Hannah's gate: \"Adult member? Prove it. This is question number four eight two one, and it's only good at this door.\" It does not ask for a name, a card, or a birthday. It asks exactly one thing, and it will accept exactly one kind of answer.",
  },
  {
    id: 'proof', title: 'Her agent makes the proof at home', ms: 7400,
    caption: 'Her agent takes the card and the permission out of the vault, inside the house, and makes a sealed proof: "Adult member — YES." The proof answers the question. It does not carry the card, the birthday or the organization\'s signature on the card.',
    rule: 'The proof says the answer is yes. It does not say what the card says.',
    from: 'her vault', to: 'her agent', what: 'the card and the permission — they stay inside the house; out comes a sealed proof: "adult member — yes"',
    narration: "Her agent takes the card and the permission out of the vault — inside the house, where they stay. From them it makes a sealed proof. Think of a sealed envelope that says only: adult member, yes. It answers the question, and nothing more. It does not carry the card, the birthday, or even the organization's signature on the card.",
  },
  {
    id: 'stamp', title: 'The key safe stamps it — once', ms: 8200,
    caption: 'The proof needs one stamp from the key tied to her card. Her agent brings it to the key safe with the permission. The safe checks: this organization? this question? under her permission? Yes — one stamp. A slip for a different organization gets no stamp at all.',
    rule: 'The key never leaves the safe, and the safe stamps only what her permission covers.',
    from: 'her agent', to: 'the key safe', what: '"stamp this — for the organization, question #4821" · the safe checks her permission, then stamps once; a slip for another organization gets nothing',
    narration: "There's one more step before the proof is finished: it needs a stamp from the key the card is tied to. Her agent carries the proof to the key safe, along with her permission. The safe checks three things. Is this for the organization she named? Is it for the question that was asked? Is it still before spring? Yes, yes, yes — one stamp. Now watch the second slip. It asks for a stamp for a different organization. The safe refuses. The key never comes out, and it only stamps what her permission covers.",
  },
  {
    id: 'send', title: 'The message crosses the street under a pen name', ms: 6600,
    caption: 'Her agent carries the message across the street with the sealed, stamped proof inside. The envelope is signed with a pen name made for this organization alone. A different organization would see a different pen name.',
    rule: 'Different door, different pen name. Never her name.',
    from: 'her agent', to: "the organization's door", what: 'the message, from a pen name made for this organization — the stamped proof inside',
    narration: "Now the message crosses the street. Her agent carries it to the organization's door with the stamped proof inside. The envelope is signed with a pen name — made just for this organization. If she wrote to a different organization, it would see a different pen name. No one on the street, and no one at the door, sees her name.",
  },
  {
    id: 'board', title: 'The door checks the notice board, not the office', ms: 8000,
    caption: 'Before anyone reads the message, the organization\'s agent walks to the public notice board: Is this stamp really the organization\'s? Is the card still vouched for? Has question #4821 been used before? Yes, yes, no. It never phones the membership office.',
    rule: 'Trust is read off a public board. The issuer is never asked.',
    from: "the organization's agent", to: 'the public notice board', what: '"real stamp? card still vouched for? #4821 unused?" — yes · yes · unused. The membership office is never asked.',
    narration: "Before the message goes inside, the organization's agent walks to the public notice board. It checks three things. Is this stamp really the organization's own? Is this card still on the list of cards the organization vouches for? And has question four eight two one been used before? Yes, yes, and no. Notice what it didn't do: it never phoned the membership office. Everything it needed was already posted, in public.",
  },
  {
    id: 'read', title: 'The steward reads — and two receipts', ms: 9600,
    caption: 'Now the steward gets the message: from an adult member. Not which one. The organization files a receipt that says a fact and a question number. A receipt also walks back to Hannah\'s vault, with the one thing the organization can never hold: the permission it ran under. She can cancel that permission from her front door, any time.',
    rule: 'The organization knows a fact. Hannah keeps the whole story, and the off switch.',
    from: 'the door', to: 'the steward · and back to her vault', what: '"a message from an adult member" to the steward; a receipt for the organization (a fact, no name); a receipt for Hannah (with the permission it ran under)',
    narration: "Now the steward gets the message. It says: from an adult member. Not which one. Two receipts are written. The organization files one: an adult member wrote, question four eight two one. No name. And a receipt walks back across the street into Hannah's vault — with one thing the organization can never hold: the permission this all ran under. If she ever changes her mind, she cancels that permission at her own front door, and the next message simply doesn't get through.",
  },
];

const W = ISO_W; const H = ISO_H;
const SUMMARY = 7;

// ── the town plan ──────────────────────────────────────────────────────────────────────────────────────────────────
// Grid 0..20 × 0..14, drawn large. One east–west street along gy 6–8. South: Hannah's side. North-east: the
// organization. North-west: the public notice board.
const GX = 20; const GY = 14;
const HOME = { gx: 2.0, gy: 9.6 }; const VAULT = { gx: 6.0, gy: 9.4 }; const KEYSAFE = { gx: 9.0, gy: 9.8 };
const HANNAH = { gx: 3.0, gy: 12.9 }; const AGENT = { gx: 5.6, gy: 12.7 };
const GATE = { gx: 7.0, gy: 8.6 } as const;
const ORG = { gx: 13.4, gy: 1.6 }; const ORGDOOR = { gx: 15.1, gy: 5.2 }; const STEWARD = { gx: 18.0, gy: 3.8 };
const OFFICE = { gx: 18.4, gy: 0.8 };
const BOARD = { gx: 3.0, gy: 1.8 }; const BOARDFRONT = { gx: 4.4, gy: 3.5 };

const ST = 7.0; // street centre
const VAULTFRONT = { gx: 6.85, gy: 11.4 }; const SAFEFRONT = { gx: 9.9, gy: 11.9 };
const L = {
  permission: [[HANNAH.gx + 0.4, HANNAH.gy - 0.3], [VAULTFRONT.gx, HANNAH.gy - 0.3], [VAULTFRONT.gx, VAULTFRONT.gy]] as const,
  ask: [[ORGDOOR.gx, ORGDOOR.gy + 0.3], [ORGDOOR.gx, ST], [GATE.gx, ST], [GATE.gx, GATE.gy]] as const,
  fetch: [[VAULTFRONT.gx, VAULTFRONT.gy], [VAULTFRONT.gx, AGENT.gy - 0.3], [AGENT.gx + 0.3, AGENT.gy - 0.3]] as const,
  toSafe: [[AGENT.gx + 0.3, AGENT.gy - 0.3], [SAFEFRONT.gx, AGENT.gy - 0.3], [SAFEFRONT.gx, SAFEFRONT.gy]] as const,
  fromSafe: [[SAFEFRONT.gx, SAFEFRONT.gy], [SAFEFRONT.gx, AGENT.gy - 0.3], [AGENT.gx + 0.3, AGENT.gy - 0.3]] as const,
  send: [[AGENT.gx + 0.3, AGENT.gy - 0.3], [GATE.gx, AGENT.gy - 0.3], [GATE.gx, ST], [ORGDOOR.gx, ST], [ORGDOOR.gx, ORGDOOR.gy + 0.3]] as const,
  board: [[ORGDOOR.gx, ORGDOOR.gy + 0.3], [ORGDOOR.gx, ST], [BOARDFRONT.gx, ST], [BOARDFRONT.gx, BOARDFRONT.gy]] as const,
  receipt: [[ORGDOOR.gx, ORGDOOR.gy + 0.3], [ORGDOOR.gx, ST], [VAULTFRONT.gx, ST], [VAULTFRONT.gx, VAULTFRONT.gy]] as const,
};

// The kit's grid is sized for a whole town; this scene has one street, so it is drawn at 1.3× and centred.
const K = 1.3;
const centre = iso(GX / 2, GY / 2);
const TOWN_TRANSFORM = `translate(${(W / 2 - centre.x * K).toFixed(1)}, ${(H / 2 + 36 - centre.y * K).toFixed(1)}) scale(${K})`;

/** A person: larger than a walker, standing still, named. The two people in the loop are drawn this way. */
export function Person({ gx, gy, name, color, note }: { gx: number; gy: number; name: string; color: string; note?: string }) {
  const b = iso(gx, gy);
  const nw = tw(name, 12.5, false, 700) * 1.1 + 18;
  return (
    <g>
      <ellipse cx={b.x} cy={b.y + 2} rx={14} ry={6} fill="#000" opacity={0.35} />
      <rect x={-9 + b.x} y={b.y - 30} width={18} height={26} rx={8} fill={color} />
      <circle cx={b.x} cy={b.y - 39} r={9} fill={shade(color, 0.5)} />
      <path d={`M ${b.x - 9} ${b.y - 22} l -6 10 M ${b.x + 9} ${b.y - 22} l 6 10`} stroke={color} strokeWidth={4} strokeLinecap="round" />
      <rect x={b.x - nw / 2} y={b.y + 10} width={nw} height={20} rx={5} fill="#0b1830" stroke={color} strokeWidth={1.2} />
      <text x={b.x} y={b.y + 24} fontSize={12.5} fontWeight={700} textAnchor="middle" fill={PAL.ink} fontFamily={FONT}>{name}</text>
      {note && <text x={b.x} y={b.y + 44} fontSize={11} fontWeight={500} textAnchor="middle" fill={PAL.muted} fontFamily={FONT}>{note}</text>}
    </g>
  );
}

/** An agent: a small boxy figure with an antenna and a halo. Drawn beside the person or building it works for. */
export function Agent({ gx, gy, name, color }: { gx: number; gy: number; name: string; color: string }) {
  const b = iso(gx, gy);
  const nw = tw(name, 11.5, false, 650) * 1.1 + 16;
  return (
    <g>
      <ellipse cx={b.x} cy={b.y + 2} rx={11} ry={5} fill="#000" opacity={0.35} />
      <circle cx={b.x} cy={b.y - 16} r={20} fill={color} opacity={0.16} />
      <rect x={b.x - 8} y={b.y - 22} width={16} height={20} rx={4} fill={color} />
      <rect x={b.x - 7} y={b.y - 34} width={14} height={11} rx={3} fill={shade(color, 0.45)} />
      <line x1={b.x} y1={b.y - 34} x2={b.x} y2={b.y - 41} stroke={shade(color, 0.6)} strokeWidth={2} />
      <circle cx={b.x} cy={b.y - 42} r={2.2} fill={PAL.glow} />
      <rect x={b.x - nw / 2} y={b.y + 9} width={nw} height={18} rx={5} fill="#0b1830" stroke={color} strokeWidth={1.1} />
      <text x={b.x} y={b.y + 22} fontSize={11.5} fontWeight={650} textAnchor="middle" fill={PAL.ink} fontFamily={FONT}>{name}</text>
    </g>
  );
}

/** The moment a person signs: a ring and a pen stroke over her head. */
export function Signature({ gx, gy, on }: { gx: number; gy: number; on: boolean }) {
  const b = iso(gx, gy);
  return (
    <g style={{ opacity: on ? 1 : 0, transform: on ? 'scale(1)' : 'scale(0.6)', transformOrigin: `${b.x}px ${b.y - 60}px`, transition: `opacity .5s ${EASE} 300ms, transform .5s ${EASE} 300ms` }}>
      <circle cx={b.x} cy={b.y - 62} r={22} fill={PAL.glow} opacity={0.18} />
      <circle cx={b.x} cy={b.y - 62} r={16} fill="#0b1830" stroke={PAL.glow} strokeWidth={1.8} />
      <path d={`M ${b.x - 8} ${b.y - 58} q 4 -12 8 -4 t 8 -4 M ${b.x - 9} ${b.y - 54} h 18`} fill="none" stroke={PAL.glow} strokeWidth={2} strokeLinecap="round" />
    </g>
  );
}

/** A small card pinned to the vault's roof: the membership card, so a reader can see what is inside. */
function CardOnVault({ on }: { on: boolean }) {
  const p0 = iso(VAULT.gx + 0.85, VAULT.gy + 0.85, 30);
  const p = { x: p0.x + 48, y: p0.y - 86 };
  return (
    <g style={{ opacity: on ? 1 : 0, transition: `opacity .6s ${EASE}` }}>
      <line x1={p0.x} y1={p0.y - 2} x2={p.x - 6} y2={p.y - 22} stroke={PAL.muted} strokeWidth={1} />
      <rect x={p.x - 85} y={p.y - 64} width={170} height={42} rx={6} fill="#fff7e6" stroke={PAL.amber} strokeWidth={1.4} />
      <rect x={p.x - 77} y={p.y - 56} width={22} height={16} rx={3} fill={PAL.amber} opacity={0.8} />
      <text x={p.x - 49} y={p.y - 46} fontSize={10} fontWeight={700} fill="#0b1830" fontFamily={FONT}>membership card</text>
      <text x={p.x - 49} y={p.y - 33} fontSize={9.5} fontWeight={500} fill="#3b3b3b" fontFamily={FONT}>adult · member · tied to the key</text>
    </g>
  );
}

/** A pool of light under whoever is acting in this scene, so the eye goes to the right place. */
export function Spot({ gx, gy, on, r = 44, color = PAL.glow }: { gx: number; gy: number; on: boolean; r?: number; color?: string }) {
  const p = iso(gx, gy);
  return <ellipse cx={p.x} cy={p.y} rx={r} ry={r / 2} fill={color} style={{ opacity: on ? 0.26 : 0, transition: `opacity .6s ${EASE}` }} />;
}

/** A multi-line speech bubble that hangs to the right of its speaker (for a speaker near the left edge). */
export function Bubble({ gx, gy, z, lines, color, on, delay = 0, size = 11.5 }: { gx: number; gy: number; z: number; lines: readonly string[]; color: string; on: boolean; delay?: number; size?: number }) {
  const p = iso(gx, gy, z);
  const w = Math.max(...lines.map((l) => tw(l, size, false, 650))) * 1.08 + 26;
  const lh = size + 4; const h = lines.length * lh + 14;
  const x = p.x - 26; const y = p.y - 12 - h;
  return (
    <g style={{ opacity: on ? 1 : 0, transform: on ? 'translateY(0)' : 'translateY(6px)', transition: `opacity .5s ${EASE} ${on ? delay : 0}ms, transform .5s ${EASE} ${on ? delay : 0}ms` }}>
      <path d={`M ${p.x - 4} ${y + h - 1} L ${p.x} ${p.y - 2} L ${p.x + 8} ${y + h - 1}`} fill={color} />
      <rect x={x} y={y} width={w} height={h} rx={10} fill={color} />
      {lines.map((l, i) => <text key={i} x={x + 13} y={y + 10 + (i + 1) * lh - 4} fontSize={size} fontWeight={650} fill="#0b1830" fontFamily={FONT}>{l}</text>)}
    </g>
  );
}

export function wrap(text: string, size: number, width: number): string[] {
  const out: string[] = []; let line = '';
  for (const word of text.split(' ')) {
    const next = line ? `${line} ${word}` : word;
    if (tw(next, size) > width && line) { out.push(line); line = word; } else line = next;
  }
  if (line) out.push(line);
  return out;
}

/** The interaction, written on the picture: scene number, who acts, who receives, what passes between them. */
function InteractionCard({ at }: { at: MessageBeat }) {
  const b = MESSAGE_BEATS[at]!;
  const x = 36; const y = 26; const w = 430; const size = 12.5;
  const lines = wrap(b.what, size, w - 32).slice(0, 3);
  const h = 96 + lines.length * 17;
  const fromTo = b.to === '—' ? b.from : `${b.from}  →  ${b.to}`;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#0b1830" stroke={PAL.glow} strokeWidth={1.2} opacity={0.96} />
      <text x={x + 16} y={y + 24} fontSize={10.5} fontWeight={700} fill={PAL.glow} fontFamily={FONT} letterSpacing={1.6}>{`SCENE ${at + 1} OF ${MESSAGE_BEATS.length}`}</text>
      <text x={x + 16} y={y + 46} fontSize={Math.min(16, (16 * (w - 32)) / Math.max(tw(b.title, 16, false, 700), w - 32))} fontWeight={700} fill={PAL.ink} fontFamily={FONT}>{b.title}</text>
      <text x={x + 16} y={y + 70} fontSize={12.5} fontWeight={700} fill={shade(PAL.teal, 0.35)} fontFamily={FONT}>{fromTo}</text>
      {lines.map((l, i) => <text key={i} x={x + 16} y={y + 92 + i * 17} fontSize={size} fontWeight={500} fill={PAL.muted} fontFamily={FONT}>{l}</text>)}
    </g>
  );
}

function Ground() {
  const tiles: ReactNode[] = [];
  for (let gx = 0; gx < GX; gx++) for (let gy = 0; gy < GY; gy++) {
    const road = gy >= 6 && gy < 8;
    tiles.push(<Tile key={`${gx}-${gy}`} gx={gx} gy={gy} fill={road ? PAL.road : PAL.ground} stroke={road ? undefined : PAL.groundLine} opacity={road ? 1 : 0.9} />);
  }
  return (
    <g>
      {tiles}
      <path d={pathOf([[0, ST], [GX, ST]])} stroke={PAL.roadLine} strokeWidth={1} strokeDasharray="8 8" opacity={0.45} fill="none" />
      <Tile gx={0.8} gy={8.5} w={10.6} d={5.2} fill={PAL.grass} opacity={0.5} />
      <Tile gx={11.6} gy={0.4} w={8.2} d={5.2} fill={PAL.violet} opacity={0.08} />
      <Tile gx={0.8} gy={0.4} w={7} d={5} fill={PAL.teal} opacity={0.08} />
    </g>
  );
}

function Town({ at }: { at: MessageBeat }) {
  return (
    <g>
      <District gx={0.8} gy={8.5} w={10.6} d={5.2} label="Hannah's side of the street · her Home, her vault, the key safe" tone="navy" at="bottom" />
      <District gx={11.6} gy={0.4} w={8.2} d={5.2} label="The organization's side" tone="violet" at="bottom" />
      <District gx={0.8} gy={0.4} w={7} d={5} label="The public notice board · the chain" tone="teal" at="left" />

      {/* the board */}
      <Tree gx={1.4} gy={1.0} /><Tree gx={7.2} gy={5.0} s={0.9} />
      <Box gx={BOARD.gx} gy={BOARD.gy} w={2.8} d={1} h={56} tone="teal" roof="slab" windows={false} sign="Public notice board" signSize={13} />

      {/* the organization */}
      <Tree gx={12.2} gy={1.0} /><Tree gx={19.2} gy={5.0} s={0.9} />
      <Box gx={ORG.gx} gy={ORG.gy} w={3.4} d={2.6} h={64} tone="violet" roof="pediment" sign="The organization" signSize={13} />
      <Box gx={OFFICE.gx} gy={OFFICE.gy} w={1.6} d={1.6} h={30} tone="slate" roof="flat" sign="Membership office" signSize={12} />

      {/* hannah's side */}
      <Tree gx={1.4} gy={9.0} /><Tree gx={10.8} gy={13.2} s={0.9} />
      <Box gx={VAULT.gx} gy={VAULT.gy} w={1.7} d={1.7} h={30} tone="amber" roof="slab" sign="Her vault" signSize={13} />
      <Box gx={HOME.gx} gy={HOME.gy} w={2.4} d={2.2} h={46} tone="navy" roof="gable" sign="Hannah's Home" signSize={13} />
      <Box gx={KEYSAFE.gx} gy={KEYSAFE.gy} w={1.8} d={1.8} h={42} tone="amber" roof="flat" windows={false} sign="Key safe" signSize={13} />
      <CardOnVault on={at === 0 || at === 3} />

      {/* the people, and the two agents */}
      <Person gx={HANNAH.gx} gy={HANNAH.gy} name="Hannah" color={PAL.navy} note="a member" />
      <Agent gx={AGENT.gx} gy={AGENT.gy} name="her agent" color={PAL.teal} />
      <Agent gx={ORGDOOR.gx} gy={ORGDOOR.gy} name="its agent · at the door" color={PAL.violet} />
      <Person gx={STEWARD.gx} gy={STEWARD.gy} name="the steward" color={PAL.violet} note="reads the mail" />
    </g>
  );
}

// ── the scene ──────────────────────────────────────────────────────────────────────────────────────────────────────
export function MemberMessageScene({ beat: at = 0 }: { beat?: MessageBeat }) {
  const id = 'member-message';
  const S = 11.5; // speech size (the town is drawn at 1.3×, so this reads as ~15px on a wide screen)
  const boardZ = 56 + 60; const orgZ = 64 + 86; const safeZ = 42 + 50; const vaultZ = 30 + 50; const officeZ = 30 + 66;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-title`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', fontFamily: FONT }}>
      <title id={`${id}-title`}>A member's agent sends a message to her organization's agent, which admits only adult members and learns neither who wrote nor anything on her card</title>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={PAL.sky0} /><stop offset="1" stopColor={PAL.sky1} /></linearGradient>
      </defs>
      <style>{`@keyframes iso-in { from { opacity: 0 } to { opacity: 1 } } @keyframes iso-out { to { opacity: 0 } } @media (prefers-reduced-motion: reduce) { #${id} * { transition: none !important; animation: none !important; } }`}</style>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 173) % W} cy={(i * 97) % 120} r={(i % 3) * 0.5 + 0.4} fill="#fff" opacity={0.35} />)}

      <g transform={TOWN_TRANSFORM}>
      <Ground />

      {/* who is acting: a pool of light */}
      <Spot gx={HANNAH.gx} gy={HANNAH.gy} on={at === 1} />
      <Spot gx={VAULT.gx + 0.85} gy={VAULT.gy + 0.85} on={at === 1 || at === 3 || at === 7} r={56} />
      <Spot gx={AGENT.gx} gy={AGENT.gy} on={at === 3 || at === 4 || at === 5} />
      <Spot gx={KEYSAFE.gx + 0.9} gy={KEYSAFE.gy + 0.9} on={at === 4} r={58} />
      <Spot gx={ORGDOOR.gx} gy={ORGDOOR.gy} on={at === 2 || at === 5 || at === 6} />
      <Spot gx={BOARD.gx + 1.4} gy={BOARD.gy + 0.5} on={at === 6} r={70} />
      <Spot gx={STEWARD.gx} gy={STEWARD.gy} on={at === 7} />

      {/* lanes, under the buildings */}
      <Lane pts={L.permission} beat={1} at={at} color={PAL.glow} delay={2400} summary={SUMMARY} />
      <Lane pts={L.ask} beat={2} at={at} color={PAL.violet} dur={1.8} summary={SUMMARY} />
      <Lane pts={L.fetch} beat={3} at={at} color={PAL.amber} summary={SUMMARY} />
      <Lane pts={L.toSafe} beat={4} at={at} color={PAL.amber} summary={SUMMARY} />
      <Lane pts={L.fromSafe} beat={4} at={at} color={PAL.good} delay={3600} summary={SUMMARY} />
      <Lane pts={L.send} beat={5} at={at} color={PAL.navy} dur={2} summary={SUMMARY} />
      <Lane pts={L.board} beat={6} at={at} color={PAL.teal} dur={2} summary={SUMMARY} />
      <Lane pts={L.receipt} beat={7} at={at} color={PAL.good} delay={1600} dur={2} summary={SUMMARY} />

      <Town at={at} />

      {/* beat 0 — what is where (held again on the summary beat) */}
      <Tag gx={KEYSAFE.gx + 3.3} gy={KEYSAFE.gy + 0.9} z={130} text="the key — it never comes out" color={PAL.amber} on={at === 0 || at === 4} size={11} />
      <Tag gx={BOARD.gx + 1.4} gy={BOARD.gy + 0.5} z={boardZ} text="the organization's stamp · cards still vouched for" color={PAL.good} on={at === 0} size={11} />
      <Tag gx={OFFICE.gx + 0.8} gy={OFFICE.gy + 0.8} z={officeZ} text="issues the cards" color={PAL.muted} on={at === 0} size={11} />
      <Tag gx={ORG.gx + 1.7} gy={ORG.gy + 1.3} z={orgZ} text="reads mail only from adult members" color={shade(PAL.violet, 0.3)} on={at === 0 || at === 2} size={11} />

      {/* beat 1 — Hannah signs */}
      <Signature gx={HANNAH.gx} gy={HANNAH.gy} on={at === 1} />
      <Bubble gx={HANNAH.gx + 0.3} gy={HANNAH.gy} z={44} lines={['I sign once:', "my agent may prove I'm an adult member", '— to this organization, until spring.']} color={PAL.glow} on={at === 1} delay={500} size={S} />
      <Walker pts={L.permission} beat={1} at={at} say="her permission → her vault" color={PAL.glow} delay={2500} dur={1.6} size={S} />

      {/* beat 2 — the question */}
      <Walker pts={L.ask} beat={2} at={at} say="Adult member? Prove it. Question #4821 — for this door only" color={PAL.violet} delay={200} dur={2.6} size={S} />
      <Reply gx={ORGDOOR.gx} gy={ORGDOOR.gy} z={70} text="no name asked" color={shade(PAL.violet, 0.3)} beat={2} at={at} delay={3000} size={S} summary={SUMMARY} />

      {/* beat 3 — the proof, at home */}
      <Walker pts={L.fetch} beat={3} at={at} say="card + permission — they stay home" color={PAL.amber} delay={200} dur={1.6} until={2600} size={S} />
      <Reply gx={AGENT.gx} gy={AGENT.gy} z={62} text="sealed proof: adult member — YES" color={PAL.good} beat={3} at={at} delay={2400} size={S} summary={SUMMARY} />

      {/* beat 4 — the stamp, and the slip that gets none */}
      <Walker pts={L.toSafe} beat={4} at={at} say="stamp this — for the organization, #4821" color={PAL.amber} delay={200} dur={1.8} until={2600} size={S} />
      <Reply gx={KEYSAFE.gx + 3.3} gy={KEYSAFE.gy + 0.9} z={170} text="her permission covers it — one stamp ✓" color={PAL.good} beat={4} at={at} delay={2400} size={S} summary={SUMMARY} />
      <Reply gx={KEYSAFE.gx + 1.6} gy={KEYSAFE.gy + 2.4} z={10} text="for a different organization? no stamp ✗" color={PAL.bad} beat={4} at={at} delay={4600} size={S} summary={SUMMARY} />
      <Walker pts={L.fromSafe} beat={4} at={at} say="stamped proof" color={PAL.good} delay={3700} dur={1.4} size={S} />

      {/* beat 5 — across the street */}
      <Walker pts={L.send} beat={5} at={at} say="✉ from a pen name — sealed proof inside" color={shade(PAL.navy, 0.3)} delay={200} dur={3} size={S} />
      <Tag gx={HOME.gx + 1.2} gy={HOME.gy + 1.1} z={46 + 70} text="no name on the envelope" color={shade(PAL.navy, 0.35)} on={at === 5} size={11} />

      {/* beat 6 — the notice board */}
      <Walker pts={L.board} beat={6} at={at} say="real stamp? card still vouched for? #4821 unused?" color={PAL.teal} delay={200} dur={3} size={S} />
      <Reply gx={BOARDFRONT.gx} gy={BOARDFRONT.gy} z={30} text="yes · yes · unused" color={PAL.good} beat={6} at={at} delay={3400} size={S} summary={SUMMARY} />
      <Tag gx={OFFICE.gx + 0.8} gy={OFFICE.gy + 0.8} z={officeZ} text="never asked" color={PAL.bad} on={at === 6 || at === SUMMARY} size={11} />

      {/* beat 7 — the steward reads; two receipts; the off switch */}
      <Reply gx={STEWARD.gx} gy={STEWARD.gy} z={62} text="a message — from an adult member" color={shade(PAL.violet, 0.35)} beat={7} at={at} delay={300} size={S} hold summary={SUMMARY} />
      <Tag gx={ORG.gx + 1.7} gy={ORG.gy + 1.3} z={orgZ} text="its receipt: an adult member wrote · #4821 — no name" color={shade(PAL.violet, 0.3)} on={at === SUMMARY} delay={1200} size={11} />
      <Walker pts={L.receipt} beat={7} at={at} say="her receipt → her vault, with the permission it ran under" color={PAL.good} delay={1700} dur={2.6} size={S} />
      <Tag gx={HOME.gx + 1.2} gy={HOME.gy + 1.1} z={46 + 112} text="she can cancel the permission from her front door — any time" color={PAL.glow} on={at === SUMMARY} delay={3600} size={11} />
      </g>
      <InteractionCard at={at} />
    </svg>
  );
}
