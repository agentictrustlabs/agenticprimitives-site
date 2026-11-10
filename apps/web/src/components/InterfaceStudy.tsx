'use client';
// THE STUDY FIGURES. Three figures for one reproduced study of the interface essay, all drawn from one JSON record
// that the ISL harness writes (`scripts/reproduce_studies.py` → `content/studies/<id>.json`):
//   StudyPlayer   the specimen in three dimensions and its process history on a clock; layer thicknesses and the
//                 read-outs are the simulation's own values at each moment, not a drawing of them.
//   StudyMatch    the paper's specimen and history beside our encoding of them, item by item, with a verdict each.
//   StudyCompare  the simulation against the paper's numbers: signed difference per measurement, and curves.
// No dependencies: the 3D view is a hand-rolled projection into SVG (drag to turn it).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// ---------------------------------------------------------------------------------------------------------- data ---

export type MatchStatus = 'match' | 'approx' | 'assumed' | 'differs' | 'missing';
export interface MatchRow { item: string; paper: string; page?: string; ours: string; status: MatchStatus; note?: string }
export interface StudyStep {
  name: string; kind: 'run' | 'event'; label: string; seconds: number; T0: number; T1: number; ambient: string;
  gases: Record<string, number>; isl?: string; paper?: string; status?: MatchStatus; timed?: string; timing?: string;
}
export interface StudyLayer { name: string; color: string; key?: string; nm?: number }
export interface StudyCase {
  id: string; label: string; note?: string;
  geometry: { kind: 'slab' | 'wire'; substrate: { name: string; color: string }; layers: StudyLayer[]; consumedKey?: string; coreKey?: string; d0_nm?: number };
  steps: StudyStep[];
  samples: { t: number; v: Record<string, number> }[];
  readouts: { key: string; label: string; unit: string; measured?: number; digits?: number }[];
}
export interface CompareRow { case: string; quantity: string; unit: string; measured: number; simulated: number | null; tolerance: number; verdict: 'within' | 'near' | 'off' | 'not_modelled'; where?: string; support?: string }
export interface CompareSeries { title: string; xLabel: string; yLabel: string; logX?: boolean; lines: { name: string; sim: [number, number][]; meas: [number, number][] }[] }
export interface StudyData {
  id: string; title: string;
  match: { specimen: MatchRow[]; history: MatchRow[] };
  cases: StudyCase[];
  comparison: { rows: CompareRow[]; series: CompareSeries[] };
  comparison_aligned?: { rows: CompareRow[]; series: CompareSeries[] };
}

// Status colours are the reserved good / warning / critical steps; each is always shown with a glyph and a word.
const STATUS: Record<MatchStatus, { color: string; glyph: string; word: string; long: string }> = {
  match: { color: '#0ca30c', glyph: '✓', word: 'same', long: 'the paper states it and ours is the same' },
  approx: { color: '#fab219', glyph: '≈', word: 'approximated', long: 'ours is a simplification of what the paper states' },
  assumed: { color: '#fab219', glyph: '?', word: 'assumed', long: 'the paper is silent; ours is an assumption' },
  differs: { color: '#d03b3b', glyph: '≠', word: 'differs', long: 'ours contradicts the paper' },
  missing: { color: '#d03b3b', glyph: '✕', word: 'not in ours', long: 'the paper states it; our encoding leaves it out' },
};
const VERDICT = {
  within: { color: '#0ca30c', glyph: '✓', word: 'within tolerance' },
  near: { color: '#fab219', glyph: '≈', word: 'within twice the tolerance' },
  off: { color: '#d03b3b', glyph: '✕', word: 'outside' },
  not_modelled: { color: '#94a3b8', glyph: '∅', word: 'not modelled' },
} as const;
const GAS: Record<string, { color: string; name: string }> = {
  O2: { color: '#fb7185', name: 'O₂' }, N2: { color: '#94a3b8', name: 'N₂' }, Ar: { color: '#a78bfa', name: 'Ar' },
  H2: { color: '#2dd4bf', name: 'H₂' }, H2O: { color: '#60a5fa', name: 'H₂O' }, NH3: { color: '#fde68a', name: 'NH₃' },
};
const SIM = '#2a78d6';      // the simulation
const PAPER = '#0b2a4a';    // the paper's value

