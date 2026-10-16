// ASKING SCRIPTURE, PRIVATELY — drawn as a town, the way `member-message` is. Ruth lives on the south side of the
// street with her Home, her vault, the key safe and an unmarked purse. Across the street: the bookshop that licenses an
// edition (its till is the publisher's treasury), and the Scripture Agent's house, where questions are answered from a
// signed corpus. On the corner, the public notice board (the chain). She pays once from a purse with no name on it, her
// agent comes home with a reader's card no one can trace to her, and every question after that crosses the street under
// a pen name made for that one question, with a sealed proof that she is a reader — never who she is.
//
// Same contract as `MemberMessageScene`: a `beat` prop, CSS transitions for everything that changes, CSS motion paths
// for the walkers. Plain words on the drawing; the technical names live on the page.
import type { ReactNode } from 'react';
import { Box, District, EASE, ISO_H, ISO_W, Lane, PAL, Reply, Tag, Tile, Tree, Walker, iso, pathOf, shade } from './iso-town';
import { Agent, Bubble, Person, Signature, Spot, wrap } from './member-message';
import { FONT, tw } from './primitives';

export type ScriptureBeat = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ScriptureBeatInfo {
  id: string;
  title: string;
  /** What is on screen, in one plain sentence. */
  caption: string;
  /** The line that makes ours different, said to a non-technical reader. */
  rule: string;
  /** Autoplay dwell, ms — used when narration is off. */
  ms: number;
  /** The interaction, made explicit: who is acting, who receives, what passes between them. */
  from: string;
  to: string;
  what: string;
  /** The spoken walkthrough for this scene (also shown as the transcript). */
  narration: string;
}

