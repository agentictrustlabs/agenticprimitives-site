// A MESSAGE BETWEEN TWO AGENTS. One scene, ten beats: a member's agent writes to her organization's agent, which reads
// only from members who are adults and does not want to know which member wrote. The same drawing is a still (any
// beat), a page animation (the beats advance) and a frame source (the beat is a prop). Nothing here is client
// JavaScript: motion is CSS transitions on opacity and stroke-dashoffset, so a static render is the scene at that beat.
//
// The story — the example in "Your personal agent is the new walled garden": the receiver asks its own question; the
// sender's agent finds the credential and the wire; the proof is made and the key is asked ONCE, in the key service,
// under evidence of what the wire covered; the presentation goes ahead of the message; the receiver verifies against
// the chain, not the issuer; the steward reads; two receipts, two truths. Then the contrast: the same credential under
// selective disclosure, for a receiver that is entitled to the member number.
import type { CSSProperties, ReactNode } from 'react';
import { Arrow, Box, Brandline, C, Frame, Kicker, Label, Pill, tw } from './primitives';

export type MessageBeat = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface MessageBeatInfo {
  id: string;
  title: string;
  /** What is on screen, in one plain sentence. */
  caption: string;
  /** The line that makes ours different, said to a non-technical reader. */
  rule: string;
  /** Autoplay dwell, ms. */
  ms: number;
}

export const MESSAGE_BEATS: readonly MessageBeatInfo[] = [
  { id: 'actors', title: 'The actors', caption: "Hannah's vault holds a membership credential her organization issued — age and member, bound to a device key that lives in the estate's key service — plus a holder secret and one standing wire. The organization's agent has a rule: adults who are members, and it does not want to know which.", rule: 'The key is in the key service. The credential is in her vault. Neither is the agent\'s.', ms: 7000 },
  { id: 'question', title: 'The receiver asks its own question', caption: "The organization's agent compiles its policy — over 18 AND a member — into a predicate program, digests it, and issues a single-use challenge whose audience is itself. Nothing about the question comes from the sender.", rule: 'A verifier asks its own question, from its own policy, with its own challenge.', ms: 6200 },
  { id: 'wire', title: 'Her agent finds the credential and the wire', caption: 'From her vault: the credential, and the standing wire she signed at her Home — present to this organization, this predicate program, under this issuer, until spring. The wire is a delegation, not a key.', rule: 'A wire says where, what and until when. It never says who.', ms: 6200 },
  { id: 'proof', title: 'The proof is made', caption: 'Her agent runs the prepared half of the proof it already holds for this credential, then the showing half against the challenge. The proof hides the claim values, the issuer\'s signature and the device key.', rule: 'The verifier will learn that a statement is true, and nothing else.', ms: 6000 },
  { id: 'sign', title: 'The key is asked once', caption: 'Inside the one callback that needs a signature, the presentation release judges the wire against the exact statement — this audience, this predicate digest, this issuer facet — and mints bound evidence. The key service signs because the evidence covers it. For a different organization, nothing would have signed.', rule: 'The key signs only what the wire covers. The service checks it a second time.', ms: 7400 },
  { id: 'send', title: 'The presentation goes ahead of the message', caption: 'A proof bundle is larger than an edge header, so the presentation is posted first and held ten minutes under a reference. The message cites the reference and is signed by a pairwise account — one derived for this organization alone.', rule: 'Different door, different account. Same door, same account. Never her person.', ms: 6600 },
  { id: 'verify', title: 'The receiver verifies, against the chain', caption: "It checks the proof against the challenge it issued and the program it compiled. It resolves the issuer's key through the chain to a live facet of the organization's own issuer — never by asking the issuer. It consumes the nullifier for its window and checks the status proof against the live-credential root on neutral ground.", rule: 'Issuer trust is read from the chain. The issuer is never phoned.', ms: 7400 },
  { id: 'read', title: 'The steward reads', caption: 'Only now is the message handed to the steward. The organization knows a member over eighteen wrote. It does not know which member.', rule: 'A fact was proved. A person was not identified.', ms: 5200 },
  { id: 'receipts', title: 'Two receipts, two truths', caption: "The organization's receipt names the facet, the predicate digest, the nullifier grade and the status sequence — never a claim, never her person. Her own receipt, in her vault, adds the one thing the receiver cannot know: the mandate the presentation was made under.", rule: 'Each side keeps what it is entitled to, and nothing more.', ms: 6800 },
  { id: 'contrast', title: 'The other suite: when the receiver is entitled to a value', caption: 'Had the receiver been the dues ledger, which needs the member number, the same credential presents under selective disclosure instead: the member claim in the clear, the birth date withheld, a pseudonym stable for this receiver alone. Same credential, same wire shape, a different question answered.', rule: 'One suite per request. A verifier that asked for a fact never ends up holding a value.', ms: 7000 },
];

