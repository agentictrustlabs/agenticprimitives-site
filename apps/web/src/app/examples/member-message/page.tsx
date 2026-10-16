import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';
import { MESSAGE_BEATS } from '@apsite/diagrams';
import { Callout, CTA, Ledger, Section, Tag } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { TownStory } from '@/components/TownStory';

export const metadata: Metadata = pageMeta({
  title: 'A message between two agents — an animated walkthrough',
  description:
    "Hannah's agent writes to her organization's agent. The organization reads only from adult members and never learns which member wrote. One signature from Hannah, one stamp from a key that never leaves its safe, a public notice board instead of a phone call, two receipts.",
  path: '/examples/member-message',
});

const ESSAY = '/writing/tear-down-the-walled-garden-for-agents';

const PEOPLE = [
  { who: 'Hannah', role: 'a member', what: 'The person in the loop. She signs one permission at her own front door, and she can cancel it from the same door. She never appears in the story by name, address or key.', tone: 'navy' as const },
  { who: 'The steward', role: 'reads the mail', what: 'The other person. At the end, the steward is handed a message from "an adult member". The steward gets the message, not the sender.', tone: 'violet' as const },
  { who: 'Her agent', role: 'does the legwork', what: 'Fetches the card and the permission from her vault, makes the proof, walks to the key safe, carries the message across the street, brings the receipt home.', tone: 'teal' as const },
  { who: "The organization's agent", role: 'at the door', what: 'Asks its own question, checks the answer against the public notice board, and only then hands the message inside.', tone: 'violet' as const },
];

const PLACES = [
  { drawn: 'Her vault', real: 'Her encrypted record store. Holds the membership card, her permission, and later her receipt. Her agent reads it under her grant; nobody else does.' },
  { drawn: 'The membership card', real: 'A credential the organization issued to her: adult, member. It is tied to a key, so only the holder of the key can present it.' },
  { drawn: 'The key safe', real: "A key service on a sealed machine in her estate. The key never leaves it. It signs once per request and only when the request is covered by her permission — and it checks that itself." },
  { drawn: 'Her permission', real: 'A signed, standing delegation from Hannah to her agent: present this card, to this organization, for this question, until this date. It says where and until when. It does not say who.' },
  { drawn: 'The sealed proof', real: "A zero-knowledge proof: it shows the statement 'over 18 and a member' is true about a card the organization issued, without showing the card, the birth date, or the organization's signature on the card." },
  { drawn: 'The pen name', real: 'A pairwise account derived for this organization alone. The same organization sees the same pen name next time; a different organization sees a different one.' },
  { drawn: 'The public notice board', real: "The chain. Where the organization has registered its stamp (its issuing key) and publishes the root of the list of cards it still vouches for. Anyone can read it; no one has to ask." },
  { drawn: 'Question #4821', real: 'A single-use challenge the organization makes up for each request. It stops a proof from being replayed and pins the proof to this door.' },
];

const LEARNS = [
  { k: 'The organization', v: 'That an adult member wrote, and that the card came from its own issuing stamp. A pen name it will see again from the same sender at the same door. A question number it has now used up.', meta: 'never: a name, a birth date, the card, her address' },
  { k: 'Hannah', v: 'Everything the organization learned, plus the one thing it cannot hold: the permission the whole thing ran under. Her receipt is in her vault and goes where she goes.', meta: 'two receipts, two truths' },
  { k: 'The key safe', v: 'That it stamped one request, for this organization and this question. It saw a fingerprint of the proof. It never saw the message, the card or the proof itself.', meta: 'a log line, not a copy' },
  { k: 'The membership office', v: 'Nothing. It was never asked. The door read the stamp and the valid-cards list off the public notice board.', meta: 'issuing is not a phone call' },
  { k: 'A second organization', v: 'Nothing that links back. A different door gets a different pen name, a different question number and a proof that shares no visible part with this one.', meta: 'unlinkable by construction' },
];

