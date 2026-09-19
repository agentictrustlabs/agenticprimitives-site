import type { Metadata } from 'next';
import { Fragment } from 'react';
import Link from 'next/link';
import { OFFERINGS, SITE } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { EstateTopology, OntologyLadder } from '@apsite/diagrams';
import { CTA, Figure, Section, Shot, Tag } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'Platform — nine capabilities',
  description: 'Nine capabilities of Agentic Primitives — Identity, Authority, Harness, Edge, Registry Kit, Evidence, Coordination, Ontology, Operations — what each replaces.',
  path: '/platform',
});

/** The ontology rung of the ladder, shown live: upper → domain → archetype → artifacts, from skills.faithnet.io as alice. */
function OntologyLadderSection() {
  return (
    <Section tone="ink" eyebrow="Ontology, live" title="Define the domain once. Every agent surface is projected from it." lede="An upper ontology says what every agentic system has. A domain ontology imports it and says what this domain has. An archetype bundles the skills, capabilities and ontology areas one kind of agent needs. From that, the A2A signed agent card and the SKILL.md packages are generated — never typed by hand. Meaning flows down the ladder; authority never does.">
      <Figure dark caption="Four rungs, one class followed down them. th:StudyGrant is a subclass of at:Delegation; the coach archetype declares it must know that class; the review SKILL.md names it in knowledge.requires; the agent card advertises the two capabilities that need it. The grant itself is the only thing that lets the coach see a hand.">
        <OntologyLadder />
      </Figure>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <Shot dark src="/shots/skills-upper-delegation.png" alt="Agentic Trust upper ontology — the Delegation & Authority module graph" caption="1 · Upper ontology. agentic-trust, module Delegation & Authority: Delegation ⊑ prov:Entity, Delegator and Delegate as roles, Delegation Caveat, Caveat Enforcer, Trust Assertion — 46 modules that every domain inherits rather than re-mints." />
        <Shot dark src="/shots/skills-holdem-coaching.png" alt="Texas Hold'em domain ontology — the Coaching module graph" caption="2 · Domain ontology. texas-holdem, module Coaching: Coach Service, Study Grant, Consultation, Hand Review, Coach Note, Review Request — each grounded on an at: class from the rung above (◇ marks the inherited base)." />
        <Shot dark src="/shots/skills-holdem-archetypes.png" alt="Agent archetypes for Texas Hold'em — Hold'em Coach and the coach Bob custodies" caption="3 · Archetype. Hold'em Coach: eight card-room skills, the capabilities poker.advise and poker.review, and fourteen ontology areas from Study Grant to Coach Note. A second archetype layers Bob's doctrine on the same craft." />
        <Shot dark src="/shots/skills-holdem-agent-card.png" alt="The Hold'em Coach's A2A signed agent card — ES256, delegate-signed, verifiable against the JWKS" caption="4 · Artifacts. The A2A agent card, server-built and signed by a delegate key the author authorised once, verifiable by anyone against the published JWKS. Its skills[] are the capability ids the ontology names; the SKILL.md packages beside it compile by digest." />
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="card-dark">
          <p className="eyebrow-dark">What this replaces</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">A system prompt that explains the domain, a table in the app that disagrees with it, an agent card typed by hand and a playbook that names things the model has never heard of.</p>
        </div>
        <div className="card-dark">
          <p className="eyebrow-dark">What is checked</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">SHACL shapes on every class. A SKILL.md whose <span className="font-mono">knowledge.requires</span> names a class the ontology does not have fails to compile. Code that invents a term fails the build.</p>
        </div>
        <div className="card-dark">
          <p className="eyebrow-dark">What is not authority</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">Any of it. The archetype, the card and the playbook are consulted by no verifier. The coach reads Alice's hands under a Study Grant she signed at her Home — and loses them the moment she revokes it.</p>
        </div>
      </div>
      <div className="mt-10"><Link href="/ontology" className="btn-brass">How the ontology reaches every layer →</Link></div>
    </Section>
  );
}