export const SCRIPTURE_BEATS: readonly ScriptureBeatInfo[] = [
  {
    id: 'meet', title: 'Meet everyone', ms: 9000,
    caption: "Ruth lives on the near side of the street with her agent, her vault, a key safe and a purse with no name on it. Across the street: the bookshop that licenses an edition of the Bible, with its till, and the Scripture Agent, which answers questions from a signed copy of the text. On the corner, a public notice board.",
    rule: 'Three things never cross the street: her name, her keys, and anything that ties one question to the next.',
    from: 'Nobody yet', to: '—', what: 'Who is where, and what each of them holds',
    narration: "Let's meet everyone. On the near side of the street lives Ruth, with her agent, her vault, a key safe that never opens, and a purse with no name on it. Across the street is a bookshop that licenses an edition of the Bible; its till is where payments land. Next door is the Scripture Agent, which answers questions from a signed copy of the text. And on the corner stands a public notice board that anyone can read. Watch what crosses the street. Her name never will.",
  },
  {
    id: 'connect', title: 'Ruth opens her reading app', ms: 7400,
    caption: 'In her reading app, Ruth signs once at her own Home: "This app may put my questions to my agent — nothing else." The app is hers; it knows her. The permission goes no further than her own agent.',
    rule: 'Her app may ask her agent. It may not do anything else, and it never speaks to the other side of the street.',
    from: 'Ruth', to: 'her Home', what: 'one signed permission: the reading app may put questions to her agent — revocable at her front door',
    narration: "Ruth opens her reading app and signs one permission at her own Home: this app may put my questions to my agent, and nothing else. The app is hers, so it knows who she is. But the permission ends at her own agent. The app never talks to anyone across the street.",
  },
  {
    id: 'pay', title: 'She pays from a purse with no name', ms: 8200,
    caption: 'Ruth wants the licensed edition. Her agent pays the bookshop from the unmarked purse — one signature from Ruth at her Home. The notice board records that a purse paid the bookshop. Nothing on the board says whose purse it is.',
    rule: 'The payment is public. Who paid is not.',
    from: 'her agent · from the unmarked purse', to: "the bookshop's till", what: 'one payment for a reading pass — the board shows "an unmarked purse paid the bookshop"',
    narration: "Ruth wants to read a licensed edition, so she pays — once. Her agent takes the payment from her unmarked purse, a purse with no name on it, after Ruth signs for it at her Home. The coin goes to the bookshop's till, and the public notice board records it: an unmarked purse paid the bookshop. That's all anyone can see. Nothing links that purse to Ruth.",
  },
  {
    id: 'card', title: 'Her agent comes home with a reader\'s card', ms: 8600,
    caption: 'Under a pen name made just for this errand, her agent shows the bookshop the receipt, signed by the purse that paid, and a brand-new key from the key safe. The bookshop checks the board, crosses the receipt off so it can never be used twice, and hands over a reader\'s card: "licensed reader, until autumn", tied to that new key. The card goes into her vault.',
    rule: 'The bookshop issues a card to a key — not to a person.',
    from: 'her agent · under a one-time pen name', to: 'the bookshop', what: 'receipt + a new key in → a reader\'s card out: "licensed reader, until autumn", tied to the key, filed in her vault',
    narration: "Now her agent collects what she paid for. It walks to the bookshop under a pen name made just for this errand, carrying the receipt — signed by the purse that paid — and a brand-new key from the key safe. The bookshop checks the receipt against the notice board, crosses it off so it can never be used again, and issues a reader's card: licensed reader, until autumn. The card is tied to that new key, not to Ruth. Her agent files it in her vault.",
  },
  {
    id: 'question', title: 'The Scripture Agent asks its own question', ms: 7400,
    caption: 'Ruth asks a question in her app; the app hands it to her agent. Before it answers anything licensed, the Scripture Agent sends a fresh question to her gate: "A licensed reader? Prove it. Question #7310 — for this door, this once."',
    rule: 'The receiver asks its own question. It never asks who.',
    from: 'the Scripture Agent', to: "Ruth's gate", what: '"A licensed reader? Prove it." — question #7310, good at this door, once',
    narration: "Ruth types a question into her app, and the app hands it to her agent — that's all the app is allowed to do. Across the street, the Scripture Agent answers licensed questions only for licensed readers. So it sends a fresh question to Ruth's gate: a licensed reader? Prove it. Question seven three one zero, good at this door, and only once. It doesn't ask for a name. It doesn't ask for the card.",
  },
  {
    id: 'proof', title: 'A sealed proof, made at home and stamped once', ms: 8200,
    caption: 'Inside the house, her agent uses the card to make a sealed proof — "licensed reader, still valid: YES" — and the key safe stamps it once for question #7310. The card never leaves the vault. A proof made for one question is never used for another.',
    rule: 'The proof says yes. It does not show the card — and no two proofs look alike.',
    from: 'her vault · the key safe', to: 'her agent', what: 'the card stays home; out comes a sealed proof for #7310, stamped once by the key the card is tied to',
    narration: "Her agent goes to work inside the house. From the reader's card it makes a sealed proof that says only: licensed reader, still valid, yes. The key safe stamps it once, for question seven three one zero. The card never leaves the vault. And here's the important part: every proof is made fresh. No two proofs look alike, so no one can tell that two questions came from the same card.",
  },
  {
    id: 'send', title: 'The question crosses under a new pen name', ms: 7000,
    caption: 'Her agent carries the question across the street with the sealed proof inside. The envelope is signed with a pen name made for this one question. Her next question will carry a different pen name — and nothing about who she is or what she has asked before.',
    rule: 'A new pen name for every question. Never her name.',
    from: 'her agent', to: "the Scripture Agent's door", what: 'the question, under a pen name made for this question alone — the sealed proof inside, nothing else',
    narration: "Now the question crosses the street. Her agent carries it, with the sealed proof inside, in an envelope signed with a pen name made for this one question. Her next question will carry a different pen name. There's no name, no address, no history in the envelope — just the question, and the proof that a licensed reader asked it.",
  },
  {
    id: 'answer', title: 'The board, then the answer — signed verses', ms: 9600,
    caption: 'The Scripture Agent checks the notice board: Is this the bookshop\'s real stamp? Is the card still in date? Has #7310 been used? Yes, yes, no. Then it answers from its signed copy of the text, every verse checked and every citation signed, and the answer walks back to Ruth. What did it learn? That a licensed reader asked this question. Not who.',
    rule: 'The Scripture Agent knows the question was fair to answer. It never knows who asked.',
    from: 'the Scripture Agent', to: 'the notice board · then back to Ruth', what: '"real stamp? still valid? #7310 unused?" — yes · yes · unused; then verified verses with signed citations, back to her app',
    narration: "Before answering, the Scripture Agent walks to the public notice board. Is this the bookshop's real stamp? Is the card still in date? Has question seven three one zero been used before? Yes, yes, and no. Then it answers from its signed copy of the text — every verse checked against the original, every citation signed — and the answer walks back across the street to Ruth's agent and into her app. What did the Scripture Agent learn? That a licensed reader asked this question. Not who. And next time, it won't even know it's the same reader.",
  },
];

