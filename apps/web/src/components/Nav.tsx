import Link from 'next/link';
import { SITE } from '@apsite/content';
import { Logo } from './Logo';

const LINKS = [
  { href: '/thesis', label: 'Thesis' },
  { href: '/platform', label: 'Platform' },
  { href: '/substrate', label: 'Architecture' },
  { href: '/compare', label: 'Versus' },
  { href: '/demos', label: 'Demos' },
  { href: '/ontology', label: 'Ontology' },
  { href: '/writing', label: 'Writing' },
  { href: '/developers', label: 'Developers' },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 text-white backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 text-white" aria-label="Agentic Primitives home">
          <Logo className="h-7 w-7" />
          <span className="text-[12px] font-semibold tracking-[0.2em]">AGENTIC PRIMITIVES</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={SITE.github} className="btn-outline-light !px-3 !py-2" rel="noreferrer">
            GitHub
          </a>
          <Link href="/build" className="btn-brass !px-3 !py-2">
            Build
          </Link>
        </div>
      </div>
      <nav className="container-x flex gap-1 overflow-x-auto pb-2 md:hidden" aria-label="Primary (mobile)">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/5">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
