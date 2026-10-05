// THE ESTATE KIT. An estate is drawn as a block of buildings on its own ground; the services estates share are the
// commons between the grounds; many estates around one commons are a federation; a road is a call. Every building has one roof shape per kind of service, so a reader who has
// seen one estate recognises the next, and a glyph is the same in every picture: a house is a Home, a gatehouse is
// an edge, a vault is a vault, a hall with columns is a chain or a registry, a dome is the public graph.
//
// Same rule as `Box`: text never runs through a building. Titles and lines are measured and shrink to fit.
import type { ReactNode } from 'react';
import { C, FONT, MONO, tw, toneOf, type Tone } from './primitives';

export type Roof = 'gable' | 'saw' | 'slab' | 'towers' | 'pediment' | 'spire' | 'dome' | 'flat' | 'lean';
export type Mark = 'none' | 'door' | 'dial' | 'arch' | 'columns' | 'key' | 'signpost' | 'antenna' | 'ledger' | 'plug';

/** The roof + mark each kind of estate element uses, everywhere. */
export const KIND: Record<string, { roof: Roof; mark: Mark; tone: Tone }> = {
  home: { roof: 'gable', mark: 'door', tone: 'navy' },
  runtime: { roof: 'saw', mark: 'none', tone: 'teal' },
  vault: { roof: 'slab', mark: 'dial', tone: 'amber' },
  edge: { roof: 'towers', mark: 'arch', tone: 'rose' },
  mcp: { roof: 'lean', mark: 'plug', tone: 'navy' },
  rpc: { roof: 'flat', mark: 'antenna', tone: 'slate' },
  chain: { roof: 'pediment', mark: 'columns', tone: 'amber' },
  kms: { roof: 'spire', mark: 'key', tone: 'violet' },
  naming: { roof: 'flat', mark: 'signpost', tone: 'teal' },
  graph: { roof: 'dome', mark: 'none', tone: 'violet' },
  registry: { roof: 'pediment', mark: 'ledger', tone: 'amber' },
  skills: { roof: 'pediment', mark: 'ledger', tone: 'slate' },
  ground: { roof: 'pediment', mark: 'columns', tone: 'slate' },
};

function roofPath(roof: Roof, x: number, y: number, w: number, rh: number): string {
  const b = y + rh; // roof base line
  switch (roof) {
    case 'gable': return `M ${x - 6} ${b} L ${x + w / 2} ${y} L ${x + w + 6} ${b} Z`;
    case 'saw': {
      const n = 3; const tw_ = w / n; let d = `M ${x} ${b}`;
      for (let i = 0; i < n; i++) d += ` L ${x + i * tw_} ${y} L ${x + (i + 1) * tw_} ${b}`;
      return d + ' Z';
    }
    case 'slab': return `M ${x - 8} ${b} L ${x - 8} ${y + rh * 0.35} L ${x + w + 8} ${y + rh * 0.35} L ${x + w + 8} ${b} Z`;
    case 'towers': {
      const t = w * 0.22; let d = `M ${x} ${b}`;
      const cren = (sx: number) => { let s = ''; const k = 3; const cw = t / (k * 2 - 1); for (let i = 0; i < k; i++) { const cx = sx + i * cw * 2; s += ` L ${cx} ${y} L ${cx + cw} ${y} L ${cx + cw} ${y + rh * 0.4}${i < k - 1 ? ` L ${cx + cw * 2} ${y + rh * 0.4}` : ''}`; } return s; };
      d += ` L ${x} ${y}` + cren(x) + ` L ${x + t} ${y + rh * 0.75} L ${x + w - t} ${y + rh * 0.75} L ${x + w - t} ${y + rh * 0.4}` + cren(x + w - t) + ` L ${x + w} ${y} L ${x + w} ${b} Z`;
      return d;
    }
    case 'pediment': return `M ${x - 8} ${b} L ${x + w / 2} ${y} L ${x + w + 8} ${b} Z`;
    case 'spire': return `M ${x - 4} ${b} L ${x + w / 2} ${y - rh * 0.6} L ${x + w + 4} ${b} Z`;
    case 'dome': return `M ${x} ${b} A ${w / 2} ${rh} 0 0 1 ${x + w} ${b} Z`;
    case 'lean': return `M ${x - 4} ${b} L ${x} ${y + rh * 0.15} L ${x + w + 6} ${y + rh * 0.55} L ${x + w + 6} ${b} Z`;
    default: return `M ${x - 6} ${b} L ${x - 6} ${y + rh * 0.55} L ${x + w + 6} ${y + rh * 0.55} L ${x + w + 6} ${b} Z`;
  }
}

