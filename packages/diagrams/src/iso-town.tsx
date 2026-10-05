// A DAY IN THE TOWN — the isometric scene. For the reader who will never open a spec: one person, one agent, one
// town; the agent walks out of her front door and wears a different hat at every stop — patient at the practice,
// member at the church and the home group, neighbour at the rec centre — and every provider answers from its own
// estate with its own agent. Then a window: her coach may read one shelf of her vault, and she can close it.
//
// Same contract as `TownScene`: a `beat` prop, CSS transitions for everything that changes, CSS motion paths for
// the walkers. A static render is a still of that beat. 2.5D is drawn, not simulated: a building is three shaded
// faces on an isometric grid; the "camera" never moves, the town is laid out so the eye travels.
import type { CSSProperties, ReactNode } from 'react';
import { FONT, MONO, tw } from './primitives';

export type IsoBeat = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface IsoBeatInfo { id: string; title: string; caption: string; rule: string; ms: number }

export const ISO_BEATS: readonly IsoBeatInfo[] = [
  { id: 'town', title: 'One person, one agent, one town', caption: "Alice lives at the bottom of the hill. Her agent lives at her Home, next to her vault. Across town: her doctor's practice, her church and her home group, the rec centre. In the middle, the services the whole town shares. Every one of them has its own agent, at its own address.", rule: 'Each has its own front door. Nobody holds anyone else\'s keys.', ms: 6200 },
  { id: 'patient', title: 'As a patient', caption: 'Alice: "book my check-up." Her agent looks the practice up in the town directory, checks the card against the chain, walks over and asks. The practice\'s agent answers with two open slots. She picks one; the appointment lands in her vault.', rule: 'The practice learns she is a patient — and nothing else about her day.', ms: 9000 },
  { id: 'member', title: 'As a member', caption: 'Alice: "when do we meet this week?" Same agent, a different hat. The church\'s agent answers with Sunday\'s service; the home group\'s agent answers with Wednesday at the Nguyens\'. Neither can see the appointment she just made.', rule: 'Contexts do not leak into each other. The hat is hers to choose.', ms: 8600 },
  { id: 'neighbour', title: 'As a neighbour', caption: 'Alice: "yoga this week?" Her agent asks the rec centre; the rec centre\'s agent sends back the timetable. A public question, a public answer — nothing private changed hands.', rule: 'Asking is free. Sharing is a decision.', ms: 7200 },
  { id: 'window', title: 'A window into her vault', caption: 'Her fitness goals live in her vault. She opens one shelf to her coach — read only, this season. The coach\'s agent sees "3 of 5 sessions"; it cannot see the appointment, the home group, or anything else on the other shelves.', rule: 'One shelf, one reader, one season. Signed at her door.', ms: 8600 },
  { id: 'closed', title: 'Season over', caption: 'She closes the window from the same door. The coach\'s next read is refused at the gate. Nothing to chase down, no copies to recall: the record never left her vault.', rule: 'What she opened, she can close. Being on the street never gave anyone power over her.', ms: 7600 },
  { id: 'day', title: 'Her day, her rules', caption: 'Four conversations, four contexts, one agent. The practice knows a patient, the church a member, the rec centre a neighbour, the coach one shelf. Each one answered from its own estate. Every permission is hers, separately, and revocable.', rule: 'One person. One agent. Many contexts. Keys at home.', ms: 8000 },
];

// ── isometric grid ───────────────────────────────────────────────────────────────────────────────────────────────
const W = 1400; const H = 840;
const TW = 60; const TH = 30; // one tile on screen (2:1)
const OX = 720; const OY = 118;
const iso = (gx: number, gy: number, z = 0) => ({ x: OX + (gx - gy) * (TW / 2), y: OY + (gx + gy) * (TH / 2) - z });
const pt = (gx: number, gy: number, z = 0) => { const p = iso(gx, gy, z); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; };
const pathOf = (pts: readonly (readonly [number, number])[], z = 0) => pts.map(([gx, gy], i) => { const p = iso(gx, gy, z); return `${i ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`; }).join(' ');

// ── palette (fixed hex: faces need shading, which CSS variables cannot do) ─────────────────────────────────────
const shade = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16); const r = (n >> 16) & 255; const g = (n >> 8) & 255; const b = n & 255;
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(k >= 0 ? c + (255 - c) * k : c * (1 + k))));
  return `#${((f(r) << 16) | (f(g) << 8) | f(b)).toString(16).padStart(6, '0')}`;
};
const PAL = {
  sky0: '#071122', sky1: '#0d1b33',
  ground: '#152640', groundLine: '#1f3658', grass: '#17423f', grassLine: '#1e5a52',
  road: '#2b3a52', roadLine: '#8a98b3', path: '#3a4d6b',
  navy: '#3b6fb6', teal: '#2a9d8f', violet: '#7c5cbf', rose: '#d1546f', amber: '#d9a441', slate: '#64748b', paper: '#e8eef7',
  tree: '#2e8b6a', trunk: '#6b4a2b',
  ink: '#e8eef7', muted: '#93a4bd', glow: '#ffd27a', good: '#2dd4bf', bad: '#fb7185',
} as const;
type IsoTone = 'navy' | 'teal' | 'violet' | 'rose' | 'amber' | 'slate';

