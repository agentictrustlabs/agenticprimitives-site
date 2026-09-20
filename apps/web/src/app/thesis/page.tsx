import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ACCUMULATES, BETS, CONSENSUS, EVIDENCE, PEERS, PRINCIPLES, RISKS, SITE, THESIS } from '@apsite/content';
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
                ['#bets', 'Thirteen bets that play together'],
                ['#principles', 'The eleven principles'],
                ['#accumulates', 'Why it accumulates'],
                ['#peers', 'Who holds which'],
                ['#evidence', 'Evidence and assumptions'],
                ['#risks', 'Risks and mitigations'],
              ].map(([h, l], i) => (
                <li key={h} className="flex gap-3"><span className="num-mark w-6 text-white/40">0{i + 1}</span><a href={h} className="text-slate-300 hover:text-white">{l}</a></li>
              ))}
            </ol>
          </div>
        }
      >
        <Link href="/what-is-agentic-primitives" className="btn-brass">What is Agentic Primitives?</Link>
        <Link href="/compare" className="btn-outline-light">Versus the alternatives</Link>
      </PageHero>

      <Section id="statement" number="01" eyebrow="The statement" title="Palantir did it inside a few markets. AI takes the boundary away.">
        <div className="grid gap-6 md:grid-cols-3">
          {THESIS.statement.map((p, i) => (
            <p key={i} className="text-[16px] leading-relaxed text-slate-700">{p}</p>
          ))}
        </div>
      </Section>

      <Section id="consensus" tone="ink" number="02" eyebrow="Conventional wisdom" title="Everyone agrees on the question. Everyone answers with 2012." lede={CONSENSUS.lede} wide>
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
          <Claim attribution="the competing bet, in one line">An IdP is an important admission authority. It cannot be the universal root of agent identity or of action authority — and no centralized authority can.</Claim>
        </div>
      </Section>

      <Section id="bets" tone="cream" number="03" eyebrow="Competing bets" title="Thirteen hypotheses. They only work together." lede="Each is stated as a bet: the claim, why we think it holds, and the conventional position it goes against.">
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

      <Section id="principles" number="04" eyebrow="The substrate" title="The eleven principles." lede="Each is enforced by code, not convention — a gate, a contract, a build check. The consequence is what follows once it is.">
        <ol className="divide-y divide-line rounded-xl border border-line">
          {PRINCIPLES.map((p) => (
            <li key={p.n} className="grid gap-4 p-6 md:grid-cols-[3rem_1fr]">
              <span className="num-mark text-brass">{String(p.n).padStart(2, '0')}</span>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.015em] text-navy">{p.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-slate-700">{p.body}</p>
                {p.consequence && <p className="mt-2 text-[15px] leading-relaxed text-slate-500"><span className="font-semibold text-slate-600">Consequence.</span> {p.consequence}</p>}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="accumulates" tone="ink" number="05" eyebrow="Why it accumulates" title="Each principle makes another one possible." lede="The combination is the perspective; the ordering is the argument.">
        <Ledger dark rows={ACCUMULATES.map(([k, v]) => ({ k: <span className="font-mono text-base text-brass">{k}</span>, v }))} cols="md:grid-cols-[minmax(0,0.6fr)_minmax(0,3fr)]" />
      </Section>

      <Section id="peers" number="06" eyebrow="Who holds which" title="Every peer holds two or three of these." lede="By principle number. Where a peer is ahead on the ones it holds, we say so on the Versus pages.">
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

      <Section id="evidence" tone="cream" number="07" eyebrow="Evidence and assumptions" title="What has already happened.">
        <Ledger rows={EVIDENCE.map((e) => ({ k: e.k, v: e.v }))} />
      </Section>

      <Section id="risks" number="08" eyebrow="Risks" title="Where the bet can lose, and what we do about it.">
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

      <CTA title="Argue with it." body="Every claim here is exercised by a running estate and reported in a published assessment, including where it does not yet hold. If you build identity providers, registries, wallets or agent frameworks and think the layer described here already exists — or should not — we want to hear exactly where." primary={{ href: '/audits', label: 'The assessment' }} secondary={{ href: '/demos', label: 'Run the demos' }} />
    </>
  );
}