function MarkGlyph({ mark, x, y, w, h, stroke }: { mark: Mark; x: number; y: number; w: number; h: number; stroke: string }) {
  const cx = x + w - 22; const base = y + h;
  switch (mark) {
    case 'door': return <path d={`M ${cx - 7} ${base} v -16 a 7 7 0 0 1 14 0 v 16`} fill="none" stroke={stroke} strokeWidth={1.5} />;
    case 'dial': return <g fill="none" stroke={stroke} strokeWidth={1.5}><circle cx={cx} cy={base - 16} r={9} /><circle cx={cx} cy={base - 16} r={3} /><path d={`M ${cx} ${base - 25} v 4 M ${cx} ${base - 11} v 4 M ${cx - 9} ${base - 16} h 4 M ${cx + 5} ${base - 16} h 4`} /></g>;
    case 'arch': return <path d={`M ${x + w / 2 - 14} ${base} v -22 a 14 14 0 0 1 28 0 v 22`} fill="none" stroke={stroke} strokeWidth={1.6} />;
    case 'columns': return <g stroke={stroke} strokeWidth={1.5}>{[0, 1, 2, 3].map((i) => <line key={i} x1={x + w - 12 - i * 9} y1={base - 1} x2={x + w - 12 - i * 9} y2={base - 16} />)}</g>;
    case 'key': return <g fill="none" stroke={stroke} strokeWidth={1.5}><circle cx={cx - 4} cy={base - 18} r={5} /><path d={`M ${cx + 1} ${base - 18} h 12 M ${cx + 9} ${base - 18} v 5 M ${cx + 13} ${base - 18} v 4`} /></g>;
    case 'signpost': return <g stroke={stroke} strokeWidth={1.5} fill={C.paper}><line x1={x + w + 14} y1={base} x2={x + w + 14} y2={y - 6} /><path d={`M ${x + w + 14} ${y - 2} h 26 l 6 5 l -6 5 h -26 z`} /><path d={`M ${x + w + 14} ${y + 14} h -22 l -6 5 l 6 5 h 22 z`} /></g>;
    case 'antenna': return <g stroke={stroke} strokeWidth={1.5} fill="none"><line x1={x + w - 16} y1={y} x2={x + w - 16} y2={y - 16} /><path d={`M ${x + w - 24} ${y - 14} a 8 8 0 0 1 16 0`} /></g>;
    case 'ledger': return <g stroke={stroke} strokeWidth={1.3} fill="none"><rect x={cx - 9} y={base - 22} width={18} height={14} rx={1.5} /><path d={`M ${cx - 5} ${base - 17} h 10 M ${cx - 5} ${base - 13} h 10`} /></g>;
    case 'plug': return <g stroke={stroke} strokeWidth={1.5} fill="none"><rect x={cx - 8} y={base - 20} width={16} height={11} rx={2} /><path d={`M ${cx - 4} ${base - 20} v -5 M ${cx + 4} ${base - 20} v -5 M ${cx} ${base - 9} v 7`} /></g>;
    default: return null;
  }
}

/**
 * A building. `kind` picks roof, mark and tone; `name` is the title; `host` is the deployed hostname in mono at the
 * foot; `lines` are what it does. Everything fits.
 */
