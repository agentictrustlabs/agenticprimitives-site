import type { ReactNode } from 'react';

/** Page head inside the Build area. */
export function BuildHead({ step, title, lede }: { step: string; title: ReactNode; lede?: ReactNode }) {
  return (
    <header>
      <p className="eyebrow-dark">{step}</p>
      <h1 className="mt-4 text-3xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-5xl">{title}</h1>
      {lede && <p className="mt-5 text-lg leading-relaxed text-slate-300">{lede}</p>}
    </header>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-ink-2 p-5 font-mono text-[13px] leading-6 text-slate-100">{children}</pre>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="mt-4 border-l-2 border-brass pl-4 text-sm leading-relaxed text-slate-400">{children}</p>;
}