const fmt = (x: number, digits = 3) => {
  if (!Number.isFinite(x)) return '–';
  const a = Math.abs(x);
  if (a !== 0 && (a >= 1e5 || a < 1e-2)) {
    const e = Math.floor(Math.log10(a));
    return `${(x / 10 ** e).toFixed(Math.max(0, digits - 1))}×10${String(e).replace(/-/g, '⁻').replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]!)}`;
  }
  return Number(x.toPrecision(digits)).toString();
};
const span = (s: number) => (s >= 5400 ? `${fmt(s / 3600)} h` : s >= 90 ? `${fmt(s / 60)} min` : `${fmt(s)} s`);
const clock = (s: number) => {
  if (s < 60) return `${fmt(s)} s`;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.round(s % 60);
  return `${h ? `${h} h ` : ''}${h ? String(m).padStart(2, '0') : m} min${sec ? ` ${String(sec).padStart(2, '0')} s` : ''}`;
};
const shade = (hex: string, k: number) => {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => Math.max(0, Math.min(255, Math.round(k <= 1 ? v * k : v + (255 - v) * (k - 1)))));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};

// -------------------------------------------------------------------------------------------------------- player ---

/** Where each step sits on the drawn clock. A three-second pull and a twenty-hour oxidation must both be visible, so
 *  a step's width grows with the logarithm of its duration; inside a step the clock is linear. */
function layout(steps: StudyStep[]) {
  const w = steps.map((s) => (s.kind === 'event' ? 0.55 : 1 + Math.log10(1 + s.seconds) / 2.2));
  const total = w.reduce((a, b) => a + b, 0) || 1;
  let u = 0;
  let t = 0;
  return steps.map((s, i) => {
    const r = { u0: u, u1: u + w[i]! / total, t0: t, t1: t + (s.kind === 'run' ? s.seconds : 0) };
    u = r.u1;
    t = r.t1;
    return r;
  });
}

function valueAt(samples: StudyCase['samples'], key: string, t: number): number | undefined {
  const pts = samples.filter((s) => s.v[key] !== undefined);
  if (!pts.length) return undefined;
  if (t <= pts[0]!.t) return pts[0]!.v[key];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]!;
    const b = pts[i]!;
    if (t <= b.t) return b.t === a.t ? b.v[key] : a.v[key]! + ((b.v[key]! - a.v[key]!) * (t - a.t)) / (b.t - a.t);
  }
  return pts[pts.length - 1]!.v[key];
}

