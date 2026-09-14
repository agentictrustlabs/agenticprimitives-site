// Shared SVG building blocks. Every diagram is a pure React component that renders one <svg> with a viewBox, so it
// scales with its container, prints crisply and needs no client JavaScript. Colours come from CSS variables so the
// site theme applies (light or dark figure); the fallbacks keep the diagrams legible when rendered standalone.
//
// TEXT NEVER RUNS THROUGH A BOX. `Box` estimates the width of every line and shrinks the type until the longest
// fits inside the padding; it does the same vertically. A diagram author gives a box a size; the box keeps its word.
import type { ReactNode } from 'react';

export const C = {
  ink: 'var(--dg-ink, #0f172a)',
  muted: 'var(--dg-muted, #64748b)',
  line: 'var(--dg-line, #94a3b8)',
  faint: 'var(--dg-faint, #e2e8f0)',
  paper: 'var(--dg-paper, #ffffff)',
  bg: 'var(--dg-bg, #ffffff)',
  navy: 'var(--dg-navy, #0b2a4a)',
  navySoft: 'var(--dg-navy-soft, #e6eef7)',
  teal: 'var(--dg-teal, #0f766e)',
  tealSoft: 'var(--dg-teal-soft, #e0f2f1)',
  amber: 'var(--dg-amber, #b45309)',
  amberSoft: 'var(--dg-amber-soft, #fef3c7)',
  rose: 'var(--dg-rose, #be123c)',
  roseSoft: 'var(--dg-rose-soft, #ffe4e6)',
  violet: 'var(--dg-violet, #6d28d9)',
  violetSoft: 'var(--dg-violet-soft, #ede9fe)',
  slateSoft: 'var(--dg-slate-soft, #f1f5f9)',
} as const;

export const FONT = 'var(--dg-font, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Inter, sans-serif)';
export const MONO = 'var(--dg-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace)';

/** Extra advance per space (em). Inter's space renders too narrow in SVG text at semibold; the Frame adds this. */
const WORD_SPACING = 0.12;

