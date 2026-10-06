import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, KeyRound, Receipt, ShieldCheck } from 'lucide-react';
import { AUDITS, GAME_NIGHT, SITE } from '@apsite/content';
import { Mark } from '@/components/Mark';
import { CTA, Shot } from '@/components/ui';
import { HOME_FAQ, JsonLd, pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: `${SITE.name} — Let your agent act. Keep your keys.`,
  description:
    'Agentic Primitives is the open-source trust layer for AI agents: a person or an organization hands an agent a bounded, revocable permission and gets a receipt for everything it does.',
  path: '/',
});

/**
 * THE HOME PAGE, SHORT (owner, 2026-10-06): one message a business reader can repeat, three outcomes, how it works in
 * three steps, two live proofs, three doors by audience, three questions, one ask. Five phone screens, not eighty.
 * The long argument moved to /in-depth and is linked from here, not restated.
 */
export default function Home() {
  const audit = AUDITS[0]!;
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: HOME_FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />

      {/* ── THE MESSAGE ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-dark absolute inset-0" aria-hidden />
        <div className="glow-brass absolute inset-0" aria-hidden />
        <div className="container-x relative py-20 md:py-32">
          <p className="eyebrow-dark">Open-source trust layer for AI agents</p>
          <h1 className="display mt-5 max-w-4xl">
            Let your agent act.
            <br />
            Keep your keys.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Agentic Primitives lets a person or an organization hand an AI agent a <span className="text-white">bounded, revocable permission</span> — and get a
            receipt for everything it does. Not a sandbox. Not a smaller model. A grant the agent cannot exceed.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/examples/game-night" className="btn-brass">See it running <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/developers" className="btn-outline-light">Build on it</Link>
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Open source, end to end · no vendor — including us — ever holds a key · <Link href="/in-depth" className="text-slate-300 underline decoration-white/20 underline-offset-4 hover:text-white">the long version</Link>
          </p>
        </div>
      </section>

      {/* ── THREE OUTCOMES ────────────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-x">
          <p className="eyebrow">What you get</p>
          <h2 className="h2 mt-3 max-w-3xl">Agents you can trust with real things.</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: ShieldCheck, t: 'An agent that can do things', b: 'Pay a supplier, book the room, publish the notice, join the team — within exactly the limits you signed, and nothing past them.' },
              { icon: KeyRound, t: 'Keys that stay with their owner', b: 'Each person and organization signs from its own Home with a passkey. No platform, no vendor and no model is ever handed the key.' },
              { icon: Receipt, t: 'A receipt for every act', b: 'Every step is checked against the permission before it runs and recorded after. A counterparty can verify it without trusting anyone’s dashboard.' },
            ].map((o) => (
              <li key={o.t} className="card">
                <o.icon className="h-6 w-6 text-teal" aria-hidden />
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.015em] text-navy">{o.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{o.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x">
          <p className="eyebrow">How it works</p>
          <h2 className="h2 mt-3 max-w-3xl">Three steps. The third one repeats.</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { n: '01', t: 'Connect', b: 'One Home per person and per organization. Sign in with a passkey; your agent is an account only you control, with a name others can find.' },
              { n: '02', t: 'Grant', b: 'Say what the agent may do: to whom, how much, until when. The permission is your signature. Take it back in one step; it is refused everywhere at once.' },
              { n: '03', t: 'Act', b: 'The agent works. Code outside the model checks every step against the grant; when money moves, the chain checks too. The receipt lands with you.' },
            ].map((s) => (
              <li key={s.n} className="relative rounded-xl border border-line p-6">
                <span className="num-mark text-slate-400">{s.n}</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-navy">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{s.b}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-slate-600">
            The difference from every other answer: the industry makes the agent <em>smaller</em> — sandboxes, restricted modes, a second model grading the first.
            This bounds what the agent <em>may do</em>, with a grant the agent cannot exceed. <Link href="/compare" className="text-teal underline underline-offset-4">Why every other answer is a throttle →</Link>
          </p>
        </div>
      </section>

      {/* ── LIVE PROOF ────────────────────────────────────────────────────────────── */}
      <section className="bg-ink py-16 text-white md:py-24">
        <div className="container-x">
          <p className="eyebrow-dark">Running today</p>
          <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[2.75rem]">A town you can walk into.</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">Real applications on a real chain, for play money: people and AI agents at the same card table; a town where every person, organization and service has a name it bought from its own treasury.</p>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="min-w-0">
              <Shot src="/shots/gamenight-table.png" alt="Game Night: people and AI agents at one card table" caption="" />
              <h3 className="mt-4 text-xl font-semibold">{GAME_NIGHT.name}</h3>
              <p className="mt-1 text-[15px] text-slate-400">People and AI agents at one table. Every chip is a permission the player signed; the house holds nobody&rsquo;s key.</p>
              <a href={GAME_NIGHT.url} rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brass hover:text-white">Play a hand <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="min-w-0">
              <Shot src="/shots/names-town.png" alt="The town's naming service: every kind of agent, counted" caption="" />
              <h3 className="mt-4 text-xl font-semibold">The town</h3>
              <p className="mt-1 text-[15px] text-slate-400">Every agent has a name whose ending says what it is — a person, an organization, a service. Names are bought from the owner&rsquo;s treasury; nobody can sell you one.</p>
              <a href="https://names.faithnet.io" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brass hover:text-white">Look up a name <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE DOORS ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 md:py-24">
        <div className="container-x">
          <p className="eyebrow">Start where you stand</p>
          <h2 className="h2 mt-3">Three doors.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { h: '/thesis', who: 'You decide', t: 'The bet, in plain words', b: 'Why the operating model around the model is what has to change, and what it is worth to get there first.' },
              { h: '/developers', who: 'You build', t: 'Packages, a kit, a Home in an afternoon', b: 'Published TypeScript packages and contracts, one lock file, a doctor, and a reference application you can read.' },
              { h: `/audits/${audit.slug}`, who: 'You check', t: 'The readiness verdict, dated', b: `${audit.date}: GO for testnet pilots, NO-GO for real value — every open finding public, each with its closing condition.` },
            ].map((d) => (
              <Link key={d.h} href={d.h} className="card group transition hover:border-teal">
                <p className="eyebrow">{d.who}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.015em] text-navy group-hover:text-teal">{d.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{d.b}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal">Open <ArrowRight className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE QUESTIONS ───────────────────────────────────────────────────────── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-x">
          <div className="flex items-center gap-3"><Mark className="h-6 w-6 text-navy" /><p className="eyebrow">Asked first</p></div>
          <dl className="mt-8 grid gap-6 md:grid-cols-3">
            {HOME_FAQ.slice(0, 3).map((f) => (
              <div key={f.q} className="card">
                <dt className="text-lg font-semibold tracking-[-0.01em] text-navy">{f.q}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-slate-700">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-slate-500"><Link href="/what-is-agentic-primitives" className="underline underline-offset-4 hover:text-navy">More questions</Link> · <Link href="/in-depth" className="underline underline-offset-4 hover:text-navy">The long version</Link></p>
        </div>
      </section>

      <CTA
        title="Give your agents real authority. Keep the keys."
        body="Open source, standards-based, honestly labelled. Start with a Home, hand your agent one permission, and read the receipt."
        primary={{ href: '/developers', label: 'Build on it' }}
        secondary={{ href: '/examples/game-night', label: 'See it running' }}
      />
    </>
  );
}
