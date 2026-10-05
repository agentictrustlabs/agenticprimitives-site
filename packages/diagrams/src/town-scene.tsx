// MEET THE TOWN. One scene, eight beats. The same drawing is a still (any beat), a page animation (the beats
// advance and the roads draw themselves) and, later, a video (the beat and its progress are props, so a frame
// renderer can drive it). Nothing here is client JavaScript: a beat is a prop; motion is CSS transitions and a
// CSS motion path on the tokens, so a static render is simply the scene at that beat.
//
// The story the beats tell — and where it parts from every other "agent town": discovery is a fact, trust is
// resolved from the chain, a request goes gate to gate, the act is signed at HER door and travels with the
// request, the receipt comes home to HER vault, and she can cut the road from the same door. Then the camera
// pulls back: another town, on another chain, and the road between them carries evidence, never authority.
import type { CSSProperties, ReactNode } from 'react';
import { Building, Flag, Plot, Resident } from './estate-kit';
import { Brandline, C, FONT, Frame, Label, MONO, Pill, tw } from './primitives';

export type TownBeat = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface TownBeatInfo {
  id: string;
  title: string;
  /** What is on screen, in one plain sentence. */
  caption: string;
  /** The line that makes ours different, said to a non-technical reader. */
  rule: string;
  /** Autoplay dwell, ms. */
  ms: number;
}

export const TOWN_BEATS: readonly TownBeatInfo[] = [
  { id: 'street', title: 'The street', caption: 'A town is one chain. Along the street: estates — a person, an organization, a service — each with its own front door, staff, vault and gate. At the end of the street, the services every neighbour shares.', rule: 'Shared by all. Owned by none.', ms: 5200 },
  { id: 'discover', title: 'Discover', caption: "Alice's agent asks the town's address book for a translation service. The directory answers with a card: a name, an address, what it offers.", rule: 'A listing is a fact, not a permission.', ms: 5600 },
  { id: 'trust', title: 'Trust', caption: 'Before trusting the card, her agent checks it against the chain: the address, the endpoint, who stands behind it. The directory is a hint; the chain is the record.', rule: 'Resolved from the chain, not from the directory.', ms: 5600 },
  { id: 'communicate', title: 'Communicate', caption: 'The two agents talk gate to gate, in both directions. Each gate checks who is calling before anything is let through.', rule: 'Every request arrives at a gate first.', ms: 5200 },
  { id: 'act', title: 'Act', caption: 'Alice signs at her own front door. The signed permission travels with the request — this service, this task, this limit — and the service does the work.', rule: 'Signed at her door. Carried with the request.', ms: 6600 },
  { id: 'receipt', title: 'Receipt', caption: 'A receipt comes home to her vault. The public graph records only the public fact; the private detail never leaves her estate.', rule: 'Her vault keeps the receipt.', ms: 6200 },
  { id: 'revoke', title: 'Revoke', caption: 'Alice cuts the permission from the same door. The next request under it reaches the gate, the gate reads the chain, and it is refused.', rule: 'Being on the street never gave anyone power over her.', ms: 6200 },
  { id: 'federation', title: 'Beyond the town', caption: 'Pull back: another town, on another chain, joined by a public road. Evidence and value can cross it. Authority never leaves the chain it was signed on.', rule: 'Towns on different ground, joined by roads: a federation.', ms: 7000 },
];

const W = 1280;
const H = 720;

// ── layout ───────────────────────────────────────────────────────────────────────────────────────────────────────
const SVC_Y = 70; const SVC_H = 92; const SVC_W = 190;
const SVC_X = { naming: 70, graph: 300, registry: 530, kms: 760, chain: 990 } as const;
const STREET = { y: 190, h: 50 } as const;
const EST_Y = 258; const EST_H = 382; const EST_W = 372;
const EST_X = { alice: 58, org: 460, svc: 862 } as const;

function estateGeom(ex: number) {
  return {
    edge: { x: ex + 126, y: EST_Y + 34, w: 120, h: 70, cx: ex + 186 },
    home: { x: ex + 16, y: EST_Y + 130, w: 160, h: 96, cx: ex + 96 },
    runtime: { x: ex + 196, y: EST_Y + 130, w: 160, h: 96, cx: ex + 276 },
    vault: { x: ex + 16, y: EST_Y + 246, w: 160, h: 84, cx: ex + 96 },
    resident: { x: ex + 196, y: EST_Y + 280, w: 160 },
  };
}
const A = estateGeom(EST_X.alice);
const O = estateGeom(EST_X.org);
const S = estateGeom(EST_X.svc);
const chainCx = SVC_X.chain + SVC_W / 2;
const registryCx = SVC_X.registry + SVC_W / 2;
const graphCx = SVC_X.graph + SVC_W / 2;
const svcBottom = SVC_Y + SVC_H;

