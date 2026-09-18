import type { Metadata } from 'next';
import Link from 'next/link';
import { HOLDEM_GROUNDING, ONTOLOGY_LAYERS, SITE } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { OntologyEveryLayer, OntologyLadder } from '@apsite/diagrams';
import { Claim, CTA, Figure, Section, Shot, Tag } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'Ontology — one description of the world, in every layer',
  description: 'How the Agentic Trust upper ontology and a domain ontology (Texas hold’em coaching) bind every layer of the architecture by IRI — the Ask, the harness, agent cards, vaults, interactions, receipts and the chain — and why meaning flows through it while authority never does.',
  path: '/ontology',
});

const AT_AGENT_CLASSES = ['Agent', 'Person', 'Organization', 'Team', 'Software Agent', 'Service Agent', 'Treasury', 'Registry Agent', 'Workspace Agent', 'Church Agent', 'Circle Agent', 'Household Agent', 'Agent Provider', 'Agent Deployment', 'Agent Archetype', 'Agent Status', 'Intent', 'Endorsement'];
const TH_COACHING_CLASSES = ['Coach Service', 'Study Grant', 'Consultation', 'Advice Request', 'Review Request', 'Hand Review', 'Hand Record', 'Coach Note', 'Adviser Appointment', 'Person’s Own Agent, Advising'];

