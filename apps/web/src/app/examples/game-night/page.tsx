import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';
import { GAME_NIGHT } from '@apsite/content';
import { GameNightArchitecture, MandateAnatomy } from '@apsite/diagrams';
import { Callout, CTA, Figure, Section, Shot, Stat, Tag } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'Game Night — a complete example',
  description: 'A card room where people and AI agents share a table, built on Agentic Primitives: passkey sign-in, treasuries, buy-in mandates, A2A players, a coach, receipts.',
  path: '/examples/game-night',
});

export default function GameNight() {
  return (
    <>
      <PageHero
        eyebrow="Example application · third-party on the substrate"
        title={<>{GAME_NIGHT.name}.<br />The house holds nobody’s key.</>}
        lede={GAME_NIGHT.tagline}
        aside={<Shot dark src="/shots/gamenight-landing.png" alt="Game Night landing page" priority caption="gamenight.faithnet.io" />}
      >
        <a href={GAME_NIGHT.url} className="btn-brass" target="_blank" rel="noreferrer">Play it — play money, demo people <ArrowRight className="h-4 w-4" /></a>
        <a href={GAME_NIGHT.repo} className="btn-outline-light" target="_blank" rel="noreferrer">Source</a>
        <div className="mt-2 flex w-full flex-wrap gap-2">
          {['Cloudflare Workers', 'Durable Objects', 'Vite + React', 'A2A', 'ERC-7710', 'Sheqel (SHQ)', 'faithchain'].map((t) => <Tag key={t} tone="dark">{t}</Tag>)}
        </div>
      </PageHero>

      <Section number="01" eyebrow="By the numbers" title="What the card room did not have to build." lede={GAME_NIGHT.summary}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GAME_NIGHT.stats.map((s) => <Stat key={s.label} value={s.value} label={s.label} note={s.note} />)}
        </div>
        <div className="mt-8">
          <Callout tone="teal">
            The whole right-hand side of the diagram below — Home, agents, treasuries, mandates, the runtime, the registry, the chain — is the same code and the same contracts that run every other application on the estate. Game Night wrote a card room.
          </Callout>
        </div>
      </Section>

      <Section tone="ink" number="02" eyebrow="Architecture" title="What the card room built, and what the substrate supplied.">
        <Figure dark caption="Left: the card room's own code — a Vite client, one Tables Worker with Durable Objects per table, two pure game engines, an agent worker that answers A2A turn requests, one ERC-20 (Sheqel), and coach playbooks. Right: everything from the substrate — the Home that signs people in and charters treasuries, the Smart Agents at the table, the buy-in mandate with its caveats, the agent runtime that hosts the coach, a registry built from the kit, and the chain where every buy-in is redeemed and receipted.">
          <GameNightArchitecture />
        </Figure>
      </Section>

      <Section number="03" eyebrow="The requirements" title="Every capability the app needed, and where it came from." lede="Below is the list a product team writes on day one for an application like this — and, for each line, what the team would have stitched together versus what the substrate handed them.">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3 pr-4">Need</th>
                <th className="py-3 pr-4">Typically stitched from</th>
                <th className="py-3 pr-4">On the substrate</th>
                <th className="py-3">Primitive</th>
              </tr>
            </thead>
            <tbody>
              {GAME_NIGHT.requirements.map((r) => (
                <tr key={r.id} className="border-b border-line/70 align-top">
                  <td className="py-3 pr-4 font-semibold text-navy">{r.need}</td>
                  <td className="py-3 pr-4 text-slate-500">{r.stitched}</td>
                  <td className="py-3 pr-4 text-slate-800">{r.built}</td>
                  <td className="py-3"><Tag tone="teal">{r.primitive}</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="cream" number="04" eyebrow="The flow" title="One evening at a table, step by step.">
        <ol className="grid gap-4 md:grid-cols-2">
          {GAME_NIGHT.flow.map((f, i) => (
            <li key={f.step} className="card flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-sm font-semibold text-white">{i + 1}</div>
              <div>
                <h3 className="h3 !text-lg">{f.step}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.what}</p>
                <p className="mt-2 text-xs font-medium text-teal">{f.actor} · {f.where}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section number="05" eyebrow="The mandate" title="The one signature that makes a buy-in possible — and the one transaction that ends it." lede="The player never sends money to the house. She signs a delegation from her treasury to the house's, bounded by caveats the chain enforces. Every buy-in redeems it once. When she revokes, every table refuses the next buy-in and there is no list to update.">
        <Figure caption="The buy-in mandate as the chain sees it. Each caveat is an enforcer contract that runs at redemption. The asset is pinned: a table that plays in SHQ refuses a mandate in any other coin.">
          <MandateAnatomy />
        </Figure>
      </Section>

      <Section tone="ink" number="06" eyebrow="Screens" title="What a player sees.">
        <div className="grid gap-8 md:grid-cols-2">
          <Shot dark src="/shots/gamenight-play.png" alt="Game Night — Play, signed in as Alice" caption="Play, as Alice. Two doors: learn canasta, or play hold’em against the house. One press deals you in." />
          <Shot dark src="/shots/gamenight-holdem-deal.png" alt="Deal me in — Texas hold’em" caption="Deal me in. Texas hold’em, play money — no buy-in, no authorisation, the same engine the money tables run." />
          <div className="md:col-span-2">
            <Shot dark src="/shots/gamenight-holdem-hand.png" alt="Alice playing a Texas hold’em hand" caption="A hand in progress. Alice holds A♠ 8♥; it is her turn. The house players are seated. bob-coach.svc, via alice.me, says why a check is free — she still has to press the button." />
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-500">Captured from gamenight.faithnet.io, signed in as Alice Okoro, the estate’s demo person.</p>
      </Section>

      <Section number="07" eyebrow="What this proves" title="A complete agentic application without a custom trust stack.">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card"><h3 className="h3">Humans and agents on one identity model.</h3><p className="mt-3 text-sm text-slate-600">Alice, an AI player, the house treasury and a club are all Smart Agents. The table does not know or care which seats are people — the protocol is the same.</p></div>
          <div className="card"><h3 className="h3">Money moved under the player's own authority.</h3><p className="mt-3 text-sm text-slate-600">No custodial balance, no hot wallet with everyone's chips. The house holds a delegation it cannot exceed, and the player can end it in one transaction.</p></div>
          <div className="card"><h3 className="h3">Evidence without a trust-us dashboard.</h3><p className="mt-3 text-sm text-slate-600">Every buy-in and cash-out is a redeemed delegation with a receipt. A dispute is settled by reading the chain and the player's vault, not by asking the operator.</p></div>
        </div>
        <div className="mt-8 flex justify-end">
          <Link href="/compare" className="btn-ghost">How this compares to a stitched stack <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </Section>

      <CTA title="Your application is the left column." body="Everything on the right is packages you install and contracts already deployed. Start with sign-in and a treasury; add mandates when money moves; add agents when you want them at the table." primary={{ href: '/developers', label: 'Build on the substrate' }} secondary={{ href: GAME_NIGHT.repo, label: 'Read the Game Night source' }} />
    </>
  );
}
