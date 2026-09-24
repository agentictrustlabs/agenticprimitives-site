import type { Metadata } from 'next';
import Link from 'next/link';
import { PILLARS, SITE } from '@apsite/content';
import { JsonLd, pageMeta } from '@/lib/seo';
import { Claim, CTA, Section } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'What is Agentic Primitives?',
  description: 'Agentic Primitives is an open-source trust substrate for AI agents: identity that can sign, authority as a revocable grant, receipts the owner carries. The definition, and how it differs from OpenAI’s use of the phrase.',
  path: '/what-is-agentic-primitives',
  absoluteTitle: true,
});

const DEFINITION =
  'Agentic Primitives is an open-source trust substrate for AI agents. It answers, for every act an agent takes on someone’s behalf, who is acting, whether they may do this, and what they did — with artifacts a counterparty can verify without trusting the platform that ran the agent.';

const NOT = [
  ['Not a framework', 'LangGraph, the Microsoft Agent Framework, Dapr Agents and their peers orchestrate a run. Agentic Primitives is the layer they can stand on: identity that survives the runtime, authority the runtime cannot forge, evidence the runtime does not own.'],
  ['Not a registry', 'Many registries will exist. In most designs the registry signs the agent’s record; here the agent signs its own record and a registry can only say it listed it. The kit is what registries are built from.'],
  ['Not OpenAI’s “agentic primitives”', 'OpenAI uses the phrase for Skills, a hosted shell and server-side compaction — features of one vendor’s agent API that make a long-running agent work better. Those are building blocks of a runtime. This project is the substrate under any runtime: the identity, the grant and the receipt belong to the person, not to the API that hosted the run.'],
  ['Not a model', 'Intelligence may be probabilistic; authority must not be. The planner proposes. It is never consulted about whether a step is allowed.'],
];

export default function WhatIs() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'DefinedTerm',
            name: 'Agentic Primitives',
            description: DEFINITION,
            url: `${SITE.url}/what-is-agentic-primitives`,
            inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Agentic Primitives glossary', url: SITE.url },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What is Agentic Primitives?', acceptedAnswer: { '@type': 'Answer', text: DEFINITION } },
              { '@type': 'Question', name: 'Is Agentic Primitives the same as OpenAI’s agentic primitives?', acceptedAnswer: { '@type': 'Answer', text: NOT[2]![1] } },
              { '@type': 'Question', name: 'Is Agentic Primitives an agent framework?', acceptedAnswer: { '@type': 'Answer', text: NOT[0]![1] } },
            ],
          },
        ]}
      />
      <PageHero eyebrow="Definition" title={<>What is<br />Agentic Primitives?</>} lede={DEFINITION}>
        <Link href="/substrate" className="btn-brass">How it is built</Link>
        <Link href="/demos" className="btn-outline-light">See it running</Link>
      </PageHero>

      <Section number="01" eyebrow="The three primitives" title="What every act can answer.">
        <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <li key={p.id} className="bg-white p-7">
              <span className="num-mark text-slate-400">0{i + 1}</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-navy">{p.question}</h3>
              <p className="mt-2 text-sm font-semibold text-teal">{p.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{p.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <Claim dark={false} attribution="the sentence the design rests on">Intelligence may be probabilistic. Authority must not be.</Claim>
        </div>
      </Section>

      <Section tone="cream" number="02" eyebrow="Disambiguation" title="What Agentic Primitives is not.">
        <div className="grid gap-6 md:grid-cols-2">
          {NOT.map(([k, v]) => (
            <div key={k} className="card">
              <div className="text-lg font-semibold text-navy">{k}</div>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{v}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section number="03" eyebrow="In one table" title="The substrate, in a sentence each.">
        <div className="overflow-x-auto rounded-xl border border-line">
          <table className="w-full text-left text-[15px] text-slate-700">
            <thead className="bg-cream text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Primitive</th><th className="px-4 py-3">What it is</th><th className="px-4 py-3">Standard</th><th className="px-4 py-3">Where</th></tr></thead>
            <tbody>
              {[
                ['Smart Agent', 'A person, organization or service as an account that can sign. Names, cards and registry entries are projections of it.', 'ERC-4337 · ERC-1271', <Link key="1" href="/writing/identity-that-signs" className="text-teal hover:underline">Day 2</Link>],
                ['Delegation', 'Permission as a signed grant with caveats, revocable in one transaction — not a token that is checked once.', 'ERC-7710', <Link key="2" href="/writing/delegation-is-the-artefact" className="text-teal hover:underline">Day 6</Link>],
                ['Mandate', 'A delegation bound to one intent — payee, amount, resource, outcome. The confirmation is the signature.', 'Digest-binding + payment caveats', <Link key="3" href="/writing/the-mandate" className="text-teal hover:underline">Day 8</Link>],
                ['Harness', 'Planner proposes, mandate authorizes, executor acts, receipt proves. Verified per step, outside the model.', 'A2A · MCP', <Link key="4" href="/writing/planner-mandate-executor-receipt" className="text-teal hover:underline">Day 16</Link>],
                ['Receipt', 'Evidence of every protected act, in the owner’s vault, recomputable by a counterparty.', 'W3C PROV-O', <Link key="5" href="/writing/receipts-that-travel" className="text-teal hover:underline">Day 19</Link>],
                ['Ontology', 'One description of the domain that every layer binds to by IRI. Meaning flows through it; authority never does.', 'RDF · SHACL · JSON-LD', <Link key="6" href="/ontology" className="text-teal hover:underline">Ontology</Link>],
              ].map(([a, b, c, d]) => (
                <tr key={String(a)} className="border-t border-line align-top"><td className="whitespace-nowrap px-4 py-3 font-semibold text-navy">{a}</td><td className="px-4 py-3">{b}</td><td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-500">{c}</td><td className="px-4 py-3">{d}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <CTA title="Read the argument, then run it." body="Twenty-one days, one idea each, and nine live apps that exercise every layer." primary={{ href: '/writing', label: 'The missing layer — the series' }} secondary={{ href: '/demos', label: 'Demos' }} />
    </>
  );
}
