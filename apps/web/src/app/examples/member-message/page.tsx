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
    "A member's agent writes to her organization's agent, which admits only adult members and learns neither who wrote nor any claim value. Ten beats: the receiver's own question, the standing wire, the proof, one signature in the key service, verification against the chain, two receipts.",
  path: '/examples/member-message',
});

const ESSAY = '/writing/tear-down-the-walled-garden-for-agents';

const PARTIES = [
  { who: 'Hannah', what: "A member of the organization. Her agent runs in her estate; her credential and the standing wire live in her vault; her device key lives in the estate's key service. She never appears in this story by name, address or key.", tone: 'navy' as const },
  { who: 'Her agent', what: 'The prover. It reads her vault under her grant, makes the proof, asks the key service for exactly one signature, posts the presentation, sends the message from a pairwise account.', tone: 'navy' as const },
  { who: 'The key service', what: 'A confidential VM holding a P-256 device key that is never exported. It signs ES256 only when the caller presents bound evidence — a digest, a venue, a predicate digest — and it checks that evidence itself.', tone: 'amber' as const },
  { who: "The organization's agent", what: 'The receiver and the verifier. It compiles its own policy, issues its own challenge, verifies the proof, resolves the issuer through the chain, and only then hands the message to its steward.', tone: 'violet' as const },
  { who: 'Chain and neutral ground', what: "Where the organization's issuer facet and attestation are anchored, and where the live-credential root is published. The verifier reads here; it never phones the issuer.", tone: 'teal' as const },
];

const LEARNS = [
  { k: 'The organization', v: 'That a member over eighteen wrote. The facet the credential came from, the predicate digest it checked, a nullifier that stops a replay inside its window, the status sequence it checked against. A pairwise account that it will see again from the same sender at the same door and nowhere else.', meta: 'never: a claim value, a signature, a device key, an address of hers' },
  { k: 'Hannah', v: 'Everything the organization learned, plus the one thing it cannot: the mandate the presentation was made under. Her receipt is in her vault and it is hers to carry.', meta: 'two receipts, two truths' },
  { k: 'The key service', v: 'That a signature was requested under evidence for this venue and this predicate digest, and that it signed. It saw a digest. It did not see the message, the credential or the proof.', meta: 'an audit row, not a copy' },
  { k: 'The issuer', v: 'Nothing. It was not asked. The verifier read its facet and attestation from the chain and the live-credential root from neutral ground.', meta: 'issuance is not a phone call' },
  { k: 'A second organization', v: 'Nothing that links to the first. A different door derives a different pairwise account, a different nullifier, and a proof that shares no visible value with the one above.', meta: 'unlinkable by construction' },
];

const SUITES = [
  { suite: 'openac-sd-jwt-p256', kind: 'zero knowledge', when: "The receiver needs a fact — 'over 18 and a member' — and must not learn a value, a signature or a key. This page's main flow.", shows: 'a predicate result, a nullifier (asserted grade), a status proof', hides: 'claim values, issuer signature, device key, link across receivers', tone: 'teal' as const },
  { suite: 'sd-jwt', kind: 'selective disclosure', when: 'The receiver is entitled to a value — the dues ledger needs the member number — and nothing more. The contrast beat.', shows: 'the disclosed claims, a pseudonym stable for this receiver', hides: 'the undisclosed claims (digest only)', tone: 'navy' as const },
];