// Roads (as paths). Lanes on the street are at different y so successive beats read as traffic.
const P = {
  discover: `M ${A.runtime.cx} ${A.runtime.y} V 218 H ${registryCx} V ${svcBottom + 2}`,
  card: `M ${registryCx + 14} ${svcBottom + 2} V 230 H ${A.runtime.cx + 14} V ${A.runtime.y}`,
  trust: `M ${A.runtime.cx - 14} ${A.runtime.y} V 204 H ${chainCx} V ${svcBottom + 2}`,
  talkOut: `M ${A.edge.cx} ${A.edge.y} V 224 H ${S.edge.cx} V ${S.edge.y}`,
  talkBack: `M ${S.edge.cx + 10} ${S.edge.y} V 232 H ${A.edge.cx + 10} V ${A.edge.y}`,
  act: `M ${A.home.cx} ${A.home.y} V ${A.edge.y + 36} H ${A.edge.cx} V 212 H ${S.edge.cx} V ${S.edge.y + S.edge.h + 13} H ${S.runtime.cx} V ${S.runtime.y - 8}`,
  receipt: `M ${S.runtime.cx} ${S.runtime.y - 8} V ${S.edge.y + S.edge.h + 13} H ${S.edge.cx - 10} V 226 H ${A.edge.cx} V ${A.home.y + 106} H ${A.vault.cx} V ${A.vault.y}`,
  stale: `M ${A.runtime.cx} ${A.runtime.y} V 212 H ${S.edge.cx} V ${S.edge.y - 14}`,
  check: `M ${S.edge.cx + 30} ${S.edge.y + 2} V 198 H ${chainCx + 30} V ${svcBottom + 2}`,
};

// ── motion helpers ───────────────────────────────────────────────────────────────────────────────────────────────
const EASE = 'cubic-bezier(.4,0,.2,1)';

/** Visibility of a beat's overlay: bright on its beat, ghosted after, hidden before (and hidden when the camera pulls back). */
function vis(beat: TownBeat, at: TownBeat): number {
  if (beat === 7 && at !== 7) return 0;
  if (beat === at) return 1;
  return at > beat ? 0.14 : 0;
}

function Layer({ beat, at, children, delay = 0 }: { beat: TownBeat; at: TownBeat; children: ReactNode; delay?: number }) {
  return <g style={{ opacity: vis(beat, at), transition: `opacity .7s ${EASE} ${delay}ms` }}>{children}</g>;
}

/** A road that draws itself in on its beat. `pathLength=1` makes the dash trick independent of real length. */
function DrawRoad({ d, beat, at, tone, width = 2.5, dashed = false, delay = 0, dur = 1.3 }: { d: string; beat: TownBeat; at: TownBeat; tone: string; width?: number; dashed?: boolean; delay?: number; dur?: number }) {
  const drawn = at >= beat;
  return (
    <path d={d} fill="none" stroke={tone} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" pathLength={1}
      strokeDasharray={dashed ? '0.012 0.012' : 1}
      strokeDashoffset={dashed ? 0 : drawn ? 0 : 1}
      style={dashed ? { opacity: drawn ? 1 : 0, transition: `opacity .6s ${EASE} ${delay}ms` } : { transition: `stroke-dashoffset ${dur}s ${EASE} ${delay}ms` }} />
  );
}

/** A labelled token that travels a path on its beat (CSS motion path). It sits at the start until then. */
function Token({ d, beat, at, text, tone, soft, delay = 500, dur = 2 }: { d: string; beat: TownBeat; at: TownBeat; text: string; tone: string; soft: string; delay?: number; dur?: number }) {
  const go = at >= beat;
  const w = tw(text, 10.5, false, 650) * 1.1 + 22;
  const style: CSSProperties = {
    offsetPath: `path('${d}')`,
    offsetRotate: '0deg',
    offsetDistance: go ? '100%' : '0%',
    opacity: at > beat ? 0 : 1,
    transition: go ? `offset-distance ${dur}s ${EASE} ${delay}ms, opacity .5s ${EASE}` : 'none',
  };
  return (
    <g style={style}>
      <rect x={-w / 2} y={-11} width={w} height={22} rx={11} fill={soft} stroke={tone} strokeWidth={1.5} />
      <text x={0} y={3.8} fontSize={10.5} fontWeight={650} textAnchor="middle" fill={tone} fontFamily={FONT}>{text}</text>
    </g>
  );
}

