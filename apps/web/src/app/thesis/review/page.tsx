import type { Metadata } from 'next';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SITE } from '@apsite/content';
import { Markdown } from '@/components/Markdown';
import { JsonLd, pageMeta } from '@/lib/seo';
import { Callout, CTA, Section } from '@/components/ui';

export const metadata: Metadata = pageMeta({
  title: 'The case against — a critical review',
  description: 'The strongest case against the Agentic Primitives substrate, published in full: most benefits could be delivered incrementally on existing infrastructure; each of the eleven principles challenged; the tests that would settle it.',
  path: '/thesis/review',
  type: 'article',
  published: '2026-09-20',
});

const CENTRAL =
  'Most of these benefits could be delivered incrementally through existing identity, authorization and application infrastructure. You have not yet demonstrated that buyers need — or benefit enough from — the entire combination.';

const LEAPS: readonly [string, string][] = [
  ['Identity should survive credential changes', 'Every principal must be an ERC-4337 account'],
  ['Authorization should be specific', 'OAuth cannot express it'],
  ['Agents need common action semantics', 'They need one comprehensive ontology'],
  ['Evidence should remain available after migration', 'All authoritative records must live in an owner’s vault'],
  ['Reputation can be manipulated', 'Scores and ranked discovery should be prohibited'],
  ['Parties need independently verifiable authority', 'Every relationship requires public-chain state'],
];

const UNSETTLED = ['What constitutes membership.', 'Who controls a shared record.', 'Which exceptions a business process permits.', 'Whether two organizations mean the same thing by “approved.”', 'Who must respond when automation causes harm.'];

const IMPLEMENTATIONS: readonly [string, string][] = [
  ['Existing identity systems, typed actions, specific approval, resource-side checks, signed receipts', 'How much of the value familiar infrastructure already delivers'],
  ['Add portable delegation and durable principal references', 'The incremental value of authority portability'],
  ['Add the full chain, ontology, vault and Home model', 'Whether the remaining architecture justifies its cost'],
];

const FAILURE_CASES = ['Revoke authority during execution.', 'Compromise a key after it has issued child grants.', 'Retry an external action whose response was lost.', 'Change a schema after approval.', 'Create many colluding identities and valid-looking receipts.', 'Migrate a live agent without the former operator’s cooperation.'];

