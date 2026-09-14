import type { ReactNode } from 'react';

/** The dark opening of every interior page: eyebrow, a display headline, one paragraph, optional actions + aside. */
export function PageHero({ eyebrow, title, lede, children, aside }: { eyebrow: string; title: ReactNode; lede?: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="grid-dark absolute inset-0" aria-hidden />
      <div className="glow-brass absolute inset-0" aria-hidden />
      <div className={`container-x relative grid items-end gap-12 py-20 md:py-28 ${aside ? 'md:grid-cols-[1.2fr_1fr]' : ''}`}>
        <div>
          <p className="eyebrow-dark">{eyebrow}</p>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-6xl">{title}</h1>
          {lede && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">{lede}</p>}
          {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}