function Scene({ c, t, T, gases, yaw, phase }: { c: StudyCase; t: number; T: number; gases: Record<string, number>; yaw: number; phase: number }) {
  const g = c.geometry;
  const pitch = 0.42;
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const P = (x: number, y: number, z: number): [number, number] => {
    const x1 = x * cy + z * sy;
    const z1 = -x * sy + z * cy;
    return [228 + x1, 228 - y * Math.cos(pitch) + z1 * Math.sin(pitch)];
  };
  const poly = (pts: [number, number][]) => pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const end = c.samples[c.samples.length - 1]?.t ?? 0;
  const thick = (l: StudyLayer, at: number) => (l.key ? valueAt(c.samples, l.key, at) ?? 0 : l.nm ?? 0);
  const els: React.ReactNode[] = [];
  const labels: { y: number; text: string; color: string }[] = [];
  const hot = Math.max(0, Math.min(1, (T - 100) / 1100));

  const box = (key: string, w: number, d: number, y0: number, y1: number, color: string, opacity = 1) => {
    const faces: { n: [number, number]; pts: [number, number, number][] }[] = [
      { n: [1, 0], pts: [[w, y0, -d], [w, y0, d], [w, y1, d], [w, y1, -d]] },
      { n: [-1, 0], pts: [[-w, y0, -d], [-w, y0, d], [-w, y1, d], [-w, y1, -d]] },
      { n: [0, 1], pts: [[-w, y0, d], [w, y0, d], [w, y1, d], [-w, y1, d]] },
      { n: [0, -1], pts: [[-w, y0, -d], [w, y0, -d], [w, y1, -d], [-w, y1, -d]] },
    ];
    faces.forEach((f, i) => {
      const nz = -f.n[0] * sy + f.n[1] * cy;                    // toward the viewer when positive
      if (nz <= 0.001) return;
      const nx = f.n[0] * cy + f.n[1] * sy;
      els.push(<polygon key={`${key}s${i}`} points={poly(f.pts.map((p) => P(p[0], p[1], p[2])))} fill={shade(color, 0.62 + 0.2 * (nx + 1) / 2)} opacity={opacity} stroke="#07101c" strokeWidth={0.6} strokeLinejoin="round" />);
    });
    els.push(<polygon key={`${key}t`} points={poly([P(-w, y1, -d), P(w, y1, -d), P(w, y1, d), P(-w, y1, d)])} fill={shade(color, 1.12)} opacity={opacity} stroke="#07101c" strokeWidth={0.6} strokeLinejoin="round" />);
  };

  if (g.kind === 'slab') {
    const W = 104;
    const D = 76;
    const total = Math.max(1e-9, g.layers.reduce((a, l) => a + thick(l, end), 0));
    const k = 70 / total;                                              // drawn height per nanometre of film
    const consumed = g.consumedKey ? valueAt(c.samples, g.consumedKey, t) ?? 0 : 0;
    const top0 = 0;                                                    // the substrate surface before the process
    const subTop = top0 - consumed * k;
    box('sub', W, D, -84, subTop, g.substrate.color);
    // The substrate is not to scale: mark the break.
    const b0 = P(-W, -62, D);
    const b1 = P(W, -62, D);
    if (cy > 0.05) els.push(<path key="brk" d={`M${b0[0]},${b0[1]} l10,-4 l10,8 l10,-8 l10,4`} stroke="#07101c" strokeWidth={1} fill="none" opacity={0.5} />, <path key="brk2" d={`M${b1[0] - 40},${b1[1]} l10,-4 l10,8 l10,-8 l10,4`} stroke="#07101c" strokeWidth={1} fill="none" opacity={0.5} />);
    let y = subTop;
    labels.push({ y: P(W, (subTop - 84) / 2, D)[1], text: g.substrate.name, color: g.substrate.color });
    g.layers.forEach((l, i) => {
      const h = thick(l, t) * k;
      if (h > 0.15) {
        box(`l${i}`, W, D, y, y + h, l.color);
        labels.push({ y: P(W, y + h / 2, D)[1], text: `${l.name}  ${fmt(thick(l, t))} nm`, color: l.color });
      }
      y += h;
    });
    if (consumed > 0) {
      // Where the surface was before the process, on the two faces that are in view.
      const side = sy >= 0 ? P(-W, top0, -D) : P(W, top0, -D);
      const near = sy >= 0 ? [P(-W, top0, D), P(W, top0, D)] : [P(W, top0, D), P(-W, top0, D)];
      els.push(<polyline key="orig" points={poly([side, near[0]!, near[1]!])} fill="none" stroke="#fff" strokeWidth={1} strokeDasharray="4 3" opacity={0.8} />);
      labels.push({ y: P(W, top0, D)[1] + 16, text: `surface before  (−${fmt(consumed)} nm)`, color: '#ffffff' });
    }
  } else {
    // A vertical wire on its substrate. Radii are to one scale; the height is not.
    const d0 = g.d0_nm ?? 60;
    const ox = g.layers[0];
    const oxide = ox ? thick(ox, t) : 0;
    const core = g.coreKey ? valueAt(c.samples, g.coreKey, t) ?? d0 : d0;
    const rmax = Math.max(d0 / 2, ...c.samples.map((s) => (g.coreKey && s.v[g.coreKey] !== undefined ? s.v[g.coreKey]! / 2 : d0 / 2) + (ox?.key ? s.v[ox.key] ?? 0 : 0)));
    const k = 70 / rmax;
    const H = 150;
    box('sub', 130, 90, -44, 0, g.substrate.color);
    const ry = Math.sin(pitch);
    const cyl = (key: string, r: number, color: string, opacity: number, capColor?: string) => {
      const [bx, by] = P(0, 0, 0);
      const [, ty] = P(0, H, 0);
      els.push(
        <path key={`${key}b`} d={`M${bx - r},${ty} L${bx - r},${by} A${r},${r * ry} 0 0 0 ${bx + r},${by} L${bx + r},${ty} Z`} fill={`url(#cyl-${key})`} opacity={opacity} stroke="#07101c" strokeWidth={0.6} />,
        <ellipse key={`${key}c`} cx={bx} cy={ty} rx={r} ry={r * ry} fill={capColor ?? shade(color, 1.15)} opacity={Math.min(1, opacity + 0.25)} stroke="#07101c" strokeWidth={0.6} />,
      );
    };
    const defs = (key: string, color: string) => (
      <linearGradient key={`g${key}`} id={`cyl-${key}`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor={shade(color, 0.6)} /><stop offset="0.45" stopColor={shade(color, 1.1)} /><stop offset="1" stopColor={shade(color, 0.7)} />
      </linearGradient>
    );
    els.push(<defs key="defs">{defs('core', g.substrate.color)}{defs('ox', ox?.color ?? '#9fd8e6')}</defs>);
    const rc = (core / 2) * k;
    const ro = rc + oxide * k;
    // Draw the core first, then the shell over it, part transparent, so the core is seen through the oxide.
    cyl('core', rc, g.substrate.color, 1);
    if (oxide > 0.05) {
      cyl('ox', ro, ox?.color ?? '#9fd8e6', 0.42, 'rgba(159,216,230,0.55)');
      const [bx] = P(0, 0, 0);
      const [, ty] = P(0, H, 0);
      els.push(<ellipse key="coretop" cx={bx} cy={ty} rx={rc} ry={rc * ry} fill={shade(g.substrate.color, 1.15)} stroke="#07101c" strokeWidth={0.6} />);
    }
    const [bx] = P(0, 0, 0);
    const [, ty] = P(0, H, 0);
    els.push(<ellipse key="etched" cx={bx} cy={ty} rx={(d0 / 2) * k} ry={(d0 / 2) * k * ry} fill="none" stroke="#fff" strokeWidth={1} strokeDasharray="4 3" opacity={0.8} />);
    labels.push({ y: ty - 6, text: `as etched  ${fmt(d0)} nm`, color: '#ffffff' });
    labels.push({ y: ty + 34, text: `${g.substrate.name} core  ${fmt(core)} nm`, color: g.substrate.color });
    if (ox) labels.push({ y: ty + 62, text: `${ox.name}  ${fmt(oxide)} nm`, color: ox.color });
  }

  // The ambient: one dot per two percent of an atmosphere of each gas, drifting faster when hotter.
  const dots: React.ReactNode[] = [];
  let n = 0;
  Object.entries(gases).forEach(([gas, p]) => {
    const count = Math.max(p > 0 ? 3 : 0, Math.round(Math.min(1, p) * 46));
    for (let i = 0; i < count; i++, n++) {
      const a = Math.sin(n * 12.9898) * 43758.5453;
      const b = Math.sin(n * 78.233) * 12543.123;
      const rx = a - Math.floor(a);
      const rz = b - Math.floor(b);
      const speed = 0.25 + 1.2 * hot;
      const y = 150 - (((rz * 150 + phase * speed * (20 + 30 * rx)) % 150) + 150) % 150;
      const x = 60 + rx * 400 + 10 * Math.sin(phase * speed * 0.7 + n);
      dots.push(<circle key={`d${n}`} cx={x} cy={y + 8} r={gas === 'H2' ? 2 : 3} fill={GAS[gas]?.color ?? '#fff'} opacity={0.35 + 0.5 * rz} />);
    }
  });

  return (
    <svg viewBox="0 0 660 380" className="block w-full select-none" role="img" aria-label={`${c.label}: the specimen at ${span(t)} into its history`}>
      <defs>
        <radialGradient id="heat" cx="0.4" cy="0.55" r="0.6"><stop offset="0" stopColor="#ff7a1a" stopOpacity={0.5 * hot} /><stop offset="1" stopColor="#ff7a1a" stopOpacity="0" /></radialGradient>
      </defs>
      <rect x="0" y="0" width="660" height="380" fill="url(#heat)" />
      {dots}
      {els}
      {labels.map((l, i) => (
        <g key={i}>
          <rect x={438} y={l.y - 8} width={10} height={10} rx={2} fill={l.color} stroke="#07101c" strokeWidth={0.5} />
          <text x={454} y={l.y + 1} fontSize="12.5" fill="#e2e8f0" fontFamily="ui-sans-serif, system-ui">{l.text}</text>
        </g>
      ))}
    </svg>
  );
}

export function StudyPlayer({ data }: { data: StudyData }) {
  const [ci, setCi] = useState(0);
  const c = data.cases[ci] ?? data.cases[0]!;
  const lay = useMemo(() => layout(c.steps), [c]);
  const [u, setU] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [yaw, setYaw] = useState(0.62);
  const [phase, setPhase] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; yaw: number } | null>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let started = false;
    const io = new IntersectionObserver(([e]) => {
      visible.current = !!e?.isIntersecting;
      if (visible.current && !reduced && !started) { started = true; setPlaying(true); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (visible.current) {
        setPhase((p) => p + dt);
        setU((x) => { const nx = x + dt / 16; if (nx >= 1) { setPlaying(false); return 1; } return nx; });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const si = Math.max(0, lay.findIndex((l, i) => u <= l.u1 || i === lay.length - 1));
  const step = c.steps[si]!;
  const L = lay[si]!;
  const f = L.u1 > L.u0 ? Math.min(1, Math.max(0, (u - L.u0) / (L.u1 - L.u0))) : 1;
  const t = L.t0 + (L.t1 - L.t0) * f;
  const T = step.T0 + (step.T1 - step.T0) * f;

  const scrub = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setU(Math.min(1, Math.max(0, ((e.clientX - r.left) / r.width * 1000 - 40) / 940)));
    setPlaying(false);
  }, []);

  const total = lay[lay.length - 1]?.t1 ?? 0;
  const Tmax = Math.max(100, ...c.steps.map((s) => Math.max(s.T0, s.T1)));
  const X = (uu: number) => 40 + uu * 940;
  const Y = (TT: number) => 118 - (TT / Tmax) * 86;
  const line = c.steps.map((s, i) => `${X(lay[i]!.u0)},${Y(s.T0)} ${X(lay[i]!.u1)},${Y(s.T1)}`).join(' ');

  return (
    <div ref={rootRef}>
      {data.cases.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-2" role="tablist" aria-label="Which specimen">
          {data.cases.map((k, i) => (
            <button key={k.id} role="tab" aria-selected={i === ci} onClick={() => { setCi(i); setU(0); setPlaying(true); }}
              className={`rounded-full border px-3 py-1 text-xs ${i === ci ? 'border-teal-bright bg-teal-bright/15 text-white' : 'border-white/20 text-slate-300 hover:border-white/50'}`}>
              {k.label}
            </button>
          ))}
        </div>
      )}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div className="cursor-grab rounded-xl bg-ink-2 active:cursor-grabbing"
          onPointerDown={(e) => { drag.current = { x: e.clientX, yaw }; (e.target as Element).setPointerCapture?.(e.pointerId); }}
          onPointerMove={(e) => { if (drag.current) setYaw(Math.max(-1.35, Math.min(1.35, drag.current.yaw + (e.clientX - drag.current.x) / 140))); }}
          onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}>
          <Scene c={c} t={t} T={T} gases={step.kind === 'run' ? step.gases : {}} yaw={yaw} phase={phase} />
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <div className="rounded-xl border border-white/10 bg-ink-2 p-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">Step {si + 1} of {c.steps.length} · {step.kind === 'run' ? 'simulated' : 'recorded, not simulated'}</div>
            <div className="mt-1 text-lg font-semibold text-white">{step.label}</div>
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-slate-300">
              <span><span className="text-slate-500">temperature</span> {fmt(T, 4)} °C</span>
              {step.kind === 'run' && <span><span className="text-slate-500">into step</span> {clock((L.t1 - L.t0) * f)} of {clock(step.seconds)}</span>}
              {step.kind === 'run' && step.T0 !== step.T1 && <span><span className="text-slate-500">rate</span> {fmt((step.T1 - step.T0) / step.seconds)} °C/s</span>}
            </div>
            <div className="mt-2 font-mono text-[13px] text-white"><span className="font-sans text-slate-500">elapsed</span> {clock(t)} <span className="font-sans text-slate-500">of</span> {clock(total)}</div>
            {step.timed && <div className="mt-1 text-xs text-slate-300"><span className="text-slate-500">timing in the paper:</span> <strong className="text-white">{step.timed}</strong>{step.timing ? `. ${step.timing}` : ''}</div>}
            <div className="mt-2 flex flex-wrap gap-2">
              {step.kind === 'run' && Object.entries(step.gases).map(([g, p]) => (
                <span key={g} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2 py-0.5 text-xs text-slate-200">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: GAS[g]?.color ?? '#fff' }} />{GAS[g]?.name ?? g} {fmt(p)} atm
                </span>
              ))}
              {step.kind === 'run' && !Object.keys(step.gases).length && <span className="text-xs text-slate-400">{step.ambient}: no partial pressures stated</span>}
            </div>
            {step.isl && <pre className="mt-3 overflow-x-auto rounded-md bg-black/40 px-3 py-2 font-mono text-[11.5px] leading-relaxed text-teal-bright">{step.isl}</pre>}
            {step.paper && <p className="mt-3 border-l-2 border-brass pl-3 text-[13px] italic leading-snug text-slate-300">{step.paper}</p>}
          </div>
          <div className="rounded-xl border border-white/10 bg-ink-2 p-4">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">The simulation at this moment</div>
            <table className="mt-2 w-full text-[13px]">
              <tbody>
                {c.readouts.map((r) => {
                  const v = valueAt(c.samples, r.key, t);
                  return (
                    <tr key={r.key} className="border-t border-white/10 first:border-t-0">
                      <td className="py-1.5 pr-2 text-slate-300">{r.label}</td>
                      <td className="py-1.5 text-right font-mono text-white">{v === undefined ? '–' : fmt(v, r.digits ?? 3)} <span className="text-slate-500">{r.unit}</span></td>
                      <td className="py-1.5 pl-3 text-right font-mono text-brass">{r.measured !== undefined ? fmt(r.measured, r.digits ?? 3) : ''}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {c.readouts.some((r) => r.measured !== undefined) && <div className="mt-1 text-right text-[11px] text-brass">right column: the paper, at the end of the history</div>}
          </div>
        </div>
      </div>
      <svg viewBox="0 0 1000 214" className="mt-4 block w-full touch-none select-none" onPointerDown={scrub} onPointerMove={(e) => { if (e.buttons) scrub(e); }} role="img" aria-label="The process history: temperature against time, step by step">
        {c.steps.map((s, i) => {
          const l = lay[i]!;
          const main = Object.entries(s.gases).sort((a, b) => b[1] - a[1])[0]?.[0];
          const col = s.kind === 'event' ? '#334155' : GAS[main ?? '']?.color ?? '#475569';
          const mid = (X(l.u0) + X(l.u1)) / 2;
          const wide = X(l.u1) - X(l.u0);
          return (
            <g key={i}>
              <rect x={X(l.u0) + 1} y={26} width={Math.max(1, wide - 2)} height={96} rx={4} fill={col} opacity={i === si ? 0.3 : 0.13} />
              {s.status && <rect x={X(l.u0) + 1} y={124} width={Math.max(1, wide - 2)} height={4} rx={2} fill={STATUS[s.status].color} />}
              <text x={mid} y={143} textAnchor="middle" fontSize="11" fill={i === si ? '#fff' : '#94a3b8'}>{wide > 54 ? s.name : s.name.slice(0, Math.max(2, Math.floor(wide / 7)))}</text>
              <text x={mid} y={157} textAnchor="middle" fontSize="10" fill="#64748b">{s.kind === 'run' ? span(s.seconds) : ''}</text>
            </g>
          );
        })}
        <polyline points={line} fill="none" stroke="#fde68a" strokeWidth={2} strokeLinejoin="round" />
        <text x={36} y={Y(Tmax) + 4} textAnchor="end" fontSize="10" fill="#94a3b8">{fmt(Tmax, 4)}</text>
        <text x={36} y={Y(0) + 3} textAnchor="end" fontSize="10" fill="#94a3b8">0 °C</text>
        <line x1={X(u)} x2={X(u)} y1={20} y2={128} stroke="#fff" strokeWidth={1.5} />
        <circle cx={X(u)} cy={Y(T)} r={5} fill="#fde68a" stroke="#07101c" strokeWidth={2} />
        {/* The same history to true scale: every simulated second the same width. A short step all but vanishes here, which is the point. */}
        <text x={40} y={182} fontSize="10.5" fill="#94a3b8">The same history to true scale ({clock(total)} simulated). Steps with no stated duration take no width.</text>
        {c.steps.map((s, i) => {
          const l = lay[i]!;
          if (s.kind !== 'run' || total <= 0) return null;
          const main = Object.entries(s.gases).sort((a, b) => b[1] - a[1])[0]?.[0];
          return <rect key={`ts${i}`} x={40 + (l.t0 / total) * 940} y={188} width={Math.max(1.5, ((l.t1 - l.t0) / total) * 940 - 1)} height={14} rx={2} fill={GAS[main ?? '']?.color ?? '#475569'} opacity={i === si ? 0.95 : 0.5} />;
        })}
        {total > 0 && <line x1={40 + (t / total) * 940} x2={40 + (t / total) * 940} y1={185} y2={205} stroke="#fff" strokeWidth={1.5} />}
        <text x={40} y={14} fontSize="10.5" fill="#94a3b8">Temperature through the history. Step widths grow with the logarithm of duration; the bar under each step is how well our encoding matches the paper.</text>
      </svg>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
        <button onClick={() => { if (u >= 1) setU(0); setPlaying((p) => !p); }} className="rounded-full border border-white/25 px-4 py-1.5 text-sm text-white hover:border-white">{playing ? 'Pause' : u >= 1 ? 'Replay' : 'Play'}</button>
        <span>Drag the specimen to turn it. Click the clock to move through the history.</span>
        <span className="ml-auto">Layer heights are the simulated thicknesses, drawn to one scale within the film; the substrate is cut short.</span>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------------------------------------- match ---

export function StudyMatch({ data }: { data: StudyData }) {
  const all = [...data.match.specimen, ...data.match.history];
  const count = (s: MatchStatus) => all.filter((r) => r.status === s).length;
  const block = (title: string, rows: MatchRow[]) => (
    <div className="mt-6">
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-x-3 border-b border-line pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <span>{title}: what the paper says</span><span className="w-28 text-center" /><span>What we simulate</span>
      </div>
      {rows.map((r, i) => {
        const s = STATUS[r.status];
        return (
          <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-x-3 border-b border-line py-2.5 text-[13.5px] leading-snug">
            <div className="rounded-lg bg-cream px-3 py-2">
              <div className="text-xs font-semibold text-navy">{r.item}</div>
              <div className="mt-0.5 text-slate-700">{r.paper}</div>
              {r.page && <div className="mt-0.5 text-[11px] text-slate-400">{r.page}</div>}
            </div>
            <div className="flex w-28 flex-col items-center justify-center" title={s.long}>
              <div className="h-0.5 w-full" style={{ background: s.color }} />
              <span className="-mt-3 inline-flex items-center gap-1 rounded-full border bg-white px-2 py-0.5 text-[11px] font-semibold text-slate-700" style={{ borderColor: s.color }}>
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white" style={{ background: s.color, color: r.status === 'approx' || r.status === 'assumed' ? '#0b0b0b' : '#fff' }}>{s.glyph}</span>
                {s.word}
              </span>
            </div>
            <div className="rounded-lg border px-3 py-2" style={{ borderColor: s.color, borderLeftWidth: 4 }}>
              <div className={`${/^(RUN|[A-Z_]+:)/.test(r.ours) ? 'font-mono text-[12px]' : ''} text-slate-800`}>{r.ours}</div>
              {r.note && <div className="mt-1 text-[12px] text-slate-500">{r.note}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
  return (
    <figure className="my-8">
      <div className="flex flex-wrap gap-2 text-xs text-slate-600">
        {(Object.keys(STATUS) as MatchStatus[]).filter((s) => count(s)).map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1" title={STATUS[s].long}>
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px]" style={{ background: STATUS[s].color, color: s === 'approx' || s === 'assumed' ? '#0b0b0b' : '#fff' }}>{STATUS[s].glyph}</span>
            <strong className="text-navy">{count(s)}</strong> {STATUS[s].word}
          </span>
        ))}
      </div>
      {block('Specimen', data.match.specimen)}
      {block('History', data.match.history)}
    </figure>
  );
}

// ------------------------------------------------------------------------------------------------------- compare ---

function SeriesChart({ s }: { s: CompareSeries }) {
  const [hover, setHover] = useState<string | null>(null);
  const pts = s.lines.flatMap((l) => [...l.sim, ...l.meas]);
  if (!pts.length) return null;
  const tx = (x: number) => (s.logX ? Math.log10(Math.max(x, 1e-12)) : x);
  const x0 = Math.min(...pts.map((p) => tx(p[0])));
  const x1 = Math.max(...pts.map((p) => tx(p[0])));
  const y1 = Math.max(...pts.map((p) => p[1])) * 1.08;
  const X = (x: number) => 56 + ((tx(x) - x0) / (x1 - x0 || 1)) * 500;
  const Y = (y: number) => 250 - (y / (y1 || 1)) * 220;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((k) => k * y1);
  const xt = [0, 0.25, 0.5, 0.75, 1].map((k) => x0 + k * (x1 - x0)).map((v) => (s.logX ? 10 ** v : v));
  const dash = ['', '6 4', '2 3', '8 3 2 3', '1 4'];
  return (
    <div className="mt-6">
      <div className="text-sm font-semibold text-navy">{s.title}</div>
      <svg viewBox="0 0 700 290" className="mt-1 block w-full" role="img" aria-label={s.title}>
        {ticks.map((v, i) => (<g key={i}><line x1={56} x2={556} y1={Y(v)} y2={Y(v)} stroke="#e2e8f0" /><text x={50} y={Y(v) + 4} textAnchor="end" fontSize="11" fill="#64748b">{fmt(v)}</text></g>))}
        {xt.map((v, i) => <text key={i} x={X(v)} y={268} textAnchor="middle" fontSize="11" fill="#64748b">{fmt(v)}</text>)}
        <text x={306} y={286} textAnchor="middle" fontSize="11.5" fill="#475569">{s.xLabel}</text>
        <text x={56} y={18} fontSize="11.5" fill="#475569">{s.yLabel}</text>
        {s.lines.map((l, i) => (
          <g key={l.name}>
            {l.sim.length > 1 && <polyline points={l.sim.map((p) => `${X(p[0])},${Y(p[1])}`).join(' ')} fill="none" stroke={SIM} strokeWidth={2} strokeDasharray={dash[i % dash.length]} />}
            {l.sim.length === 1 && <rect x={X(l.sim[0]![0]) - 5} y={Y(l.sim[0]![1]) - 5} width={10} height={10} fill={SIM} stroke="#fff" strokeWidth={2} />}
            {l.meas.map((p, j) => (
              <circle key={j} cx={X(p[0])} cy={Y(p[1])} r={5} fill={PAPER} stroke="#fff" strokeWidth={2}
                onMouseEnter={() => setHover(`${l.name}: the paper gives ${fmt(p[1])} at ${fmt(p[0])}`)} onMouseLeave={() => setHover(null)} />
            ))}
            {l.sim.length > 0 && <text x={562} y={Y(l.sim[l.sim.length - 1]![1]) + 4} fontSize="11" fill="#334155">{l.name}</text>}
          </g>
        ))}
        <g transform="translate(420,10)">
          <line x1={0} x2={22} y1={6} y2={6} stroke={SIM} strokeWidth={2} /><text x={28} y={10} fontSize="11" fill="#334155">our simulation</text>
          <circle cx={130} cy={6} r={5} fill={PAPER} stroke="#fff" strokeWidth={2} /><text x={140} y={10} fontSize="11" fill="#334155">the paper</text>
        </g>
      </svg>
      <div className="h-4 text-xs text-slate-500">{hover}</div>
    </div>
  );
}

export function StudyCompare({ data, set = 'reproduced' }: { data: StudyData; set?: 'reproduced' | 'aligned' }) {
  const cmp = set === 'aligned' && data.comparison_aligned ? data.comparison_aligned : data.comparison;
  const rows = cmp.rows;
  const [hover, setHover] = useState<number | null>(null);
  const lim = 100;                                                      // the axis runs to ±100 %; a bar that goes further is cut and says so
  const H = 30;
  const X = (pct: number) => 560 + (Math.max(-lim, Math.min(lim, pct)) / lim) * 200;
  const tally = (v: CompareRow['verdict']) => rows.filter((r) => r.verdict === v).length;
  return (
    <figure className="my-8">
      <div className="flex flex-wrap gap-2 text-xs text-slate-600">
        {(Object.keys(VERDICT) as CompareRow['verdict'][]).filter((v) => tally(v)).map((v) => (
          <span key={v} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px]" style={{ background: VERDICT[v].color, color: v === 'near' ? '#0b0b0b' : '#fff' }}>{VERDICT[v].glyph}</span>
            <strong className="text-navy">{tally(v)}</strong> {VERDICT[v].word}
          </span>
        ))}
      </div>
      <div className="mt-3 overflow-x-auto rounded-lg border border-line bg-white p-3">
        <svg viewBox={`0 0 1000 ${rows.length * H + 46}`} className="block w-full min-w-[720px]" role="img" aria-label="Our simulation against the paper, measurement by measurement">
          <text x={560} y={14} textAnchor="middle" fontSize="11" fill="#475569">simulation below the paper  ←  0  →  simulation above the paper</text>
          {[-100, -50, 0, 50, 100].map((p) => (
            <g key={p}><line x1={X(p)} x2={X(p)} y1={22} y2={rows.length * H + 26} stroke={p === 0 ? '#64748b' : '#e2e8f0'} /><text x={X(p)} y={rows.length * H + 40} textAnchor="middle" fontSize="10.5" fill="#64748b">{p > 0 ? '+' : ''}{p}%</text></g>
          ))}
          {rows.map((r, i) => {
            const y = 26 + i * H;
            const v = VERDICT[r.verdict];
            const pct = r.simulated === null ? null : ((r.simulated - r.measured) / Math.abs(r.measured)) * 100;
            const cut = pct !== null && Math.abs(pct) > lim;
            return (
              <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                <rect x={0} y={y} width={1000} height={H} fill={hover === i ? '#f6f8fb' : 'transparent'} />
                <text x={4} y={y + 13} fontSize="11.5" fill="#0b2a4a" fontWeight={600}>{r.case.length > 46 ? `${r.case.slice(0, 45)}…` : r.case}</text>
                <text x={4} y={y + 25} fontSize="10.5" fill="#64748b">{r.quantity}</text>
                <rect x={X(-r.tolerance * 100)} y={y + 3} width={X(r.tolerance * 100) - X(-r.tolerance * 100)} height={H - 6} fill="#0ca30c" opacity={0.1} />
                {pct !== null && <rect x={Math.min(X(0), X(pct))} y={y + 9} width={Math.max(2, Math.abs(X(pct) - X(0)))} height={H - 18} rx={4} fill={v.color} />}
                {cut && <text x={X(pct!) + (pct! > 0 ? 4 : -4)} y={y + 19} textAnchor={pct! > 0 ? 'start' : 'end'} fontSize="10.5" fill="#334155">{pct! > 0 ? '+' : ''}{Math.round(pct!)}% ▸</text>}
                <text x={792} y={y + 13} fontSize="11" fill="#334155">{r.simulated === null ? 'no program' : `ours ${fmt(r.simulated)}`}  ·  paper {fmt(r.measured)} {r.unit}</text>
                <text x={792} y={y + 25} fontSize="10.5" fill="#64748b">{v.glyph} {v.word}{pct !== null && !cut ? ` (${pct > 0 ? '+' : ''}${pct.toFixed(Math.abs(pct) < 10 ? 1 : 0)}%)` : ''}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-1 min-h-5 text-xs text-slate-500">
        {hover !== null && rows[hover] ? `${rows[hover]!.case}: ${rows[hover]!.where ?? ''}${rows[hover]!.support ? ` · support: ${rows[hover]!.support}` : ''}` : 'The pale green band is the tolerance. Bars past ±100% are cut and carry their value.'}
      </div>
      {cmp.series.map((s) => <SeriesChart key={s.title} s={s} />)}
    </figure>
  );
}