// ── primitives ───────────────────────────────────────────────────────────────────────────────────────────────────
function Tile({ gx, gy, w = 1, d = 1, fill, stroke, opacity = 1 }: { gx: number; gy: number; w?: number; d?: number; fill: string; stroke?: string; opacity?: number }) {
  return <polygon points={`${pt(gx, gy)} ${pt(gx + w, gy)} ${pt(gx + w, gy + d)} ${pt(gx, gy + d)}`} fill={fill} stroke={stroke} strokeWidth={stroke ? 1 : 0} opacity={opacity} />;
}

/** A box on the grid: footprint w×d tiles, height h px. Top face lit, left face mid, right face dark. */
function Box({ gx, gy, w, d, h, tone, roof = 'flat', windows = true, sign, signTone }: { gx: number; gy: number; w: number; d: number; h: number; tone: IsoTone; roof?: 'flat' | 'gable' | 'dome' | 'spire' | 'pediment' | 'slab'; windows?: boolean; sign?: string; signTone?: string }) {
  const base = PAL[tone];
  const top = shade(base, 0.38); const left = shade(base, 0.02); const right = shade(base, -0.32); const roofC = shade(base, -0.12); const roofD = shade(base, -0.42);
  const topPts = `${pt(gx, gy, h)} ${pt(gx + w, gy, h)} ${pt(gx + w, gy + d, h)} ${pt(gx, gy + d, h)}`;
  const leftPts = `${pt(gx, gy + d, 0)} ${pt(gx + w, gy + d, 0)} ${pt(gx + w, gy + d, h)} ${pt(gx, gy + d, h)}`;
  const rightPts = `${pt(gx + w, gy + d, 0)} ${pt(gx + w, gy, 0)} ${pt(gx + w, gy, h)} ${pt(gx + w, gy + d, h)}`;
  const shadow = `${pt(gx + 0.15, gy + d + 0.05)} ${pt(gx + w + 0.55, gy + d + 0.05)} ${pt(gx + w + 0.55, gy + d + 0.45)} ${pt(gx + 0.15, gy + d + 0.45)}`;
  const rows = windows && h >= 34 ? Math.min(3, Math.floor((h - 10) / 16)) : 0;
  const win: ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const z0 = 10 + r * 16; const z1 = z0 + 8;
    const nL = Math.max(1, Math.round(w * 2)); const nR = Math.max(1, Math.round(d * 2));
    for (let i = 0; i < nL; i++) { const t0 = (i + 0.3) / nL; const t1 = (i + 0.7) / nL; win.push(<polygon key={`l${r}${i}`} points={`${pt(gx + w * t0, gy + d, z0)} ${pt(gx + w * t1, gy + d, z0)} ${pt(gx + w * t1, gy + d, z1)} ${pt(gx + w * t0, gy + d, z1)}`} fill={PAL.glow} opacity={0.75} />); }
    for (let i = 0; i < nR; i++) { const t0 = (i + 0.3) / nR; const t1 = (i + 0.7) / nR; win.push(<polygon key={`r${r}${i}`} points={`${pt(gx + w, gy + d * (1 - t0), z0)} ${pt(gx + w, gy + d * (1 - t1), z0)} ${pt(gx + w, gy + d * (1 - t1), z1)} ${pt(gx + w, gy + d * (1 - t0), z1)}`} fill={PAL.glow} opacity={0.5} />); }
  }
  let roofEl: ReactNode = null;
  const rh = Math.max(14, Math.min(26, h * 0.45));
  if (roof === 'gable' || roof === 'pediment') {
    const r0 = pt(gx, gy + d / 2, h + rh); const r1 = pt(gx + w, gy + d / 2, h + rh);
    roofEl = (
      <g>
        <polygon points={`${pt(gx, gy + d, h)} ${pt(gx + w, gy + d, h)} ${r1} ${r0}`} fill={roofC} />
        <polygon points={`${pt(gx + w, gy + d, h)} ${pt(gx + w, gy, h)} ${r1}`} fill={roofD} />
        <polygon points={`${pt(gx, gy, h)} ${pt(gx + w, gy, h)} ${r1} ${r0}`} fill={shade(base, 0.1)} opacity={0.9} />
      </g>
    );
  } else if (roof === 'dome') {
    const c = iso(gx + w / 2, gy + d / 2, h); const rx = (w * TW) / 2 * 0.62; const ry = rx * 0.5;
    roofEl = (
      <g>
        <ellipse cx={c.x} cy={c.y} rx={rx} ry={ry} fill={roofD} />
        <path d={`M ${c.x - rx} ${c.y} A ${rx} ${rx * 0.95} 0 0 1 ${c.x + rx} ${c.y} Z`} fill={shade(base, 0.22)} />
        <path d={`M ${c.x - rx * 0.55} ${c.y - rx * 0.78} A ${rx * 0.9} ${rx * 0.8} 0 0 1 ${c.x + rx * 0.2} ${c.y - rx * 0.92}`} fill="none" stroke={shade(base, 0.6)} strokeWidth={2} opacity={0.7} />
      </g>
    );
  } else if (roof === 'spire') {
    const apex = iso(gx + w / 2, gy + d / 2, h + rh * 2.2);
    roofEl = (
      <g>
        <polygon points={`${pt(gx, gy + d, h)} ${pt(gx + w, gy + d, h)} ${apex.x},${apex.y}`} fill={roofC} />
        <polygon points={`${pt(gx + w, gy + d, h)} ${pt(gx + w, gy, h)} ${apex.x},${apex.y}`} fill={roofD} />
      </g>
    );
  } else if (roof === 'slab') {
    roofEl = <polygon points={`${pt(gx - 0.12, gy - 0.12, h + 4)} ${pt(gx + w + 0.12, gy - 0.12, h + 4)} ${pt(gx + w + 0.12, gy + d + 0.12, h + 4)} ${pt(gx - 0.12, gy + d + 0.12, h + 4)}`} fill={roofD} />;
  }
  const sc = iso(gx + w / 2, gy + d / 2, h + (roof === 'flat' || roof === 'slab' ? 0 : roof === 'spire' ? rh * 2.2 : rh) + 26);
  const sw = sign ? tw(sign, 11, false, 650) * 1.1 + 18 : 0;
  return (
    <g>
      <polygon points={shadow} fill="#000" opacity={0.28} />
      <polygon points={leftPts} fill={left} />
      <polygon points={rightPts} fill={right} />
      <polygon points={topPts} fill={top} />
      {win}
      {roofEl}
      {sign && (
        <g>
          <line x1={sc.x} y1={sc.y + 10} x2={sc.x} y2={sc.y + 22} stroke={PAL.muted} strokeWidth={1} />
          <rect x={sc.x - sw / 2} y={sc.y - 10} width={sw} height={20} rx={10} fill="#0b1830" stroke={signTone ?? shade(base, 0.25)} strokeWidth={1.2} />
          <text x={sc.x} y={sc.y + 4} fontSize={11} fontWeight={650} textAnchor="middle" fill={PAL.ink} fontFamily={FONT}>{sign}</text>
        </g>
      )}
    </g>
  );
}

