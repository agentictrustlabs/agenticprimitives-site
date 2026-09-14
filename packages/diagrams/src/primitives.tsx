// Shared SVG building blocks. Every diagram is a pure React component that renders one <svg> with a viewBox, so it
// scales with its container, prints crisply and needs no client JavaScript. Colours come from CSS variables so the
// site theme applies; the fallbacks keep the diagrams legible when rendered standalone.
import type { ReactNode } from 'react';

export const C = {
  ink: 'var(--dg-ink, #0f172a)',
  muted: 'var(--dg-muted, #64748b)',
  line: 'var(--dg-line, #94a3b8)',
  faint: 'var(--dg-faint, #e2e8f0)',
  paper: 'var(--dg-paper, #ffffff)',
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

export function Frame({ w, h, title, children, id }: { w: number; h: number; title: string; children: ReactNode; id: string }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={`${id}-title`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', fontFamily: FONT }}>
      <title id={`${id}-title`}>{title}</title>
      <defs>
        <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.line} />
        </marker>
        <marker id={`${id}-arrow-ink`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.ink} />
        </marker>
        <marker id={`${id}-arrow-amber`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.amber} />
        </marker>
        <marker id={`${id}-arrow-teal`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.teal} />
        </marker>
        <marker id={`${id}-arrow-rose`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={C.rose} />
        </marker>
      </defs>
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

export function Box({ x, y, w, h, title, lines = [], tone = 'paper', mono = false, titleMono = false, r = 8, titleSize = 13, lineSize = 11, dashed = false, solid = false }: {
  x: number; y: number; w: number; h: number; title?: string; lines?: readonly string[]; tone?: Tone; mono?: boolean; titleMono?: boolean; r?: number; titleSize?: number; lineSize?: number; dashed?: boolean; solid?: boolean;
}) {
  const t = TONES[tone];
  const pad = 10;
  let cy = y + pad + titleSize;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={solid ? t.stroke : t.fill} stroke={t.stroke} strokeWidth={1.25} strokeDasharray={dashed ? '5 4' : undefined} />
      {title && (
        <text x={x + pad} y={cy} fontSize={titleSize} fontWeight={650} fill={solid ? C.paper : t.text} fontFamily={mono || titleMono ? MONO : FONT}>
          {title}
        </text>
      )}
      {lines.map((l, i) => {
        cy = (title ? y + pad + titleSize : y + pad) + (i + 1) * (lineSize + 5) + (title ? 2 : lineSize - 4);
        return (
          <text key={i} x={x + pad} y={cy} fontSize={lineSize} fill={solid ? C.paper : C.ink} fontFamily={mono ? MONO : FONT} opacity={solid ? 0.92 : 0.85}>
            {l}
          </text>
        );
      })}
    </g>
  );
}

export function Pill({ x, y, text, tone = 'slate', size = 10.5, mono = false }: { x: number; y: number; text: string; tone?: Tone; size?: number; mono?: boolean }) {
  const t = TONES[tone];
  const w = text.length * size * 0.58 + 16;
  return (
    <g>
      <rect x={x} y={y} width={w} height={size + 10} rx={(size + 10) / 2} fill={t.fill} stroke={t.stroke} strokeWidth={1} />
      <text x={x + w / 2} y={y + size + 2.5} textAnchor="middle" fontSize={size} fontWeight={600} fill={t.text} fontFamily={mono ? MONO : FONT}>{text}</text>
    </g>
  );
}

export function Label({ x, y, text, size = 11, anchor = 'start', tone = 'muted', weight = 500, mono = false, italic = false }: { x: number; y: number; text: string; size?: number; anchor?: 'start' | 'middle' | 'end'; tone?: 'muted' | 'ink' | 'navy' | 'teal' | 'amber' | 'rose' | 'violet'; weight?: number; mono?: boolean; italic?: boolean }) {
  const fill = tone === 'muted' ? C.muted : tone === 'ink' ? C.ink : tone === 'navy' ? C.navy : tone === 'teal' ? C.teal : tone === 'amber' ? C.amber : tone === 'rose' ? C.rose : C.violet;
  return <text x={x} y={y} fontSize={size} textAnchor={anchor} fill={fill} fontWeight={weight} fontFamily={mono ? MONO : FONT} fontStyle={italic ? 'italic' : undefined}>{text}</text>;
}

export function Arrow({ id, d, tone = 'line', dashed = false, width = 1.5, label, lx, ly, labelSize = 10.5, anchor = 'middle' }: { id: string; d: string; tone?: 'line' | 'ink' | 'amber' | 'teal' | 'rose'; dashed?: boolean; width?: number; label?: string; lx?: number; ly?: number; labelSize?: number; anchor?: 'start' | 'middle' | 'end' }) {
  const stroke = tone === 'line' ? C.line : tone === 'ink' ? C.ink : tone === 'amber' ? C.amber : tone === 'teal' ? C.teal : C.rose;
  const marker = tone === 'line' ? `url(#${id}-arrow)` : `url(#${id}-arrow-${tone})`;
  return (
    <g>
      <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeDasharray={dashed ? '5 4' : undefined} markerEnd={marker} />
      {label && lx !== undefined && ly !== undefined && (
        <text x={lx} y={ly} fontSize={labelSize} textAnchor={anchor} fill={stroke === C.line ? C.muted : stroke} fontWeight={600} fontFamily={FONT}>
          {label}
        </text>
      )}
    </g>
  );
}

/** A horizontal band with a caption at the left — the "layer" motif. */
export function Band({ x, y, w, h, caption, tone = 'slate', dashed = false }: { x: number; y: number; w: number; h: number; caption: string; tone?: Tone; dashed?: boolean }) {
  const t = TONES[tone];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={t.fill} stroke={t.stroke} strokeWidth={1} strokeDasharray={dashed ? '6 4' : undefined} opacity={0.9} />
      <text x={x + 12} y={y + 18} fontSize={11.5} fontWeight={700} fill={t.text} letterSpacing={0.6} fontFamily={FONT}>{caption.toUpperCase()}</text>
    </g>
  );
}

/** A small person / org / service glyph beside a name. */
export function Glyph({ x, y, kind, size = 14 }: { x: number; y: number; kind: 'person' | 'org' | 'service' | 'chain' | 'app'; size?: number }) {
  const s = size;
  const stroke = kind === 'person' ? C.navy : kind === 'org' ? C.violet : kind === 'service' ? C.teal : kind === 'chain' ? C.amber : C.ink;
  if (kind === 'person') return <g stroke={stroke} fill="none" strokeWidth={1.5}><circle cx={x + s / 2} cy={y + s * 0.3} r={s * 0.22} /><path d={`M ${x + s * 0.1} ${y + s} a ${s * 0.4} ${s * 0.4} 0 0 1 ${s * 0.8} 0`} /></g>;
  if (kind === 'org') return <g stroke={stroke} fill="none" strokeWidth={1.5}><rect x={x + 1} y={y + s * 0.25} width={s - 2} height={s * 0.75} rx={1.5} /><path d={`M ${x + s * 0.3} ${y + s * 0.25} v -${s * 0.2} h ${s * 0.4} v ${s * 0.2}`} /><path d={`M ${x + s * 0.3} ${y + s * 0.55} h ${s * 0.4} M ${x + s * 0.3} ${y + s * 0.75} h ${s * 0.4}`} /></g>;
  if (kind === 'service') return <g stroke={stroke} fill="none" strokeWidth={1.5}><circle cx={x + s / 2} cy={y + s / 2} r={s * 0.42} /><circle cx={x + s / 2} cy={y + s / 2} r={s * 0.15} /><path d={`M ${x + s / 2} ${y} v ${s * 0.15} M ${x + s / 2} ${y + s} v -${s * 0.15} M ${x} ${y + s / 2} h ${s * 0.15} M ${x + s} ${y + s / 2} h -${s * 0.15}`} /></g>;
  if (kind === 'chain') return <g stroke={stroke} fill="none" strokeWidth={1.5}><rect x={x} y={y + s * 0.15} width={s * 0.45} height={s * 0.7} rx={2} /><rect x={x + s * 0.55} y={y + s * 0.15} width={s * 0.45} height={s * 0.7} rx={2} /><path d={`M ${x + s * 0.45} ${y + s / 2} h ${s * 0.1}`} /></g>;
  return <g stroke={stroke} fill="none" strokeWidth={1.5}><rect x={x} y={y + 1} width={s} height={s - 2} rx={2} /><path d={`M ${x} ${y + s * 0.35} h ${s}`} /></g>;
}