const W = ISO_W; const H = ISO_H;
const SUMMARY = 7;

// ── the town plan ──────────────────────────────────────────────────────────────────────────────────────────────────
// Grid 0..20 × 0..14. One east–west street along gy 6–8. South: Ruth's side (Home, vault, key safe, the unmarked
// purse). North-west: the public notice board. North-middle: the bookshop. North-east: the Scripture Agent.
const GX = 20; const GY = 14;
const HOME = { gx: 1.4, gy: 9.6 }; const VAULT = { gx: 5.2, gy: 9.2 }; const KEYSAFE = { gx: 8.4, gy: 9.8 }; const PURSE = { gx: 11.8, gy: 10.2 };
const RUTH = { gx: 2.6, gy: 12.9 }; const AGENT = { gx: 5.2, gy: 12.7 };
const GATE = { gx: 6.6, gy: 8.6 } as const;
const BOARD = { gx: 1.8, gy: 1.8 }; const BOARDFRONT = { gx: 3.2, gy: 3.5 };
const SHOP = { gx: 8.0, gy: 1.4 }; const SHOPDOOR = { gx: 9.6, gy: 5.0 };
const SCRIPT = { gx: 14.0, gy: 1.4 }; const SCRIPTDOOR = { gx: 16.2, gy: 5.2 };

const ST = 7.0; // street centre
const VAULTFRONT = { gx: 6.05, gy: 11.2 }; const SAFEFRONT = { gx: 9.3, gy: 11.9 }; const PURSEFRONT = { gx: 12.6, gy: 12.1 };
const AG = [AGENT.gx + 0.3, AGENT.gy - 0.3] as const;
const L = {
  connect: [[RUTH.gx + 0.2, RUTH.gy - 0.4], [RUTH.gx + 0.2, HOME.gy + 2.4]] as const,
  toPurse: [AG, [PURSEFRONT.gx, AG[1]], [PURSEFRONT.gx, PURSEFRONT.gy]] as const,
  pay: [[PURSEFRONT.gx, PURSEFRONT.gy], [PURSEFRONT.gx, ST], [SHOPDOOR.gx, ST], [SHOPDOOR.gx, SHOPDOOR.gy + 0.3]] as const,
  toShop: [AG, [GATE.gx, AG[1]], [GATE.gx, ST], [SHOPDOOR.gx, ST], [SHOPDOOR.gx, SHOPDOOR.gy + 0.3]] as const,
  shopBoard: [[SHOPDOOR.gx, SHOPDOOR.gy + 0.3], [SHOPDOOR.gx, ST], [BOARDFRONT.gx, ST], [BOARDFRONT.gx, BOARDFRONT.gy]] as const,
  cardHome: [[SHOPDOOR.gx, SHOPDOOR.gy + 0.3], [SHOPDOOR.gx, ST], [VAULTFRONT.gx, ST], [VAULTFRONT.gx, VAULTFRONT.gy]] as const,
  ask: [[SCRIPTDOOR.gx, SCRIPTDOOR.gy + 0.3], [SCRIPTDOOR.gx, ST], [GATE.gx, ST], [GATE.gx, GATE.gy]] as const,
  fetch: [[VAULTFRONT.gx, VAULTFRONT.gy], [VAULTFRONT.gx, AG[1]], AG] as const,
  toSafe: [AG, [SAFEFRONT.gx, AG[1]], [SAFEFRONT.gx, SAFEFRONT.gy]] as const,
  fromSafe: [[SAFEFRONT.gx, SAFEFRONT.gy], [SAFEFRONT.gx, AG[1]], AG] as const,
  send: [AG, [GATE.gx, AG[1]], [GATE.gx, ST], [SCRIPTDOOR.gx, ST], [SCRIPTDOOR.gx, SCRIPTDOOR.gy + 0.3]] as const,
  board: [[SCRIPTDOOR.gx, SCRIPTDOOR.gy + 0.3], [SCRIPTDOOR.gx, ST], [BOARDFRONT.gx, ST], [BOARDFRONT.gx, BOARDFRONT.gy]] as const,
  answer: [[SCRIPTDOOR.gx, SCRIPTDOOR.gy + 0.3], [SCRIPTDOOR.gx, ST], [GATE.gx, ST], [GATE.gx, AG[1]], AG] as const,
};