/** Estimated rendered width of a string, in px, at a font size. Inter averages ~0.55em per glyph; mono ~0.62em. */
export function tw(text: string, size: number, mono = false, weight = 400): number {
  let w = 0;
  for (const ch of text) {
    if (mono) { w += ch === ' ' ? 0.62 + WORD_SPACING : 0.62; continue; }
    if (ch === ' ') w += 0.3 + WORD_SPACING;
    else if (/[A-Z]/.test(ch)) w += 0.68;
    else if (/[mw]/.test(ch)) w += 0.86;
    else if (/[ijlt.,:;'’·|!]/.test(ch)) w += 0.32;
    else if (/[fr]/.test(ch)) w += 0.38;
    else if (/[0-9]/.test(ch)) w += 0.6;
    else w += 0.57;
  }
  return w * size * (weight >= 600 ? 1.06 : 1);
}

export function Frame({ w, h, title, children, id }: { w: number; h: number; title: string; children: ReactNode; id: string }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={`${id}-title`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', fontFamily: FONT, fontFeatureSettings: 'normal', wordSpacing: `${WORD_SPACING}em` }}>
      <title id={`${id}-title`}>{title}</title>
      <defs>
        {(['line', 'ink', 'amber', 'teal', 'rose', 'navy', 'violet'] as const).map((t) => (
          <marker key={t} id={`${id}-arrow${t === 'line' ? '' : `-${t}`}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={t === 'line' ? C.line : t === 'ink' ? C.ink : t === 'amber' ? C.amber : t === 'teal' ? C.teal : t === 'rose' ? C.rose : t === 'navy' ? C.navy : C.violet} />
          </marker>
        ))}
        <filter id={`${id}-shadow`} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.12" />
        </filter>
      </defs>
      <rect x={0} y={0} width={w} height={h} fill={C.bg} />
      {children}
    </svg>
  );
}

export type Tone = 'navy' | 'teal' | 'amber' | 'rose' | 'violet' | 'slate' | 'paper';

const TONES: Record<Tone, { fill: string; stroke: string; text: string }> = {
  navy: { fill: C.navySoft, stroke: C.navy, text: C.navy },
  teal: { fill: C.tealSoft, stroke: C.teal, text: C.teal },
  amber: { fill: C.amberSoft, stroke: C.amber, text: C.amber },
  rose: { fill: C.roseSoft, stroke: C.rose, text: C.rose },
  violet: { fill: C.violetSoft, stroke: C.violet, text: C.violet },
  slate: { fill: C.slateSoft, stroke: C.line, text: C.ink },
  paper: { fill: C.paper, stroke: C.line, text: C.ink },
};

export function toneOf(t: Tone) { return TONES[t]; }

/**
 * A box with a title and lines. `variant="header"` puts the title on a solid strip — the look used for the primary
 * nodes of a diagram. Text is measured and the type shrinks until it fits; nothing overflows.
 */
export function Box({
  x, y, w, h, title, lines = [], tone = 'paper', mono = false, titleMono = false, r = 10, titleSize = 14, lineSize = 12,
  dashed = false, solid = false, variant = 'plain', align = 'start', shadow = false,
}: {
  x: number; y: number; w: number; h: number; title?: string; lines?: readonly string[]; tone?: Tone; mono?: boolean; titleMono?: boolean;
  r?: number; titleSize?: number; lineSize?: number; dashed?: boolean; solid?: boolean; variant?: 'plain' | 'header'; align?: 'start' | 'middle'; shadow?: boolean;
}) {
  const t = TONES[tone];
  const pad = 12;
  const inner = w - pad * 2;

  // Fit the title.
  let ts = titleSize;
  if (title) while (ts > 8 && tw(title, ts, mono || titleMono, 650) > inner) ts -= 0.5;
  // Fit the lines horizontally.
  let ls = lineSize;
  const longest = lines.reduce((m, l) => Math.max(m, tw(l, ls, mono)), 0);
  if (longest > inner) ls = Math.max(7.5, ls * (inner / longest));
  // Fit vertically. A header strip takes its own height; below it the lines get a tighter top pad.
  const headerH = variant === 'header' && title ? ts + pad * 1.1 : 0;
  const titleBlock = variant === 'plain' && title ? ts + 6 : 0;
  const topPad = variant === 'header' && title ? pad * 0.55 : pad;
  const avail = h - topPad - pad * 0.7 - headerH - titleBlock;
  const lh = () => ls * 1.4;
  if (lines.length && (lines.length - 1) * lh() + ls > avail) ls = Math.max(8, avail / ((lines.length - 1) * 1.4 + 1));

  const textFill = solid ? C.paper : C.ink;
  const lineStartY = y + topPad + headerH + titleBlock + (lines.length ? ls * 0.95 : 0);
  const tx = align === 'middle' ? x + w / 2 : x + pad;
  const anchor = align === 'middle' ? 'middle' : 'start';

  return (
    <g filter={shadow ? undefined : undefined}>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={solid ? t.stroke : t.fill} stroke={t.stroke} strokeWidth={1.5} strokeDasharray={dashed ? '6 4' : undefined} />
      {variant === 'header' && title && (
        <>
          <path d={`M ${x} ${y + r} a ${r} ${r} 0 0 1 ${r} -${r} h ${w - 2 * r} a ${r} ${r} 0 0 1 ${r} ${r} v ${headerH - r} h -${w} z`} fill={t.stroke} />
          <text x={tx} y={y + headerH / 2 + ts * 0.36} fontSize={ts} fontWeight={600} fill={C.paper} textAnchor={anchor} fontFamily={mono || titleMono ? MONO : FONT}>{title}</text>
        </>
      )}
      {variant === 'plain' && title && (
        <text x={tx} y={y + pad + ts * 0.9} fontSize={ts} fontWeight={600} fill={solid ? C.paper : t.text} textAnchor={anchor} fontFamily={mono || titleMono ? MONO : FONT}>{title}</text>
      )}
      {lines.map((l, i) => (
        <text key={i} x={tx} y={lineStartY + i * lh()} fontSize={ls} fill={textFill} textAnchor={anchor} fontFamily={mono ? MONO : FONT} opacity={l === '' ? 0 : solid ? 0.92 : 0.86}>
          {l || ' '}
        </text>
      ))}
    </g>
  );
}

export function Pill({ x, y, text, tone = 'slate', size = 11, mono = false, solid = false }: { x: number; y: number; text: string; tone?: Tone; size?: number; mono?: boolean; solid?: boolean }) {
  const t = TONES[tone];
  const w = tw(text, size, mono, 600) + 20;
  const h = size + 12;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={solid ? t.stroke : t.fill} stroke={t.stroke} strokeWidth={1.25} />
      <text x={x + w / 2} y={y + h / 2 + size * 0.36} textAnchor="middle" fontSize={size} fontWeight={600} fill={solid ? C.paper : t.text} fontFamily={mono ? MONO : FONT}>{text}</text>
    </g>
  );
}

export function Label({ x, y, text, size = 11.5, anchor = 'start', tone = 'muted', weight = 500, mono = false, italic = false, spacing }: { x: number; y: number; text: string; size?: number; anchor?: 'start' | 'middle' | 'end'; tone?: 'muted' | 'ink' | 'navy' | 'teal' | 'amber' | 'rose' | 'violet'; weight?: number; mono?: boolean; italic?: boolean; spacing?: number }) {
  const fill = tone === 'muted' ? C.muted : tone === 'ink' ? C.ink : tone === 'navy' ? C.navy : tone === 'teal' ? C.teal : tone === 'amber' ? C.amber : tone === 'rose' ? C.rose : C.violet;
  return <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={fill} fontWeight={weight} fontFamily={mono ? MONO : FONT} fontStyle={italic ? 'italic' : undefined} letterSpacing={spacing}>{text}</text>;
}

/** A small caps heading — "01 · AUTHORITY". */
export function Kicker({ x, y, text, tone = 'muted', anchor = 'start' }: { x: number; y: number; text: string; tone?: 'muted' | 'ink' | 'navy' | 'teal' | 'amber' | 'rose' | 'violet'; anchor?: 'start' | 'middle' | 'end' }) {
  return <Label x={x} y={y} text={text.toUpperCase()} size={10.5} weight={700} tone={tone} mono spacing={1.6} anchor={anchor} />;
}

export function Arrow({ id, d, tone = 'line', dashed = false, width = 1.75, label, lx, ly, labelSize = 11, anchor = 'middle', labelBg = true }: { id: string; d: string; tone?: 'line' | 'ink' | 'amber' | 'teal' | 'rose' | 'navy' | 'violet'; dashed?: boolean; width?: number; label?: string; lx?: number; ly?: number; labelSize?: number; anchor?: 'start' | 'middle' | 'end'; labelBg?: boolean }) {
  const stroke = tone === 'line' ? C.line : tone === 'ink' ? C.ink : tone === 'amber' ? C.amber : tone === 'teal' ? C.teal : tone === 'rose' ? C.rose : tone === 'navy' ? C.navy : C.violet;
  const marker = tone === 'line' ? `url(#${id}-arrow)` : `url(#${id}-arrow-${tone})`;
  const lw = label ? tw(label, labelSize, false, 600) + 10 : 0;
  const lxx = lx ?? 0;
  const bgX = anchor === 'middle' ? lxx - lw / 2 : anchor === 'end' ? lxx - lw + 5 : lxx - 5;
  return (
    <g>
      <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeDasharray={dashed ? '6 5' : undefined} markerEnd={marker} strokeLinecap="round" />
      {label && lx !== undefined && ly !== undefined && (
        <>
          {labelBg && <rect x={bgX} y={ly - labelSize} width={lw} height={labelSize + 6} rx={3} fill={C.bg} opacity={0.92} />}
          <text x={lx} y={ly} fontSize={labelSize} textAnchor={anchor} fill={stroke === C.line ? C.muted : stroke} fontWeight={600} fontFamily={FONT}>{label}</text>
        </>
      )}
    </g>
  );
}

/** A horizontal band with a caption at the left — the "layer" motif. */
export function Band({ x, y, w, h, caption, tone = 'slate', dashed = false, sub }: { x: number; y: number; w: number; h: number; caption: string; tone?: Tone; dashed?: boolean; sub?: string }) {
  const t = TONES[tone];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={t.fill} stroke={t.stroke} strokeWidth={1.25} strokeDasharray={dashed ? '6 4' : undefined} opacity={0.95} />
      <rect x={x} y={y + 12} width={4} height={h - 24} rx={2} fill={t.stroke} />
      <text x={x + 16} y={y + 20} fontSize={10.5} fontWeight={700} fill={t.text} letterSpacing={1.6} fontFamily={MONO}>{caption.toUpperCase()}</text>
      {sub && <text x={x + w - 14} y={y + 20} fontSize={10.5} fontWeight={500} fill={C.muted} textAnchor="end" fontFamily={FONT}>{sub}</text>}
    </g>
  );
}

/** A small person / org / service glyph beside a name. */
export function Glyph({ x, y, kind, size = 14 }: { x: number; y: number; kind: 'person' | 'org' | 'service' | 'chain' | 'app'; size?: number }) {
  const s = size;
  const stroke = kind === 'person' ? C.navy : kind === 'org' ? C.violet : kind === 'service' ? C.teal : kind === 'chain' ? C.amber : C.ink;
  if (kind === 'person') return <g stroke={stroke} fill="none" strokeWidth={1.6}><circle cx={x + s / 2} cy={y + s * 0.3} r={s * 0.22} /><path d={`M ${x + s * 0.1} ${y + s} a ${s * 0.4} ${s * 0.4} 0 0 1 ${s * 0.8} 0`} /></g>;
  if (kind === 'org') return <g stroke={stroke} fill="none" strokeWidth={1.6}><rect x={x + 1} y={y + s * 0.25} width={s - 2} height={s * 0.75} rx={1.5} /><path d={`M ${x + s * 0.3} ${y + s * 0.25} v -${s * 0.2} h ${s * 0.4} v ${s * 0.2}`} /><path d={`M ${x + s * 0.3} ${y + s * 0.55} h ${s * 0.4} M ${x + s * 0.3} ${y + s * 0.75} h ${s * 0.4}`} /></g>;
  if (kind === 'service') return <g stroke={stroke} fill="none" strokeWidth={1.6}><circle cx={x + s / 2} cy={y + s / 2} r={s * 0.42} /><circle cx={x + s / 2} cy={y + s / 2} r={s * 0.15} /><path d={`M ${x + s / 2} ${y} v ${s * 0.15} M ${x + s / 2} ${y + s} v -${s * 0.15} M ${x} ${y + s / 2} h ${s * 0.15} M ${x + s} ${y + s / 2} h -${s * 0.15}`} /></g>;
  if (kind === 'chain') return <g stroke={stroke} fill="none" strokeWidth={1.6}><rect x={x} y={y + s * 0.15} width={s * 0.45} height={s * 0.7} rx={2} /><rect x={x + s * 0.55} y={y + s * 0.15} width={s * 0.45} height={s * 0.7} rx={2} /><path d={`M ${x + s * 0.45} ${y + s / 2} h ${s * 0.1}`} /></g>;
  return <g stroke={stroke} fill="none" strokeWidth={1.6}><rect x={x} y={y + 1} width={s} height={s - 2} rx={2} /><path d={`M ${x} ${y + s * 0.35} h ${s}`} /></g>;
}

/** The brand mark, small, for the corner of a diagram. */
export function Brandline({ w, h, left }: { w: number; h: number; left?: string }) {
  return (
    <g>
      {left && <Label x={32} y={h - 14} text={left} size={11} weight={700} tone="amber" />}
      <g transform={`translate(${w - 182} ${h - 26}) scale(0.22)`} fill={C.muted}>
        <path d="M32 3 L59 39 H48.2 L32 16.2 L15.8 39 H5 Z" />
        <rect x="17" y="43.2" width="30" height="7" rx="3.5" />
        <rect x="10" y="54" width="44" height="7" rx="3.5" />
      </g>
      <Label x={w - 32} y={h - 14} text="agenticprimitives.dev" size={9.5} anchor="end" mono />
    </g>
  );
}
