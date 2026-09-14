import Link from 'next/link';
import { SITE } from '@apsite/content';
import { Logo } from './Logo';

const LINKS = [
  { href: '/platform', label: 'Platform' },
  { href: '/substrate', label: 'Architecture' },
  { href: '/examples/game-night', label: 'Example: Game Night' },
  { href: '/compare', label: 'Why one substrate' },
  { href: '/writing', label: 'Writing' },
  { href: '/developers', label: 'Developers' },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/85 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 text-navy" aria-label="Agentic Primitives home">
          <Logo className="h-7 w-7" />
          <span className="text-[15px] font-semibold tracking-tight">Agentic Primitives</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-navy-soft hover:text-navy">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={SITE.github} className="btn-secondary !px-3 !py-2" rel="noreferrer">
            GitHub
          </a>
          <Link href="/developers#start" className="btn-primary !px-3 !py-2">
            Get started
          </Link>
        </div>
      </div>
      <nav className="container-x flex gap-1 overflow-x-auto pb-2 md:hidden" aria-label="Primary (mobile)">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-navy-soft">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