export default function MemberMessage() {
  return (
    <>
      <PageHero
        eyebrow="Example · an animated walkthrough"
        title={<>A message between two agents.<br />A fact arrives. A person does not.</>}
        lede="Hannah's agent writes to her organization's agent. The organization reads only from members who are adults — and does not want to know which member wrote. Ten beats, from the receiver's own question to two receipts, with the one signature made in a key service under evidence of what her standing wire covered."
      >
        <Link href={ESSAY} className="btn-brass">The essay this example comes from <ArrowRight className="h-4 w-4" /></Link>
        <Link href="/architecture#meet-the-town" className="btn-outline-light">How the street works</Link>
        <div className="mt-2 flex w-full flex-wrap gap-2">
          {['zkID · OpenAC', 'SD-JWT', 'P-256 device key', 'standing wire', 'pairwise account', 'nullifier', 'neutral ground', 'two receipts'].map((t) => <Tag key={t} tone="dark">{t}</Tag>)}
        </div>
      </PageHero>

      <Section id="story" tone="navy" eyebrow="The animation" title="Ten beats. Press play, or step with the arrow keys." lede="Her estate is on the left of the dashed line; the organization's is on the right. Watch what crosses it: a challenge, a presentation, a message from a pairwise account — never a claim, never a key, never her.">
        <TownStory scene="message" id="member-message-story" />
      </Section>

      <Section number="01" eyebrow="Who is on the stage" title="Five parties. Two of them never meet." lede="The issuer is on the chain and is never asked. The key service sees a digest and signs. The organization learns a fact. Hannah appears nowhere she did not choose to.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PARTIES.map((p) => (
            <div key={p.who} className="card">
              <Tag tone={p.tone}>{p.who}</Tag>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{p.what}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" number="02" eyebrow="The flow, written down" title="What each beat does, and the rule it keeps." lede="The captions from the animation, laid out so you can read them in order. The sentence in colour under each is the one that makes this different from a session token or an API key.">
        <ol className="grid gap-4 md:grid-cols-2">
          {MESSAGE_BEATS.map((b, i) => (
            <li key={b.id} className="card flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-sm font-semibold text-white">{i + 1}</div>
              <div>
                <h3 className="h3 !text-lg">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.caption}</p>
                <p className="mt-2 text-sm font-semibold text-teal">{b.rule}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section number="03" eyebrow="The one signature" title="Why the key is asked once, and why the key service checks the evidence again.">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div className="prose-ap">
            <p>
              An anonymous credential is bound to a device key: the proof shows that whoever is presenting controls the key the issuer bound the credential to. That is the one moment a signature is needed. In most designs the device key sits on the person's phone and the agent cannot use it; in the lazy design the agent simply holds the key and becomes the person.
            </p>
            <p>
              Here the key is a P-256 key in the estate's key service, inside a confidential VM, never exported. Her agent does not hold it. What her agent holds is a <strong>standing wire</strong> she signed at her Home: present to this organization, this predicate program, under this issuer, until spring. When the proof reaches its signing callback, the presentation release judges the wire against the exact statement being made — the audience, the predicate digest, the issuer facet — and mints bound evidence. The key service signs only because the evidence covers it, and it checks the evidence itself before it does.
            </p>
            <p>
              The negative twin in beat five is the point. Evidence for a different venue reaches the same key service, under the same credentials, and nothing is signed. A service that could sign for any venue would be the person; a service that signs only what a wire covers is a delegate, and a delegate is something she can revoke from the same door she issued it at.
            </p>
          </div>
          <div>
            <Callout tone="amber">
              <p className="font-semibold">What the key service never sees</p>
              <p className="mt-2 text-sm">The message. The credential. The proof. It receives a digest to sign and evidence naming a venue and a predicate digest. Its audit row says a signature was made under that evidence — it does not say what for.</p>
            </Callout>
            <div className="mt-4">
              <Callout tone="teal">
                <p className="font-semibold">What this is not</p>
                <p className="mt-2 text-sm">Not a key on her smart account. The account's keys sign transactions and WebAuthn assertions; neither is what a P-256 credential binding needs. The device key is a separate custodied key, and the wire makes the key service a delegate of her agent, not an owner of her account.</p>
              </Callout>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="cream" number="04" eyebrow="Two suites" title="Two kinds of anonymous credential, and no ladder between them." lede="The same credential presents under either suite. Which one is decided by the receiver's question — a fact, or a value it is entitled to — and a request for a fact can never be answered with a value.">
        <div className="grid gap-4 md:grid-cols-2">
          {SUITES.map((s) => (
            <div key={s.suite} className="card">
              <div className="flex flex-wrap items-center gap-2">
                <code className="font-mono text-sm font-semibold text-navy">{s.suite}</code>
                <Tag tone={s.tone}>{s.kind}</Tag>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{s.when}</p>
              <dl className="mt-4 grid gap-2 text-sm">
                <div><dt className="font-semibold text-slate-900">Shows</dt><dd className="text-slate-600">{s.shows}</dd></div>
                <div><dt className="font-semibold text-slate-900">Hides</dt><dd className="text-slate-600">{s.hides}</dd></div>
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600">
          One suite per request. The door that asked “is this an adult member?” receives a proof and nothing else; the ledger that is entitled to a member number receives the number and a pseudonym it can reconcile against. A verifier cannot start with a predicate and end up holding a value.
        </p>
      </Section>

      <Section number="05" eyebrow="Who learned what" title="At the end of the story, five parties hold five different things.">
        <Ledger rows={LEARNS} />
      </Section>

      <Section tone="ink" number="06" eyebrow="Where it runs" title="This is a live gate, not a storyboard.">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card-dark">
            <h3 className="h3 !text-white">The door</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">A federation estate's A2A door requires the <code className="font-mono text-xs">predicate</code> proof grade for this skill. The gate <code className="font-mono text-xs">predicate-visitor</code> runs nightly against it, with a negative twin that must be refused.</p>
          </div>
          <div className="card-dark">
            <h3 className="h3 !text-white">The device key</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">The key service added the P-256 curve and the <code className="font-mono text-xs">ES256_SHA256</code> purpose with bound authority evidence. The gate is green on it with no local-key allowance.</p>
          </div>
          <div className="card-dark">
            <h3 className="h3 !text-white">What is still open</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">The nullifier is the asserted grade, the status proof is a signed root rather than an in-circuit path, and the key service is one operator on one machine. Each is named, with its cost to close, at the end of the essay.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`${ESSAY}#the-open-items-sorted-by-what-they-are`} className="btn-brass">The open items, one by one <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/examples/game-night" className="btn-outline-light">Another example: Game Night</Link>
        </div>
      </Section>

      <CTA
        title="The receiver asks its own question. The person is never the answer."
        body="A door that needs a fact gets a proof. A door entitled to a value gets the value and nothing else. The key that binds the credential signs only what a standing wire covers, and the wire is hers to revoke. That is the whole example."
        primary={{ href: ESSAY, label: 'Read the essay' }}
        secondary={{ href: '/developers', label: 'Build on it' }}
      />
    </>
  );
}