/** A small round badge pinned to a building: a signature, a check, a cross. */
function Badge({ x, y, tone, soft, glyph, text }: { x: number; y: number; tone: string; soft: string; glyph: 'sign' | 'check' | 'cross' | 'dot'; text?: string }) {
  const g = glyph === 'sign'
    ? <path d={`M ${x - 6} ${y + 4} q 3 -10 6 -3 t 6 -3 M ${x - 7} ${y + 7} h 14`} fill="none" stroke={tone} strokeWidth={1.8} strokeLinecap="round" />
    : glyph === 'check'
      ? <path d={`M ${x - 6} ${y} l 4 4 l 8 -8`} fill="none" stroke={tone} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      : glyph === 'cross'
        ? <path d={`M ${x - 5} ${y - 5} l 10 10 M ${x + 5} ${y - 5} l -10 10`} fill="none" stroke={tone} strokeWidth={2.2} strokeLinecap="round" />
        : <circle cx={x} cy={y} r={4} fill={tone} />;
  const lw = text ? tw(text, 10, false, 600) * 1.1 + 12 : 0;
  return (
    <g>
      <circle cx={x} cy={y} r={13} fill={soft} stroke={tone} strokeWidth={1.5} />
      {g}
      {text && (
        <>
          <rect x={x + 18} y={y - 9} width={lw} height={18} rx={4} fill={soft} stroke={tone} strokeWidth={1} />
          <text x={x + 24} y={y + 3.5} fontSize={10} fontWeight={600} fill={tone} fontFamily={FONT}>{text}</text>
        </>
      )}
    </g>
  );
}

/** A soft pulse ring behind a building that is "speaking" on this beat. */
function Glow({ x, y, w, h, tone, on }: { x: number; y: number; w: number; h: number; tone: string; on: boolean }) {
  return <rect x={x - 8} y={y - 10} width={w + 16} height={h + 18} rx={10} fill="none" stroke={tone} strokeWidth={3} style={{ opacity: on ? 0.55 : 0, transition: `opacity .6s ${EASE}` }} />;
}

// ── the estates ──────────────────────────────────────────────────────────────────────────────────────────────────
function Estate({ ex, caption, sub, tone, kind, name, note, homeName, svcName }: { ex: number; caption: string; sub: string; tone: 'navy' | 'violet' | 'teal'; kind: 'person' | 'org' | 'service'; name: string; note: string; homeName: string; svcName: string }) {
  const g = estateGeom(ex);
  return (
    <g>
      <Plot x={ex} y={EST_Y} w={EST_W} h={EST_H} caption={caption} sub={sub} tone={tone} />
      <Building x={g.edge.x} y={g.edge.y} w={g.edge.w} h={g.edge.h} kind="edge" name="Gate" lines={['who is calling?']} titleSize={12} lineSize={9.5} />
      <Building x={g.home.x} y={g.home.y} w={g.home.w} h={g.home.h} kind="home" name={homeName} lines={['sign in · decide', 'grant · revoke']} />
      <Building x={g.runtime.x} y={g.runtime.y} w={g.runtime.w} h={g.runtime.h} kind="runtime" name={svcName} lines={['plans · asks · acts', 'only under a permission']} />
      <Building x={g.vault.x} y={g.vault.y} w={g.vault.w} h={g.vault.h} kind="vault" name="Vault" lines={['records · receipts', 'the private record']} />
      <Resident x={g.resident.x} y={g.resident.y} w={g.resident.w} kind={kind} name={name} note={note} />
    </g>
  );
}

function SharedServices() {
  return (
    <g>
      <Building x={SVC_X.naming} y={SVC_Y} w={SVC_W} h={SVC_H} kind="naming" name="Address book" lines={['who lives where', 'one name per agent']} />
      <Building x={SVC_X.graph} y={SVC_Y} w={SVC_W} h={SVC_H} kind="graph" name="Public graph" lines={['the notice board', 'public facts only']} />
      <Building x={SVC_X.registry} y={SVC_Y} w={SVC_W} h={SVC_H} kind="registry" name="Directories" lines={['who offers what', 'lists · never grants']} />
      <Building x={SVC_X.kms} y={SVC_Y} w={SVC_W} h={SVC_H} kind="kms" name="Key service" lines={['keys for agents', 'a key is never the owner']} />
      <Building x={SVC_X.chain} y={SVC_Y} w={SVC_W} h={SVC_H} kind="chain" name="The chain" lines={['the shared record', 'permissions · revocations']} />
    </g>
  );
}