const K = 1.3;
const centre = iso(GX / 2, GY / 2);
const TOWN_TRANSFORM = `translate(${(W / 2 - centre.x * K).toFixed(1)}, ${(H / 2 + 36 - centre.y * K).toFixed(1)}) scale(${K})`;

/** The reader's card, shown on the vault's roof once she holds it. */
function CardOnVault({ on }: { on: boolean }) {
  const p0 = iso(VAULT.gx + 0.85, VAULT.gy + 0.85, 30);
  const p = { x: p0.x + 48, y: p0.y - 86 };
  return (
    <g style={{ opacity: on ? 1 : 0, transition: `opacity .6s ${EASE}` }}>
      <line x1={p0.x} y1={p0.y - 2} x2={p.x - 6} y2={p.y - 22} stroke={PAL.muted} strokeWidth={1} />
      <rect x={p.x - 85} y={p.y - 64} width={170} height={42} rx={6} fill="#fff7e6" stroke={PAL.amber} strokeWidth={1.4} />
      <rect x={p.x - 77} y={p.y - 56} width={22} height={16} rx={3} fill={PAL.amber} opacity={0.8} />
      <text x={p.x - 49} y={p.y - 46} fontSize={10} fontWeight={700} fill="#0b1830" fontFamily={FONT}>reader's card</text>
      <text x={p.x - 49} y={p.y - 33} fontSize={9.5} fontWeight={500} fill="#3b3b3b" fontFamily={FONT}>licensed · until autumn · a key</text>
    </g>
  );
}

function InteractionCard({ at }: { at: ScriptureBeat }) {
  const b = SCRIPTURE_BEATS[at]!;
  const x = 36; const y = 26; const w = 430; const size = 12.5;
  const lines = wrap(b.what, size, w - 32).slice(0, 3);
  const h = 96 + lines.length * 17;
  const fromTo = b.to === '—' ? b.from : `${b.from}  →  ${b.to}`;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="#0b1830" stroke={PAL.glow} strokeWidth={1.2} opacity={0.96} />
      <text x={x + 16} y={y + 24} fontSize={10.5} fontWeight={700} fill={PAL.glow} fontFamily={FONT} letterSpacing={1.6}>{`SCENE ${at + 1} OF ${SCRIPTURE_BEATS.length}`}</text>
      <text x={x + 16} y={y + 46} fontSize={Math.min(16, (16 * (w - 32)) / Math.max(tw(b.title, 16, false, 700), w - 32))} fontWeight={700} fill={PAL.ink} fontFamily={FONT}>{b.title}</text>
      <text x={x + 16} y={y + 70} fontSize={Math.min(12.5, (12.5 * (w - 32)) / Math.max(tw(fromTo, 12.5, false, 700), w - 32))} fontWeight={700} fill={shade(PAL.teal, 0.35)} fontFamily={FONT}>{fromTo}</text>
      {lines.map((l, i) => <text key={i} x={x + 16} y={y + 92 + i * 17} fontSize={size} fontWeight={500} fill={PAL.muted} fontFamily={FONT}>{l}</text>)}
    </g>
  );
}

function Ground() {
  const tiles: ReactNode[] = [];
  for (let gx = 0; gx < GX; gx++) for (let gy = 0; gy < GY; gy++) {
    const road = gy >= 6 && gy < 8;
    tiles.push(<Tile key={`${gx}-${gy}`} gx={gx} gy={gy} fill={road ? PAL.road : PAL.ground} stroke={road ? undefined : PAL.groundLine} opacity={road ? 1 : 0.9} />);
  }
  return (
    <g>
      {tiles}
      <path d={pathOf([[0, ST], [GX, ST]])} stroke={PAL.roadLine} strokeWidth={1} strokeDasharray="8 8" opacity={0.45} fill="none" />
      <Tile gx={0.6} gy={8.5} w={13.6} d={5.2} fill={PAL.grass} opacity={0.5} />
      <Tile gx={0.6} gy={0.4} w={5.6} d={5} fill={PAL.teal} opacity={0.08} />
      <Tile gx={6.8} gy={0.4} w={5.4} d={5.2} fill={PAL.amber} opacity={0.07} />
      <Tile gx={12.8} gy={0.4} w={7} d={5.2} fill={PAL.violet} opacity={0.08} />
    </g>
  );
}

