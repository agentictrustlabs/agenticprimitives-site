import type { Metadata } from 'next';
import Link from 'next/link';
import { ELSEWHERE, SITE } from '@apsite/content';
import { JsonLd, pageMeta } from '@/lib/seo';
import { Ledger, Section } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'About — Agentic Trust Labs',
  description: 'Agentic Primitives is built by Agentic Trust Labs, founded by Richard Pedersen in Erie, Colorado. What the project is, who makes it, and the boilerplate for press.',
  path: '/about',
});

export const BOILERPLATE =
  'Agentic Primitives is the open-source trust substrate for AI agents. Every person, organization and service is a Smart Agent that can sign; permission is a signed, caveated, revocable grant enforced outside the model; every protected act leaves a receipt the owner carries. Rails, not throttles. Published as @agenticprimitives on npm with reference contracts on Base Sepolia, by Agentic Trust Labs.';

export default function About() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Agentic Primitives',
          url: `${SITE.url}/about`,
          mainEntity: { '@id': `${SITE.url}/#org` },
          isPartOf: { '@id': `${SITE.url}/#website` },
        }}
      />
      <PageHero
        eyebrow="About"
        title={<>Agentic Primitives,<br />and who makes it.</>}
        lede="Agentic Primitives is an open-source trust substrate for AI agents, built by Agentic Trust Labs. The name is the claim: the primitives — identity that can sign, authority as a grant, evidence the owner carries — that an agentic application is made of, below any framework, registry or protocol."
      >
        <Link href="/what-is-agentic-primitives" className="btn-brass">What is Agentic Primitives?</Link>
        <a href={SITE.github} className="btn-outline-light" rel="noreferrer">Source on GitHub</a>
      </PageHero>

      <Section number="01" eyebrow="The organization" title="Agentic Trust Labs">
        <Ledger
          rows={[
            { k: 'Name', v: 'Agentic Trust Labs — the maintainer of Agentic Primitives.' },
            { k: 'Founded', v: '2025, Erie, Colorado, United States.' },
            { k: 'Founder', v: <><a href={SITE.linkedinAuthor} className="text-teal hover:underline" rel="noreferrer">Richard Pedersen</a>, Founder &amp; CEO. Also the author of the domain ontologies at <a href={SITE.richCanvas} className="text-teal hover:underline" rel="noreferrer">Rich Canvas</a>.</> },
            { k: 'What we publish', v: <>77 <a href={SITE.npm} className="text-teal hover:underline" rel="noreferrer">@agenticprimitives packages</a> on npm, 50 Solidity contracts with reference deployments on Base Sepolia, 13 developer Agent Skills, and the <a href={SITE.github} className="text-teal hover:underline" rel="noreferrer">developer kit</a> that pins them together as one release. MIT licensed.</> },
            { k: 'What we run', v: <>The faithnet estate — a Home for people, an agent runtime, an edge, a discovery tier, a skills registry and a private chain — where every claim on this site is exercised. <Link href="/demos" className="text-teal hover:underline">Run the demos.</Link></> },
            { k: 'Where we stand', v: <>Pre-production, honestly labelled. The <Link href="/audits" className="text-teal hover:underline">production readiness assessment</Link> has the verdict, the numbers and every open finding.</> },
            { k: 'Elsewhere', v: <>{[
              { href: SITE.githubOrg, label: 'GitHub' },
              { href: SITE.npm, label: 'npm' },
              { href: SITE.linkedinCompany, label: 'LinkedIn' },
              { href: SITE.richCanvas, label: 'Rich Canvas' },
            ].map((l, i) => <span key={l.href}>{i > 0 && ' · '}<a href={l.href} className="text-teal hover:underline" rel="noreferrer">{l.label}</a></span>)}</> },
            { k: 'Contact', v: <a href={SITE.contact} className="text-teal hover:underline">hello@agenticprimitives.dev</a> },
          ]}
        />
      </Section>

      <Section tone="cream" number="02" eyebrow="The name" title="Why “Agentic Primitives”.">
        <div className="grid gap-8 md:grid-cols-2">
          <p className="text-[17px] leading-relaxed text-slate-700">
            A primitive is the thing you cannot decompose further and still have the property. For an agent that acts on someone’s behalf, three properties do not decompose: that the actor can be identified without trusting the host, that its authority can be checked at the moment of the act, and that what it did can be shown afterwards by someone other than the platform that ran it. Those are the primitives. Everything else — frameworks, registries, protocols, the model — is built on top of them or does without.
          </p>
          <p className="text-[17px] leading-relaxed text-slate-700">
            The phrase is also used generically in the industry — OpenAI, for instance, calls its Skills, Shell and Compaction features “agentic primitives” — for the building blocks of one vendor’s agent API. This project is the other meaning: not features of a runtime, but the substrate a runtime stands on, portable across runtimes because the identity, the grant and the receipt do not belong to any of them. <Link href="/what-is-agentic-primitives" className="text-teal hover:underline">The definition, in full.</Link>
          </p>
        </div>
      </Section>

      <Section number="03" eyebrow="For press and directories" title="Boilerplate.">
        <p className="max-w-3xl text-[17px] leading-relaxed text-slate-700">Use this text as written when describing the project.</p>
        <blockquote className="mt-6 max-w-3xl rounded-xl border border-line bg-cream p-6 text-[16px] leading-relaxed text-navy">{BOILERPLATE}</blockquote>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ['Name', 'Agentic Primitives — two words, both capitalized. The one-word form appears only in the domain (agenticprimitives.dev) and the npm scope (@agenticprimitives).'],
            ['One line', SITE.tagline],
            ['Assets', 'Mark, wordmark and lockups on the brand page; the LinkedIn logo and covers are there too.'],
          ].map(([k, v]) => (
            <div key={k} className="card">
              <div className="text-base font-semibold text-navy">{k}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500"><Link href="/brand" className="text-teal hover:underline">Brand assets →</Link></p>
      </Section>

      <Section tone="ink" number="04" eyebrow="Around the substrate" title="The sites that build on it.">
        <ul className="grid gap-4 md:grid-cols-3">
          {ELSEWHERE.map((e) => (
            <li key={e.id} className="card-dark">
              <a href={e.url} rel="noreferrer" className="text-lg font-semibold text-white hover:text-brass">{e.name} →</a>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{e.role}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
