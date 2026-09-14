import type { Metadata } from 'next';
import Link from 'next/link';
import { OFFERINGS, SITE } from '@apsite/content';
import { EstateTopology } from '@apsite/diagrams';
import { CTA, Figure, Section, Shot, Tag } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Platform — nine capabilities, one substrate',
  description: 'Identity, Authority, Harness, Edge, Registry Kit, Evidence, Coordination, Ontology, Operations — the nine offerings of the Agentic Primitives substrate, what each replaces, and the packages and standards behind it.',
};

export default function Platform() {
  return (
    <>
      <Section eyebrow="Platform" title="Nine capabilities. One substrate." lede="Each offering is independently adoptable and depends only on the ones below it. Together they are every capability an agentic application needs — from a person's first passkey to the receipt for an AI agent's last action.">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-9">
          {OFFERINGS.map((o, i) => (
            <a key={o.id} href={`#${o.id}`} className="card !p-4 text-center hover:border-navy">
              <div className="font-mono text-[11px] text-slate-400">0{i + 1}</div>
              <div className="mt-1 text-sm font-semibold text-navy">{o.name}</div>
            </a>
          ))}
        </div>
      </Section>

      <Section tone="cream" eyebrow="Where it runs" title="An estate: one deployment of the substrate, many applications around it." lede="Home for people and ceremonies, a runtime for agents, vaults for records, an edge for admission, discovery and a skills registry, and a chain for the anchor. Your application is a relying app: an OIDC client and an A2A caller.">
        <Figure caption="The faithnet estate as deployed today. Names are the estate's; the shape is the substrate's. Home runs on Vercel; the runtime, vault, edge, discovery and registry are Cloudflare Workers; the chain is a private Besu QBFT network — any EVM works.">
          <EstateTopology />
        </Figure>
      </Section>

      <Section eyebrow="Live" title="The estate, as its people see it." lede="Screens from the running faithnet estate, signed in as the Home's demo people. Every product here is a relying application of the same substrate.">
        <div className="grid gap-8 md:grid-cols-2">
          <Shot src="/shots/home-messages.png" alt="Home — Messages, with an Ask suggesting a payment and a club invitation" caption="Home · Messages. A conversation with bob.me; the Ask offers 'Finish sending 1.2 USDC to bob.me' — a step that will park for her signature. goose-1.svc and goose-2.svc are runtime members that joined over ACP." />
          <Shot src="/shots/gamenight-money.png" alt="Game Night — Your money, showing alice2.treasury and the authorise-buy-ins ceremony" caption="Game Night · Your money. 10,000 SHQ in the treasury the Home chartered for her; the buy-in authority is signed at her Home — the card room never can." />
          <Shot src="/shots/discovery-landing.png" alt="AP Discovery — find an agent for what you need" caption="Discovery · a public knowledge graph projected only from chain state; the ranking is fit + verifiable trust, never a vendor score." />
          <Shot src="/shots/skills-landing.png" alt="Skills registry — connect with faithnet.me" caption="Skills registry · SKILL.md playbooks authored, versioned and compiled by digest; publishing acts as the connected Smart Agent." />
        </div>
      </Section>

      {OFFERINGS.map((o, i) => (
        <Section key={o.id} id={o.id} tone={i % 2 ? 'cream' : 'white'}>
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow">0{i + 1} · {o.name}</p>
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
      ))}

      <Section tone="navy" eyebrow="How they compose" title="Dependencies point one way. No back-edges.">
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
            <Link href="/developers" className="btn bg-amber-400 text-navy hover:bg-amber-300">Package map and quickstart</Link>
          </div>
        </div>
      </Section>

      <CTA title="See all nine at work in one application." body="Game Night uses Identity, Authority, Harness, Edge, Registry Kit, Evidence, Coordination and Operations — in a card room." primary={{ href: '/examples/game-night', label: 'The Game Night case study' }} secondary={{ href: '/substrate', label: 'Architecture deep dive' }} />
    </>
  );
}
