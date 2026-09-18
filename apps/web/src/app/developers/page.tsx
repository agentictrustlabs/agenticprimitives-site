import type { Metadata } from 'next';
import Link from 'next/link';
import { OFFERINGS, SITE, ELSEWHERE } from '@apsite/content';
import { BUILD_PAGES } from '../build/pages';
import { pageMeta } from '@/lib/seo';
import { Callout, CTA, Ledger, Section, Tag } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'Developers — build on the substrate',
  description: 'Install @agenticprimitives/* packages, deploy the contracts to any EVM, wire your app as a relying app of a Home, and let your agents act under grants. Specs, package map, live gates.',
  path: '/developers',
});

export default function Developers() {
  return (
    <>
      <PageHero eyebrow="Developers" title={<>Build on the substrate.<br />Keep the keys.</>} lede="TypeScript packages, Foundry contracts, an A2A 1.0 runtime and a set of live gates. Everything is open source under MIT; every spec and every ADR is in the repository.">
        <a href={SITE.github} className="btn-brass" rel="noreferrer">github.com/agentictrustlabs/agentic-primitives</a>
        <a href={SITE.npm} className="btn-outline-light" rel="noreferrer">@agenticprimitives on npm</a>
        <a href={`${SITE.github}/tree/main/docs`} className="btn-outline-light" rel="noreferrer">Docs</a>
        <a href={`${SITE.github}/tree/main/contracts`} className="btn-outline-light" rel="noreferrer">Contracts</a>
      </PageHero>

      <Section id="start" tone="ink" number="01" eyebrow="Start" title="Say what kind of application you want. Let the agent build it." lede="The classical quickstart — six steps, a package per step, a config block at the end — is still exactly what happens. It is no longer what you do. The Build guide is five short pages: the prompt, where to point the agent, six demo people to test as, the flow, and the gates.">
        <div className="grid gap-4 md:grid-cols-5">
          {BUILD_PAGES.map((p, i) => (
            <Link key={p.href} href={p.href} className="card-dark block hover:border-white/25">
              <span className="num-mark text-brass">0{i + 1}</span>
              <div className="mt-2 text-sm font-semibold text-white">{p.label}</div>
              <div className="mt-1 text-xs leading-relaxed text-slate-400">{p.sub}</div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/build" className="btn-brass">Open the Build guide</Link>
          <a href={SITE.pokerGithub} className="btn-outline-light" rel="noreferrer">Reference app: pokernight</a>
        </div>
      </Section>

      <Section tone="cream" number="02" eyebrow="Package map" title="Which package for what.">
        <div className="grid gap-4 md:grid-cols-3">
          {OFFERINGS.map((o) => (
            <div key={o.id} className="card">
              <h3 className="h3">{o.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{o.oneLine}</p>
              <ul className="mt-3 space-y-1">
                {o.packages.map((p) => (
                  <li key={p}><a href={`${SITE.npmPackage}/@agenticprimitives/${p}`} className="font-mono text-xs text-teal hover:underline" rel="noreferrer">@agenticprimitives/{p}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section number="03" eyebrow="Standards" title="What we implement, and what we deliberately keep outside.">
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

      <Section tone="cream" number="04" eyebrow="Status" title="Where the project stands, plainly.">
        <Ledger
          rows={[
            { k: 'Ready for', v: 'Test and pre-production environments. A live estate has run the full flow — people, organizations, treasuries, agents, mandates, receipts — since 2026.' },
            { k: 'Not yet', v: <>Full production: an external audit, clean governance keys, and the remaining readiness items are the gates. Every finding ever logged is public — the <Link href="/audits" className="text-teal hover:underline">production readiness assessment</Link> has the verdict, the numbers and the open findings register.</> },
            { k: 'How to follow', v: 'Specs are the source of truth and precede code. ADRs record every decision, including the ones we reversed. Read them before you build against a surface.' },
          ]}
        />
      </Section>

      <Section tone="ink" number="05" eyebrow="The estate you point at" title="A Home to sign in through. A registry that compiles playbooks. Ontologies to bind to.">
        <div className="grid gap-4 md:grid-cols-3">
          {ELSEWHERE.map((e) => (
            <a key={e.id} href={e.url} rel="noreferrer" className="card-dark block hover:border-white/25">
              <div className="text-sm font-semibold text-white">{e.name} →</div>
              <div className="mt-1 text-xs leading-relaxed text-slate-400">{e.role}</div>
            </a>
          ))}
        </div>
      </Section>

      <CTA title="Read how one application did all six steps." body="Game Night is the reference — the card room the prompt above describes: an OIDC client of the Home, a treasury per player, a mandate per buy-in, A2A players, a coach under a study grant, receipts." primary={{ href: '/examples/game-night', label: 'Game Night case study' }} secondary={{ href: SITE.github, label: 'Open the repository' }} />
    </>
  );
}