function Town({ at }: { at: ScriptureBeat }) {
  return (
    <g>
      <District gx={0.6} gy={8.5} w={13.6} d={5.2} label="Ruth's side of the street · her Home, vault, key safe, an unmarked purse" tone="navy" at="bottom" />
      <District gx={0.6} gy={0.4} w={5.6} d={5} label="The public notice board · the chain" tone="teal" at="left" />
      <District gx={6.8} gy={0.4} w={5.4} d={5.2} tone="amber" />
      <District gx={12.8} gy={0.4} w={7} d={5.2} label="The Scripture Agent" tone="violet" at="bottom" />

      <Tree gx={1.0} gy={1.0} /><Tree gx={6.4} gy={5.0} s={0.9} /><Tree gx={12.4} gy={1.0} s={0.9} /><Tree gx={19.4} gy={5.0} s={0.9} />
      <Box gx={BOARD.gx} gy={BOARD.gy} w={2.8} d={1} h={56} tone="teal" roof="slab" windows={false} sign="Public notice board" signSize={13} />
      <Box gx={SHOP.gx} gy={SHOP.gy} w={2.8} d={2.4} h={50} tone="amber" roof="gable" sign="The bookshop" signSize={13} />
      <Box gx={SCRIPT.gx} gy={SCRIPT.gy} w={3.4} d={2.6} h={64} tone="violet" roof="pediment" sign="The Scripture Agent" signSize={13} />

      <Tree gx={1.0} gy={9.0} /><Tree gx={13.8} gy={13.2} s={0.9} />
      <Box gx={VAULT.gx} gy={VAULT.gy} w={1.7} d={1.7} h={30} tone="amber" roof="slab" sign="Her vault" signSize={13} />
      <Box gx={HOME.gx} gy={HOME.gy} w={2.4} d={2.2} h={46} tone="navy" roof="gable" sign="Ruth's Home" signSize={13} />
      <Box gx={KEYSAFE.gx} gy={KEYSAFE.gy} w={1.8} d={1.8} h={42} tone="amber" roof="flat" windows={false} sign="Key safe" signSize={13} />
      <Box gx={PURSE.gx} gy={PURSE.gy} w={1.6} d={1.6} h={26} tone="slate" roof="flat" windows={false} sign="Unmarked purse" signSize={12} />
      <CardOnVault on={at >= 3} />

      <Person gx={RUTH.gx} gy={RUTH.gy} name="Ruth" color={PAL.navy} note="a reader" />
      <Agent gx={AGENT.gx} gy={AGENT.gy} name="her agent" color={PAL.teal} />
      <Agent gx={SHOPDOOR.gx} gy={SHOPDOOR.gy} name="the bookshop's agent" color={PAL.amber} />
      <Agent gx={SCRIPTDOOR.gx} gy={SCRIPTDOOR.gy} name="the Scripture Agent" color={PAL.violet} />
    </g>
  );
}

