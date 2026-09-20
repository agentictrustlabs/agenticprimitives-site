import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AUDITS, ELSEWHERE, ESSAYS, GAME_NIGHT, INDUSTRY_ANSWERS, MANIFESTO, NEEDS, OFFERINGS, OUR_ANSWER, PILLARS, SITE } from '@apsite/content';
import { StitchedVsSeamless, SubstrateLayers } from '@apsite/diagrams';
import { Mark } from '@/components/Mark';
import { Claim, CTA, Figure, Ledger, Section, Shot, Tag } from '@/components/ui';
import { HOME_FAQ, JsonLd, pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: `${SITE.name} — Rails, not throttles`,
  description:
    'Agentic Primitives is the open-source trust substrate for AI agents: identity that can sign, authority as a revocable grant, receipts the owner carries.',
  path: '/',
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: HOME_FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-dark absolute inset-0" aria-hidden />
        <div className="glow-brass absolute inset-0" aria-hidden />
        <div className="container-x relative grid items-end gap-14 py-24 md:grid-cols-[1.25fr_1fr] md:py-36">
          <div>
            <p className="eyebrow-dark">The trust substrate for agentic applications</p>
            <h1 className="display mt-6">
              <span className="mb-4 block text-lg font-semibold tracking-[0.02em] text-brass md:text-xl">Agentic Primitives</span>
              Rails,
              <br />
              not throttles.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl">
              The industry’s answer to agent risk is to make the agent smaller — sandboxes, restricted modes, a second
              model grading the first. Agentic Primitives bounds what it <em className="not-italic text-white">may do</em>:
              a signed, caveated, revocable grant, enforced by code outside the model, receipted for the owner. Open source.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/compare" className="btn-brass">
                Why every other answer is a throttle <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/examples/game-night" className="btn-outline-light">See it running</Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-2">
              {['ERC-4337', 'ERC-7710', 'A2A 1.0', 'MCP', 'W3C PROV-O', 'passkeys', 'W3C VC'].map((s) => (
                <Tag key={s} tone="dark">{s}</Tag>
              ))}
            </div>
          </div>

          <aside className="relative">
            <div className="rounded-xl border border-white/10 bg-ink-2/80 p-7 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="eyebrow-dark">What every action can answer</span>
                <Mark className="h-6 w-6 text-white/60" />
              </div>
              <ol className="mt-6 divide-y divide-white/10">
                {PILLARS.map((p, i) => (
                  <li key={p.id} className="grid grid-cols-[2rem_1fr] gap-3 py-4">
                    <span className="num-mark pt-1 text-white/40">0{i + 1}</span>
                    <div>
                      <div className="text-lg font-semibold text-white">{p.question}</div>
                      <div className="mt-1 text-sm text-slate-400">{p.title}</div>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-white/10 pt-5 text-[15px] font-semibold text-brass">{OUR_ANSWER.line}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── STATUS STRIP ─────────────────────────────────────────────────────────────── */}
      {(() => {
        const a = AUDITS[0]!;
        return (
          <section className="border-y border-white/10 bg-ink-2 text-white">
            <div className="container-x flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
              <p className="text-sm leading-relaxed text-slate-300">
                <span className="mr-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">Status · {a.date}</span>
                <span className="font-semibold text-white">Pre-production, honestly labelled.</span>{' '}
                GO for testnet pilots on our own chain · NO-GO for real private data, real value, public mainnet — each with dated closing conditions.{' '}
                <span className="text-slate-500">77 packages · 939/939 contract tests · 54 open findings, all public.</span>
              </p>
              <Link href={`/audits/${a.slug}`} className="btn-outline-light shrink-0 !px-4 !py-2 text-sm">
                Read the assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        );
      })()}

      {/* ── THE FEAR, AND THREE THROTTLES ────────────────────────────────────────────── */}
      <Section tone="ink" number="01" eyebrow="The state of the argument" title="Everyone now admits a capable agent has a blast radius. Then they reach for a throttle." lede="Three answers dominate. Each is real engineering. Each stops at the same place: none can say, for an act that happened, under whose authority it happened — or refuse the next one because that authority is gone." wide>
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
                <div>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal-bright">What it buys</dt>
                  <dd className="mt-1 text-slate-300">{a.buys}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-rose-bright">Where it stops</dt>
                  <dd className="mt-1 text-slate-300">{a.stops}</dd>
                </div>
              </dl>
              <p className="mt-auto border-t border-white/10 pt-5 text-[15px] font-semibold text-white">{a.edge}</p>
            </article>
          ))}
        </div>

        <div className="relative mt-6 overflow-hidden rounded-xl border border-brass/40 bg-gradient-to-br from-brass/[0.12] via-ink to-ink p-8 md:p-12">
          <div className="glow-teal absolute inset-0" aria-hidden />
          <div className="relative grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="num-mark text-brass">THE RAIL</span>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.025em] text-white md:text-4xl">{OUR_ANSWER.name}</h3>
              <p className="mt-5 text-lg leading-relaxed text-slate-200">{OUR_ANSWER.claim}</p>
              <Link href="/substrate" className="btn-brass mt-8">
                How the grant is built <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <ol className="divide-y divide-white/10">
              {OUR_ANSWER.points.map((p, i) => (
                <li key={p.t} className="grid grid-cols-[2rem_1fr] gap-3 py-4">
                  <span className="num-mark pt-1 text-white/40">0{i + 1}</span>
                  <div>
                    <div className="font-semibold text-white">{p.t}</div>
                    <div className="mt-1 text-sm leading-relaxed text-slate-400">{p.b}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ── THE THREE QUESTIONS ──────────────────────────────────────────────────────── */}
      <Section number="02" eyebrow="What the substrate guarantees" title="Three questions, answerable for every act — by a counterparty, without trusting the platform." lede="Not a dashboard the operator shows you. A signature you can check, a grant you can read, a receipt the owner carries.">
        <Ledger
          rows={PILLARS.map((p) => ({
            k: (
              <>
                <div className="eyebrow">{p.question}</div>
                <div className="mt-2 text-xl font-semibold tracking-[-0.015em] text-navy">{p.title}</div>
              </>
            ),
            v: p.body,
            meta: p.proof,
          }))}
        />
      </Section>

      {/* ── ARCHITECTURE ─────────────────────────────────────────────────────────────── */}
      <Section tone="ink" number="03" eyebrow="The architecture" title="Application on harness. Harness on authority. Authority on identity. Identity on chain." lede="Every layer is a published package or a deployed contract. Admission runs at the edge of every request; evidence is written for every protected step; the ontology binds the vocabulary so the code cannot invent its own.">
        <Figure dark caption="The substrate in layers. The harness turns an ask into an intent, a mandate, a plan, per-step verification and a receipt. Authority is a signed delegation with caveats, revocable in one transaction. Identity is a Smart Agent per person, organization and service. The chain anchors all three; edge admission and evidence run alongside every layer.">
          <SubstrateLayers />
        </Figure>
        <div className="mt-8 flex justify-end">
          <Link href="/substrate" className="btn-outline-light">Architecture deep dive <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* ── STITCHED VS SEAMLESS ─────────────────────────────────────────────────────── */}
      <Section number="04" eyebrow="Why one substrate" title="Ten products, or one model." lede="An agentic application needs sign-in, organizations, permissions, money, an agent loop, human approval, evidence, service credentials, discovery and tools. Each is sold separately. Every seam between them is where identity becomes a token, permission becomes a row, and the row becomes a log line nobody can trace back to a person’s decision.">
        <Figure caption="Left: the stack most teams assemble and the glue between the parts. Right: the same needs as slots in one model, sharing one identity, one authority mechanism and one evidence trail.">
          <StitchedVsSeamless />
        </Figure>
        <div className="mt-10">
          <Ledger
            cols="md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.3fr)]"
            rows={NEEDS.slice(0, 6).map((n) => ({
              k: n.need,
              v: (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-rose">Stitched</div>
                    <div className="mt-1 text-slate-500">{n.stitched}</div>
                  </div>
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal">On the substrate</div>
                    <div className="mt-1 text-slate-800">{n.seamless}</div>
                  </div>
                </div>
              ),
              meta: n.why,
            }))}
          />
        </div>
        <div className="mt-12 rounded-2xl bg-ink p-8 text-white md:p-10">
          <p className="eyebrow-dark">The bill of materials — we assembled it from products once</p>
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <div className="grid grid-cols-3 gap-4">
              <div><div className="text-4xl font-semibold tracking-[-0.03em] text-rose-300">30+</div><div className="mt-1 text-xs text-slate-400">products to select, contract, integrate</div></div>
              <div><div className="text-4xl font-semibold tracking-[-0.03em] text-rose-300">3</div><div className="mt-1 text-xs text-slate-400">identity models to reconcile</div></div>
              <div><div className="text-4xl font-semibold tracking-[-0.03em] text-rose-300">33</div><div className="mt-1 text-xs text-slate-400">contracts to write, fork and audit</div></div>
            </div>
            <ArrowRight className="hidden h-6 w-6 text-brass md:block" />
            <div className="grid grid-cols-3 gap-4">
              <div><div className="text-4xl font-semibold tracking-[-0.03em] text-white">77</div><div className="mt-1 text-xs text-slate-400">packages under one npm scope</div></div>
              <div><div className="text-4xl font-semibold tracking-[-0.03em] text-white">33</div><div className="mt-1 text-xs text-slate-400">contracts written and under audit</div></div>
              <div><div className="text-4xl font-semibold tracking-[-0.03em] text-white">1</div><div className="mt-1 text-xs text-slate-400">identity · 1 grant mechanism · 1 evidence trail</div></div>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-300">The nightmare was never any one product; it was the seams. Now you describe the application and the packages and contracts already agree with each other.</p>
        </div>
        <div className="mt-8 flex justify-end">
          <Link href="/compare#bom" className="btn-ghost">The full bill of materials <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* ── NINE CAPABILITIES ────────────────────────────────────────────────────────── */}
      <Section tone="cream" number="05" eyebrow="The platform" title="Nine capabilities. Each independently adoptable. Each depending only downward." lede="Take Identity alone and you have passkey sign-in to durable agents. Add Authority and every action is a scoped, revocable grant. Add the Harness and your AI agents act only under those grants.">
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map((o, i) => (
            <Link key={o.id} href={`/platform#${o.id}`} className="group bg-white p-6 transition hover:bg-cream">
              <div className="flex items-center justify-between">
                <span className="num-mark">0{i + 1}</span>
                <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-navy" />
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.015em] text-navy">{o.name}</h3>
              <p className="mt-2 text-sm text-slate-700">{o.oneLine}</p>
              <p className="mt-4 font-mono text-[11px] text-slate-500">replaces · {o.replaces.slice(0, 2).join(' · ')}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ── GAME NIGHT ───────────────────────────────────────────────────────────────── */}
      <Section tone="ink" number="06" eyebrow="A complete example" title="A card room where people and AI agents sit at the same table — and the house holds nobody’s key." lede="A real third-party application on the substrate. Passkey sign-in, a treasury per player, a buy-in the player authorizes with caveats, AI players over A2A, a coach that runs under a study grant, a receipt for every chip that moves." wide>
        <div className="grid items-start gap-10 md:grid-cols-[1.2fr_1fr]">
          <Shot dark src="/shots/gamenight-holdem-hand.png" alt="Game Night — Alice playing a Texas hold’em hand with her coach speaking through alice.me" caption="gamenight.faithnet.io — Alice, on the button. Her coach speaks through alice.me under a study grant. She still presses the button." />
          <div>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              {GAME_NIGHT.stats.map((s) => (
                <div key={s.label} className="bg-ink p-5">
                  <div className="text-4xl font-semibold tracking-[-0.03em] text-white">{s.value}</div>
                  <div className="mt-1 text-sm font-medium text-slate-200">{s.label}</div>
                  <div className="mt-1 text-xs text-slate-500">{s.note}</div>
                </div>
              ))}
            </div>
            <ul className="mt-6 divide-y divide-white/10 border-y border-white/10 text-sm">
              {GAME_NIGHT.requirements.slice(0, 5).map((r) => (
                <li key={r.id} className="grid gap-1 py-3">
                  <span className="font-semibold text-white">{r.need}</span>
                  <span className="text-slate-400">{r.built}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/examples/game-night" className="btn-brass">The case study <ArrowRight className="h-4 w-4" /></Link>
              <a href={GAME_NIGHT.url} className="btn-outline-light" target="_blank" rel="noreferrer">Play it — play money</a>
            </div>
          </div>
        </div>
      </Section>

      {/* ── MANIFESTO ────────────────────────────────────────────────────────────────── */}
      <Section number="07" eyebrow="Principles that do not bend" title="What makes it a substrate rather than a framework.">
        <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          {MANIFESTO.map((m, i) => (
            <li key={m} className="grid grid-cols-[2.5rem_1fr] gap-4 bg-white p-6">
              <span className="num-mark pt-1.5">0{i + 1}</span>
              <p className="text-xl font-semibold leading-snug tracking-[-0.015em] text-navy">{m}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-3xl text-sm text-slate-500">
          Honest status: pre-production. GO for testnet pilots and demonstrations; NO-GO for a real person’s private data, real value under delegated payments, and a public mainnet — each with named, dated closing conditions. Every finding ever logged is public: read the{' '}
          <Link href="/audits" className="text-teal hover:underline">production readiness assessment</Link>, or take the{' '}
          <Link href="/audits/production-readiness-2026-09-18" className="text-teal hover:underline">PDF</Link>.
        </p>
      </Section>

      {/* ── CLAIM ────────────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-28 text-white">
        <div className="grid-dark absolute inset-0" aria-hidden />
        <div className="container-x relative">
          <Claim attribution="The one sentence the whole system is built to make true">
            {OUR_ANSWER.line}
          </Claim>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────────────── */}
      <Section tone="cream" number="08" eyebrow="Agentic Primitives, in short" title="Questions people ask first.">
        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          {HOME_FAQ.map((f) => (
            <div key={f.q} className="bg-white p-7">
              <dt className="text-lg font-semibold text-navy">{f.q}</dt>
              <dd className="mt-3 text-[15px] leading-relaxed text-slate-600">
                {f.a}
                {f.q.includes('production-ready') && (
                  <>{' '}<Link href="/audits" className="font-semibold text-teal hover:underline">Read the assessment →</Link></>
                )}
                {f.q === 'What is Agentic Primitives?' && (
                  <>{' '}<Link href="/what-is-agentic-primitives" className="font-semibold text-teal hover:underline">The definition, in full →</Link></>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ── AROUND THE SUBSTRATE ─────────────────────────────────────────────────────── */}
      <Section tone="ink" number="09" eyebrow="Around the substrate" title="Who builds on it, and where the ontologies come from." lede="The substrate is one repository. The domain ontologies it binds to, the Home people sign in through, and the registry that compiles playbooks are their own sites.">
        <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
          {ELSEWHERE.map((e) => (
            <article key={e.id} className="flex flex-col bg-ink p-7">
              <p className="eyebrow-dark">{e.role}</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white">
                <a href={e.url} rel="noreferrer" className="hover:text-brass">{e.name}</a>
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{e.blurb}</p>
              <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-6 text-sm">
                {e.links.map((l) => (
                  <li key={l.href}><a href={l.href} rel="noreferrer" className="text-brass hover:underline">{l.label} →</a></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* ── WRITING ──────────────────────────────────────────────────────────────────── */}
      <Section number="10" eyebrow="Writing" title="The argument, in full." lede="The operating model around the LLM is what has to change. The thesis states the bet against the field’s consensus; the long essay and the 21-part series make the case — all on this site, no LinkedIn login.">
        <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
          {ESSAYS.map((w) => (
            <Link key={w.slug} href={`/writing/${w.slug}`} className="group bg-white p-6 hover:bg-cream">
              <p className="eyebrow">Essay</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.015em] text-navy group-hover:text-teal">{w.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{w.description}</p>
            </Link>
          ))}
          <Link href="/thesis" className="group bg-white p-6 hover:bg-cream">
            <p className="eyebrow">Thesis</p>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.015em] text-navy group-hover:text-teal">Against conventional wisdom: the competing bet</h3>
            <p className="mt-3 text-sm text-slate-600">Thirteen hypotheses and eleven principles against the IdP-as-control-plane consensus — who holds which, and what would make it win.</p>
          </Link>
          <Link href="/writing" className="group bg-white p-6 hover:bg-cream">
            <p className="eyebrow">Series · 21 days</p>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.015em] text-navy group-hover:text-teal">The missing layer</h3>
            <p className="mt-3 text-sm text-slate-600">One idea a day: the anchor, authority, trust, and how an agent actually acts. Full text here.</p>
          </Link>
        </div>
      </Section>

      <CTA
        title="Give your agents real authority. Keep the keys."
        body="Install the packages, point at any EVM, sign people in through a Home. Or read how Game Night did it in a card room that exercises every layer."
        primary={{ href: '/developers', label: 'Developer guide' }}
        secondary={{ href: SITE.github, label: 'Browse the source' }}
      />
    </>
  );
}
