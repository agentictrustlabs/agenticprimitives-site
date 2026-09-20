import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ACCUMULATES, ARCHITECTURES, BETS, CONSENSUS, DIMENSIONS, EVIDENCE, ONTOLOGY_STACK, PEERS, PRINCIPLES, RISKS, SITE, THESIS } from '@apsite/content';
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
                ['#bets', 'Thirteen bets that play together'],
                ['#principles', 'The eleven principles, restated'],
                ['#dimensions', 'Private dimension, public projection'],
                ['#ontology', 'The ontology, held'],
                ['#accumulates', 'Why it accumulates'],
                ['#peers', 'Who holds which'],
                ['#evidence', 'Evidence and assumptions'],
                ['#risks', 'Risks and mitigations'],
              ].map(([h, l], i) => (
                <li key={h} className="flex gap-3"><span className="num-mark w-6 text-white/40">{String(i + 1).padStart(2, '0')}</span><a href={h} className="text-slate-300 hover:text-white">{l}</a></li>
              ))}
            </ol>
          </div>
        }
      >
        <a href="#statement" className="btn-brass">Start with the statement</a>
        <a href="#principles" className="btn-outline-light">The eleven principles</a>
      </PageHero>

      <Section id="statement" number="01" eyebrow="The statement" title="A person is an agent, with agents of their own. Every act one of them takes should answer three questions a stranger can check.">
        <div className="grid gap-6 md:grid-cols-2">
          {THESIS.statement.map((p, i) => (
            <p key={i} className="text-[16px] leading-relaxed text-slate-700">{p}</p>
          ))}
        </div>
      </Section>

      <Section id="consensus" tone="ink" number="02" eyebrow="Conventional wisdom" title="The field’s answer: extend the identity provider. Right for a company. Wrong for a person." lede={CONSENSUS.lede} wide>
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
            <p className="mt-5 border-t border-white/10 pt-4 text-sm text-slate-400">Five questions about access. Not one about whether <em className="text-white not-italic">this act</em> may commit.</p>
          </div>
        </div>
        <div className="mt-12">
          <Claim attribution="the competing bet, in one line">Companies get an identity provider. People get an account that can sign, a grant they issued, and a receipt they keep — and nothing in the middle that can take those away.</Claim>
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
        <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-slate-600">The tenant model is not the competitor; it wins its own ground and should. The competitor is federation, in two forms — the network that clears payments between strangers, and the vertical system of record that holds each organization’s slice of a person — and the bet is about the domains where neither can be the root. Which domains those are, in what order, and what would have to be true for each is a strategy rather than a principle, and it has <Link href="/strategy" className="text-teal hover:underline">its own page</Link>.</p>
      </Section>

      <Section id="bets" tone="cream" number="04" eyebrow="Competing bets" title="Thirteen hypotheses. They only work together." lede="Each is stated as a bet: the claim, why we think it holds, and the conventional position it goes against.">
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

      <Section id="principles" number="05" eyebrow="The substrate" title="The eleven principles." lede="Each is enforced by a gate, a contract or a build check. The consequence is what follows once it is.">
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

      <Section id="dimensions" tone="cream" number="06" eyebrow="Private dimension, public projection" title="Two ledgers. One private, one public. Neither holds the graph." lede="A person’s account, the grants she signs and the relationships she holds are created and checked by signature — no chain has to see them. When an act needs enforcing — money moving, a record a gate must follow — it runs on a private chain the domain’s own institutions operate, so who belongs to what is never visible outside. When a stranger needs to check something — is this grant still valid, is this agent a member, did this run happen — the public chain carries a fingerprint and a proof, never the record. Private for enforcement. Public for verification." wide>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-[14px] leading-relaxed text-slate-700">
            <thead className="bg-white text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Concern</th><th className="px-4 py-3">Private dimension — defined and verified off chain</th><th className="px-4 py-3">Enforcement — the private estate chain</th><th className="px-4 py-3">Public projection — neutral ground</th></tr></thead>
            <tbody>
              {DIMENSIONS.map((d) => (
                <tr key={d.concern} className="border-t border-line bg-white align-top"><td className="whitespace-nowrap px-4 py-3 font-semibold text-navy">{d.concern}</td><td className="px-4 py-3">{d.privateSide}</td><td className="px-4 py-3">{d.enforcement}</td><td className="px-4 py-3">{d.publicSide}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-slate-600">The private chain is what runs today. Doing the same on a public chain — paying without exposing payer, payee or amount; proving membership without naming the members; keeping state private and proofs public — is what the Ethereum privacy work is converging on, and the substrate will take each piece as it matures.</p>
        <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-slate-500">Two things this does not solve. A private chain is only as neutral as the people who run its validators, so the domain’s institutions have to run them, not us. And a stranger outside the estate cannot read the private chain at all — so the public fingerprint and proof are not optional; without them, nobody outside can check anything.</p>
      </Section>

      <Section id="ontology" number="07" eyebrow="The ontology, held" title="Abstraction is the key. One stack, six layers, translation at the edges." lede="This is the bet we hold hardest against the field’s instinct. A model can translate between local schemas cheaply, and that is exactly why a layered ontology matters more, not less: it is where translation is done once, at a named boundary, instead of at every act — and it is what lets reasoning, memory, skills and coordination run inside rails instead of inside a prompt." wide>
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-[14px] leading-relaxed text-slate-700">
            <thead className="bg-cream text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Layer</th><th className="px-4 py-3">What it settles</th><th className="px-4 py-3">Examples</th><th className="px-4 py-3">What it drives in the substrate</th></tr></thead>
            <tbody>
              {ONTOLOGY_STACK.map((l) => (
                <tr key={l.layer} className="border-t border-line align-top"><td className="whitespace-nowrap px-4 py-3 font-semibold text-navy">{l.layer}</td><td className="px-4 py-3">{l.what}</td><td className="px-4 py-3 text-slate-600">{l.examples}</td><td className="px-4 py-3">{l.drives}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ['Rails on reasoning', 'The planner is offered capabilities whose ids mean one thing on the card, in the registry and on chain; an intent is a class with a stated outcome; a relationship is a property whose definition says what it is not. A model that reasons over defined terms can be wrong about how. It cannot invent what.'],
            ['Rails on memory and knowledge', 'What a person’s agent remembers is a vault record bound to a class by IRI; what the public tier holds is a projection of chain facts under the same terms. A generated query is a query over defined terms, never over column names it guessed.'],
            ['Rails on coordination', 'Coordination between principals and orchestration inside a run are two namespaces, related only by provenance. A plan step states a capability requirement; a tool satisfies it; the words never appear in each other’s records. That is why a creating agent may invite and may not enrol people by iterating over them.'],
          ].map(([k, v]) => (
            <div key={k} className="card"><div className="text-base font-semibold text-navy">{k}</div><p className="mt-2 text-[14px] leading-relaxed text-slate-600">{v}</p></div>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-[14px] leading-relaxed text-slate-500">Where we hold the line, and where we do not. Shared meaning for what an agent may do — intent, capability, mandate, receipt — is settled in the stack and never translated at the moment of an act. Shared meaning for data an application merely reads may well be translated by a model at the edge, and the crosswalks are where that happens. The counter-hypothesis — that cheap translation makes a shared ontology unnecessary — is answered by that line, and it is testable: two independent teams integrate a new domain against the stack and against a schema-and-adapter baseline, and the stack has to win on time to the first working mandate and on semantic defects the gates catch.</p>
      </Section>

      <Section id="accumulates" tone="ink" number="08" eyebrow="Why it accumulates" title="Each principle makes another one possible." lede="The combination is the perspective; the ordering is the argument.">
        <Ledger dark rows={ACCUMULATES.map(([k, v]) => ({ k: <span className="font-mono text-base text-brass">{k}</span>, v }))} cols="md:grid-cols-[minmax(0,0.6fr)_minmax(0,3fr)]" />
      </Section>

      <Section id="peers" number="09" eyebrow="Who holds which" title="Every peer holds two or three of these." lede="By principle number. Where a peer is ahead on the ones it holds, we say so on the Versus pages.">
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

      <Section id="evidence" tone="cream" number="10" eyebrow="Evidence and assumptions" title="What has already happened.">
        <Ledger rows={EVIDENCE.map((e) => ({ k: e.k, v: e.v }))} />
      </Section>

      <Section id="risks" number="11" eyebrow="Risks" title="Where the bet can lose, and what we do about it.">
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

      <CTA title="Read the case against it." body="A thesis that cannot survive its own hardest questions is not worth a stranger’s time. The critical review takes each of these principles in turn against the contracts, the packages and the running estate, says where each holds, where it is a bet, and what would have to be built or proven — and it is written so that a doubter feels heard." primary={{ href: '/thesis/review', label: 'The critical review' }} secondary={{ href: '/audits', label: 'The assessment' }} />
    </>
  );
}
