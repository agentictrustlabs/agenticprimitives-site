import type { Metadata } from 'next';
import { OFFERINGS, SITE } from '@apsite/content';
import { Callout, CTA, Section, Tag } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Developers — build on the substrate',
  description: 'Install @agenticprimitives/* packages, deploy the contracts to any EVM, wire your app as a relying app of a Home, and let your agents act under grants. Specs, package map, live gates.',
};

const STEPS = [
  { t: 'Sign people in as Smart Agents', b: 'Your app is an OIDC client of a Home. A passkey sign-in yields `alice.me` — an account, not a session. Ask the Home to charter what your app needs on first connect (a treasury, a workspace).', pk: ['identity-auth', 'agent-account', 'agent-naming'] },
  { t: 'Express permissions as grants', b: 'When your app needs to act for a person or organization, mint a delegation with caveats at their Home: targets, methods, ceilings, time. Verify it before every action; redeem it on chain when value moves.', pk: ['delegation', 'custody', 'tool-policy'] },
  { t: 'Let agents act under those grants', b: 'Run an A2A agent on the runtime with a playbook compiled from a SKILL.md contract. The harness parks steps that need a mandate; the person\'s confirmation is the signature; each step leaves a receipt.', pk: ['harness', 'orchestration', 'a2a', 'context'] },
  { t: 'Admit outside agents at the edge', b: 'Publish an Agent Card; admit inbound A2A over HTTPS with application auth, canonical resolution and Admission. Keep MCP private behind admitted runtimes.', pk: ['admission', 'agent-profile', 'agent-resolution'] },
  { t: 'Stand up your own registry', b: 'Deploy a registry from the kit with your membership and validation hooks. Project signed cards to it and to external registries from a sibling repo that imports the core.', pk: ['registry-kit', 'discovery', 'capability-claims'] },
  { t: 'Prove it', b: 'Receipts and PROV-O provenance for every protected step, in the owner\'s vault. Run the conformance gates in CI: `ap doctor`, `ap test`, `ap conform`.', pk: ['provenance', 'evaluation', 'audit'] },
];

export default function Developers() {
  return (
    <>
      <Section eyebrow="Developers" title="Build on the substrate." lede="TypeScript packages, Foundry contracts, an A2A 1.0 runtime and a set of live gates. Everything is open source under MIT; every spec and every ADR is in the repository.">
        <div className="flex flex-wrap gap-3">
          <a href={SITE.github} className="btn-primary" rel="noreferrer">github.com/agentictrustlabs/agenticprimitives</a>
          <a href={SITE.npm} className="btn-secondary" rel="noreferrer">@agenticprimitives on npm</a>
          <a href={`${SITE.github}/tree/master/specs`} className="btn-secondary" rel="noreferrer">Specs (400+)</a>
          <a href={`${SITE.github}/tree/master/docs/architecture/decisions`} className="btn-secondary" rel="noreferrer">ADRs</a>
        </div>
      </Section>

      <Section id="start" tone="cream" eyebrow="Quickstart" title="Six steps from a login to an accountable agent.">
        <ol className="grid gap-4 md:grid-cols-2">
          {STEPS.map((s, i) => (
            <li key={s.t} className="card flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-sm font-semibold text-white">{i + 1}</div>
              <div>
                <h3 className="h3 !text-lg">{s.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.b}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">{s.pk.map((p) => <Tag key={p} tone="teal">@agenticprimitives/{p}</Tag>)}</div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-2xl bg-navy p-6 font-mono text-sm leading-7 text-slate-100">
          <div className="text-slate-400"># install what you need — each package depends only downward</div>
          <div>pnpm add @agenticprimitives/identity-auth @agenticprimitives/agent-account @agenticprimitives/delegation</div>
          <div className="mt-3 text-slate-400"># point at a chain (any EVM) and a Home</div>
          <div>AP_RPC_URL=https://rpc.faithnet.io   AP_CHAIN_ID=34348   AP_HOME_ISSUER=https://www.faithnet.me</div>
          <div className="mt-3 text-slate-400"># run the live gates against your deployment</div>
          <div>pnpm ap doctor && pnpm ap conform</div>
        </div>
      </Section>

      <Section eyebrow="Package map" title="Which package for what.">
        <div className="grid gap-4 md:grid-cols-3">
          {OFFERINGS.map((o) => (
            <div key={o.id} className="card">
              <h3 className="h3">{o.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{o.oneLine}</p>
              <ul className="mt-3 space-y-1">
                {o.packages.map((p) => (
                  <li key={p}><a href={`${SITE.github}/tree/master/packages/${p}`} className="font-mono text-xs text-teal hover:underline" rel="noreferrer">@agenticprimitives/{p}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" eyebrow="Standards" title="What we implement, and what we deliberately keep outside.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card">
            <h3 className="h3">Implemented in the core</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['ERC-4337', 'ERC-7579', 'ERC-7710 / 7715', 'ERC-1271 / 6492', 'A2A 1.0 (TCK-green)', 'MCP (private)', 'OIDC + PKCE + FedCM', 'WebAuthn passkeys', 'W3C VC 2.0', 'W3C PROV-O', 'W3C Trace Context', 'OpenTelemetry', 'SHACL', 'JSON-LD', 'RFC 8785 JCS', 'JWS ES256', 'EIP-712'].map((s) => <Tag key={s} tone="navy">{s}</Tag>)}
            </div>
          </div>
          <div className="card">
            <h3 className="h3">Bridged from sibling repos</h3>
            <p className="mt-2 text-sm text-slate-600">Integrations that speak someone else's protocol import the core and live outside it, so a conformance change never reaches Ring 0.</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['ERC-8004', 'GoDaddy ANS', 'Hashgraph HCS / UAID', 'DNS-AID', 'OASF', 'Veramo / DID', 'ARD v0.91 / ACP registry', 'NANDA'].map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Callout tone="navy">
            Ontology namespaces resolve here: <span className="font-mono">https://agenticprimitives.dev/ns/&lt;module&gt;#Term</span>. Every record key and domain term in the code is bound by IRI to the T-box, and the build fails when code invents vocabulary.
          </Callout>
        </div>
      </Section>

      <Section eyebrow="Status" title="Where the project stands, plainly.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card"><h3 className="h3">Ready for</h3><p className="mt-3 text-sm text-slate-600">Test and pre-production environments. A live estate has run the full flow — people, organizations, treasuries, agents, mandates, receipts — since 2026.</p></div>
          <div className="card"><h3 className="h3">Not yet</h3><p className="mt-3 text-sm text-slate-600">Full production: an external audit, clean governance keys, and the remaining readiness items are the gates. Every finding ever logged is public.</p></div>
          <div className="card"><h3 className="h3">How to follow</h3><p className="mt-3 text-sm text-slate-600">Specs are the source of truth and precede code. ADRs record every decision, including the ones we reversed. Read them before you build against a surface.</p></div>
        </div>
      </Section>

      <CTA title="Read how one application did all six steps." body="Game Night is the reference: an OIDC client of the Home, a treasury per player, a mandate per buy-in, A2A players, a kit-built registry, receipts." primary={{ href: '/examples/game-night', label: 'Game Night case study' }} secondary={{ href: SITE.github, label: 'Open the repository' }} />
    </>
  );
}