export function Building({ x, y, w, h, kind, name, host, lines = [], tone, titleSize = 13, lineSize = 10.5, dashed = false, roofH }: {
  x: number; y: number; w: number; h: number; kind: keyof typeof KIND; name: string; host?: string; lines?: readonly string[]; tone?: Tone; titleSize?: number; lineSize?: number; dashed?: boolean; roofH?: number;
}) {
  const k = KIND[kind]!;
  const t = toneOf(tone ?? k.tone);
  const rh = roofH ?? Math.min(26, Math.max(16, h * 0.18));
  const bodyY = y + rh;
  const bodyH = h - rh;
  const pad = 10;
  const inner = w - pad * 2 - (k.mark === 'none' || k.mark === 'columns' || k.mark === 'arch' ? 0 : 0);
  let ts = titleSize;
  while (ts > 8 && tw(name, ts, false, 650) > inner) ts -= 0.5;
  let ls = lineSize;
  const longest = lines.reduce((m, l) => Math.max(m, tw(l, ls)), 0);
  if (longest > inner) ls = Math.max(7.5, ls * (inner / longest));
  const hostH = host ? 14 : 0;
  const markH = k.mark === 'none' ? 0 : 10;
  let hs = 9.5;
  if (host) while (hs > 7 && tw(host, hs, true) > w - pad * 2 - (k.mark === 'none' ? 0 : 44)) hs -= 0.5;
  const avail = bodyH - pad - ts - 6 - hostH - markH - 4;
  if (lines.length && (lines.length - 1) * ls * 1.35 + ls > avail) ls = Math.max(7.5, avail / ((lines.length - 1) * 1.35 + 1));
  const lineY0 = bodyY + pad + ts + 6 + ls * 0.9;
  return (
    <g>
      <path d={roofPath(k.roof, x, y, w, rh)} fill={t.stroke} opacity={0.92} />
      <rect x={x} y={bodyY} width={w} height={bodyH} rx={3} fill={t.fill} stroke={t.stroke} strokeWidth={1.5} strokeDasharray={dashed ? '6 4' : undefined} />
      <text x={x + pad} y={bodyY + pad + ts * 0.9} fontSize={ts} fontWeight={650} fill={t.text} fontFamily={FONT}>{name}</text>
      {lines.map((l, i) => (
        <text key={i} x={x + pad} y={lineY0 + i * ls * 1.35} fontSize={ls} fill={C.ink} opacity={0.86} fontFamily={FONT}>{l}</text>
      ))}
      {host && <text x={x + pad} y={bodyY + bodyH - 6} fontSize={hs} fill={C.muted} fontFamily={MONO}>{host}</text>}
      <MarkGlyph mark={k.mark} x={x} y={bodyY} w={w} h={bodyH} stroke={t.stroke} />
    </g>
  );
}

/** A plot of land: an estate's boundary, or the commons. Dashed, with a kicker and a sub-caption. */
export function Plot({ x, y, w, h, caption, sub, tone = 'slate', solid = false }: { x: number; y: number; w: number; h: number; caption: string; sub?: string; tone?: Tone; solid?: boolean }) {
  const t = toneOf(tone);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={16} fill={t.fill} fillOpacity={0.55} stroke={t.stroke} strokeWidth={1.25} strokeDasharray={solid ? undefined : '8 5'} />
      <text x={x + 18} y={y + 22} fontSize={10.5} fontWeight={700} fill={t.text} letterSpacing={1.6} fontFamily={MONO}>{caption.toUpperCase()}</text>
      {sub && <text x={x + w - 16} y={y + 22} fontSize={10.5} fill={C.muted} textAnchor="end" fontFamily={FONT}>{sub}</text>}
    </g>
  );
}