function Tree({ gx, gy, s = 1 }: { gx: number; gy: number; s?: number }) {
  const b = iso(gx, gy); const h = 26 * s;
  return (
    <g>
      <ellipse cx={b.x + 2} cy={b.y + 2} rx={8 * s} ry={4 * s} fill="#000" opacity={0.25} />
      <line x1={b.x} y1={b.y} x2={b.x} y2={b.y - h * 0.4} stroke={PAL.trunk} strokeWidth={2.2 * s} />
      <polygon points={`${b.x - 9 * s},${b.y - h * 0.35} ${b.x + 9 * s},${b.y - h * 0.35} ${b.x},${b.y - h}`} fill={PAL.tree} />
      <polygon points={`${b.x},${b.y - h * 0.35} ${b.x + 9 * s},${b.y - h * 0.35} ${b.x},${b.y - h}`} fill={shade(PAL.tree, -0.3)} />
    </g>
  );
}

function District({ gx, gy, w, d, label, tone, at = 'none' }: { gx: number; gy: number; w: number; d: number; label?: string; tone: IsoTone; at?: 'bottom' | 'left' | 'none' }) {
  const c = PAL[tone];
  const lp = at === 'bottom' ? iso(gx + w, gy + d) : iso(gx, gy + d);
  return (
    <g>
      <polygon points={`${pt(gx, gy)} ${pt(gx + w, gy)} ${pt(gx + w, gy + d)} ${pt(gx, gy + d)}`} fill={c} opacity={0.1} stroke={c} strokeWidth={1} strokeDasharray="6 5" strokeOpacity={0.5} />
      {label && at !== 'none' && <text x={at === 'bottom' ? lp.x : lp.x - 10} y={at === 'bottom' ? lp.y + 18 : lp.y - 8} fontSize={10} fontWeight={700} textAnchor={at === 'bottom' ? 'middle' : 'end'} fill={shade(c, 0.3)} fontFamily={MONO} letterSpacing={1.4}>{label.toUpperCase()}</text>}
    </g>
  );
}

