import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { ArrowRight } from 'lucide-react';
import { SCRIPTURE_BEATS } from '@apsite/diagrams';
import { Callout, CTA, Ledger, Section, Tag } from '@/components/ui';
import { PageHero } from '@/components/PageHero';
import { TownStory } from '@/components/TownStory';

export const metadata: Metadata = pageMeta({
  title: 'Asking Scripture privately — an animated walkthrough',
  description:
    "Ruth pays once from a purse with no name on it, her agent comes home with a reader's card tied to a fresh key, and every question crosses the street under a new pen name with a sealed proof. The Scripture Agent learns that a licensed reader asked — never who.",
  path: '/examples/private-scripture',
});

const EXPLORER = 'https://explorer.faithnet.io/how-it-works';

const PEOPLE = [
  { who: 'Ruth', role: 'a reader', what: 'The person in the loop. She signs twice — once to let her reading app ask her agent, once to pay — and can cancel either at her own front door. She never appears across the street by name, address or key.', tone: 'navy' as const },
  { who: 'Her agent', role: 'does the legwork', what: 'Pays from the unmarked purse, collects the reader\'s card under a one-time pen name, makes a fresh sealed proof for each question, and carries the question across the street.', tone: 'teal' as const },
  { who: "The bookshop's agent", role: 'licenses the edition', what: 'Checks a payment against the public board, crosses the receipt off, and issues a reader\'s card to a key. It never learns who holds the key.', tone: 'amber' as const },
  { who: 'The Scripture Agent', role: 'answers', what: 'Asks its own question, checks the sealed proof against the public board, and answers from a signed copy of the text. It learns that a licensed reader asked — not who, and not whether it is the same reader as last time.', tone: 'violet' as const },
];

const PLACES = [
  { drawn: 'Her reading app', real: 'The Bible Explorer (explorer.faithnet.io). It is her app and knows who she is. It holds one permission — an "ask-as-me" delegation that lets it put a question to her own agent and nothing else — and never talks to the services across the street.' },
  { drawn: 'Her vault', real: 'Her encrypted record store. Holds the secret her pen names are derived from, the reader\'s card, and a record of each run. Her agent reads it under her grant; nobody else does.' },
  { drawn: 'The unmarked purse', real: 'A treasury account of hers with no public name and no on-chain link to her — linked to her only in her own vault. It pays; it is not her identity.' },
  { drawn: 'The receipt', real: 'The settlement of a payment on chain, plus a signature by the paying account over the receipt and the new key. It can be claimed once, and only by whoever controls the purse that paid.' },
  { drawn: "The reader's card", real: 'An OpenAC credential (SD-JWT, ES256) issued by the bookshop\'s agent — the licensed edition and a valid-until date — bound to a fresh device key in her key service. No name, no account, no payment details inside.' },
  { drawn: 'The key safe', real: 'Her key service (faithkms). The device key the card is tied to never leaves it; it signs only what her standing permission covers.' },
  { drawn: 'The sealed proof', real: 'A zero-knowledge presentation: "holds a reader\'s card from this bookshop, not expired", bound to the Scripture Agent\'s single-use question. Each proof is prepared fresh, so two proofs share nothing visible.' },
  { drawn: 'The pen name', real: 'A pairwise subject derived for this one question from the secret in her vault (`derivePerAskSubject`). Unrelated to every other question\'s; only she can recompute it.' },
  { drawn: 'The public notice board', real: 'The chain (faithchain). Where the payment settles, where the bookshop\'s issuing key is attested by its steward, and what both the bookshop and the Scripture Agent read instead of asking anyone.' },
  { drawn: 'Question #7310', real: 'A single-use challenge the Scripture Agent makes up for each licensed question. It stops a proof from being replayed and pins it to this door.' },
];

const LEARNS = [
  { k: 'The Scripture Agent', v: 'That a licensed reader asked this question, under a pen name it will never see again. The question text, because it has to answer it.', meta: 'never: a name, an account, a purse, earlier questions' },
  { k: 'The bookshop', v: 'That a payment it received was claimed once, for a reader\'s card tied to a key it has never seen before.', meta: 'never: who paid, who reads' },
  { k: 'The public board', v: 'That an unmarked purse paid the bookshop, and that the bookshop\'s issuing key is real.', meta: 'never: whose purse' },
  { k: 'Her reading app', v: 'Who she is and what she asked — it is her app.', meta: 'it talks only to her agent' },
  { k: 'Ruth', v: 'Everything: the receipt, the card, every pen name she used and the permission each ran under. She can prove a question was hers; no one else can.', meta: 'the whole story, and the off switch' },
];