function Street({ at }: { at: TownBeat }) {
  const y = STREET.y; const h = STREET.h;
  return (
    <g>
      <rect x={40} y={y} width={W - 80} height={h} rx={8} fill={C.faint} opacity={0.55} />
      <line x1={56} y1={y + h / 2} x2={W - 56} y2={y + h / 2} stroke={C.line} strokeWidth={1} strokeDasharray="14 10" opacity={at === 0 ? 0.9 : 0.35} style={{ transition: `opacity .6s ${EASE}` }} />
      <text x={W - 52} y={y + h - 8} fontSize={9.5} textAnchor="end" fill={C.muted} fontFamily={MONO} letterSpacing={1.2}>THE STREET · AGENT TO AGENT · GATE TO GATE</text>
    </g>
  );
}

// ── the second town (beat 7) ─────────────────────────────────────────────────────────────────────────────────────
function OtherTown({ at }: { at: TownBeat }) {
  const on = at === 7;
  const x = 740; const y = 150; const w = 480; const h = 400;
  return (
    <g style={{ opacity: on ? 1 : 0, transition: `opacity .9s ${EASE} ${on ? 700 : 0}ms` }}>
      <Plot x={x} y={y} w={w} h={h} caption="Town · base" sub="another chain" tone="amber" />
      <Building x={x + 30} y={y + 50} w={128} h={70} kind="naming" name="Address book" titleSize={11.5} />
      <Building x={x + 176} y={y + 50} w={128} h={70} kind="graph" name="Public graph" titleSize={11.5} />
      <Building x={x + 322} y={y + 50} w={128} h={70} kind="chain" name="The chain" titleSize={11.5} />
      <rect x={x + 24} y={y + 150} width={w - 48} height={26} rx={6} fill={C.faint} opacity={0.55} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Plot x={x + 30 + i * 146} y={y + 200} w={128} h={160} caption={['Estate', 'Estate', 'Estate'][i]!} tone={(['navy', 'violet', 'teal'] as const)[i]!} />
          <Building x={x + 44 + i * 146} y={y + 236} w={100} h={54} kind="home" name="Home" titleSize={11} />
          <Building x={x + 44 + i * 146} y={y + 300} w={100} h={50} kind="vault" name="Vault" titleSize={11} />
        </g>
      ))}
      <Flag x={x + w - 190} y={y + h - 34} text="ap-federation" status="designed" />
    </g>
  );
}

function PublicGround({ at }: { at: TownBeat }) {
  const on = at === 7;
  return (
    <g style={{ opacity: on ? 1 : 0, transition: `opacity .9s ${EASE} ${on ? 1500 : 0}ms` }}>
      <Building x={596} y={466} w={170} h={74} kind="ground" name="Public ground" lines={['roots · proofs · bindings', 'evidence, never authority']} titleSize={12} lineSize={9.5} />
      <path d="M 520 452 C 530 480, 560 500, 596 503" fill="none" stroke={C.amber} strokeWidth={2.5} strokeDasharray="8 6" strokeLinecap="round" />
      <path d="M 766 503 C 800 500, 820 530, 830 549" fill="none" stroke={C.amber} strokeWidth={2.5} strokeDasharray="8 6" strokeLinecap="round" />
      <path d="M 580 280 C 630 240, 690 240, 738 280" fill="none" stroke={C.amber} strokeWidth={2.5} strokeLinecap="round" />
      <rect x={547} y={292} width={224} height={22} rx={4} fill={C.bg} opacity={0.92} />
      <text x={659} y={307} fontSize={11} fontWeight={650} textAnchor="middle" fill={C.amber} fontFamily={FONT}>a road between towns · evidence and value</text>
      <rect x={440} y={588} width={400} height={22} rx={4} fill={C.bg} opacity={0.92} />
      <text x={640} y={603} fontSize={11} fontWeight={650} textAnchor="middle" fill={C.ink} fontFamily={FONT}>authority never leaves the chain it was signed on</text>
    </g>
  );
}

// ── the scene ────────────────────────────────────────────────────────────────────────────────────────────────────
/**
 * The town at one beat. Pass `beat` 0–7; the wrapper (or a video renderer) advances it. Everything that changes
 * between beats is a CSS transition, so stepping the prop animates and a static render is a still.
 */