// ── the scene ──────────────────────────────────────────────────────────────────────────────────────────────────────
export function PrivateScriptureScene({ beat: at = 0 }: { beat?: ScriptureBeat }) {
  const id = 'private-scripture';
  const S = 11.5;
  const boardZ = 56 + 60; const scriptZ = 64 + 86; const shopZ = 50 + 76; const safeZ = 42 + 50; const purseZ = 26 + 50;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-title`} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', fontFamily: FONT }}>
      <title id={`${id}-title`}>A reader pays from an unnamed purse, receives a reader's credential bound to a fresh key, and asks the Scripture Agent under a new pen name with a sealed proof each time — the Scripture Agent learns that a licensed reader asked, never who</title>
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={PAL.sky0} /><stop offset="1" stopColor={PAL.sky1} /></linearGradient>
      </defs>
      <style>{`@keyframes iso-in { from { opacity: 0 } to { opacity: 1 } } @keyframes iso-out { to { opacity: 0 } } @media (prefers-reduced-motion: reduce) { #${id} * { transition: none !important; animation: none !important; } }`}</style>
      <rect width={W} height={H} fill={`url(#${id}-sky)`} />
      {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 173) % W} cy={(i * 97) % 120} r={(i % 3) * 0.5 + 0.4} fill="#fff" opacity={0.35} />)}

      <g transform={TOWN_TRANSFORM}>
      <Ground />

      {/* who is acting */}
      <Spot gx={RUTH.gx} gy={RUTH.gy} on={at === 1} />
      <Spot gx={PURSE.gx + 0.8} gy={PURSE.gy + 0.8} on={at === 2} r={50} />
      <Spot gx={SHOPDOOR.gx} gy={SHOPDOOR.gy} on={at === 2 || at === 3} />
      <Spot gx={VAULT.gx + 0.85} gy={VAULT.gy + 0.85} on={at === 3 || at === 5} r={56} />
      <Spot gx={AGENT.gx} gy={AGENT.gy} on={at === 5 || at === 6} />
      <Spot gx={KEYSAFE.gx + 0.9} gy={KEYSAFE.gy + 0.9} on={at === 5} r={58} />
      <Spot gx={SCRIPTDOOR.gx} gy={SCRIPTDOOR.gy} on={at === 4 || at === 6 || at === 7} />
      <Spot gx={BOARD.gx + 1.4} gy={BOARD.gy + 0.5} on={at === 2 || at === 3 || at === 7} r={70} />

      {/* lanes */}
      <Lane pts={L.connect} beat={1} at={at} color={PAL.glow} delay={2200} summary={SUMMARY} />
      <Lane pts={L.toPurse} beat={2} at={at} color={PAL.amber} summary={SUMMARY} />
      <Lane pts={L.pay} beat={2} at={at} color={PAL.amber} delay={2000} dur={1.8} summary={SUMMARY} />
      <Lane pts={L.toShop} beat={3} at={at} color={PAL.navy} dur={1.8} summary={SUMMARY} />
      <Lane pts={L.shopBoard} beat={3} at={at} color={PAL.teal} delay={2800} summary={SUMMARY} />
      <Lane pts={L.cardHome} beat={3} at={at} color={PAL.good} delay={5200} dur={1.8} summary={SUMMARY} />
      <Lane pts={L.ask} beat={4} at={at} color={PAL.violet} dur={1.8} summary={SUMMARY} />
      <Lane pts={L.fetch} beat={5} at={at} color={PAL.amber} summary={SUMMARY} />
      <Lane pts={L.toSafe} beat={5} at={at} color={PAL.amber} delay={1600} summary={SUMMARY} />
      <Lane pts={L.fromSafe} beat={5} at={at} color={PAL.good} delay={4200} summary={SUMMARY} />
      <Lane pts={L.send} beat={6} at={at} color={PAL.navy} dur={2} summary={SUMMARY} />
      <Lane pts={L.board} beat={7} at={at} color={PAL.teal} dur={2} summary={SUMMARY} />
      <Lane pts={L.answer} beat={7} at={at} color={PAL.good} delay={3800} dur={2} summary={SUMMARY} />

      <Town at={at} />

      {/* beat 0 — what is where */}
      <Tag gx={KEYSAFE.gx + 1.8} gy={KEYSAFE.gy + 3.4} z={10} text="her keys — they never come out" color={PAL.amber} on={at === 0} size={11} />
      <Tag gx={PURSE.gx + 0.8} gy={PURSE.gy + 0.8} z={purseZ} text="no name on it" color={PAL.muted} on={at === 0 || at === 2} size={11} />
      <Tag gx={SHOP.gx + 1.4} gy={SHOP.gy + 1.2} z={shopZ} text="the bookshop: sells reading passes · its till is public" color={shade(PAL.amber, 0.3)} on={at === 0} size={11} />
      <Tag gx={SCRIPT.gx + 1.7} gy={SCRIPT.gy + 1.3} z={scriptZ} text="answers from a signed copy of the text" color={shade(PAL.violet, 0.3)} on={at === 0} size={11} />
      <Tag gx={BOARD.gx + 1.4} gy={BOARD.gy + 0.5} z={boardZ} text="payments · the bookshop's stamp" color={PAL.good} on={at === 0} size={11} />

      {/* beat 1 — connect */}
      <Signature gx={RUTH.gx} gy={RUTH.gy} on={at === 1} />
      <Bubble gx={RUTH.gx + 0.3} gy={RUTH.gy} z={44} lines={['I sign once:', 'my reading app may put my questions', 'to my agent — nothing else.']} color={PAL.glow} on={at === 1} delay={500} size={S} />
      <Walker pts={L.connect} beat={1} at={at} say="her permission → her Home" color={PAL.glow} delay={2300} dur={1.2} size={S} />

      {/* beat 2 — pay from the unmarked purse */}
      <Walker pts={L.toPurse} beat={2} at={at} say="Ruth signed: pay for a pass" color={PAL.amber} delay={200} dur={1.6} until={2200} size={S} />
      <Walker pts={L.pay} beat={2} at={at} say="a coin, from an unmarked purse" color={PAL.amber} delay={2100} dur={2.4} size={S} />
      <Reply gx={BOARDFRONT.gx} gy={BOARDFRONT.gy} z={30} text="posted: an unmarked purse paid the bookshop" color={PAL.good} beat={2} at={at} delay={4600} size={S} summary={SUMMARY} />

      {/* beat 3 — the reader's card */}
      <Walker pts={L.toShop} beat={3} at={at} say="pen name · receipt signed by the purse · a new key" color={shade(PAL.navy, 0.3)} delay={200} dur={2.4} until={2800} size={S} />
      <Walker pts={L.shopBoard} beat={3} at={at} say="paid? not claimed before?" color={PAL.teal} delay={2900} dur={1.8} until={4900} size={S} />
      <Reply gx={SHOPDOOR.gx} gy={SHOPDOOR.gy} z={70} text="receipt crossed off — never twice ✓" color={PAL.good} beat={3} at={at} delay={4800} size={S} summary={SUMMARY} />
      <Walker pts={L.cardHome} beat={3} at={at} say="reader's card → her vault" color={PAL.good} delay={5300} dur={2.2} size={S} />

      {/* beat 4 — the Scripture Agent's question */}
      <Walker pts={L.ask} beat={4} at={at} say="A licensed reader? Prove it. #7310 — this door, once" color={PAL.violet} delay={600} dur={2.6} size={S} />
      <Reply gx={SCRIPTDOOR.gx} gy={SCRIPTDOOR.gy} z={70} text="no name asked" color={shade(PAL.violet, 0.3)} beat={4} at={at} delay={3400} size={S} summary={SUMMARY} />

      {/* beat 5 — the proof and the stamp */}
      <Walker pts={L.fetch} beat={5} at={at} say="the card stays home" color={PAL.amber} delay={200} dur={1.4} until={1700} size={S} />
      <Walker pts={L.toSafe} beat={5} at={at} say="stamp this — #7310 only" color={PAL.amber} delay={1700} dur={1.8} until={4200} size={S} />
      <Reply gx={KEYSAFE.gx + 3.0} gy={KEYSAFE.gy + 0.9} z={safeZ + 80} text="one stamp ✓" color={PAL.good} beat={5} at={at} delay={3800} size={S} summary={SUMMARY} />
      <Reply gx={AGENT.gx} gy={AGENT.gy} z={62} text="sealed proof: licensed reader — YES" color={PAL.good} beat={5} at={at} delay={5200} size={S} summary={SUMMARY} />

      {/* beat 6 — across the street under a new pen name */}
      <Walker pts={L.send} beat={6} at={at} say="✉ question · new pen name · sealed proof" color={shade(PAL.navy, 0.3)} delay={200} dur={3} size={S} />
      <Tag gx={HOME.gx + 1.2} gy={HOME.gy + 1.1} z={46 + 70} text="no name · no history · no situation" color={shade(PAL.navy, 0.35)} on={at === 6} size={11} />

      {/* beat 7 — the board, then the answer */}
      <Walker pts={L.board} beat={7} at={at} say="real stamp? still valid? #7310 unused?" color={PAL.teal} delay={200} dur={2.6} until={3600} size={S} />
      <Reply gx={BOARDFRONT.gx} gy={BOARDFRONT.gy} z={30} text="yes · yes · unused" color={PAL.good} beat={7} at={at} delay={3000} size={S} summary={SUMMARY} />
      <Walker pts={L.answer} beat={7} at={at} say="verified verses · signed citations" color={PAL.good} delay={3900} dur={2.6} size={S} />
      <Tag gx={SCRIPT.gx + 1.7} gy={SCRIPT.gy + 1.3} z={scriptZ} text="learned: a licensed reader asked — not who" color={shade(PAL.violet, 0.3)} on={at === SUMMARY} delay={6800} size={11} />
      </g>

      <InteractionCard at={at} />
    </svg>
  );
}