const EASE = 'cubic-bezier(.4,0,.2,1)';

/** A road segment along a grid polyline, used for the walkers' lanes; drawn as a lit line when active. */
function Lane({ pts, beat, at, color, delay = 0, dur = 1.2, dashed = false }: { pts: readonly (readonly [number, number])[]; beat: IsoBeat; at: IsoBeat; color: string; delay?: number; dur?: number; dashed?: boolean }) {
  const drawn = at >= beat; const on = at === beat || at === 6;
  return <path d={pathOf(pts)} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" pathLength={1}
    strokeDasharray={dashed ? '0.015 0.015' : 1} strokeDashoffset={dashed ? 0 : drawn ? 0 : 1}
    style={{ opacity: dashed ? (drawn ? 0.95 : 0) : on ? 0.95 : drawn ? 0.3 : 1, transition: dashed ? `opacity .6s ${EASE} ${delay}ms` : `stroke-dashoffset ${dur}s ${EASE} ${delay}ms, opacity .6s ${EASE}` }} />;
}

/** The agent on foot: a little figure with a halo and a speech pill, travelling a lane on its beat. */
function Walker({ pts, beat, at, say, color, delay = 300, dur = 2.4, until }: { pts: readonly (readonly [number, number])[]; beat: IsoBeat; at: IsoBeat; say: string; color: string; delay?: number; dur?: number; until?: number }) {
  const go = at >= beat; const show = at === beat;
  const w = tw(say, 10.5, false, 650) * 1.1 + 20;
  const style: CSSProperties = {
    offsetPath: `path('${pathOf(pts)}')`, offsetRotate: '0deg', offsetDistance: go ? '100%' : '0%', opacity: show ? 1 : 0,
    transition: go ? `offset-distance ${dur}s ${EASE} ${delay}ms, opacity .5s ${EASE}` : 'none',
    animation: show ? [`iso-in .4s ${EASE} ${delay}ms both`, ...(until ? [`iso-out .6s ${EASE} ${until}ms forwards`] : [])].join(', ') : 'none',
  };
  return (
    <g style={style}>
      <ellipse cx={0} cy={2} rx={9} ry={4} fill="#000" opacity={0.35} />
      <circle cx={0} cy={-10} r={13} fill={color} opacity={0.18} />
      <rect x={-5} y={-16} width={10} height={14} rx={5} fill={color} />
      <circle cx={0} cy={-21} r={5} fill={shade(color, 0.5)} />
      <path d={`M 8 -22 l 6 -4 l 0 8 z`} fill={color} />
      <rect x={13} y={-33} width={w} height={22} rx={11} fill="#0b1830" stroke={color} strokeWidth={1.4} />
      <text x={13 + w / 2} y={-18.5} fontSize={10.5} fontWeight={650} textAnchor="middle" fill={PAL.ink} fontFamily={FONT}>{say}</text>
    </g>
  );
}

/** A reply from a building: a pill that fades in on cue, anchored above a grid point. */
function Reply({ gx, gy, z, text, color, beat, at, delay = 0, hold = false }: { gx: number; gy: number; z: number; text: string; color: string; beat: IsoBeat; at: IsoBeat; delay?: number; hold?: boolean }) {
  const p = iso(gx, gy, z); const on = at === beat || (hold && at === 6);
  const w = tw(text, 10.5, false, 650) * 1.1 + 20;
  return (
    <g style={{ opacity: on ? 1 : 0, transform: on ? 'translateY(0)' : 'translateY(6px)', transition: `opacity .5s ${EASE} ${on ? delay : 0}ms, transform .5s ${EASE} ${on ? delay : 0}ms` }}>
      <path d={`M ${p.x - 5} ${p.y - 8} l 5 7 l 5 -7`} fill={color} />
      <rect x={p.x - w / 2} y={p.y - 30} width={w} height={22} rx={11} fill={color} />
      <text x={p.x} y={p.y - 15.5} fontSize={10.5} fontWeight={650} textAnchor="middle" fill="#0b1830" fontFamily={FONT}>{text}</text>
    </g>
  );
}