export function TownScene({ beat: at = 0 }: { beat?: TownBeat }) {
  const pulled = at === 7;
  const townStyle: CSSProperties = {
    transform: pulled ? 'translate(40px, 150px) scale(0.42)' : 'translate(0px, 0px) scale(1)',
    transformOrigin: '0 0',
    transition: `transform 1.4s ${EASE}`,
  };
  const tealSoft = C.tealSoft; const amberSoft = C.amberSoft; const navySoft = C.navySoft; const roseSoft = C.roseSoft;
  return (
    <Frame w={W} h={H} title="Meet the town: discover, trust, communicate, act, receipt, revoke, federate" id="town-scene">
      <g style={townStyle}>
        <Plot x={24} y={24} w={W - 48} h={H - 76} caption="Town · faithchain" sub="one chain · many estates · the services they share" tone="teal" />
        <SharedServices />
        <text x={70} y={svcBottom + 16} fontSize={9.5} fill={C.muted} fontFamily={MONO} letterSpacing={1.2}>SHARED BY ALL · OWNED BY NONE · NONE OF THESE CAN ACT FOR AN ESTATE</text>
        <Street at={at} />

        {/* glows: who is speaking this beat */}
        <Glow x={SVC_X.registry} y={SVC_Y} w={SVC_W} h={SVC_H} tone={C.teal} on={at === 1} />
        <Glow x={SVC_X.chain} y={SVC_Y} w={SVC_W} h={SVC_H} tone={C.amber} on={at === 2 || at === 6} />
        <Glow x={SVC_X.graph} y={SVC_Y} w={SVC_W} h={SVC_H} tone={C.violet} on={at === 5} />
        <Glow x={A.home.x} y={A.home.y} w={A.home.w} h={A.home.h} tone={C.amber} on={at === 4} />
        <Glow x={A.home.x} y={A.home.y} w={A.home.w} h={A.home.h} tone={C.rose} on={at === 6} />
        <Glow x={A.vault.x} y={A.vault.y} w={A.vault.w} h={A.vault.h} tone={C.teal} on={at === 5} />
        <Glow x={S.runtime.x} y={S.runtime.y} w={S.runtime.w} h={S.runtime.h} tone={C.amber} on={at === 4} />
        <Glow x={A.edge.x} y={A.edge.y} w={A.edge.w} h={A.edge.h} tone={C.navy} on={at === 3} />
        <Glow x={S.edge.x} y={S.edge.y} w={S.edge.w} h={S.edge.h} tone={C.navy} on={at === 3} />
        <Glow x={S.edge.x} y={S.edge.y} w={S.edge.w} h={S.edge.h} tone={C.rose} on={at === 6} />

        <Estate ex={EST_X.alice} caption="Estate · Alice" sub="a person" tone="navy" kind="person" name="alice.me" note="holds her own keys" homeName="Alice's Home" svcName="Her agent" />
        <Estate ex={EST_X.org} caption="Estate · Missio Nexus" sub="an organization" tone="violet" kind="org" name="missionexus.org" note="members · roles · a treasury" homeName="The org's Home" svcName="The org's agent" />
        <Estate ex={EST_X.svc} caption="Estate · a service" sub="run by someone, for hire" tone="teal" kind="service" name="translate.svc" note="offers translation" homeName="Operator's Home" svcName="Service agent" />

        {/* 1 · discover */}
        <Layer beat={1} at={at}>
          <DrawRoad d={P.discover} beat={1} at={at} tone={C.teal} />
          <Token d={P.discover} beat={1} at={at} text="who translates?" tone={C.teal} soft={tealSoft} delay={300} dur={1.6} />
          <DrawRoad d={P.card} beat={1} at={at} tone={C.teal} delay={1900} />
          <Token d={P.card} beat={1} at={at} text="a card: translate.svc" tone={C.teal} soft={tealSoft} delay={2100} dur={1.6} />
        </Layer>
        {/* 2 · trust */}
        <Layer beat={2} at={at}>
          <DrawRoad d={P.trust} beat={2} at={at} tone={C.amber} />
          <Token d={P.trust} beat={2} at={at} text="is this card true?" tone={C.amber} soft={amberSoft} delay={300} dur={1.7} />
          <g style={{ opacity: at >= 2 ? 1 : 0, transition: `opacity .5s ${EASE} 2200ms` }}>
            <Badge x={S.edge.x + S.edge.w + 18} y={S.edge.y + 14} tone={C.teal} soft={tealSoft} glyph="check" />
            <text x={S.edge.cx} y={S.edge.y + S.edge.h + 18} fontSize={10} fontWeight={650} textAnchor="middle" fill={C.teal} fontFamily={FONT}>address and endpoint match the chain</text>
          </g>
        </Layer>
        {/* 3 · communicate */}
        <Layer beat={3} at={at}>
          <DrawRoad d={P.talkOut} beat={3} at={at} tone={C.navy} />
          <DrawRoad d={P.talkBack} beat={3} at={at} tone={C.navy} delay={900} />
          <Token d={P.talkOut} beat={3} at={at} text="hello — may I ask?" tone={C.navy} soft={navySoft} delay={200} dur={1.6} />
          <Token d={P.talkBack} beat={3} at={at} text="you may — through the gate" tone={C.navy} soft={navySoft} delay={2000} dur={1.6} />
        </Layer>
        {/* 4 · act */}
        <Layer beat={4} at={at}>
          <g style={{ opacity: at >= 4 ? 1 : 0, transition: `opacity .5s ${EASE} 100ms` }}>
            <Badge x={A.home.x + A.home.w - 14} y={A.home.y - 6} tone={C.amber} soft={amberSoft} glyph="sign" />
          </g>
          <DrawRoad d={P.act} beat={4} at={at} tone={C.amber} width={3} delay={500} dur={2} />
          <Token d={P.act} beat={4} at={at} text="signed · translate this · up to 20" tone={C.amber} soft={amberSoft} delay={700} dur={3} />
        </Layer>
        {/* 5 · receipt */}
        <Layer beat={5} at={at}>
          <DrawRoad d={P.receipt} beat={5} at={at} tone={C.teal} width={3} dur={2} />
          <Token d={P.receipt} beat={5} at={at} text="receipt · what was done, by whom, under what" tone={C.teal} soft={tealSoft} delay={300} dur={3} />
          <g style={{ opacity: at >= 5 ? 1 : 0, transition: `opacity .5s ${EASE} 2600ms` }}>
            <Badge x={graphCx - 70} y={SVC_Y - 12} tone={C.violet} soft={C.violetSoft} glyph="dot" text="public fact: a service was used" />
            <Badge x={A.vault.x + A.vault.w - 14} y={A.vault.y - 4} tone={C.teal} soft={tealSoft} glyph="check" />
          </g>
        </Layer>
        {/* 6 · revoke */}
        <Layer beat={6} at={at}>
          <g style={{ opacity: at >= 6 ? 1 : 0, transition: `opacity .5s ${EASE} 100ms` }}>
            <Badge x={A.home.x + A.home.w - 14} y={A.home.y - 6} tone={C.rose} soft={roseSoft} glyph="cross" />
            <text x={A.home.cx} y={A.home.y + A.home.h + 14} fontSize={10} fontWeight={650} textAnchor="middle" fill={C.rose} fontFamily={FONT}>revoked — from the same door</text>
          </g>
          <DrawRoad d={P.stale} beat={6} at={at} tone={C.rose} dashed delay={1200} />
          <Token d={P.stale} beat={6} at={at} text="the old permission" tone={C.rose} soft={roseSoft} delay={1300} dur={2.2} />
          <DrawRoad d={P.check} beat={6} at={at} tone={C.amber} delay={3400} dur={0.8} />
          <g style={{ opacity: at >= 6 ? 1 : 0, transition: `opacity .5s ${EASE} 3800ms` }}>
            <Badge x={S.edge.cx - 44} y={S.edge.y + S.edge.h + 13} tone={C.rose} soft={roseSoft} glyph="cross" text="refused · revoked on chain" />
          </g>
        </Layer>

        <Pill x={40} y={H - 48} text="One rule runs through the town: being on the street never gives anyone power over your estate." tone="teal" />
        <Brandline w={W} h={H} />
      </g>

      <OtherTown at={at} />
      <PublicGround at={at} />
      <g style={{ opacity: pulled ? 1 : 0, transition: `opacity .8s ${EASE} ${pulled ? 900 : 0}ms` }}>
        <Label x={40} y={126} text="FEDERATION" size={10.5} weight={700} tone="amber" mono spacing={1.6} />
        <Label x={40} y={H - 36} text="Many chains. Many towns. One rule." size={13} weight={650} tone="ink" />
      </g>
    </Frame>
  );
}
