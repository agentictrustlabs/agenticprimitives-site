import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Section({ id, eyebrow, title, lede, children, tone = 'white' }: { id?: string; eyebrow?: string; title?: string; lede?: string; children?: ReactNode; tone?: 'white' | 'cream' | 'navy' }) {
  const bg = tone === 'cream' ? 'bg-cream' : tone === 'navy' ? 'bg-navy text-white' : 'bg-white';
  return (
    <section id={id} className={`${bg} py-20 md:py-28`}>
      <div className="container-x">
        {(eyebrow || title || lede) && (
          <div className="max-w-3xl">
            {eyebrow && <p className={`eyebrow ${tone === 'navy' ? '!text-amber-300' : ''}`}>{eyebrow}</p>}
            {title && <h2 className={`h2 mt-3 ${tone === 'navy' ? '!text-white' : ''}`}>{title}</h2>}
            {lede && <p className={`lede mt-5 ${tone === 'navy' ? '!text-slate-300' : ''}`}>{lede}</p>}
          </div>
        )}
        <div className={eyebrow || title || lede ? 'mt-12' : ''}>{children}</div>
      </div>
    </section>
  );
}

export function Figure({ children, caption, id }: { children: ReactNode; caption: string; id?: string }) {
  return (
    <figure id={id} className="my-6">
      <div className="figure">{children}</div>
      <figcaption className="mt-3 text-sm leading-relaxed text-slate-600">{caption}</figcaption>
    </figure>
  );
}

export function Shot({ src, alt, caption, width = 1440, height = 900, priority = false }: { src: string; alt: string; caption?: string; width?: number; height?: number; priority?: boolean }) {
  return (
    <figure>
      <div className="shot">
        <Image src={src} alt={alt} width={width} height={height} priority={priority} className="h-auto w-full" />
      </div>
      {caption && <figcaption className="mt-2 text-sm text-slate-600">{caption}</figcaption>}
    </figure>
  );
}

export function Stat({ value, label, note }: { value: string; label: string; note?: string }) {
  return (
    <div className="card">
      <div className="text-4xl font-semibold tracking-tight text-navy">{value}</div>
      <div className="mt-1 text-sm font-semibold text-slate-700">{label}</div>
      {note && <div className="mt-1 text-xs text-slate-500">{note}</div>}
    </div>
  );
}

export function Callout({ children, tone = 'amber' }: { children: ReactNode; tone?: 'amber' | 'teal' | 'navy' }) {
  const cls = tone === 'amber' ? 'border-amber/30 bg-amber-soft text-amber' : tone === 'teal' ? 'border-teal/30 bg-teal-soft text-teal' : 'border-navy/20 bg-navy-soft text-navy';
  return <div className={`rounded-xl border px-5 py-4 text-[15px] font-medium leading-relaxed ${cls}`}>{children}</div>;
}

export function CTA({ title, body, primary, secondary }: { title: string; body: string; primary: { href: string; label: string }; secondary?: { href: string; label: string } }) {
  return (
    <section className="py-20">
      <div className="container-x">
        <div className="rounded-3xl bg-navy px-8 py-12 text-white md:px-14 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">{body}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={primary.href} className="btn bg-amber-400 text-navy hover:bg-amber-300">{primary.label}</Link>
              {secondary && <Link href={secondary.href} className="btn border border-white/30 text-white hover:bg-white/10">{secondary.label}</Link>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Tag({ children, tone = 'slate' }: { children: ReactNode; tone?: 'slate' | 'teal' | 'amber' | 'navy' | 'violet' }) {
  const cls = { slate: 'bg-slate-100 text-slate-700', teal: 'bg-teal-soft text-teal', amber: 'bg-amber-soft text-amber', navy: 'bg-navy-soft text-navy', violet: 'bg-violet-soft text-violet' }[tone];
  return <span className={`inline-block rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold ${cls}`}>{children}</span>;
}