export default function Platform() {
  return (
    <>
      <PageHero eyebrow="Platform" title={<>Nine capabilities.<br />One substrate.</>} lede="Each offering is independently adoptable and depends only on the ones below it. Together they are every capability an agentic application needs — from a person's first passkey to the receipt for an AI agent's last action.">
        <div className="grid w-full gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-9">
          {OFFERINGS.map((o, i) => (
            <a key={o.id} href={`#${o.id}`} className="bg-ink p-3 text-center hover:bg-ink-2">
              <div className="num-mark text-white/40">0{i + 1}</div>
              <div className="mt-1 text-sm font-semibold text-white">{o.name}</div>
            </a>
          ))}
        </div>
      </PageHero>

      <Section tone="ink" number="01" eyebrow="Where it runs" title="An estate: one deployment of the substrate, many applications around it." lede="Home for people and ceremonies, a runtime for agents, vaults for records, an edge for admission, discovery and a skills registry, and a chain for the anchor. Your application is a relying app: an OIDC client and an A2A caller.">
        <Figure dark caption="The faithnet estate as deployed today. Names are the estate's; the shape is the substrate's. Home runs on Vercel; the runtime, vault, edge, discovery and registry are Cloudflare Workers; the chain is a private Besu QBFT network — any EVM works.">
          <EstateTopology />
        </Figure>
      </Section>

      <Section number="02" eyebrow="Live" title="The estate, as its people see it." lede="Screens from the running faithnet estate, signed in as the Home's demo people. Every product here is a relying application of the same substrate.">
        <div className="grid gap-8 md:grid-cols-2">
          <Shot src="/shots/home-messages.png" alt="Home — Messages, with an Ask suggesting a payment and a club invitation" caption="Home · Messages. A conversation with bob.me; the Ask offers 'Finish sending 1.2 USDC to bob.me' — a step that will park for her signature. goose-1.svc and goose-2.svc are runtime members that joined over ACP." />
          <Shot src="/shots/gamenight-money.png" alt="Game Night — Your money, showing alice2.treasury and the authorise-buy-ins ceremony" caption="Game Night · Your money. 10,000 SHQ in the treasury the Home chartered for her; the buy-in authority is signed at her Home — the card room never can." />
          <Shot src="/shots/discovery-landing.png" alt="AP Discovery — find an agent for what you need" caption="Discovery · a public knowledge graph projected only from chain state; the ranking is fit + verifiable trust, never a vendor score." />
          <Shot src="/shots/skills-overview.png" alt="Skills app — Texas Hold'em domain overview, signed in as alice: 95 T-box classes, 16 SHACL shapes, 5 capabilities, 10 linked skills, 2 agent archetypes" caption="Skills · the Texas Hold'em domain as alice sees it. One domain: 95 classes, 16 shapes, 5 capabilities, 10 SKILL.md packages and 2 agent archetypes — derived from agentic-trust, PROV-O and DOLCE. Publishing acts as her Smart Agent." />
        </div>
      </Section>

      {OFFERINGS.map((o, i) => (
        <Fragment key={o.id}>
        <Section id={o.id} tone={i % 2 ? 'cream' : 'white'}>
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow"><span className="text-slate-400">0{i + 1}</span> <span className="mx-2 inline-block h-px w-6 bg-line align-middle" /> {o.name}</p>
              <h2 className="h2 mt-3">{o.oneLine}</h2>
              <p className="lede mt-5 !text-base">{o.what}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">What you would otherwise stitch</h4>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">{o.replaces.map((r) => <li key={r}>— {r}</li>)}</ul>
              </div>
              <div className="card">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Standards</h4>
                <div className="mt-3 flex flex-wrap gap-1.5">{o.standards.map((s) => <Tag key={s} tone="navy">{s}</Tag>)}</div>
              </div>
              <div className="card sm:col-span-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Packages</h4>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {o.packages.map((p) => (
                    <a key={p} href={`${SITE.npmPackage}/@agenticprimitives/${p}`} rel="noreferrer">
                      <Tag tone="teal">@agenticprimitives/{p}</Tag>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>
        {o.id === 'ontology' && <OntologyLadderSection />}
        </Fragment>
      ))}

      <Section tone="ink" eyebrow="How they compose" title="Dependencies point one way. No back-edges.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/15 bg-white/5 p-6 font-mono text-sm leading-7 text-slate-200">
            <div>types ← identity-auth ← agent-account ← delegation ← mcp-runtime</div>
            <div>types ← custody → agent-account, delegation</div>
            <div>key-custody → delegation · tool-policy → mcp-runtime</div>
            <div>orchestration (core) ← orchestration-anthropic (adapter)</div>
            <div>coordination ⟂ orchestration — composed only by the runtime</div>
            <div className="mt-3 text-amber-300">edge, brokers, workload identity: leaf bindings, depend inward</div>
          </div>
          <div className="space-y-4 text-slate-200">
            <p>Ring 0 is packages and contracts. Products — a Home, a discovery service, a naming service, your application — live in their own repositories and import the packages. Integrations with other people's protocols (ERC-8004, ANS, HCS, DNS-AID, OASF) live outside too, importing inward, never the reverse.</p>
            <p>That is what lets you take one offering without the rest, and what keeps a vertical's vocabulary out of the primitives: the packages are generic trust building blocks; branding, verticals and deployment specifics are the application's job.</p>
            <Link href="/developers" className="btn-brass">Package map and quickstart</Link>
          </div>
        </div>
      </Section>

      <CTA title="See all nine at work in one application." body="Game Night uses Identity, Authority, Harness, Edge, Registry Kit, Evidence, Coordination and Operations — in a card room." primary={{ href: '/examples/game-night', label: 'The Game Night case study' }} secondary={{ href: '/substrate', label: 'Architecture deep dive' }} />
    </>
  );
}