export default function Ontology() {
  return (
    <>
      <PageHero
        eyebrow="Ontology"
        title={<>One description of the world.<br />Every layer binds to it.</>}
        lede="Most agent stacks describe their domain four times: in a system prompt, in a database schema, in an agent card typed by hand, and in a playbook that names things the model has never heard of. They drift, and the drift is invisible. Here the domain is described once — as an ontology — and the conversation, the harness, the card, the vault, the receipt and the chain all bind to that one description by IRI. A term the ontology does not declare cannot be a field of a record, an argument of a tool, or a word on a screen."
        aside={
          <div className="grid gap-3 text-sm">
            {[
              ['Upper', 'DOLCE · PROV-O · EP-Plan · GC — what kind of thing is it?'],
              ['Agentic Trust  (at:)', '46 modules — what every agentic system has'],
              ['Substrate  (ap:)', '39 T-box files in @agenticprimitives/ontology — one per concern'],
              ['Domain  (th:)', 'Texas hold’em — 14 modules, imports at: and card-room'],
              ['Archetype', 'holdem-coach — the classes one kind of agent may mean'],
            ].map(([k, v]) => (
              <div key={k} className="card-dark !p-4">
                <div className="font-mono text-xs text-brass">{k}</div>
                <div className="mt-1 text-slate-300">{v}</div>
              </div>
            ))}
          </div>
        }
      />

      <Section tone="ink" number="01" eyebrow="Two ontologies" title="An upper ontology of agentic systems. A domain ontology of a card room. The second imports the first." lede="Agentic Trust says what every agentic system has: agents in PROV-O’s three kinds, delegation and its caveats, intents, endorsements, deployments, situations. Texas hold’em says what this domain has — tables, hands, coaching, chips — and grounds each class on one above it. Below: the Agent module of the upper ontology, and the Coaching module of the domain, as the skills registry renders them." wide>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Shot dark src="/shots/ontology-at-agent.png" width={826} height={750} alt="Agentic Trust upper ontology — the Agent module graph: Agent ⊑ prov:Agent with Person, Organization, Team, Software Agent, Service Agent, Treasury, Registry Agent, Workspace Agent, Church Agent, Circle Agent, Household Agent, Agent Provider, Agent Deployment, Agent Archetype, Agent Status, Intent and Endorsement" caption="agentic-trust · the Agent module. Every node is ⊑ prov:Agent or an Information Artifact / Category / Attestation about one. Person, Organization and Software Agent are the three kinds nothing may subsume across; Service, Treasury, Registry, Workspace, Team, Church, Circle and Household are DERIVED types — the suffix a name carries (.svc .treasury .registry .workspace .team .church .circle) names one of these, never a role. Agent Archetype is an Information Artifact, and an Agent Deployment is a deployment of one." />
            <div className="mt-4 flex flex-wrap gap-1.5">{AT_AGENT_CLASSES.map((c) => <Tag key={c} tone="dark">{c}</Tag>)}</div>
          </div>
          <div>
            <Shot dark src="/shots/ontology-th-coaching.png" width={697} height={576} alt="Texas Hold'em domain ontology — the Coaching module graph: Coach Service, Study Grant, Consultation, Advice Request, Review Request, Hand Review, Hand Record, Coach Note, Adviser Appointment and the Person's Own Agent, Advising" caption="texas-holdem · the Coaching module. A person names her own agent as adviser (Adviser Appointment); the table addresses her agent, which forwards a Consultation to the Coach Service she chose, presenting the Study Grant she signed. The service answers in its own name, reads her Hand Records under the grant, and may append a Coach Note — nothing else. Green nodes are the classes the holdem-coach archetype must know." />
            <div className="mt-4 flex flex-wrap gap-1.5">{TH_COACHING_CLASSES.map((c) => <Tag key={c} tone="brass">{c}</Tag>)}</div>
          </div>
        </div>

        <div className="mt-14">
          <p className="eyebrow-dark">How the coaching module grounds — three tiers, real subsumption</p>
          <div className="ledger-dark mt-4">
            {HOLDEM_GROUNDING.map((g) => (
              <div key={g.domain} className="grid gap-2 py-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
                <div className="font-mono text-[13px] leading-6">
                  <span className="text-teal-300">{g.domain}</span>
                  <span className="text-slate-500"> {g.relation} </span>
                  <span className="text-brass">{g.upper}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{g.means}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">The middle tier, <span className="font-mono">card-room (cr:)</span>, is what hold’em shares with canasta: a coach, a study grant, a consultation, a review are the same things at either table. Hold’em adds the hand. Where the correspondence is alignment rather than identity the T-box says <span className="font-mono">rdfs:seeAlso</span>, not <span className="font-mono">subClassOf</span> — the ontology is honest about what it does not know.</p>
        </div>
      </Section>

      <Section number="02" eyebrow="Every layer" title="The ontology is not a documentation layer. It is the spine." lede="Seven layers of the architecture ask the ontology a question, and each binds to the answer by IRI from a module in @agenticprimitives/ontology. The same T-box grounds on the upper ontologies and is extended by the domain. Nothing re-describes the domain; a gate fails the build when code tries." wide>
        <Figure caption="Left: the seven layers, each with the module that binds it. Right: the ontology from upper to archetype. The spine is one T-box. The rail at the bottom is the rule that keeps the whole thing safe to build on: meaning flows through the spine, authority never does — no verifier reads an ontology term as permission.">
          <OntologyEveryLayer />
        </Figure>

        <div className="ledger mt-12">
          {ONTOLOGY_LAYERS.map((l) => (
            <div key={l.layer} className="grid gap-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1.4fr)]">
              <div>
                <div className="text-base font-semibold text-navy">{l.layer}</div>
                <p className="mt-1 text-sm italic leading-relaxed text-slate-500">{l.question}</p>
                <p className="mt-2 font-mono text-[11px] leading-5 text-teal">{l.gate}</p>
              </div>
              <p className="text-sm leading-relaxed text-slate-700"><span className="font-semibold text-navy">Binds: </span>{l.binds}</p>
              <p className="text-sm leading-relaxed text-slate-600"><span className="font-semibold text-rose-700">The bug it replaced: </span>{l.bug}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink" number="03" eyebrow="From ontology to a running agent" title="Upper → domain → archetype → signed card. Meaning flows down. Authority never does." lede="An archetype bundles the classes, capabilities and SKILL.md packages one kind of agent needs; its knowledge.requires is a list of T-box classes, and a package that names one the ontology lacks fails to compile. From the archetype, the A2A agent card is projected and signed — its skills[] are the capability ids the ontology names. The coach can then mean exactly fourteen things about hold’em, and may do none of them until Alice signs a Study Grant at her Home.">
        <Figure dark caption="One class, followed down the ladder: th:StudyGrant ⊑ cr:StudyGrant ⊑ at:Delegation. The archetype declares it must know it; the review package names it; the card advertises the two capabilities that need it. The grant itself — a signed, caveated delegation, verified where the records live — is the only thing that lets the coach see a hand.">
          <OntologyLadder />
        </Figure>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Shot dark src="/shots/skills-holdem-archetypes.png" alt="Agent archetypes for Texas Hold'em — Hold'em Coach and the coach Bob custodies" caption="The archetype. Eight card-room skills, two capabilities (poker.advise, poker.review — never poker.act), fourteen ontology areas from Study Grant to Coach Note. Bob’s coach layers his doctrine on the same craft; the classes are the same." />
          <Shot dark src="/shots/skills-holdem-agent-card.png" alt="The Hold'em Coach's A2A signed agent card" caption="The artifact. The A2A card, server-built and signed by a delegate key the author authorised once. Its skills[] are the capability ids; nobody typed them." />
        </div>
      </Section>

      <Section tone="cream" number="04" eyebrow="What it is not" title="The ontology says what a thing is. Only a grant says what may happen.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Not authority', 'ap:charteredUnder says a treasury is chartered under the person who holds it. A resolver may follow that to find her treasury. A verifier may not read it as permission to pay from it — that is a delegation with a Value caveat, checked on chain at redemption.'],
            ['Not a prompt', 'A planner prompt is the most tempting place to write a domain rule and the worst place to keep one: invisible to every gate, drifting silently, applied confidently to cases it was never meant for. Prompts say how to BEHAVE; the ontology says how the world is SHAPED; prompt text is rendered from the binding.'],
            ['Not a table in the app', 'A lookup table is simpler once. From then on it is a second opinion about the domain, and this page exists because one of those was wrong in production. If the term is missing, adding it to the T-box is the work.'],
          ].map(([k, v]) => (
            <div key={k} className="card">
              <div className="text-base font-semibold text-navy">{k}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Claim dark={false} attribution="agent rule · ontology drives behavior">A string-similarity heuristic standing in for a modelled relationship is the specific failure this exists to prevent.</Claim>
        </div>
      </Section>

      <Section number="05" eyebrow="Who authors the domains" title="The substrate ships the upper ontology. Rich Canvas designs the domains." lede="Agentic Trust (at:) and the substrate modules (ap:) are in the repository. The domain ontologies an application actually binds to — commerce, faith communities, family offices, the everyday domains people live in — are authored by Rich Canvas on top of them and compiled into skill artifacts the registry pins by digest.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [`${SITE.richCanvas}/our-services`, 'Ontology design as a service', 'Rich Canvas authors the shared, machine-checked vocabulary for a domain: who the parties are, what counts as an act, what an approval is, what a receipt proves — then binds it to the substrate by IRI.'],
            [`${SITE.richCanvas}/commercecore-ontology`, 'CommerceCore', 'A commerce ontology for the agentic era — offers, orders, fulfilment and settlement as classes an agent can be granted authority over, with the treasury relationship modelled rather than guessed.'],
            [`${SITE.richCanvas}/didaa`, 'did:aa', 'The DID method for agent accounts: the anchor is an ERC-4337 account, the DID names it, and every projection — card, name, registry entry — carries a proof the anchor signed.'],
          ].map(([href, k, v]) => (
            <a key={href} href={href} rel="noreferrer" className="card block hover:border-navy">
              <div className="text-base font-semibold text-navy">{k} →</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{v}</p>
            </a>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-500">
          More from Rich Canvas: <a href={`${SITE.richCanvas}/why-semantic-metadata`} className="text-teal hover:underline" rel="noreferrer">Why semantic metadata</a> ·{' '}
          <a href={`${SITE.richCanvas}/muses-of-an-architect`} className="text-teal hover:underline" rel="noreferrer">Muses of an architect</a> ·{' '}
          <a href={SITE.richCanvas} className="text-teal hover:underline" rel="noreferrer">richcanvas3.com</a>
        </p>
      </Section>

      <CTA
        title="Browse the namespaces. Then build a domain."
        body="Every T-box module is published with its IRI. The skills registry at skills.faithnet.io renders every module of Agentic Trust and of each domain as a graph, signed in as a demo person."
        primary={{ href: '/ns', label: 'Ontology namespaces' }}
        secondary={{ href: 'https://skills.faithnet.io', label: 'skills.faithnet.io' }}
      />
      <div className="container-x pb-16 text-sm text-slate-500">
        <Link href="/build" className="hover:text-white">Build guide →</Link> · <a href={SITE.github} className="hover:text-white">packages/ontology in the repository →</a>
      </div>
    </>
  );
}