const W = 1280;
const H = 850;

// ── lanes ─────────────────────────────────────────────────────────────────────
const TOP = 40;
const LANE_H = 64;
const BOTTOM = 790;
const L = {
  vault: { x: 118, name: "Hannah's vault", sub: 'credential · secret · wire', tone: 'navy' as const },
  agent: { x: 356, name: 'Her agent', sub: 'runtime · the prover', tone: 'navy' as const },
  kms: { x: 594, name: 'Key service', sub: 'confidential VM · device key', tone: 'amber' as const },
  org: { x: 858, name: "The organization's agent", sub: 'the receiver · its door', tone: 'violet' as const },
  chain: { x: 1120, name: 'Chain · neutral ground', sub: 'issuer facet · live root', tone: 'teal' as const },
};
const LANES = Object.values(L);

const EASE = 'cubic-bezier(.4,0,.2,1)';

/** Bright on its beat, ghosted after, hidden before. The contrast beat clears the stage. */
function vis(beat: MessageBeat, at: MessageBeat): number {
  if (at === 9) return beat === 9 ? 1 : 0;
  if (beat === 9) return 0;
  if (at === 8 && beat === 0) return 0;
  if (beat === at) return 1;
  return at > beat ? 0.16 : 0;
}

function Layer({ beat, at, children, delay = 0 }: { beat: MessageBeat; at: MessageBeat; children: ReactNode; delay?: number }) {
  return <g style={{ opacity: vis(beat, at), transition: `opacity .7s ${EASE} ${delay}ms` }}>{children}</g>;
}

/** A message line between lanes that draws itself in on its beat. */
function Wire({ x1, x2, y, beat, at, tone, label, dashed = false, delay = 0, dur = 1.1, back = false }: { x1: number; x2: number; y: number; beat: MessageBeat; at: MessageBeat; tone: 'navy' | 'amber' | 'violet' | 'teal' | 'rose' | 'ink'; label?: string; dashed?: boolean; delay?: number; dur?: number; back?: boolean }) {
  const drawn = at >= beat && !(at === 9 && beat !== 9);
  const stroke = tone === 'navy' ? C.navy : tone === 'amber' ? C.amber : tone === 'violet' ? C.violet : tone === 'teal' ? C.teal : tone === 'rose' ? C.rose : C.ink;
  const mid = (x1 + x2) / 2;
  const lw = label ? tw(label, 11, false, 600) + 12 : 0;
  const dir = x2 >= x1 ? 1 : -1;
  const headDelay = delay + (dashed ? 300 : dur * 900);
  return (
    <g>
      <path d={`M ${x1} ${y} H ${x2 - dir * 6}`} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" pathLength={1}
        strokeDasharray={dashed ? '0.015 0.015' : 1} strokeDashoffset={dashed ? 0 : drawn ? 0 : 1}
        style={dashed ? { opacity: drawn ? 1 : 0, transition: `opacity .6s ${EASE} ${delay}ms` } : { transition: `stroke-dashoffset ${dur}s ${EASE} ${delay}ms` }} />
      <path d={`M ${x2} ${y} l ${-dir * 9} -5 v 10 z`} fill={stroke} style={{ opacity: drawn ? 1 : 0, transition: `opacity .3s ${EASE} ${headDelay}ms` }} />
      {label && (
        <g style={{ opacity: drawn ? 1 : 0, transition: `opacity .5s ${EASE} ${delay + (dashed ? 200 : dur * 600)}ms` }}>
          <rect x={mid - lw / 2} y={y - (back ? -6 : 22)} width={lw} height={17} rx={4} fill={C.bg} opacity={0.94} />
          <text x={mid} y={y - (back ? -18 : 10)} fontSize={11} fontWeight={600} textAnchor="middle" fill={stroke} fontFamily="inherit">{label}</text>
        </g>
      )}
    </g>
  );
}

