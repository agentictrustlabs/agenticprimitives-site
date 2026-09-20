import type { Metadata } from 'next';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '@apsite/content';
import { Markdown } from '@/components/Markdown';
import { JsonLd, pageMeta } from '@/lib/seo';
import { CTA } from '@/components/ui';

export const metadata: Metadata = pageMeta({
  title: 'A critical review of the thesis',
  description: 'The project’s own critical reading of its thesis, against the contracts, packages and running estate: whose authority it is, where each of the eleven principles holds or is a bet, what to build next, and what would prove it.',
  path: '/thesis/review',
  type: 'article',
  published: '2026-09-20',
});

const VERDICTS: readonly [string, string][] = [
  ['Holds', 'The identity can sign · Private dimension, public projection · A delegation is the authority · Verification at every step · Trust as a graph'],
  ['Holds in the contract, not yet the product', 'Rotation preserves grants — the Home has no rotation ceremony for a person · Verification at commit for external effects — the receipt lacks the adapter’s observation'],
  ['A bet with a stated test', 'Open intents · One vocabulary across organizations · Shared records and portability · The estate as decentralized · Travel'],
  ['A convention, defended', 'Three accountable shapes'],
];

export default function Review() {
  const body = readFileSync(join(process.cwd(), 'content/thesis/review.md'), 'utf8');
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Review',
          name: 'A critical review of the Agentic Primitives thesis',
          itemReviewed: { '@type': 'SoftwareApplication', name: 'Agentic Primitives', url: SITE.url },
          datePublished: '2026-09-20',
          reviewBody: 'A person-centric substrate for domains with no intermediary. Of the eleven principles, most hold in the contracts; two hold in the contract and not yet in the product; several are bets with stated tests. The tenant model is not a competitor; federation is.',
          author: { '@id': `${SITE.url}/#org` },
          publisher: { '@id': `${SITE.url}/#org` },
          url: `${SITE.url}/thesis/review`,
        }}
      />
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-dark absolute inset-0" aria-hidden />
        <div className="glow-brass absolute inset-0" aria-hidden />
        <div className="container-x relative grid items-end gap-12 py-20 md:grid-cols-[1.25fr_1fr] md:py-28">
          <div>
            <p className="eyebrow-dark">A critical review of the thesis · 2026-09-20</p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">Where the bet holds,<br />and where it is a bet.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300">
              The project’s own critical reading of its thesis, against the contracts, the packages and the running estate. It starts from the question that decides everything — <em className="not-italic text-white">whose authority it is, and who bears the consequences</em> — takes the eleven principles one by one, says where each holds and where it is a bet, and ends with what a doubter is right about. Nothing here is softened.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#the-trade-that-matters" className="btn-brass">The trade that matters</a>
              <a href="#what-this-means-for-focus" className="btn-outline-light">What to focus on, change, stop</a>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-ink-2/80 p-6 backdrop-blur">
            <span className="eyebrow-dark">The eleven principles, judged</span>
            <dl className="mt-4 divide-y divide-white/10">
              {VERDICTS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 py-3">
                  <dt className="text-sm font-semibold text-brass">{k}</dt>
                  <dd className="text-[13.5px] leading-relaxed text-slate-300">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">Two principles are true of the contracts and not yet of the product. The review names the work that closes each.</p>
          </div>
        </div>
      </section>
      <div className="bg-white">
        <article className="container-x max-w-4xl py-14 md:py-20">
          <Markdown source={body} />
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm">
            <Link href="/thesis" className="text-slate-500 hover:text-navy">← The thesis</Link>
            <Link href="/audits" className="text-slate-500 hover:text-navy">The assessment</Link>
          </div>
        </article>
      </div>
      <CTA title="The bet, narrowed." body="A person-centric substrate for domains with no intermediary: many small organizations, the person as the paying principal, records that outlive any one of them. A rotation ceremony that preserves grants. The adapter’s observation on every receipt. A public projection of a private grant. A consortium chain the domain’s own institutions validate. Then two separately governed estates doing real work — and preferring it." primary={{ href: '/audits', label: 'What holds today' }} secondary={{ href: '/demos', label: 'What runs today' }} />
    </>
  );
}