export default function MemberMessage() {
  return (
    <>
      <PageHero
        eyebrow="Example · an animated walkthrough"
        title={<>A message between two agents.<br />A fact arrives. A person does not.</>}
        lede="Hannah's agent writes to her organization's agent. The organization reads only from members who are adults — and does not want to know which member wrote. Watch one signature from Hannah, one stamp from a key that never leaves its safe, a public notice board instead of a phone call, and two receipts."
      >
        <Link href={ESSAY} className="btn-brass">The essay this example comes from <ArrowRight className="h-4 w-4" /></Link>
        <Link href="/in-depth#meet-the-town" className="btn-outline-light">A day in the town</Link>
      </PageHero>

      <Section id="story" tone="navy" eyebrow="The animation" title="One street. Eight scenes. Press play and a narrator walks you through it." lede="Hannah's side of the street is on the left; the organization's is on the right; the public notice board is on the corner. The card in the corner of the picture says who is acting and what passes between them; the light on the ground follows them. Turn the narration off to read at your own pace, or step with the arrow keys.">
        <TownStory scene="message" id="member-message-story" narration="/audio/member-message" autoplay={false} />
      </Section>

      <Section number="01" eyebrow="Who is in the picture" title="Two people, two agents." lede="A person signs at the start and a person reads at the end. Everything in between is done by agents under what the people decided.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PEOPLE.map((p) => (
            <div key={p.who} className="card">
              <div className="flex flex-wrap items-center gap-2">
                <Tag tone={p.tone}>{p.who}</Tag>
                <span className="text-xs text-slate-500">{p.role}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{p.what}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" number="02" eyebrow="Scene by scene" title="What happens in each scene, and the rule it keeps." lede="Who acts, who receives, what passes between them — then the scene in a sentence, and the rule it keeps.">
        <ol className="grid gap-4 md:grid-cols-2">
          {MESSAGE_BEATS.map((b, i) => (
            <li key={b.id} className="card flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-sm font-semibold text-white">{i + 1}</div>
              <div>
                <h3 className="h3 !text-lg">{b.title}</h3>
                {b.to !== '—' && <p className="mt-2 text-sm text-slate-800"><span className="font-semibold">{b.from}</span> → <span className="font-semibold">{b.to}</span> · {b.what}</p>}
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.caption}</p>
                <p className="mt-2 text-sm font-semibold text-teal">{b.rule}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section number="03" eyebrow="Who learned what" title="At the end, five parties hold five different things.">
        <Ledger rows={LEARNS} />
      </Section>

      <Section tone="cream" number="04" eyebrow="The drawing, decoded" title="What the picture calls it, and what it really is." lede="Every object in the drawing stands for one real thing in the system. None of them is a metaphor for something the system does not have.">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-slate-500">
                <th className="py-3 pr-6">In the drawing</th>
                <th className="py-3">What it really is</th>
              </tr>
            </thead>
            <tbody>
              {PLACES.map((r) => (
                <tr key={r.drawn} className="border-b border-line/70 align-top">
                  <td className="py-3 pr-6 font-semibold text-navy whitespace-nowrap">{r.drawn}</td>
                  <td className="py-3 text-slate-700">{r.real}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section number="05" eyebrow="Why the key safe matters" title="One stamp, from a key the agent does not hold.">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="prose-ap">
            <p>
              The card is tied to a key. Showing the card means proving you control that key — and that is the one moment in the story where a signature is needed. In most systems that key sits on the person's phone, so her agent cannot use it; in the lazy design the agent simply holds the key and becomes her.
            </p>
            <p>
              Here the key lives in a key safe on a sealed machine. Her agent does not hold it. What her agent holds is her <strong>permission</strong>: present this card, to this organization, for this question, until spring. When the proof needs its stamp, the safe is shown the permission and the exact request — which organization, which question — and it stamps only if the permission covers it. It checks that itself; it does not take the agent's word for it.
            </p>
            <p>
              That is why scene five shows a second slip getting no stamp. A safe that would stamp anything would make the agent into Hannah. A safe that stamps only what her permission covers makes the agent a delegate — and a delegate is something she can revoke from her own front door.
            </p>
          </div>
          <div className="grid gap-4">
            <Callout tone="amber">
              <p className="font-semibold">What the key safe never sees</p>
              <p className="mt-2 text-sm">The message. The card. The proof. It is handed a fingerprint to stamp and a note saying which organization and which question. Its log says a stamp was made for that note — not what the message said.</p>
            </Callout>
            <Callout tone="teal">
              <p className="font-semibold">Two ways to show the same card</p>
              <p className="mt-2 text-sm">This story uses a sealed proof: the organization learns a fact and no values. If the receiver were the dues ledger, which is entitled to her member number, the same card would be shown with that one field open and the rest closed. Which way is used is decided by the question — and a request for a fact can never be answered with a value.</p>
            </Callout>
          </div>
        </div>
      </Section>

      <Section tone="ink" number="06" eyebrow="For engineers" title="This is a live gate, not a storyboard.">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card-dark">
            <h3 className="h3 !text-white">The door</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">A federation estate's A2A door requires the <code className="font-mono text-xs">predicate</code> proof grade for this skill. The gate <code className="font-mono text-xs">predicate-visitor</code> runs nightly against it, with a negative twin that must be refused.</p>
          </div>
          <div className="card-dark">
            <h3 className="h3 !text-white">The key safe</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">The key service added a P-256 curve and an <code className="font-mono text-xs">ES256</code> purpose that signs only under bound evidence — digest, venue, predicate digest. The gate is green on it with no local-key allowance.</p>
          </div>
          <div className="card-dark">
            <h3 className="h3 !text-white">What is still open</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">The replay check is the asserted grade, the valid-cards proof is a signed root rather than an in-circuit path, and the key safe is one operator on one machine. Each is named, with its cost to close, at the end of the essay.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`${ESSAY}#the-open-items-sorted-by-what-they-are`} className="btn-brass">The open items, one by one <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/examples/game-night" className="btn-outline-light">Another example: Game Night</Link>
        </div>
      </Section>

      <CTA
        title="The receiver asks its own question. The person is never the answer."
        body="A door that needs a fact gets a proof. A door entitled to a value gets the value and nothing else. The key that backs the card stamps only what a signed permission covers, and the permission is hers to cancel. That is the whole example."
        primary={{ href: ESSAY, label: 'Read the essay' }}
        secondary={{ href: '/developers', label: 'Build on it' }}
      />
    </>
  );
}