/** A road between buildings: a call, a read, a signature. Wider than an arrow; the tone says what travels. */
export function Road({ id, d, tone = 'line', dashed = false, label, lx, ly, anchor = 'middle', labelSize = 10.5, width = 2.25 }: { id: string; d: string; tone?: 'line' | 'ink' | 'amber' | 'teal' | 'rose' | 'navy' | 'violet'; dashed?: boolean; label?: string; lx?: number; ly?: number; anchor?: 'start' | 'middle' | 'end'; labelSize?: number; width?: number }) {
  const stroke = tone === 'line' ? C.line : tone === 'ink' ? C.ink : tone === 'amber' ? C.amber : tone === 'teal' ? C.teal : tone === 'rose' ? C.rose : tone === 'navy' ? C.navy : C.violet;
  const marker = tone === 'line' ? `url(#${id}-arrow)` : `url(#${id}-arrow-${tone})`;
  const lw = label ? tw(label, labelSize, false, 600) + 10 : 0;
  const lxx = lx ?? 0;
  const bgX = anchor === 'middle' ? lxx - lw / 2 : anchor === 'end' ? lxx - lw + 5 : lxx - 5;
  return (
    <g>
      <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeDasharray={dashed ? '7 5' : undefined} markerEnd={marker} strokeLinecap="round" opacity={0.9} />
      {label && lx !== undefined && ly !== undefined && (
        <>
          <rect x={bgX} y={ly - labelSize} width={lw} height={labelSize + 6} rx={3} fill={C.bg} opacity={0.92} />
          <text x={lx} y={ly} fontSize={labelSize} textAnchor={anchor} fill={stroke === C.line ? C.muted : stroke} fontWeight={600} fontFamily={FONT}>{label}</text>
        </>
      )}
    </g>
  );
}

/** A resident: a small card with the agent glyph, its typed name, and one line about it. */
export function Resident({ x, y, w = 150, kind, name, note, h = 44 }: { x: number; y: number; w?: number; kind: 'person' | 'org' | 'service'; name: string; note?: string; h?: number }) {
  const tone: Tone = kind === 'person' ? 'navy' : kind === 'org' ? 'violet' : 'teal';
  const t = toneOf(tone);
  const stroke = t.stroke;
  const gx = x + 10; const gy = y + 10; const s = 14;
  let glyph: ReactNode;
  if (kind === 'person') glyph = <g stroke={stroke} fill="none" strokeWidth={1.6}><circle cx={gx + s / 2} cy={gy + s * 0.3} r={s * 0.22} /><path d={`M ${gx + s * 0.1} ${gy + s} a ${s * 0.4} ${s * 0.4} 0 0 1 ${s * 0.8} 0`} /></g>;
  else if (kind === 'org') glyph = <g stroke={stroke} fill="none" strokeWidth={1.6}><rect x={gx + 1} y={gy + s * 0.25} width={s - 2} height={s * 0.75} rx={1.5} /><path d={`M ${gx + s * 0.3} ${gy + s * 0.25} v -${s * 0.2} h ${s * 0.4} v ${s * 0.2}`} /></g>;
  else glyph = <g stroke={stroke} fill="none" strokeWidth={1.6}><circle cx={gx + s / 2} cy={gy + s / 2} r={s * 0.42} /><circle cx={gx + s / 2} cy={gy + s / 2} r={s * 0.15} /></g>;
  let ns = 12;
  while (ns > 8 && tw(name, ns, true) > w - 36) ns -= 0.5;
  let nts = 9.5;
  if (note) while (nts > 7 && tw(note, nts) * 1.1 > w - 36) nts -= 0.5;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={C.paper} stroke={stroke} strokeWidth={1.25} />
      {glyph}
      <text x={x + 32} y={y + 20} fontSize={ns} fontWeight={600} fill={t.text} fontFamily={MONO}>{name}</text>
      {note && <text x={x + 32} y={y + 34} fontSize={nts} fill={C.muted} fontFamily={FONT}>{note}</text>}
    </g>
  );
}

/** A small status flag: live · pending · designed. */
export function Flag({ x, y, text, status }: { x: number; y: number; text: string; status: 'live' | 'pending' | 'designed' }) {
  const tone: Tone = status === 'live' ? 'teal' : status === 'pending' ? 'amber' : 'slate';
  const t = toneOf(tone);
  const size = 10;
  const tail = text ? `  ·  ${text}` : '';
  const w = tw(`${status}${tail}`, size, false, 600) * 1.08 + 20;
  return (
    <g>
      <rect x={x} y={y} width={w} height={size + 10} rx={4} fill={t.fill} stroke={t.stroke} strokeWidth={1} strokeDasharray={status === 'designed' ? '4 3' : undefined} />
      <text x={x + 9} y={y + size + 2.5} fontSize={size} fontWeight={600} fill={t.text} fontFamily={FONT}><tspan fontFamily={MONO} letterSpacing={1}>{status.toUpperCase()}</tspan>{tail}</text>
    </g>
  );
}
