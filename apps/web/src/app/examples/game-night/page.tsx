import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { GAME_NIGHT } from '@apsite/content';
import { GameNightArchitecture, MandateAnatomy } from '@apsite/diagrams';
import { Callout, CTA, Figure, Section, Shot, Stat, Tag } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Game Night — a complete example application',
  description: 'How a card room where people and AI agents sit at the same table was built on Agentic Primitives: passkey sign-in, treasuries, buy-in mandates, A2A players, clubs as workspace agents, a coach under a study grant, and receipts.',
};

export default function GameNight() {
  return (
    <>
      <section className="border-b border-line bg-cream">
        <div className="container-x grid items-center gap-10 py-16 md:grid-cols-[1fr_1.1fr] md:py-24">
          <div>
            <p className="eyebrow">Example application · third-party on the substrate</p>
            <h1 className="h1 mt-4 !text-5xl">{GAME_NIGHT.name}</h1>
            <p className="lede mt-5">{GAME_NIGHT.tagline}</p>
            <p className="mt-5 text-slate-600">{GAME_NIGHT.summary}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={GAME_NIGHT.url} className="btn-primary" target="_blank" rel="noreferrer">Play it — play money, demo people <ArrowRight className="h-4 w-4" /></a>
              <a href={GAME_NIGHT.repo} className="btn-secondary" target="_blank" rel="noreferrer">Source</a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Cloudflare Workers', 'Durable Objects', 'Vite + React', 'A2A', 'ERC-7710', 'Sheqel (SHQ)', 'faithchain'].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
          <Shot src="/shots/gamenight-landing.png" alt="Game Night landing page" priority caption="gamenight.faithnet.io" />
        </div>
      </section>

      <Section eyebrow="By the numbers" title="What the card room did not have to build.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GAME_NIGHT.stats.map((s) => <Stat key={s.label} value={s.value} label={s.label} note={s.note} />)}
        </div>
        <div className="mt-8">
          <Callout tone="teal">
            The whole right-hand side of the diagram below — Home, agents, treasuries, mandates, the runtime, the registry, the chain — is the same code and the same contracts that run every other application on the estate. Game Night wrote a card room.
          </Callout>
        </div>
      </Section>

      <Section tone="cream" eyebrow="Architecture" title="What the card room built, and what the substrate supplied.">
        <Figure caption="Left: the card room's own code — a Vite client, one Tables Worker with Durable Objects per table, two pure game engines, an agent worker that answers A2A turn requests, one ERC-20 (Sheqel), and coach playbooks. Right: everything from the substrate — the Home that signs people in and charters treasuries, the Smart Agents at the table, the buy-in mandate with its caveats, the agent runtime that hosts the coach, a registry built from the kit, and the chain where every buy-in is redeemed and receipted.">
          <GameNightArchitecture />
        </Figure>
      </Section>

      <Section eyebrow="The requirements" title="Every capability the app needed, and where it came from." lede="Below is the list a product team writes on day one for an application like this — and, for each line, what the team would have stitched together versus what the substrate handed them.">
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

      <Section tone="cream" eyebrow="The flow" title="One evening at a table, step by step.">
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

      <Section eyebrow="The mandate" title="The one signature that makes a buy-in possible — and the one transaction that ends it." lede="The player never sends money to the house. She signs a delegation from her treasury to the house's, bounded by caveats the chain enforces. Every buy-in redeems it once. When she revokes, every table refuses the next buy-in and there is no list to update.">
        <Figure caption="The buy-in mandate as the chain sees it. Each caveat is an enforcer contract that runs at redemption. The asset is pinned: a table that plays in SHQ refuses a mandate in any other coin.">
          <MandateAnatomy />
        </Figure>
      </Section>

      <Section tone="cream" eyebrow="Screens" title="What a player sees.">
        <div className="grid gap-8 md:grid-cols-2">
          <Shot src="/shots/gamenight-play.png" alt="Game Night — Play" caption="Play: sit at a table, practise, or open a club room." />
          <Shot src="/shots/gamenight-tables.png" alt="Game Night — Tables" caption="Tables: what is running, who is seated, which game the table hosts." />
          <Shot src="/shots/gamenight-money.png" alt="Game Night — Your money" caption="Your money: the treasury the Home chartered for you, its balance, the mandates you hold, and the receipts behind every chip." />
          <Shot src="/shots/gamenight-table.png" alt="Game Night — a live table" caption="At the table: seats, the board, the chat, and the coach that speaks only when asked." />
        </div>
        <p className="mt-6 text-sm text-slate-500">Screenshots captured from the live site, signed in as one of the estate's demo people.</p>
      </Section>

      <Section eyebrow="What this proves" title="A complete agentic application without a custom trust stack.">
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