/** A small round badge: a check, a cross, a signature. */
function Badge({ x, y, tone, soft, glyph, text }: { x: number; y: number; tone: string; soft: string; glyph: 'check' | 'cross' | 'sign' | 'lock'; text?: string }) {
  const g = glyph === 'check'
    ? <path d={`M ${x - 6} ${y} l 4 4 l 8 -8`} fill="none" stroke={tone} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    : glyph === 'cross'
      ? <path d={`M ${x - 5} ${y - 5} l 10 10 M ${x + 5} ${y - 5} l -10 10`} fill="none" stroke={tone} strokeWidth={2.2} strokeLinecap="round" />
      : glyph === 'sign'
        ? <path d={`M ${x - 6} ${y + 4} q 3 -10 6 -3 t 6 -3 M ${x - 7} ${y + 7} h 14`} fill="none" stroke={tone} strokeWidth={1.8} strokeLinecap="round" />
        : <g fill="none" stroke={tone} strokeWidth={1.8}><rect x={x - 5.5} y={y - 2} width={11} height={8} rx={1.5} /><path d={`M ${x - 3.5} ${y - 2} v -3 a 3.5 3.5 0 0 1 7 0 v 3`} /></g>;
  const lw = text ? tw(text, 10, false, 600) * 1.1 + 12 : 0;
  return (
    <g>
      <circle cx={x} cy={y} r={13} fill={soft} stroke={tone} strokeWidth={1.5} />
      {g}
      {text && (
        <>
          <rect x={x + 18} y={y - 9} width={lw} height={18} rx={4} fill={soft} stroke={tone} strokeWidth={1} />
          <text x={x + 24} y={y + 3.5} fontSize={10} fontWeight={600} fill={tone} fontFamily="inherit">{text}</text>
        </>
      )}
    </g>
  );
}

/** A card pinned to a lane: a small titled list. */
function Card({ cx, y, w, h, title, lines, tone, mono = false }: { cx: number; y: number; w: number; h: number; title: string; lines: readonly string[]; tone: 'navy' | 'teal' | 'amber' | 'rose' | 'violet' | 'slate' | 'paper'; mono?: boolean }) {
  return <Box x={cx - w / 2} y={y} w={w} h={h} title={title} lines={lines} tone={tone} titleSize={11.5} lineSize={10.5} mono={mono} variant="header" />;
}

const Y = {
  cards: TOP + LANE_H + 22,       // 126 — the standing cards (beat 0); receipts and the contrast take these slots
  question: 268,
  wire: 310,
  proof: 348,
  evidence: 414,
  sig: 448,
  twin: 500,
  present: 548,
  message: 586,
  verify: 636,
  verifyBack: 668,
  verifyBox: 696,
  read: 768,
};

