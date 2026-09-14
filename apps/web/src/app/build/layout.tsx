import type { ReactNode } from 'react';
import { BuildNav } from './BuildNav';

/** The Build area: short pages behind one sidebar — not a scroll. Dark throughout; content column bounded. */
export default function BuildLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative bg-ink text-white">
      <div className="grid-dark absolute inset-0" aria-hidden />
      <div className="container-x relative grid gap-10 py-12 md:grid-cols-[220px_minmax(0,1fr)] md:py-16">
        <aside>
          <p className="eyebrow-dark mb-4 hidden md:block">Build</p>
          <BuildNav />
        </aside>
        <div className="min-w-0 max-w-3xl">{children}</div>
      </div>
    </div>
  );
}
