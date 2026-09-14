import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Fingerprint, KeyRound, ScrollText } from 'lucide-react';
import { AUDIENCES, ESSAYS, GAME_NIGHT, NEEDS, OFFERINGS, PILLARS, SITE } from '@apsite/content';
import { StitchedVsSeamless, SubstrateLayers } from '@apsite/diagrams';
import { Callout, CTA, Figure, Section, Shot, Tag } from '@/components/ui';
import { HOME_FAQ, JsonLd, pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: `${SITE.name} — ${SITE.tagline}`,
  description:
    'One substrate for agentic applications: identity, authority and evidence designed as one system. Smart Agents for people, organizations and services; scoped, revocable grants; receipts the owner carries. Open source.',
  path: '/',
});

const ICONS = { identity: Fingerprint, authority: KeyRound, evidence: ScrollText } as const;

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: HOME_FAQ.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-fade absolute inset-0 -z-10" aria-hidden />
        <div className="container-x grid items-center gap-12 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
          <div>
            <p className="eyebrow">The trust substrate for agentic applications</p>
            <h1 className="h1 mt-4">
              One substrate.
              <br />
              Every capability an agentic app needs.
            </h1>
            <p className="lede mt-6 max-w-xl">
              Identity, authority and evidence — designed as one system, not stitched from ten products. People,
              organizations and AI agents become Smart Agents with real, revocable authority and an accountable trail.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/examples/game-night" className="btn-primary">
                See it running: Game Night <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/substrate" className="btn-secondary">Read the architecture</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {['ERC-4337', 'ERC-7710', 'A2A 1.0', 'MCP', 'W3C PROV-O', 'OIDC + passkeys', 'W3C VC'].map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
          </div>
          <div className="relative">
            <div className="card !p-0 overflow-hidden">
              <div className="border-b border-line bg-cream px-4 py-2 font-mono text-[11px] text-slate-500">what every action can answer</div>
              <div className="divide-y divide-line">
                {PILLARS.map((p) => {
                  const Icon = ICONS[p.id];
                  return (
                    <div key={p.id} className="flex gap-4 px-5 py-4">
                      <div className="mt-0.5 rounded-lg bg-navy-soft p-2 text-navy"><Icon className="h-5 w-5" /></div>
                      <div>
                        <div className="text-sm font-semibold text-navy">{p.question}</div>
                        <div className="mt-0.5 text-sm text-slate-600">{p.title}</div>
                        <div className="mt-1 font-mono text-[11px] text-slate-500">{p.proof}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-amber-soft px-5 py-3 text-sm font-medium text-amber">
                Intelligence may be probabilistic. Authority must not be.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO */}
      <Section tone="cream" eyebrow="Who this is for" title="A platform decision, not a vendor integration project." lede="Teams building applications where people, organizations and AI agents act together — and where someone will eventually ask who authorized what.">
        <div className="grid gap-6 md:grid-cols-3">
          {AUDIENCES.map((a) => (
            <div key={a.who} className="card">
              <h3 className="h3">{a.who}</h3>
              <p className="mt-3 text-sm text-slate-600"><span className="font-semibold text-slate-800">You want:</span> {a.want}</p>
              <p className="mt-2 text-sm text-slate-600"><span className="font-semibold text-slate-800">You get:</span> {a.get}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* STITCHED VS SEAMLESS */}
      <Section eyebrow="Why one substrate" title="Ten products, or one model." lede="Most agentic stacks are assembled: a login vendor, a permissions table, a multisig, a payments SDK, an agent framework, an approvals bot, a tracing product, a secrets store, a directory, an MCP server with a key in its config. Each seam is a place where identity, permission and evidence change shape — and where nobody can answer who acted.">
        <Figure caption="Left: the stack most teams assemble and the glue between the parts. Right: the same needs as slots in one model, sharing one identity, one authority mechanism and one evidence trail. Every layer on the right reads and writes the same Smart Agent, the same grants and the same receipts.">
          <StitchedVsSeamless />
        </Figure>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3 pr-4">The need</th>
                <th className="py-3 pr-4">Stitched</th>
                <th className="py-3 pr-4">With Agentic Primitives</th>
                <th className="py-3">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {NEEDS.map((n) => (
                <tr key={n.need} className="border-b border-line/70 align-top">
                  <td className="py-3 pr-4 font-semibold text-navy">{n.need}</td>
                  <td className="py-3 pr-4 text-slate-500">{n.stitched}</td>
                  <td className="py-3 pr-4 text-slate-800">{n.seamless}</td>
                  <td className="py-3 text-slate-600">{n.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-end">
          <Link href="/compare" className="btn-ghost">The full comparison <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* THE SUBSTRATE */}
      <Section tone="cream" eyebrow="The architecture" title="Application on harness, harness on authority, authority on identity, identity on chain." lede="Every layer is a published package or a deployed contract. Admission runs at the edge of every request; evidence is written for every protected step; the ontology binds the vocabulary so the code cannot invent its own.">
        <Figure caption="The substrate in layers. The harness turns an ask into an intent, a mandate, a plan, per-step verification and a receipt. Authority is a signed delegation with caveats, revocable in one transaction. Identity is a Smart Agent per person, organization and service. The chain anchors all three. Edge admission and evidence run alongside every layer.">
          <SubstrateLayers />
        </Figure>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.id} className="card">
              <p className="eyebrow">{p.question}</p>
              <h3 className="h3 mt-2">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Link href="/substrate" className="btn-ghost">Deep dive into the architecture <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      {/* OFFERINGS */}
      <Section eyebrow="The platform" title="Nine capabilities. Each independently adoptable. Each depending only downward." lede="Take Identity alone and you have passkey sign-in to durable agents. Add Authority and every action is a scoped, revocable grant. Add the Harness and your AI agents act only under those grants. Nothing is a monolith; everything composes.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map((o) => (
            <Link key={o.id} href={`/platform#${o.id}`} className="card group transition hover:-translate-y-0.5 hover:border-navy">
              <div className="flex items-center justify-between">
                <h3 className="h3 group-hover:text-navy">{o.name}</h3>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-navy" />
              </div>
              <p className="mt-2 text-sm font-medium text-slate-700">{o.oneLine}</p>
              <p className="mt-3 text-xs text-slate-500">Replaces: {o.replaces.slice(0, 2).join(' · ')}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* GAME NIGHT TEASER */}
      <Section tone="navy" eyebrow="A complete example" title="Game Night: a card room where people and AI agents sit at the same table." lede="A real third-party application on the substrate. Passkey sign-in, a treasury per player, a buy-in the player authorizes with caveats, AI players over A2A, clubs as workspace agents, a coach that runs under a study grant, and a receipt for every chip that moves. The card room owns one contract and holds no player's key.">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <Shot src="/shots/gamenight-play.png" alt="Game Night — Play, signed in as Alice" caption="gamenight.faithnet.io — Play, as Alice. Deal me in to hold’em or canasta." />
          <div>
            <div className="grid grid-cols-2 gap-3">
              {GAME_NIGHT.stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/15 bg-white/5 p-4">
                  <div className="text-3xl font-semibold">{s.value}</div>
                  <div className="text-sm font-medium text-slate-200">{s.label}</div>
                  <div className="mt-1 text-xs text-slate-400">{s.note}</div>
                </div>
              ))}
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-200">
              {GAME_NIGHT.requirements.slice(0, 6).map((r) => (
                <li key={r.id} className="flex gap-2"><span className="text-amber-300">▸</span><span><span className="font-semibold text-white">{r.need}.</span> {r.built}</span></li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/examples/game-night" className="btn bg-amber-400 text-navy hover:bg-amber-300">The full case study <ArrowRight className="h-4 w-4" /></Link>
              <a href={GAME_NIGHT.url} className="btn border border-white/30 text-white hover:bg-white/10" target="_blank" rel="noreferrer">Play it (play money)</a>
            </div>
          </div>
        </div>
      </Section>

      {/* PRINCIPLES */}
      <Section eyebrow="Principles that do not bend" title="What makes it a substrate rather than a framework.">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ['The agent is an account.', 'Every person, organization and service IS its Smart Agent address. Names, cards, registry rows and DID documents are projections, each carrying a proof the anchor signed.'],
            ['Authority is a grant, not a token.', 'A delegation with caveats, verified before every step and again on chain when value moves. Revocation is one transaction; nothing is cached.'],
            ['Intelligence proposes; it never authorizes.', 'The planner can propose any step. The step runs only if a live grant covers it. A hijacked planner cannot exceed the caveats.'],
            ['Evidence is the owner\'s, not the platform\'s.', 'Receipts and PROV-O provenance land in the owner\'s vault. A counterparty can verify them without the runtime\'s cooperation.'],
            ['Trust is relational, never a score.', 'Whether you should let this agent do that is a property of the pair of you and the intent — read from attestations, relationships and receipts you can check.'],
            ['Standards where they exist.', 'ERC-4337/7710/7579, A2A 1.0 (TCK-green), MCP, OIDC + FedCM, W3C VC and PROV-O. Bridges to other registries live outside the core, importing it — never the reverse.'],
          ].map(([t, b]) => (
            <div key={t} className="card">
              <h3 className="h3">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{b}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Callout tone="navy">
            Honest status: ready for test and pre-production environments. A comprehensive primitive set under an actively running audit; every security finding ever logged is public in the repository.
          </Callout>
        </div>
      </Section>

      <Section eyebrow="Writing" title="Rails, not throttles." lede="The operating model around the LLM is what has to change. The 21-part series and the long essay are on this site — no LinkedIn login.">
        <div className="grid gap-4 md:grid-cols-2">
          {ESSAYS.map((w) => (
            <Link key={w.slug} href={`/writing/${w.slug}`} className="card group hover:border-navy">
              <p className="eyebrow">Essay</p>
              <h3 className="h3 mt-2 group-hover:text-teal">{w.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{w.description}</p>
            </Link>
          ))}
          <Link href="/writing" className="card group hover:border-navy">
            <p className="eyebrow">Series · 21 days</p>
            <h3 className="h3 mt-2 group-hover:text-teal">The missing layer</h3>
            <p className="mt-3 text-sm text-slate-600">One idea a day: the anchor, authority, trust, and how an agent actually acts. Full text here.</p>
          </Link>
        </div>
      </Section>

      <CTA
        title="Start with one capability. Grow into the rest."
        body="Install the packages, point at a chain, run the live gates. Or read how Game Night did it in a card room that exercises every layer."
        primary={{ href: '/developers', label: 'Developer guide' }}
        secondary={{ href: SITE.github, label: 'Browse the source' }}
      />
    </>
  );
}
