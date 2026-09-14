'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BUILD_PAGES } from './pages';


export function BuildNav() {
  const path = usePathname();
  return (
    <nav aria-label="Build" className="flex gap-1 overflow-x-auto md:sticky md:top-24 md:block md:space-y-1 md:overflow-visible">
      {BUILD_PAGES.map((p, i) => {
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

export function BuildPager({ current }: { current: string }) {
  const i = BUILD_PAGES.findIndex((p) => p.href === current);
  const prev = i > 0 ? BUILD_PAGES[i - 1] : undefined;
  const next = i >= 0 && i < BUILD_PAGES.length - 1 ? BUILD_PAGES[i + 1] : undefined;
  return (
    <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-6 text-sm">
      {prev ? <Link href={prev.href} className="text-slate-400 hover:text-white">← {prev.label}</Link> : <span />}
      {next ? <Link href={next.href} className="btn-brass !px-4 !py-2">{next.label} →</Link> : <Link href="/examples/game-night" className="btn-brass !px-4 !py-2">See it built: Game Night →</Link>}
    </div>
  );
}
