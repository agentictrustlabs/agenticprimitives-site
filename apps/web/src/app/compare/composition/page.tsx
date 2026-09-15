import type { Metadata } from 'next';
import { CONCERNS, FAMILIES, PROPERTIES } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { CompositionMatrix } from '@apsite/diagrams';
import { Claim, Figure } from '@/components/ui';
import { GuideHead, GuideNote } from '@/components/GuideLayout';
import { GuidePager } from '@/components/GuideNav';
import { COMPARE_PAGES } from '../pages';

export const metadata: Metadata = pageMeta({
  title: 'Versus — every layer has a peer; nobody has the composition',
  description: 'Agentic Primitives against the agent frameworks, Web2 IAM, the smart-account and delegation stacks, the ERC agent standards, the registries and the data/provenance projects — eight concerns, who is ahead on each, and the one thing no project found has: all of them on one identity, as 77 packages and 33 EVM contracts.',
  path: '/compare/composition',
});

const DOT: Record<string, string> = { full: 'bg-teal-bright', partial: 'bg-slate-500', none: 'border border-dashed border-white/20' };

export default function Compare() {
  return (
    <>
      <GuideHead
        step="05 · The composition"
        title={<>Every layer has a peer. Several are ahead on their one layer. Nobody has the composition.</>}
        lede="We checked two fields, honestly and in writing: the agent frameworks (Microsoft Agent Framework, ADK, LangGraph, Dapr, Agno, Strands, Mastra, Pydantic, CrewAI, the OpenAI SDK, Buzz) and the Web3 trust substrate (MetaMask DTK, Smart Sessions, Lit Vincent, Safe, the ERC-8004 → 8273 stack, AP2, x402, Virtuals, Inrupt, PROV-AGENT, Kite, and the Web2 IAM vendors). Eight concerns make an agentic application accountable. Every one has a peer. No project found composes them — one Smart Agent identity for a person, an organization and a service; delegation with caveats a contract enforces; a loop that re-verifies each step against a signed mandate; provenance the principal owns; an ontology every layer binds to; a registry kit rather than a registry. That composition is 77 packages under one npm scope and 33 Solidity contracts, deployable to any EVM."
      />

      <Figure dark caption="Eight concerns down; six peer families across. A filled cell is a real answer for that concern; a half cell is part of one; a dashed cell is out of scope. The teal column names what ships here for the row — a package and a contract. Read down: no family fills its column. Read across: every row has a peer, and on several rows that peer has more production hours than we do.">
        <CompositionMatrix />
      </Figure>

      <section className="mt-14">
        <p className="eyebrow-dark">The eight concerns — who is there, who is ahead, and what ships here</p>
        <div className="ledger-dark mt-4">
          {CONCERNS.map((c) => (
            <div key={c.concern} className="grid gap-4 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1.3fr)]">
              <div>
                <div className="text-base font-semibold text-white">{c.concern}</div>
                <div className="mt-3 flex gap-1.5" aria-label="presence by family">
                  {c.field.map((p, j) => <span key={j} title={`${FAMILIES[j]?.name}: ${p}`} className={`h-2.5 w-6 rounded-sm ${DOT[p]}`} />)}
                </div>
                <div className="mt-1 font-mono text-[10px] text-slate-500">{FAMILIES.map((f) => f.short).join(' · ')}</div>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-slate-300"><span className="font-semibold text-slate-200">Peers: </span>{c.peers}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400"><span className="font-semibold text-brass">Ahead: </span>{c.ahead}</p>
              </div>
              <div className="font-mono text-[11.5px] leading-5">
                <div className="text-teal-300">{c.packages.map((p) => `@agenticprimitives/${p}`).join('  ')}</div>
                <div className="mt-2 text-slate-300">{c.contracts.map((s) => `${s}.sol`).join('  ')}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="eyebrow-dark">Seven properties — policy code there, a contract here</p>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-300">The differentiator is not “we use a blockchain.” It is that properties every framework implements as revocable promises in application code — and that the Web3 peers implement one at a time — are here properties of the authority representation itself, enforced by contracts no harness bug and no vendor can bypass.</p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-400">
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Agent frameworks</th>
                <th className="px-4 py-3">Web3 peers</th>
                <th className="px-4 py-3 text-brass">Here</th>
                <th className="px-4 py-3 text-teal-300">Contract</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {PROPERTIES.map((r) => (
                <tr key={r.property} className="align-top">
                  <td className="px-4 py-4 font-semibold text-white">{r.property}</td>
                  <td className="px-4 py-4 text-slate-400">{r.frameworks}</td>
                  <td className="px-4 py-4 text-slate-400">{r.web3}</td>
                  <td className="bg-brass/[0.06] px-4 py-4 text-slate-100">{r.here}</td>
                  <td className="px-4 py-4 font-mono text-[11.5px] text-teal-300">{r.contract}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <GuideNote>The cost, said once: this buys verifiability and custody, and it costs latency (a chain read per step verify), signature UX, and an adapter surface none of the peers pay. Where we manage that cost rather than pretend it away is in the specs — anchor per run vs per step; obligations enforced on chain for high-risk acts only.</GuideNote>
      </section>


      <div className="mt-16">
        <Claim attribution="the verdict, from the maintained analysis">Nobody found: the composition. Being the substrate registries are built from only holds if our adapters to their standards exist and are current.</Claim>
      </div>

      <GuidePager pages={COMPARE_PAGES} current="/compare/composition" last={{ href: '/examples/game-night', label: 'See it built: Game Night' }} />
    </>
  );
}
