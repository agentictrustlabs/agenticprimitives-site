import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ACCUMULATES, ARCHITECTURES, BETS, CHANGED, CONSENSUS, DOMAINS, EVIDENCE, PEERS, PRINCIPLES, RISKS, SITE, THESIS } from '@apsite/content';
import { JsonLd, pageMeta } from '@/lib/seo';
import { Claim, CTA, Ledger, Section } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'Thesis — against conventional wisdom',
  description: 'The competing bet Agentic Primitives makes against the IdP-as-control-plane consensus: thirteen hypotheses, eleven principles, who holds which, and what would make it win.',
  path: '/thesis',
  type: 'article',
  published: '2026-09-20',
});

export default function Thesis() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Against conventional wisdom: the competing bet',
          description: THESIS.lede,
          datePublished: '2026-09-20',
          author: { '@id': `${SITE.url}/#founder` },
          publisher: { '@id': `${SITE.url}/#org` },
          mainEntityOfPage: `${SITE.url}/thesis`,
        }}
      />
      <PageHero
        eyebrow={THESIS.eyebrow}
        title={<>The competing bet.</>}
        lede={THESIS.lede}
        aside={
          <div className="rounded-xl border border-white/10 bg-ink-2/80 p-6 backdrop-blur">
            <span className="eyebrow-dark">On this page</span>
            <ol className="mt-4 space-y-2 text-sm">
              {[
                ['#statement', 'The statement'],
                ['#consensus', 'Conventional wisdom, named'],
                ['#trade', 'The trade: tenant, federation, substrate'],
                ['#domains', 'The domain bets'],
                ['#bets', 'Thirteen bets that play together'],
                ['#principles', 'The eleven principles, restated'],
                ['#accumulates', 'Why it accumulates'],
                ['#peers', 'Who holds which'],
                ['#evidence', 'Evidence and assumptions'],
                ['#risks', 'Risks and mitigations'],
                ['#changed', 'What the review changed'],
              ].map(([h, l], i) => (
                <li key={h} className="flex gap-3"><span className="num-mark w-6 text-white/40">{String(i + 1).padStart(2, '0')}</span><a href={h} className="text-slate-300 hover:text-white">{l}</a></li>
              ))}
            </ol>
          </div>
        }
      >
        <Link href="/thesis/review" className="btn-brass">Read the critical review</Link>
        <Link href="/what-is-agentic-primitives" className="btn-outline-light">What is Agentic Primitives?</Link>
      </PageHero>

      <Section id="statement" number="01" eyebrow="The statement" title="Palantir did it inside a few markets. AI takes the cost away — not the disagreements.">
        <div className="grid gap-6 md:grid-cols-3">
          {THESIS.statement.map((p, i) => (
            <p key={i} className="text-[16px] leading-relaxed text-slate-700">{p}</p>
          ))}
        </div>
      </Section>

      <Section id="consensus" tone="ink" number="02" eyebrow="Conventional wisdom" title="Everyone agrees on the question. Inside a tenant, the answer is right." lede={CONSENSUS.lede} wide>
        <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-lg leading-relaxed text-white">{CONSENSUS.idp.line}</p>
            <p className="mt-6 text-[15px] leading-relaxed text-slate-300">{CONSENSUS.idp.strong}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-300">{CONSENSUS.idp.limit}</p>
          </div>
          <div className="card-dark">
            <span className="eyebrow-dark">What an IdP answers</span>
            <ol className="mt-4 divide-y divide-white/10">
              {CONSENSUS.idp.answers.map((a, i) => (
                <li key={a} className="grid grid-cols-[2rem_1fr] gap-3 py-3"><span className="num-mark text-white/40">0{i + 1}</span><span className="text-[15px] text-slate-200">{a}</span></li>
              ))}
            </ol>
            <p className="mt-5 border-t border-white/10 pt-4 text-sm text-slate-400">Five good questions. None of them is <em className="text-white not-italic">may this act commit</em> — this payee, this amount, this intent, once, checkable by a stranger, revocable by the person.</p>
          </div>
        </div>
        <div className="mt-12">
          <Claim attribution="the competing bet, in one line">An IdP is an important admission authority for what a tenant owns. It is not the root of a person’s identity or a person’s authority — and in the domains we build for, nothing centralized can be.</Claim>
        </div>
      </Section>

      <Section id="trade" number="03" eyebrow="The trade" title="Whose authority is it, and who bears the consequences?" lede="Three honest answers. The substrate’s claims hold or fail depending on which one a domain actually has." wide>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-[14px] leading-relaxed text-slate-700">
            <thead className="bg-cream text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3"></th>{ARCHITECTURES.map((a) => <th key={a.name} className="px-4 py-3 text-navy">{a.name}</th>)}</tr></thead>
            <tbody>
              {([['Who is the root', 'root'], ['What authority looks like', 'authority'], ['Where it is checked', 'checked'], ['Who holds the evidence', 'evidence'], ['Good at', 'goodAt'], ['Breaks at', 'breaks']] as const).map(([label, key]) => (
                <tr key={key} className="border-t border-line align-top"><td className="whitespace-nowrap px-4 py-3 font-semibold text-navy">{label}</td>{ARCHITECTURES.map((a) => <td key={a.name} className="px-4 py-3">{a[key]}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-slate-600">The tenant model is not the competitor; it wins its own ground and should. The competitor is federation, in two forms — the network that clears payments between strangers, and the vertical system of record that holds each organization’s slice of a person — and the bet is about the domains where neither can be the root.</p>
      </Section>

      <Section id="domains" tone="ink" number="04" eyebrow="The domain bets" title="Two beachheads. One is a bet on what has already happened; the other on what is happening." lede="A domain fits when the person is the paying principal, the organizations are many and small or losing the relationship, and the records must outlive every one of them." wide>
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
              {d.bet !== 'None. We do not sell against Okta or Entra inside a tenant.' && (
                <>
                  <p className="mt-4 text-[15px] leading-relaxed text-slate-200"><span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-brass">The bet</span><br />{d.bet}</p>
                  {d.mustBeTrue !== '—' && <p className="mt-3 border-t border-white/10 pt-3 text-[13.5px] leading-relaxed text-slate-400"><span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal-bright">What must be true</span><br />{d.mustBeTrue}</p>}
                </>
              )}
              {d.bet.startsWith('None') && <p className="mt-4 text-[15px] leading-relaxed text-slate-300">{d.bet}</p>}
            </article>
          ))}
        </div>
      </Section>

      <Section id="bets" tone="cream" number="05" eyebrow="Competing bets" title="Thirteen hypotheses. They only work together." lede="Each is stated as a bet: the claim, why we think it holds, and the conventional position it goes against. Several were narrowed by the review.">
        <ol className="grid gap-4 md:grid-cols-2">
          {BETS.map((b, i) => (
            <li key={b.id} className="card flex flex-col">
              <div className="flex items-baseline gap-3">
                <span className="num-mark text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-lg font-semibold leading-snug text-navy">{b.claim}</h3>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{b.because}</p>
              <p className="mt-auto border-t border-line pt-3 text-sm text-slate-500"><span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-rose">Against</span> &nbsp;{b.against}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="principles" number="06" eyebrow="The substrate" title="The eleven principles, restated." lede="Each is enforced by a gate, a contract or a build check. Where the review changed a principle, the change is recorded beneath it.">
        <ol className="divide-y divide-line rounded-xl border border-line">
          {PRINCIPLES.map((p) => (
            <li key={p.n} className="grid gap-4 p-6 md:grid-cols-[3rem_1fr]">
              <span className="num-mark text-brass">{String(p.n).padStart(2, '0')}</span>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.015em] text-navy">{p.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate-700">{p.body}</p>
                {p.consequence && <p className="mt-2 text-[15px] leading-relaxed text-slate-500"><span className="font-semibold text-slate-600">Consequence.</span> {p.consequence}</p>}
                {p.changed && <p className="mt-3 rounded-lg border border-amber/30 bg-amber-soft px-3 py-2 text-[13.5px] leading-relaxed text-amber"><span className="font-mono text-[10.5px] uppercase tracking-[0.16em]">Changed after the review</span><br />{p.changed}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="accumulates" tone="ink" number="07" eyebrow="Why it accumulates" title="Each principle makes another one possible." lede="The combination is the perspective; the ordering is the argument.">
        <Ledger dark rows={ACCUMULATES.map(([k, v]) => ({ k: <span className="font-mono text-base text-brass">{k}</span>, v }))} cols="md:grid-cols-[minmax(0,0.6fr)_minmax(0,3fr)]" />
      </Section>

      <Section id="peers" number="08" eyebrow="Who holds which" title="Every peer holds two or three of these." lede="By principle number. Where a peer is ahead on the ones it holds, we say so on the Versus pages.">
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-[15px] text-slate-700">
            <thead className="bg-cream text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Peer</th><th className="px-4 py-3">Holds</th><th className="px-4 py-3">Note</th></tr></thead>
            <tbody>
              {PEERS.map((p) => (
                <tr key={p.peer} className={`border-t border-line align-top ${p.peer === 'Nobody' ? 'bg-cream' : ''}`}>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-navy">{p.peer}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-sm text-brass">{p.holds}</td>
                  <td className="px-4 py-3">{p.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm text-slate-500"><Link href="/compare/composition" className="text-teal hover:underline">The full composition matrix →</Link></p>
      </Section>

      <Section id="evidence" tone="cream" number="09" eyebrow="Evidence and assumptions" title="What has already happened.">
        <Ledger rows={EVIDENCE.map((e) => ({ k: e.k, v: e.v }))} />
      </Section>

      <Section id="risks" number="10" eyebrow="Risks" title="Where the bet can lose, and what we do about it.">
        <div className="grid gap-6 md:grid-cols-2">
          {RISKS.map((r) => (
            <div key={r.risk} className="card">
              <p className="text-lg font-semibold leading-snug text-navy">{r.risk}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600"><span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal">Mitigation</span><br />{r.mitigation}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Claim dark={false} attribution="what would have to be true">The bet wins if a bounded estate can give one domain the substrate’s properties without asking it to trust a public network first — and if, once it has them, it will not give them back.</Claim>
        </div>
      </Section>

      <Section id="changed" tone="cream" number="11" eyebrow="What the review changed" title="Eight things this page no longer says." lede="The critical review was written against the code and the deployments, and it was right often enough to change the thesis. This is the record.">
        <ol className="grid gap-4 md:grid-cols-2">
          {CHANGED.map((c, i) => (
            <li key={c.what} className="card">
              <div className="flex items-baseline gap-3"><span className="num-mark text-slate-400">{String(i + 1).padStart(2, '0')}</span><h3 className="text-lg font-semibold text-navy">{c.what}</h3></div>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{c.why}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-slate-500"><Link href="/thesis/review" className="text-teal hover:underline">The review itself →</Link></p>
      </Section>

      <CTA title="Argue with it. We already have." body="The site’s own critical review judges each of these principles against the code and the deployments: four hold, four are overstated, one is wrong as stated, and three contradict each other in the target domain. It says what to focus on, what to refine, what to change and what to stop claiming." primary={{ href: '/thesis/review', label: 'The critical review' }} secondary={{ href: '/thesis/review/input', label: 'The outside critique, in full' }} />
    </>
  );
}
