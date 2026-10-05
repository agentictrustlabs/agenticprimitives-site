import type { Metadata } from 'next';
import Link from 'next/link';
import { ARCHITECTURE_DOCS } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/PageHero';
import { Section } from '@/components/ui';

export const metadata: Metadata = pageMeta({
  title: 'Architecture notes — substrate, estate, town, federation',
  description: 'How Agentic Primitives is deployed at four scales: the substrate packages, an estate of Home, runtime, vault, edge and chain, the town of estates on one chain, and the federation across chains.',
  path: '/architecture',
});

export default function Architecture() {
  return (
    <>
      <PageHero
        eyebrow="Architecture notes"
        title={<>Substrate, estate, town,<br />and the federation between chains.</>}
        lede="Each note draws one part of how the substrate is deployed and how the parts meet: the four scales and their repositories, the buildings of an estate, who lives there, what the estates on a chain share as a town, and what crosses a chain in a federation. The pictures use one vocabulary throughout: a house is a Home, a gatehouse is an edge, a vault is a vault, a hall with columns is a chain or a registry, a dome is the public graph."
      >
        <Link href="/platform" className="btn-outline-light">Platform</Link>
        <Link href="/substrate" className="btn-outline-light">The substrate</Link>
      </PageHero>

      <Section number="01" eyebrow="Notes" title="Where it runs, and how the places connect." lede="The deployed names are an estate's. The shapes are the substrate's.">
        <div className="grid gap-8">
          {ARCHITECTURE_DOCS.map((d) => (
            <article key={d.slug} className="card grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
              <div>
                <p className="eyebrow">{d.date}</p>
                <h2 className="h3 mt-2">
                  <Link href={`/architecture/${d.slug}`} className="hover:text-teal">{d.title}</Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{d.summary}</p>
                <Link href={`/architecture/${d.slug}`} className="mt-4 inline-block text-sm font-semibold text-teal hover:underline">Read the note →</Link>
              </div>
              <Link href={`/architecture/${d.slug}`} className="block overflow-hidden rounded-lg border border-line bg-cream">
                <img src={d.hero} alt={d.title} className="w-full" />
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
