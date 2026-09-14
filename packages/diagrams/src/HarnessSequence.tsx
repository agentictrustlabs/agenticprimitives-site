import { Arrow, Box, Brandline, C, Frame, Kicker, Label, Pill } from './primitives';

/**
 * ONE TURN OF THE HARNESS as a sequence: the person asks; the planner proposes a plan; the step that needs
 * authority parks; the person's confirmation IS the mandate signature; the verifier checks the grant is live; the
 * executor acts; the chain's enforcers check again when value moves; a receipt lands in the owner's vault.
 */
export function HarnessSequence() {
  const id = 'harness';
  const W = 1200, H = 740;
  const lanes = [
    { x: 96, name: 'Person', sub: 'Alice at her Home', tone: 'navy' as const },
    { x: 320, name: 'Planner', sub: 'LLM · probabilistic', tone: 'slate' as const },
    { x: 544, name: 'Verifier', sub: 'deterministic gate', tone: 'amber' as const },
    { x: 768, name: 'Executor', sub: 'tools · A2A · MCP', tone: 'slate' as const },
    { x: 992, name: 'Chain', sub: 'enforcers · receipts', tone: 'teal' as const },
  ];
  const top = 40, bottom = 650;
  return (
    <Frame id={id} w={W} h={H} title="One turn of the authority-aware harness: ask, plan, park, mandate signature, verify, act, on-chain enforcement, receipt">
      {/* probabilistic / deterministic zones */}
      <rect x={210} y={top + 56} width={220} height={bottom - top - 56} rx={10} fill={C.roseSoft} opacity={0.35} />
      <rect x={434} y={top + 56} width={680} height={bottom - top - 56} rx={10} fill={C.tealSoft} opacity={0.35} />
      <Kicker x={320} y={bottom + 22} text="probabilistic — may propose" tone="rose" anchor="middle" />
      <Kicker x={774} y={bottom + 22} text="deterministic — may authorize" tone="teal" anchor="middle" />

      {lanes.map((l) => (
        <g key={l.name}>
          <Box x={l.x - 76} y={top} w={152} h={48} title={l.name} lines={[l.sub]} tone={l.tone} titleSize={13.5} lineSize={10.5} align="middle" solid={l.tone !== 'slate'} />
          <line x1={l.x} y1={top + 48} x2={l.x} y2={bottom} stroke={C.line} strokeWidth={1.5} strokeDasharray="2 4" />
        </g>
      ))}

      <Arrow id={id} d="M 96 130 H 318" tone="ink" label="1  “send Nathan 20 USDC for the retreat”" lx={208} ly={122} />
      <Box x={236} y={144} w={168} h={70} title="2  resolve + plan" lines={['Nathan → nathan.treasury', 'private tier — or refuse']} tone="paper" lineSize={11} titleSize={12.5} />
      <Label x={236} y={236} text="plan: [ treasury.payment.execute · payee = nathan.treasury · amount = 20 ]" size={10.5} mono tone="ink" />

      <Arrow id={id} d="M 320 256 H 98" tone="amber" label="3  parked — this step needs a mandate (risk: high)" lx={208} ly={248} />
      <Box x={20} y={270} w={210} h={84} title="4  Alice reviews the preview" variant="header" tone="navy" lines={['payee · amount · purpose · expiry', 'her confirmation IS the signature', 'passkey → ERC-1271']} lineSize={11} titleSize={12} />

      <Arrow id={id} d="M 230 368 H 542" tone="amber" label="5  mandate = delegation + intent-digest caveat" lx={386} ly={360} />
      <Box x={464} y={382} w={160} h={116} title="6  verify — fail closed" variant="header" tone="amber" lines={['grant live? unrevoked?', 'delegate = the actor?', 'selector = this step?', 'digest = this intent?', 'nothing cached']} lineSize={11} titleSize={12} />
      <Arrow id={id} d="M 624 498 H 766" tone="ink" label="7  authorized — act" lx={695} ly={490} />
      <Box x={690} y={512} w={156} h={64} title="8  execute" lines={['redeemDelegation(…)', 'as an ERC-4337 UserOp']} tone="paper" titleMono lineSize={11} titleSize={12.5} />
      <Arrow id={id} d="M 846 576 H 990" tone="teal" label="9  enforcers re-check" lx={918} ly={568} />
      <Box x={906} y={586} w={172} h={62} title="10  redeem" variant="header" tone="teal" lines={['payee ✓ ceiling ✓ time ✓ digest ✓', 'nonce spent once']} lineSize={10.5} titleSize={12} />

      <Arrow id={id} d="M 992 644 C 760 720, 320 720, 98 644" tone="teal" dashed label="11  receipt → Alice’s vault: intent · mandate · step · playbook digest · tx" lx={545} ly={706} />

      {/* Side note */}
      <Box x={1096} y={110} w={96} h={280} tone="rose" dashed lines={['Hijacked', 'planner?', '', 'It can', 'propose', 'anything.', '', 'It cannot', 'exceed the', 'caveats.', '', 'Steps 6 + 10', 'run outside', 'its process.']} lineSize={10.5} align="middle" />

      <Pill x={1096} y={410} text="proposes ↑" tone="rose" size={10} />
      <Pill x={1096} y={440} text="authorizes ↓" tone="teal" size={10} />
      <Brandline w={W} h={H} left="Intelligence may be probabilistic. Authority must not be." />
    </Frame>
  );
}
