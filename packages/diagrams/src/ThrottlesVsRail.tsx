import { Arrow, Box, Brandline, C, Frame, Kicker, Label, Pill } from './primitives';

/**
 * THREE THROTTLES AND ONE RAIL. The industry's answers to agent risk shrink the agent (containment), watch it
 * (supervision) or fence it inside one platform (governance). None can say under whose authority an act happened.
 * The rail bounds AUTHORITY: a grant the principal signs, caveats that are code, enforcement outside the model, and
 * a receipt the owner carries.
 */
export function ThrottlesVsRail() {
  const id = 'throttles';
  const W = 1200, H = 560;
  const cols = [
    { x: 40, name: 'Containment', who: 'frontier labs', tone: 'rose' as const, lines: ['sandbox · restricted mode', 'egress denied · kill switch'], bounds: 'bounds REACH', stops: 'who let it in? for what?' },
    { x: 300, name: 'Supervision', who: 'frontier labs', tone: 'rose' as const, lines: ['permission prompts (93% yes)', 'a second model grades the first'], bounds: 'bounds ACTIONS, probably', stops: 'a click is not consent' },
    { x: 560, name: 'Platform governance', who: 'enterprise platforms', tone: 'rose' as const, lines: ['purpose ACLs · autonomy dial', 'branch + roll back · lineage'], bounds: 'bounds INSIDE ONE VENDOR', stops: 'sovereignty = the contract' },
  ];
  return (
    <Frame id={id} w={W} h={H} title="Three throttles — containment, supervision, platform governance — against one rail: authority as a signed, caveated, revocable grant">
      <Kicker x={40} y={44} text="the industry’s answers — throttles" tone="rose" />
      <Kicker x={880} y={44} text="the rail" tone="teal" />
      <line x1={846} y1={40} x2={846} y2={520} stroke={C.faint} strokeDasharray="6 5" />

      {cols.map((c) => (
        <g key={c.name}>
          <Box x={c.x} y={64} w={236} h={44} title={c.name} variant="header" tone={c.tone} titleSize={13.5} align="middle" />
          <Label x={c.x + 118} y={128} text={c.who} size={10.5} anchor="middle" mono />
          {/* the agent in a cage */}
          <rect x={c.x + 28} y={146} width={180} height={150} rx={12} fill={C.roseSoft} stroke={C.rose} strokeWidth={1.5} strokeDasharray="7 5" />
          <Box x={c.x + 68} y={186} w={100} h={56} title="agent" lines={['probabilistic']} tone="slate" titleSize={13} lineSize={10.5} align="middle" />
          <Label x={c.x + 118} y={280} text={c.bounds} size={10.5} anchor="middle" tone="rose" weight={700} />
          <Box x={c.x} y={318} w={236} h={70} lines={c.lines} tone="paper" lineSize={11.5} align="middle" />
          <Box x={c.x} y={404} w={236} h={54} title="cannot answer" lines={[c.stops]} tone="rose" titleSize={11.5} lineSize={11.5} align="middle" />
        </g>
      ))}
      <Box x={40} y={476} w={756} h={44} tone="rose" lines={['Each bounds something. None bounds authority — because none has a concept of it. “Under whose say-so?” has no answer.']} lineSize={12} align="middle" />

      {/* the rail */}
      <Box x={880} y={64} w={280} h={44} title="Authority as a grant" variant="header" tone="teal" titleSize={13.5} align="middle" />
      <Label x={1020} y={128} text="the principal, from its own account" size={10.5} anchor="middle" mono />

      <Box x={880} y={146} w={280} h={52} title="principal signs" variant="header" tone="navy" lines={['alice.me · passkey · ERC-1271 — not a vendor config']} titleSize={12} lineSize={10.5} />
      <Arrow id={id} d="M 1020 198 V 212" tone="teal" width={1.5} />
      <Box x={880} y={214} w={280} h={64} title="caveats that are code" variant="header" tone="amber" lines={['payee · ceiling · method · target · time', 'digest of ONE exact intent']} titleSize={12} lineSize={10.5} />
      <Arrow id={id} d="M 1020 278 V 292" tone="teal" width={1.5} />
      <Box x={880} y={294} w={280} h={52} title="enforced outside the model" variant="header" tone="amber" lines={['verifier before the step · enforcers on chain']} titleSize={12} lineSize={10.5} />
      <Arrow id={id} d="M 1020 346 V 360" tone="teal" width={1.5} />
      <Box x={880} y={362} w={280} h={52} title="agent acts — as capable as you like" variant="header" tone="slate" lines={['the planner proposes; it never authorizes']} titleSize={12} lineSize={10.5} />
      <Arrow id={id} d="M 1020 414 V 428" tone="teal" width={1.5} />
      <Box x={880} y={430} w={280} h={52} title="receipt → the owner’s vault" variant="header" tone="teal" lines={['grant · decision · tx · playbook digest']} titleSize={12} lineSize={10.5} />
      <Pill x={880} y={492} text="revoke: one tx → refused everywhere" tone="rose" size={10.5} solid />
      <Brandline w={W} h={H} left="Intelligence may be probabilistic. Authority must not be." />
    </Frame>
  );
}
