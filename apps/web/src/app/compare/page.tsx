import type { Metadata } from 'next';
import { NEEDS } from '@apsite/content';
import { StitchedVsSeamless } from '@apsite/diagrams';
import { Callout, CTA, Figure, Section } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Why one substrate — stitched vs seamless',
  description: 'What a team would stitch together to build a capable agentic application, seam by seam, against one substrate where identity, authority and evidence are one model.',
};

const FRAMEWORKS = [
  ['Agent frameworks (LangGraph, MAF, ADK, OpenAI SDK)', 'Excellent at the loop: state, tools, handoffs, tracing.', 'Authority is application code and a callback. There is no identity that survives the runtime, no grant the chain enforces, no receipt a counterparty can verify without the vendor.'],
  ['Identity vendors (Auth0, Okta, Entra)', 'Users, sessions, MFA, SSO — for humans against apps.', 'A token is a cached verdict. Organizations and agents are afterthoughts; “acting on behalf of” is a claim in a JWT, not a signed, caveated, revocable grant.'],
  ['Wallet + multisig stacks (Safe, session-key SDKs)', 'Accounts, thresholds, sessions on chain.', 'Wallets, not people or organizations; no harness, no evidence graph, no discovery, no admission. You still build every other layer and the seams between them.'],
  ['Agent registries (ERC-8004, ANS, HCS, NANDA)', 'Listing and reputation for agents.', 'A directory row is a listing, not an identity, and a score is not a relationship. We are what registries are built from: the kit, the signed card, the binding proof — with bridges to theirs outside the core.'],
  ['Payment rails for agents (AP2, x402, ACP)', 'Move value between agents with a protocol.', 'A payment mandate is one caveated grant among many; here it is the same object as every other permission, verified by the same gate, receipted the same way.'],
] as const;

export default function Compare() {
  return (
    <>
      <Section eyebrow="Why one substrate" title="The seams are the problem." lede="A capable agentic application needs sign-in, organizations, permissions, money, an agent loop, human approval, evidence, service credentials, discovery and tools. Each is available as a product. Assembling them is where identity becomes a token, permission becomes a role, a role becomes a row, and the row becomes a log line nobody can trace back to a person's decision.">
        <Figure caption="The same ten needs, twice. On the left each product has its own identity model, permission shape and audit format, and the glue between them is where accountability is lost. On the right the needs are slots in one model — one Smart Agent, one grant mechanism, one evidence trail — and the answer to “who acted, under what?” is the same at every layer.">
          <StitchedVsSeamless />
        </Figure>
      </Section>

      <Section tone="cream" eyebrow="Need by need" title="What you would stitch, and what you get instead.">
        <div className="grid gap-4 md:grid-cols-2">
          {NEEDS.map((n) => (
            <div key={n.need} className="card">
              <h3 className="h3">{n.need}</h3>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="rounded-lg border border-rose/20 bg-rose-soft/60 p-3"><div className="text-[11px] font-semibold uppercase tracking-wider text-rose">Stitched</div><div className="mt-1 text-slate-700">{n.stitched}</div></div>
                <div className="rounded-lg border border-teal/20 bg-teal-soft/60 p-3"><div className="text-[11px] font-semibold uppercase tracking-wider text-teal">Agentic Primitives</div><div className="mt-1 text-slate-800">{n.seamless}</div></div>
              </div>
              <p className="mt-3 text-xs text-slate-500">{n.why}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Against the categories" title="Where each category is strong, and where it stops." lede="We take from all of them. What none of them does is compose identity, authority and evidence into one model that a counterparty can verify without trusting the platform.">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Strong at</th>
                <th className="py-3">Where it stops</th>
              </tr>
            </thead>
            <tbody>
              {FRAMEWORKS.map(([c, s, w]) => (
                <tr key={c} className="border-b border-line/70 align-top">
                  <td className="py-3 pr-4 font-semibold text-navy">{c}</td>
                  <td className="py-3 pr-4 text-slate-700">{s}</td>
                  <td className="py-3 text-slate-600">{w}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <Callout tone="amber">
            Five properties are contract-enforced here and policy code everywhere else: identity survives the runtime · ERC-7710 attenuation · on-chain revocation per step · intent-digest binding · intent-derived single-use nonce.
          </Callout>
        </div>
      </Section>

      <Section tone="cream" eyebrow="What we deliberately are not" title="Honest boundaries.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card"><h3 className="h3">Not an LLM framework.</h3><p className="mt-3 text-sm text-slate-600">The planner is a port. Bring your model and your prompting; the harness makes sure what it proposes runs only under a grant.</p></div>
          <div className="card"><h3 className="h3">Not a token or a public chain.</h3><p className="mt-3 text-sm text-slate-600">Contracts deploy to any EVM — a private QBFT network, an L2, a testnet. The demo estate runs a free-gas private chain. There is no token to buy.</p></div>
          <div className="card"><h3 className="h3">Not a registry, a wallet or a Home.</h3><p className="mt-3 text-sm text-slate-600">Ring 0 is the primitives those are built from. The Home, discovery and naming services you see running are products in their own repositories, importing the packages — as yours will.</p></div>
        </div>
      </Section>

      <CTA title="See the seamless version in a real application." body="Game Night needed every line in the table above. It built a card room." primary={{ href: '/examples/game-night', label: 'Game Night case study' }} secondary={{ href: '/platform', label: 'The nine capabilities' }} />
    </>
  );
}
