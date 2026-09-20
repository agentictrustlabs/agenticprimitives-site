import type { Metadata } from 'next';
import Link from 'next/link';
import { DOMAINS, SITE } from '@apsite/content';
import { JsonLd, pageMeta } from '@/lib/seo';
import { Claim, CTA, Section } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'Strategy — where the bet is placed',
  description: 'The domains Agentic Primitives goes after and the ones it leaves alone: faith communities first, travel as the disintermediation bet, and what would have to be true for each.',
  path: '/strategy',
});

const QUALIFIES = [
  ['The person is the paying principal', 'Not the organization. Where the organization pays, the tenant model is the right answer and we do not compete with it.'],
  ['The organizations are many and small — or losing the relationship', 'None large enough to be the root; or intermediaries that held the relationship are losing it to direct provider–consumer ties.'],
  ['The records must outlive every organization', 'Giving, formation, relationships, itineraries, receipts: things a person carries across organizations and decades, that no single tenant can hold for them.'],
  ['No incumbent intermediary owns the crossing', 'Where a card network or a distribution system already federates the case, the substrate is one signal among the intermediary’s — unless the intermediary is losing the record.'],
];

export default function Strategy() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Strategy — where the bet is placed', url: `${SITE.url}/strategy`, isPartOf: { '@id': `${SITE.url}/#website` } }} />
      <PageHero
        eyebrow="Strategy"
        title={<>Where the bet<br />is placed.</>}
        lede="The thesis says what the substrate and the estate are. This page says where they go first, where they go next, and where they do not go at all — and, for each bet, what would have to be true for it to win. It is a strategy, not a principle: it will change as the evidence does."
      >
        <Link href="/thesis" className="btn-brass">The thesis</Link>
        <Link href="/thesis/review" className="btn-outline-light">The critical review</Link>
      </PageHero>

      <Section number="01" eyebrow="What qualifies a domain" title="Four conditions. A domain needs all of them.">
        <div className="grid gap-4 md:grid-cols-2">
          {QUALIFIES.map(([k, v], i) => (
            <div key={k} className="card"><span className="num-mark text-slate-400">0{i + 1}</span><div className="mt-2 text-lg font-semibold text-navy">{k}</div><p className="mt-2 text-[15px] leading-relaxed text-slate-600">{v}</p></div>
          ))}
        </div>
      </Section>

      <Section tone="ink" number="02" eyebrow="The domain bets" title="Two beachheads. One is a bet on what has already happened; the other on what is happening." wide>
        <div className="grid gap-4 md:grid-cols-2">
          {DOMAINS.map((d) => (
            <article key={d.domain} className={`card-dark flex flex-col ${d.fit.startsWith('Not') || d.fit.startsWith('Later') ? 'opacity-70' : ''}`}>
              <h3 className="text-xl font-semibold text-white">{d.domain}</h3>
              <p className="mt-1 text-sm font-semibold text-brass">{d.fit}</p>
              <dl className="mt-4 grid grid-cols-[7rem_1fr] gap-x-3 gap-y-2 text-[13.5px]">
                <dt className="text-slate-500">Intermediary</dt><dd className="text-slate-300">{d.intermediary}</dd>
                <dt className="text-slate-500">Principal</dt><dd className="text-slate-300">{d.principal}</dd>
                <dt className="text-slate-500">Outlives an org</dt><dd className="text-slate-300">{d.outlive}</dd>
              </dl>
              {d.bet.startsWith('None') ? (
                <p className="mt-4 text-[15px] leading-relaxed text-slate-300">{d.bet}</p>
              ) : (
                <>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-200"><span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-brass">The bet</span><br />{d.bet}</p>
                  {d.mustBeTrue !== '—' && <p className="mt-3 border-t border-white/10 pt-3 text-[13.5px] leading-relaxed text-slate-400"><span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal-bright">What must be true</span><br />{d.mustBeTrue}</p>}
                </>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section number="03" eyebrow="Sequence" title="First, next, later, never.">
        <ol className="divide-y divide-line rounded-xl border border-line">
          {[
            ['First', 'Faith communities and mission work, on the estate that already runs. The test is two separately governed organizations completing an invitation, a payment and a migration under it, and preferring it to the platform they have.'],
            ['Next', 'Travel at the long tail — independent hotels, ground operators, the routes carriers do not serve — where a provider already wants the direct relationship. The card network is a settlement rail under the mandate. If providers keep choosing the intermediary’s token at admission, the bet is wrong and this page will say so.'],
            ['Later', 'Healthcare and education, when a regulator names an owner-held, verifiable record as an acceptable form of portability.'],
            ['Never', 'Enterprise workflow inside a tenant. The tenant model wins its own ground; the estate federates with it at admission for the person the tenant does not own.'],
          ].map(([k, v]) => (
            <li key={k} className="grid gap-3 p-6 md:grid-cols-[6rem_1fr]"><span className="text-lg font-semibold text-brass">{k}</span><p className="text-[15px] leading-relaxed text-slate-700">{v}</p></li>
          ))}
        </ol>
        <div className="mt-10">
          <Claim dark={false} attribution="the rule for every bet on this page">A bet is written down with what would have to be true. When the evidence goes the other way, the bet changes here before the thesis does.</Claim>
        </div>
      </Section>

      <CTA title="The thesis the strategy serves." body="What the substrate and the estate are, stated as a bet against the field’s consensus — and the project’s own critical reading of it." primary={{ href: '/thesis', label: 'The thesis' }} secondary={{ href: '/demos', label: 'What runs today' }} />
    </>
  );
}
