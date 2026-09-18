import Link from 'next/link';
import { ELSEWHERE, SITE } from '@apsite/content';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className="container-x grid gap-10 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="text-[12px] font-semibold tracking-[0.2em]">AGENTIC PRIMITIVES</span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
            Rails, not throttles. Authority for agents that the agent cannot exceed — signed by the principal, bounded by
            caveats that are code, revocable in one transaction, receipted for the owner. Open source, standards-aligned,
            running on a live estate.
          </p>
          <p className="mt-5 font-mono text-[11px] text-slate-500">MIT · @agenticprimitives/* on npm · Solidity 0.8.28 · TypeScript · A2A 1.0 TCK-green</p>
        </div>
        <div>
          <h4 className="eyebrow-dark">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><Link href="/platform" className="hover:text-white">Platform</Link></li>
            <li><Link href="/substrate" className="hover:text-white">Architecture</Link></li>
            <li><Link href="/compare" className="hover:text-white">Versus the alternatives</Link></li>
            <li><Link href="/demos" className="hover:text-white">Demos</Link></li>
            <li><Link href="/examples/game-night" className="hover:text-white">Example: Game Night</Link></li>
            <li><Link href="/writing" className="hover:text-white">Writing</Link></li>
            <li><Link href="/brand" className="hover:text-white">Brand</Link></li>
            <li><a href="/rss.xml" className="hover:text-white">RSS</a></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow-dark">Build</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><Link href="/developers" className="hover:text-white">Developers</Link></li>
            <li><a href={SITE.github} className="hover:text-white" rel="noreferrer">GitHub</a></li>
            <li><a href={SITE.npm} className="hover:text-white" rel="noreferrer">npm</a></li>
            <li><Link href="/ns" className="hover:text-white">Ontology namespaces</Link></li>
            <li><Link href="/audits" className="hover:text-white">Production readiness</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="eyebrow-dark">Around the substrate</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {ELSEWHERE.map((e) => (
              <li key={e.id}><a href={e.url} className="hover:text-white" rel="noreferrer">{e.name}</a></li>
            ))}
            {ELSEWHERE[0]!.links.slice(0, 3).map((l) => (
              <li key={l.href}><a href={l.href} className="text-slate-400 hover:text-white" rel="noreferrer">Rich Canvas: {l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col justify-between gap-2 border-t border-white/10 py-6 text-xs text-slate-500 md:flex-row">
        <span>Agentic Primitives · © {new Date().getFullYear()} Agentic Trust Labs. Ring 0 is primitives; products live in their own repos.</span>
        <span className="font-mono">agenticprimitives.dev</span>
      </div>
    </footer>
  );
}
