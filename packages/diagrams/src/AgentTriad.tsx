import { Arrow, Box, Brandline, C, Frame, Kicker, Label, Pill } from './primitives';

/**
 * PERSON → ORGANIZATION → SERVICE. The authority chain that replaces "wallet A delegates to wallet B": a person's
 * passkey controls a Person Smart Agent; the person stewards an Organization Agent; the organization charters a
 * Treasury Service Agent; the treasury grants bounded permissions back to people; a service's key is a delegate.
 */
export function AgentTriad() {
  const id = 'triad';
  const W = 1200, H = 620;
  return (
    <Frame id={id} w={W} h={H} title="Authority flows between Smart Agents: passkey → Person → Organization → Service, with bounded grants back to people">
      <Kicker x={40} y={40} text="humans + credentials" tone="ink" />
      <Kicker x={300} y={40} text="person agents" tone="navy" />
      <Kicker x={610} y={40} text="organization agent" tone="violet" />
      <Kicker x={940} y={40} text="service agents" tone="teal" />

      <Box x={40} y={64} w={200} h={86} title="Alice (a human)" lines={['passkey · phone', 'passkey · laptop', 'recovery: 2 guardians']} tone="slate" titleSize={13} lineSize={11.5} />
      <Box x={40} y={314} w={200} h={86} title="Bob (a human)" lines={['passkey', 'hardware key', 'recovery: trustee quorum']} tone="slate" titleSize={13} lineSize={11.5} />
      <Label x={40} y={176} text="Credentials rotate. The agent does not." size={11} italic />

      <Arrow id={id} d="M 240 107 H 298" tone="ink" label="controls" lx={269} ly={98} labelSize={10} />
      <Arrow id={id} d="M 240 357 H 298" tone="ink" label="controls" lx={269} ly={348} labelSize={10} />

      <Box x={300} y={64} w={230} h={86} title="alice.me" variant="header" tone="navy" titleMono lines={['Person Smart Agent', 'ERC-4337 account · ERC-1271', 'custodies the org + a treasury']} lineSize={11.5} />
      <Box x={300} y={314} w={230} h={86} title="bob.me" variant="header" tone="navy" titleMono lines={['Person Smart Agent', 'member of Missio Nexus', 'holds a bounded permission']} lineSize={11.5} />

      <Box x={610} y={170} w={260} h={104} title="missio-nexus.org" variant="header" tone="violet" titleMono lines={['Organization Smart Agent', 'custody: alice (steward)', 'members: alice · bob · carol', 'vault: roster · decisions · receipts']} lineSize={11.5} />

      <Arrow id={id} d="M 530 107 C 570 107, 580 200, 608 200" tone="navy" label="stewards (custody)" lx={562} ly={150} labelSize={10} />
      <Arrow id={id} d="M 530 357 C 570 357, 580 250, 608 250" dashed label="member — a situation in the org’s vault" lx={566} ly={312} labelSize={10} anchor="start" />

      <Box x={940} y={64} w={220} h={96} title="missio.treasury" variant="header" tone="teal" titleMono lines={['Service Agent · role: treasury', 'holds the organization’s funds', 'chartered under the org']} lineSize={11.5} />
      <Box x={940} y={300} w={220} h={108} title="catalog.svc" variant="header" tone="teal" titleMono lines={['Service Agent', 'signs A2A as itself with a', 'KMS key that is a DELEGATE', 'under a revocable wire']} lineSize={11.5} />

      <Arrow id={id} d="M 870 200 C 905 200, 905 112, 938 112" tone="amber" label="charters + delegates" lx={876} ly={186} anchor="start" labelSize={10} />
      <Arrow id={id} d="M 870 244 C 905 244, 905 354, 938 354" tone="amber" label="session wire: one skill, bounded" lx={876} ly={290} anchor="start" labelSize={10} />
      <Arrow id={id} d="M 1050 160 C 1050 470, 720 490, 530 390" tone="amber" dashed label="bounded permission: pay ≤ 500 to approved payees, 30 days" lx={800} ly={470} labelSize={10} />

      <rect x={40} y={500} width={1120} height={92} rx={12} fill={C.slateSoft} stroke={C.faint} />
      <Kicker x={60} y={526} text="What the audit trail can say afterwards" tone="ink" />
      <Label x={60} y={550} text="bob.me drafted a payment · acting under a bounded permission from missio.treasury · which acts on behalf of missio-nexus.org ·" size={11.5} tone="ink" mono />
      <Label x={60} y={570} text="whose admin authority is custodied by alice.me · caveats enforced on chain at redemption · receipt anchored · revocable by one transaction." size={11.5} tone="ink" mono />
      <Pill x={780} y={462} text="Agent performed Activity on behalf of Agent under Delegation with Limits" tone="amber" size={10.5} solid />
      <Brandline w={W} h={H} />
    </Frame>
  );
}
