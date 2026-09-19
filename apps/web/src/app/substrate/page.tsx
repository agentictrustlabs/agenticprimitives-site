import type { Metadata } from 'next';
import { PILLARS } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { AgentTriad, HarnessSequence, MandateAnatomy, SubstrateLayers } from '@apsite/diagrams';
import { Callout, CTA, Figure, Ledger, Section } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'Architecture — the substrate',
  description: 'The Agentic Primitives architecture: Smart Agents for people, organizations and services; delegations, caveats, mandates; the harness; two tiers; receipts.',
  path: '/substrate',
});

export default function Substrate() {
  return (
    <>
      <PageHero eyebrow="Architecture" title={<>Four layers. Two rails.<br />No layer trusts the one above it.</>} lede="Read top-down for how an application uses the substrate. Read bottom-up for why a counterparty can trust what it did without trusting the platform that hosted the request." />

      <Section tone="ink" number="01" eyebrow="The shape" title="Application on harness. Harness on authority. Authority on identity. Identity on chain.">
        <Figure dark caption="Application → Harness → Authority → Identity → Chain, with Edge admission and Evidence alongside every layer. The ontology binds the vocabulary across all of it; the registry kit is how the estate is found.">
          <SubstrateLayers />
        </Figure>
      </Section>

      <Section number="02" eyebrow="Identity" title="Every agent is a Person, an Organization or a Service — and every one is an account." lede="W3C PROV-O's trichotomy, made operational. A treasury, an indexer, a coach and a marketplace are Service roles, never new classes. The human controls a Person Smart Agent with a passkey; from there authority flows between agents, not between wallets.">
        <Figure caption="The canonical example. Alice's passkey controls alice.me; alice.me stewards missio-nexus.org; the organization charters missio.treasury and mints a session wire for catalog.svc; the treasury grants Bob a bounded permission. Every arrow is a signed, caveated, revocable delegation — and the sentence at the bottom is what the audit trail can say afterwards.">
          <AgentTriad />
        </Figure>
        <Ledger
          rows={[
            { k: 'Canonical identity persists; credentials rotate.', v: 'Passkeys, hardware keys and SIWE wallets are control credentials — replaceable under custody policy (guardian quorum, trustee quorum, multi-credential self-recovery). The agent’s address never changes; every delegation it issued stays valid.' },
            { k: 'Typed names say what an agent is.', v: <><span className="font-mono text-navy">.me .org .team .svc .workspace .treasury .registry</span> — a suffix names the derived agent type, checked against the on-chain record and failing closed on a mismatch. A person’s org is never the person’s own address.</> },
            { k: 'Projections, not copies.', v: 'An A2A Agent Card, an ARD record, an ERC-8004 entry, a DNS host, a DID document — each is a signed projection of the one profile. Delete a projection and you have lost a listing, not an identity.' },
          ]}
        />
      </Section>

      <Section tone="ink" number="03" eyebrow="Authority" title="A grant is a signed delegation with caveats. A mandate is a grant bound to one intent." lede="Permission is not a role, a scope or a row. It is an ERC-7710 delegation whose caveats are enforcer contracts that run at redemption: time window, allowed target, allowed method, value ceiling, payee, and — for a mandate — the digest of the exact intent.">
        <Figure dark caption="Anatomy of the buy-in mandate a Game Night player signs. The house may move at most 2,000 SHQ from her treasury to itself, only through the token's transfer method, only for 30 days, only for this exact intent. Revocation is one transaction from her Home.">
          <MandateAnatomy />
        </Figure>
        <Callout tone="dark">
          No silent fallbacks, no cached verdicts. A read or auth path has exactly one mechanism; if the canonical path has no answer it returns empty or throws — it does not escalate to a weaker check. Revocation is final at the next gate, everywhere.
        </Callout>
      </Section>

      <Section number="04" eyebrow="Harness" title="Planner proposes. Mandate authorizes. Executor acts. Receipt proves." lede="The authority-aware agent loop is the difference between “human in the loop” as a click and as a signature. Each step names a tool with a declared risk. For risk at or above high, the person's confirmation is the mandate signature — and the verifier and the chain's enforcers both check it outside the planner's process.">
        <Figure caption="One turn. The planner resolves 'Nathan' in the asker's PRIVATE tier (or refuses — a public directory hit is not evidence she knows that Nathan). The payment step parks; her confirmation mints the mandate; the verifier checks it is live, unrevoked, for this delegate, this selector, this digest; the executor redeems; the enforcers re-check on chain; the receipt lands in her vault.">
          <HarnessSequence />
        </Figure>
        <Ledger
          rows={[
            { k: 'Behaviour is generated; authority never is.', v: 'A playbook (an Agent Skill package, compiled by digest) tells the agent how to behave. It is consulted by no verifier. What an agent MAY do is the grant; what it TENDS to do is the playbook.' },
            { k: 'Durable, streamed, parallel, triggered, billed.', v: 'Runs resume by replaying evidence and re-verifying the acting step. Progress streams as numbered lines. Read-only steps run concurrently; authority-bearing steps run alone. Schedules and messages trigger runs with budgets; every run has a bill.' },
            { k: 'Two tiers of knowledge, never joined in an engine.', v: 'The public knowledge base holds only facts anyone could reproduce from chain state — world-readable by construction. Private records live in per-agent vaults, queried by selectors under per-record delegation. A generated query is never the reason something is disclosed.' },
            { k: 'Coordination is not orchestration.', v: 'Work between agents (endeavors, shared plans, signed commitments, participants found by capability) is a different plane from work within one agent (a run’s execution plan). They never import each other; the runtime composes both; neither is authority.' },
          ]}
        />
      </Section>

      <Section tone="cream" number="05" eyebrow="Evidence" title="Receipts the owner carries." lede="Every protected step leaves a verification receipt bound to the intent, the mandate, the step and the playbook digest, into a hash-chained log and a W3C PROV-O graph with a W3C Trace Context spine. It is held in the owner's vault. A trace id is correlation, never trust; provenance is evidence, never an authorization input.">
        <Ledger
          rows={PILLARS.map((p) => ({
            k: (<><div className="eyebrow">{p.question}</div><div className="mt-2 text-xl font-semibold tracking-[-0.015em] text-navy">{p.title}</div></>),
            v: p.body,
            meta: p.proof,
          }))}
        />
      </Section>

      <Section number="06" eyebrow="Edge" title="HTTPS required. mTLS optional. Admission always." lede="The normative external profile is A2A over HTTPS. A certificate is transport evidence, never authority; a SPIFFE ID names a workload, never an agent. MCP is a private capability interface behind admitted runtimes. The ordering that must never invert: certificate → transport evidence → optional workload binding → application authentication → canonical resolution → Admission.">
        <Callout tone="teal">
          On the A2A→MCP hop, the chain is the authority and MCP OAuth is only the ingress envelope. A bearer carries at most a principal and a reference to an encrypted grant bundle — never delegation or field-level authority. Field access is never encoded in scopes. The Web3 gates are never skipped because “OAuth already authenticated the caller”.
        </Callout>
      </Section>

      <CTA title="See the whole thing in one application." body="Game Night exercises identity, mandates, the harness, A2A admission, a kit-built registry and receipts — in a card room you can play." primary={{ href: '/examples/game-night', label: 'The Game Night case study' }} secondary={{ href: '/developers', label: 'Read the specs' }} />
    </>
  );
}
