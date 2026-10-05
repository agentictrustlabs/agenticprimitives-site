import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ARCHITECTURE_DOCS } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { DiagramImg } from '@/components/DiagramImg';
import { PageHero } from '@/components/PageHero';
import { ScaleCards } from '@/components/ScaleCards';
import { ScalesPlain } from '@/components/ScalesPlain';
import { TownStory } from '@/components/TownStory';
import { Figure, Section } from '@/components/ui';

export const metadata: Metadata = pageMeta({
  title: 'Architecture — substrate, estate, town, federation',
  description: 'How Agentic Primitives is organized, in plain words and in full: the substrate everything is built from, your estate, the town of estates on one chain, and the federation across chains.',
  path: '/architecture',
});

export default function Architecture() {
  return (
    <>
      <PageHero
        eyebrow="Architecture"
        title={<>Substrate. Estate. Town.<br />Federation.</>}
        lede="Agentic Primitives is built the way a place is built. The materials and the building code are the substrate. Your own property, with its front door, its staff, its records and its gate, is an estate. The street of estates that share an address book and a notice board is a town. Towns on different ground, joined by public roads, are a federation. Every screen, every agent and every receipt lives at one of these four scales, and knowing which one tells you who is in charge there."
      >
        <a href="#plain" className="btn-brass">In plain words <ArrowRight className="h-4 w-4" /></a>
        <a href="#a-day-in-the-town" className="btn-outline-light">A day in the town · 1 minute</a>
        <a href="#full" className="btn-outline-light">The full picture</a>
        <Link href="/substrate" className="btn-outline-light">For engineers: inside the substrate</Link>
      </PageHero>

      <ScalesPlain id="plain" showIntro={false} showClose />

      <Section id="a-day-in-the-town" tone="navy" number="01" eyebrow="A day in the town" title="One person's agent, four conversations, one set of keys." lede="Alice's agent walks out of her front door and wears a different hat at every stop: patient at the practice, member at the church and the home group, neighbour at the rec centre. Each provider answers from its own estate with its own agent. Then she opens one shelf of her vault to her coach, and closes it when the season ends." wide>
        <TownStory scene="day" id="day-story" />
      </Section>

      <Section id="meet-the-town" tone="ink" number="02" eyebrow="How the street works" title="Eight beats on one street: discover, trust, talk, act, receipt, revoke — and the road out." lede="The same town, drawn flat and slowed down. One chain. A person, an organization and a service, each on their own estate; the address book, notice board, directories and the chain they share at the end of the street. Watch what crosses the street — and what never does.">
        <TownStory />
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-400">Every other picture of an "agent town" ends at the transaction. This one ends where ours actually does: the permission was signed at her door, the receipt came home to her vault, and she cut the road from the same door. Nothing on the street — not the directory, not the key service, not the chain — could have done any of those three things for her.</p>
      </Section>

      <Section id="full" tone="cream" number="03" eyebrow="The full picture" title="Four scales, four repositories, one rule running through them." lede="Each scale is its own repository. Each depends only on the one below it. Each answers a question the one below cannot, and each is held to one rule that keeps it from becoming the one above: the substrate names no deployment, the estate's vault is the record, the town grants nothing, the federation carries evidence and value but never authority.">
        <Figure dark caption="One chain per estate. One chain per town. Many chains per federation. Authority never leaves the chain it was signed into: evidence and value cross, a grant never does.">
          <DiagramImg name="scales" dark width={1180} height={900} alt="The four scales: substrate, estate, town, federation — one repository each, each depending only on the one below" />
        </Figure>
        <div className="mt-10"><ScaleCards anchors /></div>
      </Section>

      <Section number="04" eyebrow="Notes" title="Each part, drawn and explained." lede="The deployed names are an estate's. The shapes are the substrate's. The pictures use one vocabulary throughout: a house is a Home, a gatehouse is an edge, a vault is a vault, a hall with columns is a chain or a registry, a dome is the public graph.">
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
        <p className="mt-10 text-sm text-slate-600">
          For engineers, the inside of one deployment, layer by layer: <Link href="/substrate" className="font-semibold text-teal hover:underline">the substrate deep dive →</Link>
          {' '}· the nine capabilities: <Link href="/platform" className="font-semibold text-teal hover:underline">Platform →</Link>
        </p>
      </Section>
    </>
  );
}
