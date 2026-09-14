import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type Tone = 'white' | 'cream' | 'navy' | 'ink';

const DARK = new Set<Tone>(['navy', 'ink']);

export function Section({
  id,
  eyebrow,
  number,
  title,
  lede,
  children,
  tone = 'white',
  wide = false,
}: {
  id?: string;
  eyebrow?: string;
  number?: string;
  title?: string;
  lede?: string;
  children?: ReactNode;
  tone?: Tone;
  wide?: boolean;
}) {
  const dark = DARK.has(tone);
  const bg = tone === 'cream' ? 'bg-cream' : tone === 'navy' ? 'bg-navy text-white' : tone === 'ink' ? 'bg-ink text-white' : 'bg-white';
  return (
    <section id={id} className={`${bg} relative py-20 md:py-28`}>
      <div className="container-x">
        {(eyebrow || title || lede) && (
          <div className={wide ? 'max-w-5xl' : 'max-w-3xl'}>
            {(eyebrow || number) && (
              <p className={`flex items-center gap-3 ${dark ? 'eyebrow-dark' : 'eyebrow'}`}>
                {number && <span className={dark ? 'text-white/40' : 'text-slate-400'}>{number}</span>}
                {number && <span className={`h-px w-6 ${dark ? 'bg-white/20' : 'bg-line'}`} aria-hidden />}
                {eyebrow}
              </p>
            )}
            {title && <h2 className={`h2 mt-4 ${dark ? '!text-white' : ''}`}>{title}</h2>}
            {lede && <p className={`lede mt-5 ${dark ? '!text-slate-300' : ''}`}>{lede}</p>}
          </div>
        )}
        <div className={eyebrow || title || lede ? 'mt-12 md:mt-14' : ''}>{children}</div>
      </div>
    </section>
  );
}

export function Figure({ children, caption, id, dark = false }: { children: ReactNode; caption: string; id?: string; dark?: boolean }) {
  return (
    <figure id={id} className="my-6">
      <div className={dark ? 'figure-dark' : 'figure figure-light'}>{children}</div>
      <figcaption className={`mt-3 text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{caption}</figcaption>
    </figure>
  );
}

export function Shot({
  src,
  alt,
  caption,
  width = 1440,
  height = 900,
  priority = false,
  dark = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  dark?: boolean;
}) {
  return (
    <figure>
      <div className={dark ? 'shot-dark' : 'shot'}>
        <Image src={src} alt={alt} width={width} height={height} priority={priority} className="h-auto w-full" />
      </div>
      {caption && <figcaption className={`mt-2 text-sm ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{caption}</figcaption>}
    </figure>
  );
}

export function Stat({ value, label, note, dark = false }: { value: string; label: string; note?: string; dark?: boolean }) {
  return (
    <div className={dark ? 'card-dark' : 'card'}>
      <div className={`text-5xl font-semibold tracking-[-0.03em] ${dark ? 'text-white' : 'text-navy'}`}>{value}</div>
      <div className={`mt-2 text-sm font-semibold ${dark ? 'text-slate-200' : 'text-slate-700'}`}>{label}</div>
      {note && <div className={`mt-1 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{note}</div>}
    </div>
  );
}

export function Callout({ children, tone = 'amber' }: { children: ReactNode; tone?: 'amber' | 'teal' | 'navy' | 'dark' }) {
  const cls =
    tone === 'amber'
      ? 'border-amber/30 bg-amber-soft text-amber'
      : tone === 'teal'
        ? 'border-teal/30 bg-teal-soft text-teal'
        : tone === 'dark'
          ? 'border-brass/40 bg-brass/10 text-brass'
          : 'border-navy/20 bg-navy-soft text-navy';
  return <div className={`rounded-lg border px-5 py-4 text-[15px] font-medium leading-relaxed ${cls}`}>{children}</div>;
}

/** A single large statement — the thing a reader remembers. */
export function Claim({ children, attribution, dark = true }: { children: ReactNode; attribution?: string; dark?: boolean }) {
  return (
    <blockquote className={`max-w-4xl ${dark ? 'text-white' : 'text-navy'}`}>
      <p className="text-3xl font-semibold leading-[1.12] tracking-[-0.025em] md:text-5xl md:leading-[1.08]">{children}</p>
      {attribution && <footer className={`mt-6 font-mono text-xs uppercase tracking-[0.18em] ${dark ? 'text-brass' : 'text-teal'}`}>{attribution}</footer>}
    </blockquote>
  );
}

/** Hairline-row list. Dense, editorial, no card noise. */
export function Ledger({ rows, dark = false, cols = 'md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]' }: { rows: { k: ReactNode; v: ReactNode; meta?: ReactNode }[]; dark?: boolean; cols?: string }) {
  return (
    <div className={dark ? 'ledger-dark' : 'ledger'}>
      {rows.map((r, i) => (
        <div key={i} className={`grid gap-2 py-5 md:gap-8 ${cols}`}>
          <div className={`text-base font-semibold ${dark ? 'text-white' : 'text-navy'}`}>{r.k}</div>
          <div>
            <div className={`text-[15px] leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{r.v}</div>
            {r.meta && <div className={`mt-2 font-mono text-[11px] ${dark ? 'text-slate-500' : 'text-slate-500'}`}>{r.meta}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CTA({ title, body, primary, secondary }: { title: string; body: string; primary: { href: string; label: string }; secondary?: { href: string; label: string } }) {
  return (
    <section className="bg-ink py-24 text-white">
      <div className="container-x">
        <div className="hairline-x mb-16" />
        <div className="grid items-end gap-10 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">{title}</h2>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href={primary.href} className="btn-brass">{primary.label}</Link>
            {secondary && <Link href={secondary.href} className="btn-outline-light">{secondary.label}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Tag({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'teal' | 'amber' | 'navy' | 'violet' | 'dark' | 'brass' }) {
  const cls = {
    slate: 'bg-slate-100 text-slate-700',
    teal: 'bg-teal-soft text-teal',
    amber: 'bg-amber-soft text-amber',
    navy: 'bg-navy-soft text-navy',
    violet: 'bg-violet-soft text-violet',
    dark: 'border border-white/15 bg-white/5 text-slate-200',
    brass: 'border border-brass/40 bg-brass/10 text-brass',
  }[tone];
  return <span className={`inline-block rounded px-2 py-0.5 font-mono text-[11px] font-semibold ${cls}`}>{children}</span>;
}
