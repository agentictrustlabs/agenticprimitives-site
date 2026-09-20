import type { Metadata } from 'next';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '@apsite/content';
import { Markdown } from '@/components/Markdown';
import { JsonLd, pageMeta } from '@/lib/seo';
import { CTA } from '@/components/ui';

export const metadata: Metadata = pageMeta({
  title: 'Thesis — build an ecosystem where every participant expands what everyone can accomplish',
  description: 'The Agentic Primitives thesis: coordinate whole journeys through independent participants while each retains control of its contributions — across healthcare, fitness, faith, finance and travel. Thirteen bets, eleven principles, the strategy, and where it can fail.',
  path: '/thesis',
  type: 'article',
  published: '2026-09-20',
  absoluteTitle: true,
});

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

export default function Thesis() {
  const body = readFileSync(join(process.cwd(), 'content/thesis/thesis.md'), 'utf8');
  const sections = body.split('\n').filter((l) => l.startsWith('## ')).map((l) => l.slice(3).trim()).map((t) => ({ t, id: slug(t) }));
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Build an ecosystem where every participant expands what everyone can accomplish.',
          description: 'The competing bet: coordinate whole journeys through independent participants while each retains control of its contributions.',
          datePublished: '2026-09-20',
          author: { '@id': `${SITE.url}/#founder` },
          publisher: { '@id': `${SITE.url}/#org` },
          mainEntityOfPage: `${SITE.url}/thesis`,
        }}
      />
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-dark absolute inset-0" aria-hidden />
        <div className="glow-brass absolute inset-0" aria-hidden />
        <div className="container-x relative grid items-end gap-12 py-20 md:grid-cols-[1.25fr_1fr] md:py-28">
          <div>
            <p className="eyebrow-dark">The thesis</p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">Build an ecosystem where every participant expands what everyone can accomplish.</h1>
            <p className="mt-8 text-2xl font-semibold leading-snug tracking-[-0.02em] text-white">The competing bet: coordinate the whole journey.</p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
              We’re betting that the strongest healthcare, fitness, faith, finance and travel ecosystems will make independent participants work together around shared goals — while each retains control of its contributions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#1-the-opportunity-belongs-to-the-ecosystem-builder" className="btn-brass">Start with the opportunity</a>
              <a href="#5-thirteen-bets-that-make-the-ecosystem-possible" className="btn-outline-light">The thirteen bets</a>
            </div>
          </div>
          <nav className="rounded-xl border border-white/10 bg-ink-2/80 p-6 backdrop-blur" aria-label="On this page">
            <span className="eyebrow-dark">On this page</span>
            <ol className="mt-4 space-y-1.5 text-sm">
              {sections.map((s, i) => (
                <li key={s.id} className="flex gap-3"><span className="num-mark w-6 shrink-0 text-white/40">{String(i + 1).padStart(2, '0')}</span><a href={`#${s.id}`} className="text-slate-300 hover:text-white">{s.t.replace(/^\d+\.\s*/, '')}</a></li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
      <div className="bg-white">
        <article className="container-x max-w-4xl py-14 md:py-20">
          <Markdown source={body} />
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm">
            <Link href="/thesis/review" className="text-slate-500 hover:text-navy">The critical review of this thesis →</Link>
            <Link href="/audits" className="text-slate-500 hover:text-navy">The readiness assessment</Link>
          </div>
        </article>
      </div>
      <CTA title="Read the case against it." body="A thesis that cannot survive its own hardest questions is not worth a stranger’s time. The critical review takes the five markets, the thirteen bets and the eleven principles in turn against the contracts, the packages and the running estate, says where each holds and where it is a bet, and ends with what a doubter is right about." primary={{ href: '/thesis/review', label: 'The critical review' }} secondary={{ href: '/demos', label: 'What runs today' }} />
    </>
  );
}
