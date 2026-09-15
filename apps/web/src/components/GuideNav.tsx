'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface GuidePage { readonly href: string; readonly label: string; readonly sub: string }

/** Sidebar for a multi-page area: short pages behind one nav, not a scroll. */
export function GuideNav({ pages }: { pages: readonly GuidePage[] }) {
  const path = usePathname();
  return (
    <nav aria-label="Section" className="flex gap-1 overflow-x-auto md:sticky md:top-24 md:block md:space-y-1 md:overflow-visible">
      {pages.map((p, i) => {
        const active = path === p.href;
        return (
          <Link
            key={p.href}
            href={p.href}
            className={`flex shrink-0 items-baseline gap-3 rounded-md px-3 py-2 text-sm transition ${active ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
          >
            <span className={`num-mark ${active ? 'text-brass' : ''}`}>0{i + 1}</span>
            <span>
              <span className="block font-semibold">{p.label}</span>
              <span className="hidden text-xs text-slate-500 md:block">{p.sub}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function GuidePager({ pages, current, last }: { pages: readonly GuidePage[]; current: string; last: { href: string; label: string } }) {
  const i = pages.findIndex((p) => p.href === current);
  const prev = i > 0 ? pages[i - 1] : undefined;
  const next = i >= 0 && i < pages.length - 1 ? pages[i + 1] : undefined;
  return (
    <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6 text-sm">
      {prev ? <Link href={prev.href} className="text-slate-400 hover:text-white">← {prev.label}</Link> : <span />}
      {next ? <Link href={next.href} className="btn-brass !px-4 !py-2">{next.label} →</Link> : <Link href={last.href} className="btn-brass !px-4 !py-2">{last.label} →</Link>}
    </div>
  );
}
