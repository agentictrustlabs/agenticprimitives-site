import type { Metadata } from 'next';
import { BOM, BOM_TOTALS, INDUSTRY_ANSWERS, NEEDS, OUR_ANSWER } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { StitchedVsSeamless, ThrottlesVsRail } from '@apsite/diagrams';
import { Callout, Claim, CTA, Figure, Ledger, Section, Stat, Tag } from '@/components/ui';

export const metadata: Metadata = pageMeta({
  title: 'Versus — containment, supervision, platform governance, and the stitched stack',
  description: 'Where the industry’s three answers to agent risk stop — sandboxes, auto-review, one platform’s ontology — and why authority as a signed, caveated, revocable grant is a different kind of answer. Plus the bill of materials: thirty products and thirty-three contracts assembled by hand, versus 77 packages and 33 contracts that already agree.',
  path: '/compare',
});

const PROPERTIES = [
  { p: 'Who bounds the agent', c: 'The vendor’s runtime config', s: 'A second model, per action', g: 'Platform admins, in the platform’s ACLs', o: 'The principal, with a signature, from its own account' },
  { p: 'What is bounded', c: 'Reach: files, network, shell', s: 'Individual actions, probabilistically', g: 'Actions the platform can see', o: 'Authority: payee, ceiling, method, target, time, one exact intent' },
  { p: 'Enforced by', c: 'OS sandbox, egress rules', s: 'A classifier with a miss rate', g: 'The platform’s policy engine', o: 'Enforcer contracts that execute at redemption, outside the model' },
  { p: 'Revocation', c: 'Kill the process', s: 'Stop the task', g: 'Edit the ACL; branch and roll back', o: 'One transaction; refused at the next gate, everywhere, with no list to update' },
  { p: 'Evidence', c: 'Process logs', s: 'The monitor’s verdicts', g: 'The platform’s lineage', o: 'A receipt in the owner’s vault: grant · decision · tx · playbook digest — verifiable without the runtime' },
  { p: 'Answers “under whose authority?”', c: 'No', s: 'No', g: 'Inside the platform', o: 'Yes, to any counterparty, cryptographically' },
  { p: 'Survives the vendor', c: 'No', s: 'No', g: 'No', o: 'Yes — the account, the grant and the receipt are the owner’s' },
] as const;

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
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-dark absolute inset-0" aria-hidden />
        <div className="container-x relative py-24 md:py-32">
          <p className="eyebrow-dark">Versus</p>
          <h1 className="display mt-6 max-w-4xl">Every other answer is a throttle.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            The labs contain the agent. The labs supervise the agent. The platforms govern the agent inside their walls.
            All three are honest engineering, and all three leave the same question unanswerable: under whose authority did that act happen, and can the owner end it?
          </p>
        </div>
      </section>

      <Section tone="ink" number="01" eyebrow="Three throttles, one rail" title="What each answer buys, and where it stops." wide>
        <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
          {INDUSTRY_ANSWERS.map((a, i) => (
            <article key={a.id} className="flex flex-col bg-ink p-7">
              <div className="flex items-center justify-between">
                <span className="num-mark text-white/40">THROTTLE 0{i + 1}</span>
                <span className="font-mono text-[11px] text-slate-500">{a.who}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-white">{a.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{a.claim}</p>
              <dl className="mt-6 space-y-4 text-sm">
                <div><dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal-bright">What it buys</dt><dd className="mt-1 text-slate-300">{a.buys}</dd></div>
                <div><dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-rose-bright">Where it stops</dt><dd className="mt-1 text-slate-300">{a.stops}</dd></div>
              </dl>
              <p className="mt-auto border-t border-white/10 pt-5 text-[15px] font-semibold text-white">{a.edge}</p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Figure dark caption="Three throttles put the agent in a smaller room, watch it, or fence it inside one vendor. Each bounds something; none bounds authority. The rail leaves the agent as capable as you like and bounds what it MAY do: a grant the principal signs, caveats that are code, enforcement outside the model, a receipt the owner carries, revocation in one transaction.">
            <ThrottlesVsRail />
          </Figure>
        </div>

        <div className="mt-10 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-400">
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Containment</th>
                <th className="px-4 py-3">Supervision</th>
                <th className="px-4 py-3">Platform governance</th>
                <th className="px-4 py-3 text-brass">Authority as a grant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {PROPERTIES.map((r) => (
                <tr key={r.p} className="align-top">
                  <td className="px-4 py-4 font-semibold text-white">{r.p}</td>
                  <td className="px-4 py-4 text-slate-400">{r.c}</td>
                  <td className="px-4 py-4 text-slate-400">{r.s}</td>
                  <td className="px-4 py-4 text-slate-400">{r.g}</td>
                  <td className="bg-brass/[0.06] px-4 py-4 text-slate-100">{r.o}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <Claim attribution="Why the fourth column is a different kind of answer">{OUR_ANSWER.claim}</Claim>
        </div>
      </Section>

      <Section number="02" eyebrow="The stitched stack" title="The seams are the other problem." lede="Even a team that wants rails will be handed ten products: a login vendor, a permissions table, a multisig, a payments SDK, an agent framework, an approvals bot, a tracing product, a secrets store, a directory, an MCP server with a key in its config. Each seam is where identity changes shape and accountability leaks.">
        <Figure caption="The same ten needs, twice. On the left each product has its own identity model, permission shape and audit format. On the right the needs are slots in one model — one Smart Agent, one grant mechanism, one evidence trail.">
          <StitchedVsSeamless />
        </Figure>
        <div className="mt-10">
          <Ledger
            cols="md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.3fr)]"
            rows={NEEDS.map((n) => ({
              k: n.need,
              v: (
                <div className="grid gap-4 md:grid-cols-2">
                  <div><div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-rose">Stitched</div><div className="mt-1 text-slate-500">{n.stitched}</div></div>
                  <div><div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal">On the substrate</div><div className="mt-1 text-slate-800">{n.seamless}</div></div>
                </div>
              ),
              meta: n.why,
            }))}
          />
        </div>
      </Section>

      <Section id="bom" tone="ink" number="03" eyebrow="The bill of materials" title="What it actually takes to assemble this from products. We did it once." lede="Before this substrate existed, we built the same capability set the way everyone does: pick a product for every need, contract for it, integrate it, and then reconcile the identity models, permission shapes and audit formats they each brought with them. This is the tally. The right-hand column is what the repository ships today — 77 packages under one npm scope and 33 EVM contracts — with the seams designed out rather than papered over." wide>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow-dark text-rose">Stitched — the first time</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {BOM_TOTALS.stitched.map((s) => <Stat key={s.label} dark value={s.value} label={s.label} note={s.note} />)}
            </div>
          </div>
          <div>
            <p className="eyebrow-dark">On the substrate — now</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {BOM_TOTALS.substrate.map((s) => <Stat key={s.label} dark value={s.value} label={s.label} note={s.note} />)}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Claim attribution="Richard Pedersen — after building it the first time">
            The nightmare was never any one product. It was the thirty seams between them, every one of which was where a person became a token, the token became a row, and the row became a log line nobody could trace back to a decision.
          </Claim>
        </div>

        <div className="mt-16">
          <p className="eyebrow-dark">Need by need — what you would assemble, what you would configure, where it bites, and what covers it here</p>
          <div className="mt-6 ledger-dark">
            {BOM.map((r) => (
              <div key={r.need} className="grid gap-6 py-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)_minmax(0,1.3fr)]">
                <div>
                  <div className="text-lg font-semibold text-white">{r.need}</div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.packages.map((p) => <Tag key={p} tone="dark">{p}</Tag>)}
                    {r.contracts.map((c) => <Tag key={c} tone="brass">{c}.sol</Tag>)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-rose">Stitched</div>
                  <ul className="mt-2 space-y-1 text-[15px] text-slate-300">{r.products.map((p) => <li key={p}>— {p}</li>)}</ul>
                  <div className="mt-3 text-sm leading-relaxed text-slate-400"><span className="font-semibold text-slate-300">You configure:</span> {r.config}</div>
                  <div className="mt-2 text-sm leading-relaxed text-rose-200/80"><span className="font-semibold">The seam:</span> {r.seam}</div>
                </div>
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal">On the substrate</div>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-100">{r.substrate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="card-dark">
            <p className="eyebrow-dark">Then</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">Thirty vendor evaluations. Thirty integrations. Thirty-three contracts to write, fork or audit. A wiki page explaining how the identity in product four maps to the identity in product nine — and an incident when it did not.</p>
          </div>
          <div className="card-dark">
            <p className="eyebrow-dark">Now</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300"><span className="font-mono text-brass">pnpm add @agenticprimitives/*</span>, the contracts already deployed to the estate, one identity, one grant mechanism, one evidence trail. Describe the application; the packages and contracts already agree with each other.</p>
          </div>
          <div className="card-dark">
            <p className="eyebrow-dark">What did not change</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">The rigour. Every one of those 33 contracts is still a contract; every grant is still signed and revocable; every act still leaves a receipt. The seams went away. The guarantees did not.</p>
          </div>
        </div>
      </Section>

      <Section tone="cream" number="04" eyebrow="Against the categories" title="Where each category is strong, and where it stops." lede="We take from all of them. What none of them does is compose identity, authority and evidence into one model a counterparty can verify without trusting the platform.">
        <Ledger
          cols="md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1.6fr)]"
          rows={FRAMEWORKS.map(([c, s, w]) => ({
            k: c,
            v: (
              <div className="grid gap-4 md:grid-cols-[0.6fr_1fr]">
                <div><div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal">Strong at</div><div className="mt-1 text-slate-700">{s}</div></div>
                <div><div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-rose">Where it stops</div><div className="mt-1 text-slate-700">{w}</div></div>
              </div>
            ),
          }))}
        />
        <div className="mt-8">
          <Callout tone="amber">
            Five properties are contract-enforced here and policy code everywhere else: identity survives the runtime · ERC-7710 attenuation · on-chain revocation per step · intent-digest binding · intent-derived single-use nonce.
          </Callout>
        </div>
      </Section>

      <Section number="05" eyebrow="What we deliberately are not" title="Honest boundaries.">
        <Ledger
          rows={[
            { k: 'Not an LLM framework.', v: 'The planner is a port. Bring your model and your prompting; the harness makes sure what it proposes runs only under a grant.' },
            { k: 'Not a token or a public chain.', v: 'Contracts deploy to any EVM — a private QBFT network, an L2, a testnet. The demo estate runs a free-gas private chain. There is no token to buy.' },
            { k: 'Not a registry, a wallet or a Home.', v: 'Ring 0 is the primitives those are built from. The Home, discovery and naming services you see running are products in their own repositories, importing the packages — as yours will.' },
            { k: 'Not a replacement for containment.', v: 'Sandbox your runtimes. Supervise where it helps. Then answer the question neither can: under whose authority, and can the owner end it. That is the layer this is.' },
          ]}
        />
      </Section>

      <CTA title="See the rail in a real application." body="Game Night needed every line in the tables above. It built a card room." primary={{ href: '/examples/game-night', label: 'Game Night case study' }} secondary={{ href: '/platform', label: 'The nine capabilities' }} />
    </>
  );
}