/** A tag that says what a provider knows her as — the summary beat. */
function Tag({ gx, gy, z, text, color, on, delay = 0 }: { gx: number; gy: number; z: number; text: string; color: string; on: boolean; delay?: number }) {
  const p = iso(gx, gy, z); const w = tw(text, 10, false, 650) * 1.1 + 16;
  return (
    <g style={{ opacity: on ? 1 : 0, transition: `opacity .5s ${EASE} ${on ? delay : 0}ms` }}>
      <rect x={p.x - w / 2} y={p.y - 10} width={w} height={20} rx={4} fill="#0b1830" stroke={color} strokeWidth={1.2} />
      <text x={p.x} y={p.y + 3.5} fontSize={10} fontWeight={650} textAnchor="middle" fill={color} fontFamily={FONT}>{text}</text>
    </g>
  );
}

// ── the town plan ────────────────────────────────────────────────────────────────────────────────────────────────
// Grid 0..24 × 0..18. Roads: east–west along gy 8–9, north–south along gx 10–11. Quadrants: faith (NW), civic (NE),
// Alice (SW), care + recreation (SE and further east).
const HOME = { gx: 3, gy: 12 }; const VAULT = { gx: 6, gy: 11.6 }; const AGENT = { gx: 3.2, gy: 15 }; const GATE = { gx: 8, gy: 13.3 };
const DOOR = { gx: 9, gy: 13.8 } as const; // where she steps onto the street
const CHURCH = { gx: 3, gy: 2.5 }; const GROUP = { gx: 6.8, gy: 5.2 };
const PRACTICE = { gx: 13, gy: 10.8 }; const REC = { gx: 18.6, gy: 11.2 }; const COACH = { gx: 22.2, gy: 13.6 };
const BOOK = { gx: 13, gy: 3.6 }; const CHAIN = { gx: 15.6, gy: 1.6 }; const DIR = { gx: 18.6, gy: 3.6 }; const KMS = { gx: 13.2, gy: 6.6 }; const GRAPH = { gx: 19.6, gy: 5.4 };

const V = 10.5; // north–south road centre
const Hh = 9.0; // east–west road centre
const L = {
  toStreet: [[DOOR.gx, DOOR.gy], [V, DOOR.gy], [V, Hh]] as const,
  toDirectory: [[V, Hh], [DIR.gx + 0.8, Hh], [DIR.gx + 0.8, DIR.gy + 1.9]] as const,
  toPractice: [[DIR.gx + 0.8, DIR.gy + 1.9], [DIR.gx + 0.8, Hh], [PRACTICE.gx + 1.2, Hh], [PRACTICE.gx + 1.2, PRACTICE.gy - 0.2]] as const,
  homeFromPractice: [[PRACTICE.gx + 1.2, PRACTICE.gy - 0.2], [PRACTICE.gx + 1.2, Hh], [V, Hh], [V, DOOR.gy], [VAULT.gx + 0.8, DOOR.gy], [VAULT.gx + 0.8, VAULT.gy + 1.7]] as const,
  toChurch: [[DOOR.gx, DOOR.gy], [V, DOOR.gy], [V, Hh], [CHURCH.gx + 1.6, Hh], [CHURCH.gx + 1.6, CHURCH.gy + 2.3]] as const,
  toGroup: [[CHURCH.gx + 1.6, CHURCH.gy + 2.3], [CHURCH.gx + 1.6, Hh - 1.2], [GROUP.gx + 0.7, Hh - 1.2], [GROUP.gx + 0.7, GROUP.gy + 1.6]] as const,
  toRec: [[DOOR.gx, DOOR.gy], [V, DOOR.gy], [V, Hh], [REC.gx + 1.6, Hh], [REC.gx + 1.6, REC.gy - 0.2]] as const,
  window: [[VAULT.gx + 0.8, VAULT.gy + 1.7], [VAULT.gx + 0.8, DOOR.gy], [V, DOOR.gy], [V, Hh], [COACH.gx + 0.6, Hh], [COACH.gx + 0.6, COACH.gy - 0.2]] as const,
  coachBack: [[COACH.gx + 0.6, COACH.gy - 0.2], [COACH.gx + 0.6, Hh], [V, Hh], [V, DOOR.gy], [DOOR.gx + 0.4, DOOR.gy]] as const,
};

function Ground() {
  const tiles: ReactNode[] = [];
  for (let gx = 0; gx < 25; gx++) for (let gy = 0; gy < 19; gy++) {
    const road = (gy >= 8 && gy < 10) || (gx >= 10 && gx < 12);
    tiles.push(<Tile key={`${gx}-${gy}`} gx={gx} gy={gy} fill={road ? PAL.road : PAL.ground} stroke={road ? undefined : PAL.groundLine} opacity={road ? 1 : 0.9} />);
  }
  return (
    <g>
      {tiles}
      {/* road centre lines */}
      <path d={pathOf([[0, 9], [25, 9]])} stroke={PAL.roadLine} strokeWidth={1} strokeDasharray="8 8" opacity={0.45} fill="none" />
      <path d={pathOf([[11, 0], [11, 19]])} stroke={PAL.roadLine} strokeWidth={1} strokeDasharray="8 8" opacity={0.45} fill="none" />
      {/* lawns */}
      <Tile gx={1} gy={10.5} w={8} d={7} fill={PAL.grass} opacity={0.55} />
      <Tile gx={1} gy={1} w={8} d={6.5} fill={PAL.grass} opacity={0.45} />
      <Tile gx={12.5} gy={1.3} w={10} d={6} fill={PAL.amber} opacity={0.08} />
      <Tile gx={17.5} gy={10.4} w={6.5} d={6} fill={PAL.grass} opacity={0.45} />
    </g>
  );
}