export default function Review() {
  const body = readFileSync(join(process.cwd(), 'content/thesis/critical-review.md'), 'utf8');
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Review',
          name: 'Agentic Primitives Substrate and Estate: a critical review',
          itemReviewed: { '@type': 'SoftwareApplication', name: 'Agentic Primitives', url: SITE.url },
          datePublished: '2026-09-20',
          reviewBody: CENTRAL,
          publisher: { '@id': `${SITE.url}/#org` },
          url: `${SITE.url}/thesis/review`,
        }}
      />
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-dark absolute inset-0" aria-hidden />
        <div className="glow-brass absolute inset-0" aria-hidden />
        <div className="container-x relative max-w-4xl py-20 md:py-28">
          <p className="eyebrow-dark">Against the thesis · a critical review · 2026-09-20</p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">The case against<br />the substrate.</h1>
          <p className="mt-8 border-l-2 border-brass pl-5 text-xl leading-relaxed text-white">{CENTRAL}</p>
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-slate-400">
            This is the strongest case against <Link href="/thesis" className="text-white underline-offset-2 hover:underline">the thesis</Link> we have been given, and we publish it in full — the argument, each of the eleven principles challenged in turn, the sources it cites, and the tests it says would settle the question. Nothing below has been softened. Our responses land where every other finding does: in the ledger, with evidence, and back on this page.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#review" className="btn-brass">Read the review</a>
            <Link href="/thesis" className="btn-outline-light">The thesis it answers</Link>
          </div>
        </div>
      </section>

      <Section number="01" eyebrow="In brief" title="The property is established. The mechanism does not follow." lede="The review’s central move: the thesis shows that certain properties matter, then jumps to a preferred implementation. Each row is a valuable property and the conclusion that does not automatically follow from it.">
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-[15px] text-slate-700">
            <thead className="bg-cream text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Valuable property</th><th className="px-4 py-3">Conclusion that does not automatically follow</th></tr></thead>
            <tbody>{LEAPS.map(([a, b]) => <tr key={a} className="border-t border-line align-top"><td className="px-4 py-3 font-semibold text-navy">{a}</td><td className="px-4 py-3">{b}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="h3">What AI does not settle</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">AI may make code and mappings cheaper. It does not settle disagreements over:</p>
            <ul className="mt-3 list-disc space-y-1 pl-6 text-[15px] text-slate-700">{UNSETTLED.map((u) => <li key={u}>{u}</li>)}</ul>
          </div>
          <div>
            <h3 className="h3">The counter-hypothesis on ontology</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">Better AI could make translation between local schemas cheap enough that a comprehensive shared ontology becomes less necessary. The Graph is the live example: many subgraphs, no upper ontology. Whether that is siloed data in each graph or something a model can integrate across silos is exactly the question — and if AI can drive that integration, the value of one vocabulary falls.</p>
          </div>
        </div>
      </Section>

      <Section tone="cream" number="02" eyebrow="Where it bites hardest" title="Federated enterprise, or domain-wide." lede="The review’s strongest competing bet is a federation of accountable resource owners on familiar infrastructure. Where that bet is feasible and where it is not is the fault line between the two positions.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <p className="eyebrow">Federated · enterprise</p>
            <h3 className="mt-2 text-xl font-semibold text-navy">One resource owner bears the consequences.</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">The company owns the resources and bears the consequences of access; its identity and authorization systems govern employees and agents acting for it. Add specific transaction approvals, constrained delegation, resource-side checks and exportable signed receipts, recognize selected external issuers, keep your own policies. No universal identity provider is needed — and neither is a public-chain identity system. Inside an enterprise boundary, this delivers most of the value incrementally.</p>
          </div>
          <div className="card">
            <p className="eyebrow">Domain-wide · faith, travel, care</p>
            <h3 className="mt-2 text-xl font-semibold text-navy">Consumers and providers cross every enterprise boundary.</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">A person, a congregation, a mission agency and a caterer are not one tenant, and no one of them can be the federation’s root. Whose IdP admits the traveller’s agent to a hotel it has never seen? Whose policy table holds the mandate? This is where the substrate’s claim lives — and where the review’s demand is fair: show two independently governed parties doing useful work under it, and preferring it to the simpler alternative.</p>
          </div>
        </div>
        <Callout tone="navy">
          <strong>The site’s framing, not the reviewer’s.</strong> The review does not concede the domain-wide case; it says the case is unproven and names the test. We agree that the test is the right one. A single estate validates a product; the decisive demonstration needs separately governed estates.
        </Callout>
      </Section>

      <Section number="03" eyebrow="The test it proposes" title="Three implementations, six failure cases.">
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-[15px] text-slate-700">
            <thead className="bg-cream text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Implementation</th><th className="px-4 py-3">What it tests</th></tr></thead>
            <tbody>{IMPLEMENTATIONS.map(([a, b], i) => <tr key={a} className="border-t border-line align-top"><td className="px-4 py-3"><span className="num-mark mr-3 text-slate-400">0{i + 1}</span>{a}</td><td className="px-4 py-3 text-navy">{b}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-8 text-[15px] text-slate-600">Run the same workflow and failure cases against all three, and measure integration effort, successful completion, authorization failures, latency, operating cost, recovery and migration:</p>
        <ol className="mt-4 grid gap-2 md:grid-cols-2">{FAILURE_CASES.map((f, i) => <li key={f} className="flex gap-3 rounded-lg border border-line bg-white px-4 py-3 text-[15px] text-slate-700"><span className="num-mark text-brass">0{i + 1}</span>{f}</li>)}</ol>
      </Section>

      <div id="review" className="bg-white">
        <article className="container-x max-w-4xl py-14 md:py-20">
          <p className="eyebrow">The review, in full</p>
          <h2 className="h2 mt-3">Agentic Primitives Substrate and Estate: a critical review</h2>
          <div className="mt-8">
            <Markdown source={body} />
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm">
            <Link href="/thesis" className="text-slate-500 hover:text-navy">← The thesis</Link>
            <Link href="/audits" className="text-slate-500 hover:text-navy">Where responses land: the assessment and ledger</Link>
          </div>
        </article>
      </div>

      <CTA title="The claim worth defending." body="Independently governed parties can carry specific authority and useful evidence across applications without surrendering control to one operator. The public chain, the ontology, the vault and the Home each have to earn their place by improving that outcome — measurably, against the simpler alternative." primary={{ href: '/demos', label: 'What runs today' }} secondary={{ href: '/audits', label: 'What does not yet hold' }} />
    </>
  );
}
