import Link from 'next/link';
import { SITE } from '@apsite/content';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 text-navy">
            <Logo className="h-7 w-7" />
            <span className="font-semibold">Agentic Primitives</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
            The trust substrate for agentic applications. Identity, authority and evidence designed as one system —
            open source, standards-aligned, and running today on a live estate.
          </p>
          <p className="mt-4 font-mono text-xs text-slate-500">MIT licensed · @agenticprimitives/* on npm · Solidity 0.8.28 · TypeScript</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-navy">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/platform" className="hover:text-navy">Platform</Link></li>
            <li><Link href="/substrate" className="hover:text-navy">Architecture</Link></li>
            <li><Link href="/compare" className="hover:text-navy">Why one substrate</Link></li>
            <li><Link href="/examples/game-night" className="hover:text-navy">Example: Game Night</Link></li>
            <li><Link href="/writing" className="hover:text-navy">Writing</Link></li>
            <li><a href="/rss.xml" className="hover:text-navy">RSS</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-navy">Build</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/developers" className="hover:text-navy">Developers</Link></li>
            <li><a href={SITE.github} className="hover:text-navy" rel="noreferrer">GitHub</a></li>
            <li><a href={SITE.npm} className="hover:text-navy" rel="noreferrer">npm</a></li>
            <li><Link href="/ns" className="hover:text-navy">Ontology namespaces</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-line py-6 text-xs text-slate-500 md:flex-row">
        <span>© {new Date().getFullYear()} Agentic Trust Labs. Ring 0 is primitives; products live in their own repos.</span>
        <span className="font-mono">agenticprimitives.dev</span>
      </div>
    </footer>
  );
}
