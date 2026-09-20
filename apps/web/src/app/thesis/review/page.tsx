import type { Metadata } from 'next';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '@apsite/content';
import { Markdown } from '@/components/Markdown';
import { JsonLd, pageMeta } from '@/lib/seo';
import { CTA } from '@/components/ui';

export const metadata: Metadata = pageMeta({
  title: 'A critical review — where the bet holds, and where it must change',
  description: 'The site’s own review of the Agentic Primitives thesis: the tenant / federation / substrate trade, each of the eleven principles judged against the code and deployments, three internal tensions, and what to focus on, refine, change and stop claiming.',
  path: '/thesis/review',
  type: 'article',
  published: '2026-09-20',
});

const VERDICTS: readonly [string, string][] = [
  ['Holds', 'The identity can sign · Never acting stale, per step · One vocabulary, inside one estate · Evidence travels, as statement evidence'],
  ['Overstated', 'Neutral ground · Token vs delegation · Three shapes as “law” · Trust graph as a prohibition on the reader'],
  ['Wrong as stated', 'Credentials rotate, nothing re-signed — the contract bumps the custody epoch on every retirement'],
  ['Unproven', 'Intent binding for open intents · One vocabulary across organizations · Owner’s records for shared records · The deployment as decentralized'],
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
          reviewBody: 'The substrate is a person-centric architecture for domains without an intermediary. The thesis should say that and stop arguing with Okta. Of the eleven principles, four hold, four are overstated, one is wrong as stated and the rest are unproven; three are in tension with each other in the target domain.',
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
            <p className="eyebrow-dark">Against the thesis · the site’s own review · 2026-09-20</p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">Where the bet holds,<br />and where it must change.</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300">
              The usual objection — that most of this could be delivered incrementally on existing infrastructure — is true and not the important one. The important question is <em className="not-italic text-white">whose authority it is and who bears the consequences</em>: tenant, federation or substrate. Judged against its own code, contracts and deployments, the substrate is a person-centric architecture for domains without an intermediary. It should say so, stop arguing with Okta, and fix three places where its principles contradict each other.
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
            <p className="mt-4 border-t border-white/10 pt-3 text-xs text-slate-400">Three principles are in tension with each other in the target domain. The review names them and the resolution.</p>
          </div>
        </div>
      </section>
      <div className="bg-white">
        <article className="container-x max-w-4xl py-14 md:py-20">
          <Markdown source={body} />
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm">
            <Link href="/thesis" className="text-slate-500 hover:text-navy">← The thesis</Link>
            <span className="flex gap-4">
              <Link href="/thesis/review/input" className="text-slate-500 hover:text-navy">The outside critique, in full</Link>
              <Link href="/audits" className="text-slate-500 hover:text-navy">The assessment</Link>
            </span>
          </div>
        </article>
      </div>
      <CTA title="The bet, narrowed." body="A person-centric substrate for domains with no intermediary: many small organizations, the person as the paying principal, records that outlive any one of them. Rotation split from recovery. Relationships off chain. A consortium chain the domain’s own institutions validate. Then two separately governed estates doing real work — and preferring it." primary={{ href: '/audits', label: 'What holds today' }} secondary={{ href: '/demos', label: 'What runs today' }} />
    </>
  );
}