const STATUS = [
  { k: 'Asking under a new pen name every time', v: "Live on explorer.faithnet.io since 2026-10-17: each question reaches the Scripture Agent under a pen name derived for that question alone (`derivePerAskSubject`), with no name, account, sign-in token, trace id, or the role and situation she set for context.", meta: 'live' },
  { k: "The bookshop's issuing key", v: "Live: lbsb.svc's P-256 issuing key in faithnet's key service, its facet signed by its steward and attested on faithchain, and its issuer record in its own vault.", meta: 'live' },
  { k: "Paying from an unmarked purse · the reader's card · the sealed proof", v: "Being built: a purse with its own custodian (so the chain cannot tie it to her person account), the claim-once receipt and card issuance, and proof preparation and checking in sealed containers. Until then, licensed reading pays from a named treasury and the pass is tied to her account.", meta: 'in progress' },
];

export default function PrivateScripture() {
  return (
    <>
      <PageHero
        eyebrow="Example · an animated walkthrough"
        title={<>Asking Scripture privately.<br />A reader asks. A person does not.</>}
        lede="Ruth reads a licensed edition of the Bible through her own agent. She pays once from a purse with no name on it, her agent comes home with a reader's card no one can trace to her, and every question crosses the street under a new pen name with a sealed proof. The Scripture Agent answers from a signed copy of the text — and learns that a licensed reader asked. Not who."
      >
        <Link href={EXPLORER} className="btn-brass">How it works in the Explorer <ArrowRight className="h-4 w-4" /></Link>
        <Link href="/examples/member-message" className="btn-outline-light">The member-message example</Link>
      </PageHero>

      <Section id="story" tone="navy" eyebrow="The animation" title="One street. Eight scenes. Press play, or step through with the arrow keys." lede="Ruth's side of the street is at the front; the bookshop and the Scripture Agent are across the street; the public notice board is on the corner. Watch what crosses: a coin from an unmarked purse, a receipt claimed once, a question under a new pen name with a sealed proof. Never her name.">
        <TownStory scene="scripture" id="private-scripture-story" />
      </Section>

      <Section number="01" eyebrow="Who is in the picture" title="One person, three agents." lede="A person signs. Everything after that is done by agents under what she decided.">
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
          {SCRIPTURE_BEATS.map((b, i) => (
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

      <Section tone="cream" number="04" eyebrow="The drawing, decoded" title="What the picture calls it, and what it really is." lede="Every object in the drawing stands for one real thing in the system.">
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

      <Section number="05" eyebrow="What still leaks" title="Honest limits." lede="Unlinkable is not invisible. These are the places a careful observer could still learn something, and what each would take to close.">
        <div className="grid gap-4 md:grid-cols-2">
          <Callout tone="amber"><p className="font-semibold">How the purse is filled</p><p className="mt-2 text-sm">If the unmarked purse is funded straight from an account that carries her name, the funding transfer links the two. Fill it from somewhere that does not.</p></Callout>
          <Callout tone="amber"><p className="font-semibold">The question itself</p><p className="mt-2 text-sm">The Scripture Agent must read the question to answer it. A question that names her, or that only she would ask, says who she is.</p></Callout>
          <Callout tone="amber"><p className="font-semibold">Timing and the size of the crowd</p><p className="mt-2 text-sm">A payment, a card issued a minute later and a first question a minute after that line up. And a proof hides her among every holder of a valid card — few readers means little cover.</p></Callout>
          <Callout tone="amber"><p className="font-semibold">One operator</p><p className="mt-2 text-sm">In this demo, her agent's runtime, the bookshop and the Scripture Agent are run by the same operator. The pen names hold against each service's own records, not against someone who can see all three.</p></Callout>
        </div>
      </Section>

      <Section tone="ink" number="06" eyebrow="Status" title="What runs today, and what is being built.">
        <Ledger rows={STATUS} dark />
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={EXPLORER} className="btn-brass">Try the Explorer <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/examples/member-message" className="btn-outline-light">The OpenAC credential, in the member-message example</Link>
        </div>
      </Section>

      <CTA
        title="The receiver asks its own question. The reader is never the answer."
        body="A payment that does not say who paid. A card issued to a key, not a person. A new pen name and a fresh proof for every question. The Scripture Agent learns exactly what it needs to answer fairly — and nothing that would let it recognise her."
        primary={{ href: EXPLORER, label: 'How it works in the Explorer' }}
        secondary={{ href: '/developers', label: 'Build on it' }}
      />
    </>
  );
}
