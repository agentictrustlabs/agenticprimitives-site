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
  description: 'The project’s own critical reading of its thesis, on its merits: the three claims that can be tested, the platform as the competitor, the five markets read on their premises, the thirteen bets on their reasoning, the eleven principles as principles, what the thesis does not say, and what would prove it.',
  path: '/thesis/review',
  type: 'article',
  published: '2026-09-20',
});

const VERDICTS: readonly [string, string][] = [
  ['Conceded', 'This is a new offering. The question is not whether it is finished but whether the bet is the right bet.'],
  ['Testable', 'Three claims inside the vision: the next participant is cheaper, capabilities are reused across journeys, everyone keeps control.'],
  ['The competitor', 'The platform — one operating environment. The bet holds only where participants will not be coordinated by one.'],
  ['Missing', 'A principle on governance of the common model and of an estate. The doubter finds this first.'],
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
          reviewBody: 'A new offering, conceded. The vision cannot be wrong; three claims inside it can be tested. The competitor is the platform, and the bet holds where participants are separately governed and will not be platformed. The principles are consistent and thin on governance. What would prove it: the same journey built two ways, then between two estates.',
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
              The project’s own critical reading of its thesis, on its merits. This is a new offering, and the review concedes that first; the question is whether the bet is the right bet. A vision cannot be wrong, so the review holds the thesis to the three claims inside it that can be — that a shared foundation makes the next participant cheaper, that capabilities are reused across journeys, and that everyone keeps control — and reads the five markets on their premises, the thirteen bets on their reasoning and the eleven principles as principles. Nothing here is softened.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#five-markets-read-on-their-merits" className="btn-brass">The five markets, on their merits</a>
              <a href="#what-would-prove-it" className="btn-outline-light">What would prove it</a>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-ink-2/80 p-6 backdrop-blur">
            <span className="eyebrow-dark">The reading, in brief</span>
            <dl className="mt-4 divide-y divide-white/10">
              {VERDICTS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-3 py-3">
                  <dt className="text-sm font-semibold text-brass">{k}</dt>
                  <dd className="text-[13.5px] leading-relaxed text-slate-300">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">Where the bet is strong, where a doubter is right, and what would settle it.</p>
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
      <CTA title="The bet, narrowed." body="One journey that works between two parties who will not join one operator’s system — each under its own authority, with a receipt either can show a stranger — built on the substrate and on a conventional baseline, and compared. Then the same journey between two separately governed estates. Then the third party, cheaper." primary={{ href: '/audits', label: 'What holds today' }} secondary={{ href: '/demos', label: 'What runs today' }} />
    </>
  );
}
