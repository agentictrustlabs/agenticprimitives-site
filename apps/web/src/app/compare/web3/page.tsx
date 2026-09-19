import type { Metadata } from 'next';
import { ERC_STACK, WEB3_COMMERCE_DATA, WEB3_DELEGATION, WEB3_IDENTITY } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { Claim } from '@/components/ui';
import { GuideHead, GuideNote } from '@/components/GuideLayout';
import { GuidePager } from '@/components/GuideNav';
import { COMPARE_PAGES } from '../pages';

export const metadata: Metadata = pageMeta({
  title: 'Versus — the Web3 field',
  description: 'Agentic Primitives against MetaMask DTK, Smart Sessions, Lit Vincent, Safe, the ERC agent stack, ERC-8004, NANDA, ANS and x402 — who is ahead, where each stops.',
  path: '/compare/web3',
});

function Cards({ items }: { items: readonly { name: string; what: string; ahead: string; stops: string; take: string }[] }) {
  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-2">
      {items.map((c) => (
        <article key={c.name} className="card-dark">
          <h3 className="text-base font-semibold text-white">{c.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{c.what}</p>
          <dl className="mt-3 space-y-1.5 text-sm leading-relaxed">
            <div><dt className="inline font-mono text-[10.5px] uppercase tracking-[0.14em] text-teal-300">ahead · </dt><dd className="inline text-slate-400">{c.ahead}</dd></div>
            <div><dt className="inline font-mono text-[10.5px] uppercase tracking-[0.14em] text-rose-bright">stops · </dt><dd className="inline text-slate-400">{c.stops}</dd></div>
            <div><dt className="inline font-mono text-[10.5px] uppercase tracking-[0.14em] text-brass">take · </dt><dd className="inline text-slate-300">{c.take}</dd></div>
          </dl>
        </article>
      ))}
    </div>
  );
}

export default function Web3() {
  return (
    <>
      <GuideHead step="04 · The Web3 field" title="Is anyone else building the substrate itself? Every layer, yes. The composition, no." lede="A project counts as similar if it makes at least one of our load-bearing claims: the agent’s identity is an on-chain account, not a key or a row; authority is a revocable, attenuable, on-chain-verifiable grant rather than a credential or an ACL; an autonomous loop is gated per action by that grant; evidence of what an agent did is a record the principal owns. Searched September 2026. The closest single analogs are Lit’s Vincent and Kite’s Agent Passport — each about a third of the surface, each rooting trust somewhere we deliberately do not. The ERC agent stack is where the same ideas are being standardized piece by piece, and where our adapters should point." />

      <section className="mt-12">
        <p className="eyebrow-dark">On-chain delegation and policy-bounded execution</p>
        <Cards items={WEB3_DELEGATION} />
      </section>

      <section className="mt-16">
        <p className="eyebrow-dark">The ERC agent stack — where our vocabulary is being fixed, without us in the room</p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[1000px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-400">
                <th className="px-4 py-3">ERC</th><th className="px-4 py-3">Title</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Overlap</th><th className="px-4 py-3 text-brass">Our position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {ERC_STACK.map((r) => (
                <tr key={r.erc} className="align-top">
                  <td className="px-4 py-4 font-mono font-semibold text-teal-300">{r.erc}</td>
                  <td className="px-4 py-4 text-slate-200">{r.title}</td>
                  <td className="px-4 py-4 text-xs text-slate-400">{r.status}</td>
                  <td className="px-4 py-4 text-slate-400">{r.overlap}</td>
                  <td className="bg-brass/[0.06] px-4 py-4 text-slate-100">{r.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <GuideNote>The survey’s own verdict: outside 8004, no production product with meaningful usage has surfaced for the rest. They are designs — which is exactly why they are worth reading now. ERC-8273 in particular is our core differentiator, intent-digest-gated action, as a draft ERC.</GuideNote>
      </section>

      <section className="mt-16">
        <p className="eyebrow-dark">Identity, discovery, naming</p>
        <Cards items={WEB3_IDENTITY} />
      </section>

      <section className="mt-16">
        <p className="eyebrow-dark">Mandates and payments · consented data · provenance · the Web2 answer · TEEs</p>
        <Cards items={WEB3_COMMERCE_DATA} />
      </section>

      <section className="mt-16">
        <Claim attribution="the honest counterweight">Breadth is also exposure. Several peers have more production hours on their one layer than we have on all of ours, and the ERC stack is standardizing our vocabulary — mandate, capability, action digest, coordination acceptance — without us in the room.</Claim>
      </section>

      <GuidePager pages={COMPARE_PAGES} current="/compare/web3" last={{ href: '/examples/game-night', label: 'See it built: Game Night' }} />
    </>
  );
}