function Town() {
  return (
    <g>
      <District gx={1} gy={10.5} w={8} d={7} label="Alice's estate · her Home, her agent, her vault" tone="navy" at="bottom" />
      <District gx={1} gy={1} w={8} d={6.5} label="Her church · her home group" tone="violet" at="left" />
      <District gx={12.5} gy={1.3} w={10} d={6} label="Town services" tone="amber" at="bottom" />
      <District gx={12.4} gy={10.3} w={4.6} d={4.2} tone="rose" />
      <District gx={17.5} gy={10.4} w={6.5} d={6} tone="teal" />

      {/* faith — drawn back to front: farthest (smallest gx+gy) first */}
      <Tree gx={1.6} gy={1.8} /><Tree gx={2.2} gy={6.6} /><Tree gx={8.4} gy={2.2} s={0.9} />
      <Box gx={CHURCH.gx} gy={CHURCH.gy} w={2.6} d={2} h={46} tone="violet" roof="gable" sign="The church" />
      <Box gx={CHURCH.gx + 2.6} gy={CHURCH.gy + 0.2} w={0.8} d={0.8} h={70} tone="violet" roof="spire" windows={false} />
      <Box gx={GROUP.gx} gy={GROUP.gy} w={1.4} d={1.3} h={26} tone="violet" roof="gable" sign="Home group · the Nguyens'" />

      {/* civic */}
      <Box gx={BOOK.gx} gy={BOOK.gy} w={2} d={1.6} h={34} tone="amber" roof="flat" sign="Address book" />
      <Box gx={CHAIN.gx} gy={CHAIN.gy} w={2.4} d={1.4} h={52} tone="amber" roof="pediment" sign="The chain" />
      <Box gx={KMS.gx} gy={KMS.gy} w={1.2} d={1.2} h={44} tone="violet" roof="spire" sign="Key service" />
      <Box gx={DIR.gx} gy={DIR.gy} w={2} d={1.6} h={38} tone="amber" roof="pediment" sign="Directories" />
      <Box gx={GRAPH.gx} gy={GRAPH.gy} w={1.9} d={1.9} h={26} tone="violet" roof="dome" sign="Public graph" />

      {/* alice */}
      <Tree gx={1.8} gy={11.2} /><Tree gx={2.4} gy={17} /><Tree gx={8.6} gy={16.4} s={0.9} />
      <Box gx={VAULT.gx} gy={VAULT.gy} w={1.5} d={1.5} h={28} tone="amber" roof="slab" sign="Her vault" />
      <Box gx={HOME.gx} gy={HOME.gy} w={2.2} d={2} h={40} tone="navy" roof="gable" sign="Alice's Home" />
      <Box gx={AGENT.gx} gy={AGENT.gy} w={1.4} d={1.2} h={24} tone="teal" roof="flat" sign="Her agent" />
      <Box gx={GATE.gx} gy={GATE.gy} w={0.8} d={1} h={30} tone="rose" roof="flat" windows={false} sign="Gate" />

      {/* care + recreation */}
      <Box gx={PRACTICE.gx} gy={PRACTICE.gy} w={2.6} d={2} h={44} tone="rose" roof="flat" sign="Dr Okafor's practice" />
      <Box gx={PRACTICE.gx + 2.8} gy={PRACTICE.gy + 1.2} w={1} d={1} h={22} tone="rose" roof="flat" windows={false} sign="practice agent" />
      <Tree gx={17.9} gy={11} /><Tree gx={23.6} gy={16} /><Tree gx={18.2} gy={16.2} s={0.9} />
      <Box gx={REC.gx} gy={REC.gy} w={3.2} d={2.2} h={36} tone="teal" roof="flat" sign="Rec centre" />
      <Box gx={COACH.gx} gy={COACH.gy} w={1.2} d={1.1} h={22} tone="teal" roof="gable" sign="Coach Priya's agent" />
    </g>
  );
}

