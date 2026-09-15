import type { ReactNode } from 'react';
import { GuideNav, type GuidePage } from './GuideNav';

/** A multi-page area: dark throughout, sidebar left, bounded content column. `wide` for pages with tables/diagrams. */
export function GuideLayout({ eyebrow, pages, children, wide = false }: { eyebrow: string; pages: readonly GuidePage[]; children: ReactNode; wide?: boolean }) {
  return (
    <div className="relative bg-ink text-white">
      <div className="grid-dark absolute inset-0" aria-hidden />
      <div className={`container-x relative grid gap-10 py-12 md:grid-cols-[220px_minmax(0,1fr)] md:py-16 ${wide ? 'max-w-[1400px]' : ''}`}>
        <aside>
          <p className="eyebrow-dark mb-4 hidden md:block">{eyebrow}</p>
          <GuideNav pages={pages} />
        </aside>
        <div className={`min-w-0 ${wide ? '' : 'max-w-3xl'}`}>{children}</div>
      </div>
    </div>
  );
}

export function GuideHead({ step, title, lede }: { step: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow-dark">{step}</p>
      <h1 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-5xl">{title}</h1>
      {lede && <p className="mt-5 text-lg leading-relaxed text-slate-300">{lede}</p>}
    </header>
  );
}

export function GuideCode({ children }: { children: ReactNode }) {
  return <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-ink-2 p-5 font-mono text-[13px] leading-6 text-slate-100">{children}</pre>;
}

export function GuideNote({ children }: { children: ReactNode }) {
  return <p className="mt-4 border-l-2 border-brass pl-4 text-sm leading-relaxed text-slate-400">{children}</p>;
}