export function MemberMessageScene({ beat = 0 }: { beat?: MessageBeat }) {
  const at = beat;
  const id = 'member-message';
  const soft = { navy: C.navySoft, teal: C.tealSoft, amber: C.amberSoft, rose: C.roseSoft, violet: C.violetSoft } as const;
  return (
    <Frame id={id} w={W} h={H} title="A member's agent messages her organization's agent, which admits only adult members and learns neither who wrote nor any claim value">
      <style>{`@media (prefers-reduced-motion: reduce) { #${id} * { transition: none !important; } }`}</style>

      {/* lanes */}
      {LANES.map((l) => (
        <g key={l.name}>
          <Box x={l.x - 104} y={TOP} w={208} h={LANE_H} title={l.name} lines={[l.sub]} tone={l.tone} titleSize={13} lineSize={10.5} align="middle" solid />
          <line x1={l.x} y1={TOP + LANE_H} x2={l.x} y2={BOTTOM} stroke={C.line} strokeWidth={1.5} strokeDasharray="2 4" />
        </g>
      ))}
      {/* the estate boundary: her side / their side */}
      <line x1={726} y1={TOP + LANE_H + 8} x2={726} y2={BOTTOM} stroke={C.rose} strokeWidth={1} strokeDasharray="8 6" opacity={0.6} />
      <Kicker x={420} y={BOTTOM + 24} text="her estate — nothing here leaves" tone="navy" anchor="middle" />
      <Kicker x={990} y={BOTTOM + 24} text="their estate — a fact arrives, a person does not" tone="violet" anchor="middle" />

      {/* beat 0 — the standing cards */}
      <Layer beat={0} at={at}>
        <Card cx={L.vault.x} y={Y.cards} w={200} h={112} title="credential.anonymous" tone="navy" lines={['age · member', 'issuer: the org\'s facet', 'cnf → device key (a reference)']} />
        <Card cx={L.vault.x} y={Y.cards + 122} w={200} h={38} title="holder secret" tone="navy" lines={[]} />
        <Card cx={L.kms.x} y={Y.cards} w={200} h={76} title="device key · P-256" tone="amber" lines={['never exported', 'signs ES256 only under evidence']} />
        <Card cx={L.org.x} y={Y.cards} w={224} h={76} title="policy" tone="violet" lines={['age ≥ 18  ∧  member ≥ 1', 'issuers: { the org\'s own facet }']} mono />
        <Card cx={L.chain.x} y={Y.cards} w={200} h={76} title="anchored" tone="teal" lines={['issuer facet + attestation', 'live-credential root · seq n']} />
      </Layer>
      <Layer beat={0} at={at} delay={200}>
        <Card cx={L.agent.x} y={Y.cards} w={200} h={76} title="standing wire" tone="navy" lines={['present → this org · this program', 'this issuer · until spring']} />
      </Layer>

      {/* beat 1 — the question */}
      <Wire x1={L.org.x} x2={L.agent.x + 10} y={Y.question} beat={1} at={at} tone="violet" label="challenge · single use · audience = me · predicate digest" />
      <Layer beat={1} at={at} delay={700}>
        <Badge x={L.org.x + 26} y={Y.question} tone={C.violet} soft={soft.violet} glyph="lock" text="my policy, my nonce" />
      </Layer>

      {/* beat 2 — the wire */}
      <Wire x1={L.vault.x} x2={L.agent.x - 10} y={Y.wire} beat={2} at={at} tone="navy" label="credential + wire (read under her vault grant)" />
      <Layer beat={2} at={at} delay={700}>
        <Pill x={L.agent.x + 16} y={Y.wire - 12} text="wire covers: this audience · this program · this facet" tone="navy" size={10} />
      </Layer>

      {/* beat 3 — the proof */}
      <Layer beat={3} at={at}>
        <Box x={L.agent.x - 100} y={Y.proof - 8} w={200} h={46} title="Prepare (cached) → Show(challenge)" lines={['hides values · issuer sig · device key']} tone="paper" titleSize={11} lineSize={10} align="middle" />
      </Layer>

      {/* beat 4 — the one signature, and the twin */}
      <Wire x1={L.agent.x + 10} x2={L.kms.x - 10} y={Y.evidence} beat={4} at={at} tone="amber" label="bound evidence: digest · venue · predicate digest" />
      <Wire x1={L.kms.x - 10} x2={L.agent.x + 10} y={Y.sig} beat={4} at={at} tone="amber" label="r ‖ s  (64 bytes, low-S)" delay={900} back />
      <Layer beat={4} at={at} delay={500}>
        <Badge x={L.kms.x + 26} y={Y.evidence} tone={C.amber} soft={soft.amber} glyph="sign" text="release judged the wire" />
      </Layer>
      <Layer beat={4} at={at} delay={1700}>
        <g opacity={0.85}>
          <Wire x1={L.agent.x + 10} x2={L.kms.x - 10} y={Y.twin} beat={4} at={at} tone="rose" label="twin: evidence for another venue" dashed />
          <Badge x={L.kms.x + 26} y={Y.twin} tone={C.rose} soft={soft.rose} glyph="cross" text="AUTHORITY_EVIDENCE_INVALID — nothing signed" />
        </g>
      </Layer>

      {/* beat 5 — ahead of the message */}
      <Wire x1={L.agent.x + 10} x2={L.org.x - 10} y={Y.present} beat={5} at={at} tone="navy" label="presentation → held 10 min under a reference" />
      <Wire x1={L.agent.x + 10} x2={L.org.x - 10} y={Y.message} beat={5} at={at} tone="navy" label="message · from a pairwise account · cites the reference" delay={1100} />
      <Layer beat={5} at={at} delay={1900}>
        <Pill x={L.agent.x - 96} y={Y.message + 10} text="pairwise account = f(secret, this door) — no address of hers" tone="navy" size={10} />
      </Layer>

      {/* beat 6 — verify against the chain */}
      <Wire x1={L.org.x + 10} x2={L.chain.x - 10} y={Y.verify} beat={6} at={at} tone="teal" label="facet live? root at seq n?" />
      <Wire x1={L.chain.x - 10} x2={L.org.x + 10} y={Y.verifyBack} beat={6} at={at} tone="teal" label="facet attested · root current" delay={900} back />
      <Layer beat={6} at={at} delay={1600}>
        <Box x={L.org.x - 130} y={Y.verifyBox} w={260} h={62} title="verified against the chain" lines={['challenge ✓ · program digest ✓', 'nullifier consumed ✓ · status root ✓ · the issuer was never asked']} tone="violet" titleSize={11.5} lineSize={10} align="middle" />
      </Layer>

      {/* beat 7 — the steward reads */}
      <Layer beat={7} at={at}>
        <Badge x={L.org.x} y={Y.read} tone={C.violet} soft={soft.violet} glyph="check" text="a member, over 18 — not which" />
      </Layer>

      {/* beat 8 — two receipts */}
      <Layer beat={8} at={at}>
        <Card cx={L.org.x} y={Y.cards} w={236} h={96} title="its receipt" tone="violet" lines={['facet · predicate digest', 'nullifier: asserted · status seq n', 'pairwise account — no claim, no person']} />
        <Card cx={L.vault.x} y={Y.cards} w={200} h={76} title="her receipt" tone="navy" lines={['proof · challenge · + the MANDATE', 'what the receiver cannot know']} />
      </Layer>
      <Wire x1={L.agent.x - 10} x2={L.vault.x + 100} y={Y.cards + 40} beat={8} at={at} tone="navy" label="receipt → her vault" delay={400} />

      {/* beat 9 — the contrast: selective disclosure for the dues ledger */}
      <Layer beat={9} at={at}>
        <Box x={L.org.x - 130} y={Y.cards} w={260} h={64} title="the dues ledger (another receiver)" lines={['entitled to the member NUMBER']} tone="violet" titleSize={12} lineSize={10.5} align="middle" variant="header" />
        <Box x={L.agent.x - 118} y={Y.question - 10} w={236} h={120} title="suite: sd-jwt (selective disclosure)" lines={['member: 0900101 — in the clear', 'birth date — withheld (digest only)', 'pseudonym — stable for THIS receiver', 'issuer signature — visible, linkable']} tone="paper" titleSize={11.5} lineSize={10.5} />
        <Box x={L.agent.x - 118} y={Y.evidence + 10} w={236} h={92} title="suite: openac-sd-jwt-p256 (zero knowledge)" lines={['over 18 ∧ member — a fact', 'no value · no signature · no key', 'unlinkable across receivers']} tone="teal" titleSize={11.5} lineSize={10.5} />
        <Label x={L.agent.x} y={Y.evidence - 6} text="same credential · same wire shape · one suite per request" size={10.5} weight={600} tone="ink" anchor="middle" />
        <Wire x1={L.agent.x + 10} x2={L.org.x - 10} y={Y.question + 40} beat={9} at={at} tone="violet" label="disclosed claims + pseudonym" />
        <Badge x={L.org.x} y={Y.sig} tone={C.rose} soft={soft.rose} glyph="cross" text="no ladder: a predicate request never gets a value back" />
      </Layer>

      <Brandline w={W} h={H} left="A message between two agents · the receiver verifies a fact, never a person" />
    </Frame>
  );
}