// ── the scene ────────────────────────────────────────────────────────────────────────────────────────────────────
export function IsoTown({ beat: at = 0 }: { beat?: IsoBeat }) {
  const vaultTop = iso(VAULT.gx + 0.75, VAULT.gy + 0.75, 28);
  const windowOn = at === 4; const windowClosed = at === 5;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="iso-town-title" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', fontFamily: FONT, wordSpacing: '0.12em' }}>
      <title id="iso-town-title">A day in the town: one person's agent as patient, member, neighbour — and a window into her vault</title>
      <defs>
        <linearGradient id="iso-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={PAL.sky0} /><stop offset="1" stopColor={PAL.sky1} /></linearGradient>
        <radialGradient id="iso-glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor={PAL.glow} stopOpacity="0.55" /><stop offset="1" stopColor={PAL.glow} stopOpacity="0" /></radialGradient>
        <filter id="iso-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <style>{`@keyframes iso-in { from { opacity: 0 } to { opacity: 1 } } @keyframes iso-out { to { opacity: 0 } }`}</style>
      <rect width={W} height={H} fill="url(#iso-sky)" />
      {/* stars */}
      {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 173) % W} cy={(i * 97) % 120} r={(i % 3) * 0.5 + 0.4} fill="#fff" opacity={0.35} />)}

      <Ground />

      {/* lanes, under the buildings */}
      <Lane pts={L.toStreet} beat={1} at={at} color={PAL.navy} />
      <Lane pts={L.toDirectory} beat={1} at={at} color={PAL.amber} delay={1400} />
      <Lane pts={L.toPractice} beat={1} at={at} color={PAL.rose} delay={3400} />
      <Lane pts={L.homeFromPractice} beat={1} at={at} color={PAL.rose} delay={6200} dur={1.6} />
      <Lane pts={L.toChurch} beat={2} at={at} color={PAL.violet} dur={1.8} />
      <Lane pts={L.toGroup} beat={2} at={at} color={PAL.violet} delay={3600} />
      <Lane pts={L.toRec} beat={3} at={at} color={PAL.teal} dur={1.8} />
      <Lane pts={L.window} beat={4} at={at} color={PAL.glow} dur={2} />
      <Lane pts={L.coachBack} beat={5} at={at} color={PAL.bad} dashed delay={800} />

      <Town />

      {/* the vault shelf: a window that opens, and closes */}
      <g style={{ opacity: windowOn || windowClosed ? 1 : 0, transition: `opacity .6s ${EASE}` }}>
        <circle cx={vaultTop.x} cy={vaultTop.y - 4} r={34} fill="url(#iso-glow)" style={{ opacity: windowOn ? 1 : 0, transition: `opacity .6s ${EASE}` }} />
        <line x1={vaultTop.x} y1={vaultTop.y - 44} x2={vaultTop.x} y2={vaultTop.y - 66} stroke={windowClosed ? PAL.bad : PAL.glow} strokeWidth={1} opacity={0.7} />
        <rect x={vaultTop.x - 52} y={vaultTop.y - 88} width={104} height={22} rx={5} fill="#0b1830" stroke={windowClosed ? PAL.bad : PAL.glow} strokeWidth={1.4} />
        <text x={vaultTop.x} y={vaultTop.y - 73} fontSize={10} fontWeight={700} textAnchor="middle" fill={windowClosed ? PAL.bad : PAL.glow} fontFamily={FONT}>{windowClosed ? 'shelf closed' : 'shelf: fitness goals'}</text>
        <text x={vaultTop.x} y={vaultTop.y - 96} fontSize={9.5} textAnchor="middle" fill={PAL.muted} fontFamily={FONT}>{windowClosed ? 'nothing to recall — it never left' : 'read only · the coach · this season'}</text>
      </g>

      {/* walkers (her agent, wearing its hats) */}
      <Walker pts={L.toStreet} beat={1} at={at} say="book my check-up" color={PAL.navy} delay={200} dur={1.4} until={1800} />
      <Walker pts={L.toDirectory} beat={1} at={at} say="find my practice" color={PAL.amber} delay={1500} dur={1.6} until={4600} />
      <Walker pts={L.toPractice} beat={1} at={at} say="as a patient: any slots?" color={PAL.rose} delay={3500} dur={2.2} until={7500} />
      <Walker pts={L.homeFromPractice} beat={1} at={at} say="appointment · Thu 9:40 → her vault" color={PAL.rose} delay={6300} dur={2.2} />
      <Walker pts={L.toChurch} beat={2} at={at} say="as a member: when do we meet?" color={PAL.violet} delay={200} dur={2.4} until={5200} />
      <Walker pts={L.toGroup} beat={2} at={at} say="and the home group?" color={PAL.violet} delay={3700} dur={1.8} />
      <Walker pts={L.toRec} beat={3} at={at} say="as a neighbour: yoga this week?" color={PAL.teal} delay={200} dur={2.4} />
      <Walker pts={L.window} beat={4} at={at} say="a grant: coach may read my fitness goals" color={PAL.glow} delay={300} dur={3} />
      <Walker pts={L.coachBack} beat={5} at={at} say="coach asks again → refused at the gate" color={PAL.bad} delay={900} dur={2.4} />

      {/* replies */}
      <Reply gx={DIR.gx + 1} gy={DIR.gy + 0.8} z={112} text="here is its card · checked on the chain" color={PAL.amber} beat={1} at={at} delay={3000} />
      <Reply gx={PRACTICE.gx + 1.3} gy={PRACTICE.gy + 1} z={104} text="Thu 9:40 or Fri 14:00 — which suits?" color={PAL.rose} beat={1} at={at} delay={5600} />
      <Reply gx={CHURCH.gx + 1.3} gy={CHURCH.gy + 1} z={126} text="Sunday 10:00 · main hall" color={PAL.violet} beat={2} at={at} delay={2600} />
      <Reply gx={GROUP.gx + 0.7} gy={GROUP.gy + 0.65} z={100} text="Wednesday 19:00 · at ours" color={PAL.violet} beat={2} at={at} delay={5500} />
      <Reply gx={REC.gx + 1.6} gy={REC.gy + 1.1} z={104} text="Tue 18:00 · Thu 7:00 · Sat 9:00" color={PAL.teal} beat={3} at={at} delay={2700} />
      <Reply gx={COACH.gx + 0.6} gy={COACH.gy + 0.55} z={126} text="I see: 3 of 5 sessions — nice" color={PAL.teal} beat={4} at={at} delay={3400} />
      <Reply gx={COACH.gx + 0.6} gy={COACH.gy + 0.55} z={126} text="refused: her window is closed" color={PAL.bad} beat={5} at={at} delay={3300} />
      <Reply gx={HOME.gx + 1.1} gy={HOME.gy + 1} z={118} text="closed, from her door" color={PAL.bad} beat={5} at={at} delay={300} />

      {/* the summary: what each provider knows her as */}
      <Tag gx={PRACTICE.gx + 1.3} gy={PRACTICE.gy + 1} z={100} text="knows her as: a patient" color={PAL.rose} on={at === 6} delay={200} />
      <Tag gx={CHURCH.gx + 1.3} gy={CHURCH.gy + 1} z={122} text="knows her as: a member" color={shade(PAL.violet, 0.3)} on={at === 6} delay={500} />
      <Tag gx={GROUP.gx + 0.7} gy={GROUP.gy + 0.65} z={96} text="a member" color={shade(PAL.violet, 0.3)} on={at === 6} delay={700} />
      <Tag gx={REC.gx + 1.6} gy={REC.gy + 1.1} z={114} text="knows her as: a neighbour" color={PAL.teal} on={at === 6} delay={900} />
      <Tag gx={COACH.gx + 0.6} gy={COACH.gy + 0.55} z={92} text="saw one shelf · now closed" color={PAL.muted} on={at === 6} delay={1100} />
      <Tag gx={BOOK.gx + 1} gy={BOOK.gy + 0.8} z={90} text="knows: her name and address" color={PAL.amber} on={at === 6} delay={1300} />
      <Tag gx={HOME.gx + 1.1} gy={HOME.gy + 1} z={108} text="holds: her keys, every permission, every receipt" color={shade(PAL.navy, 0.35)} on={at === 6} delay={1500} />

      {/* title card */}
      <g>
        <text x={36} y={46} fontSize={10.5} fontWeight={700} fill={PAL.glow} fontFamily={MONO} letterSpacing={1.8}>A DAY IN THE TOWN</text>
        <text x={36} y={72} fontSize={20} fontWeight={700} fill={PAL.ink} fontFamily={FONT}>One person. One agent. Many contexts.</text>
        <text x={36} y={92} fontSize={12} fill={PAL.muted} fontFamily={FONT}>Every building is an estate with its own agent. The roads are conversations. The keys never move.</text>
      </g>
      <g>
        <rect x={36} y={H - 58} width={tw(ISO_BEATS[at]?.rule ?? '', 12.5, false, 650) * 1.1 + 28} height={30} rx={15} fill="#0b1830" stroke={PAL.glow} strokeWidth={1.2} />
        <text x={50} y={H - 38} fontSize={12.5} fontWeight={650} fill={PAL.ink} fontFamily={FONT}>{ISO_BEATS[at]?.rule}</text>
      </g>
      <text x={W - 36} y={H - 30} fontSize={9.5} textAnchor="end" fill={PAL.muted} fontFamily={MONO}>agenticprimitives.dev</text>
    </svg>
  );
}
