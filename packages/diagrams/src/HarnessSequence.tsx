import { Arrow, Box, C, Frame, Label, Pill } from './primitives';

/**
 * ONE TURN OF THE HARNESS as a sequence: the person asks; the planner proposes a plan; the step that needs
 * authority parks; the person's confirmation IS the mandate signature; the verifier checks the grant is live; the
 * executor acts; the chain's enforcers check again when value moves; a receipt lands in the owner's vault.
 */
export function HarnessSequence() {
  const id = 'harness';
  const W = 1180, H = 720;
  const lanes = [
    { x: 80, name: 'Person', sub: 'Alice at her Home', tone: 'navy' as const },
    { x: 300, name: 'Planner', sub: 'LLM · probabilistic', tone: 'slate' as const },
    { x: 520, name: 'Verifier', sub: 'deterministic gate', tone: 'amber' as const },
    { x: 740, name: 'Executor', sub: 'tools · A2A · MCP', tone: 'slate' as const },
    { x: 960, name: 'Chain', sub: 'enforcers · receipts', tone: 'teal' as const },
  ];
  const top = 40, bottom = 640;
  return (
    <Frame id={id} w={W} h={H} title="One turn of the authority-aware harness: ask, plan, park, mandate signature, verify, act, on-chain enforcement, receipt">
      {lanes.map((l) => (
        <g key={l.name}>
          <Box x={l.x - 70} y={top} w={140} h={44} title={l.name} lines={[l.sub]} tone={l.tone} titleSize={13} lineSize={10} />
          <line x1={l.x} y1={top + 44} x2={l.x} y2={bottom} stroke={C.faint} strokeWidth={2} />
        </g>
      ))}

      {/* 1 ask */}
      <Arrow id={id} d="M 80 120 H 298" tone="ink" label='1  "send Nathan 20 USDC for the retreat"' lx={190} ly={112} />
      {/* 2 resolve + plan */}
      <Box x={225} y={132} w={150} h={64} title="2  resolve + plan" lines={['Nathan → nathan.treasury', '(private tier, or refuse)']} tone="paper" lineSize={10} />
      <Arrow id={id} d="M 300 196 V 208" />
      <Label x={310} y={220} text="plan: [ treasury.payment.execute  payee = nathan.treasury  amount = 20 ]" size={10} mono />
      {/* 3 park */}
      <Arrow id={id} d="M 300 240 H 82" tone="amber" label="3  parked: this step needs a mandate — risk: high" lx={190} ly={232} />
      <Box x={14} y={254} w={200} h={76} title="4  Alice reviews the preview" lines={['payee, amount, purpose, expiry', 'her confirmation IS the signature', '(passkey → ERC-1271)']} tone="navy" lineSize={10} />
      {/* 5 mandate */}
      <Arrow id={id} d="M 214 342 H 518" tone="amber" label="5  mandate = delegation + intent-digest caveat" lx={366} ly={334} />
      {/* 6 verify */}
      <Box x={450} y={356} w={150} h={104} title="6  verify — fail closed" lines={['grant live? unrevoked?', 'delegate = the actor?', 'selector = this step?', 'digest = this intent?', 'nothing cached']} tone="amber" lineSize={10} titleSize={12} />
      <Arrow id={id} d="M 600 460 H 738" tone="ink" label="7  authorized: act" lx={669} ly={452} />
      {/* 8 act */}
      <Box x={670} y={472} w={150} h={62} title="8  execute" lines={['redeemDelegation(…)', 'as an ERC-4337 UserOp']} tone="paper" titleMono lineSize={10} />
      <Arrow id={id} d="M 820 534 H 958" tone="teal" label="9  enforcers re-check" lx={889} ly={526} />
      <Box x={880} y={546} w={170} h={74} title="10  redeem" lines={['payee ✓ ceiling ✓ time ✓', 'intent digest ✓', 'nonce spent once']} tone="teal" lineSize={10} />
      {/* receipts */}
      <Arrow id={id} d="M 960 620 C 700 690, 300 690, 82 620" tone="teal" dashed label="11  receipt → Alice's vault: intent · mandate · step · playbook digest · tx" lx={520} ly={680} />

      {/* Side note */}
      <rect x={1060} y={110} width={100} height={260} rx={8} fill={C.roseSoft} stroke={C.rose} strokeDasharray="5 4" />
      <Label x={1110} y={132} text="Hijacked" size={11} weight={700} tone="rose" anchor="middle" />
      <Label x={1110} y={146} text="planner?" size={11} weight={700} tone="rose" anchor="middle" />
      <Label x={1110} y={176} text="It can propose" size={9.5} anchor="middle" tone="rose" />
      <Label x={1110} y={190} text="anything." size={9.5} anchor="middle" tone="rose" />
      <Label x={1110} y={216} text="It cannot" size={9.5} anchor="middle" tone="rose" />
      <Label x={1110} y={230} text="exceed the" size={9.5} anchor="middle" tone="rose" />
      <Label x={1110} y={244} text="caveats." size={9.5} anchor="middle" tone="rose" />
      <Label x={1110} y={274} text="Steps 6 and" size={9.5} anchor="middle" tone="rose" />
      <Label x={1110} y={288} text="10 run" size={9.5} anchor="middle" tone="rose" />
      <Label x={1110} y={302} text="outside the" size={9.5} anchor="middle" tone="rose" />
      <Label x={1110} y={316} text="planner's" size={9.5} anchor="middle" tone="rose" />
      <Label x={1110} y={330} text="process." size={9.5} anchor="middle" tone="rose" />

      <Pill x={1060} y={400} text="probabilistic ↑" tone="slate" size={9.5} />
      <Pill x={1060} y={430} text="deterministic ↓" tone="amber" size={9.5} />
      <Label x={W - 40} y={H - 12} text="agenticprimitives.dev" size={9.5} anchor="end" mono />
      <Label x={40} y={H - 12} text="Intelligence may be probabilistic. Authority must not be." size={11} weight={700} tone="amber" />
    </Frame>
  );
}
