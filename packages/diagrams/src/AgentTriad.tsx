import { Arrow, Box, C, Frame, Glyph, Label, Pill } from './primitives';

/**
 * PERSON → ORGANIZATION → SERVICE. The authority chain that replaces "wallet A delegates to wallet B": a person's
 * passkey controls a Person Smart Agent; the person stewards an Organization Agent; the organization charters a
 * Treasury Service Agent; the treasury grants bounded permissions back to people; a service's key is a delegate.
 */
export function AgentTriad() {
  const id = 'triad';
  const W = 1180, H = 590;
  return (
    <Frame id={id} w={W} h={H} title="Authority flows between Smart Agents: passkey → Person → Organization → Service, with bounded grants back to people">
      {/* Humans and their credentials */}
      <Box x={40} y={60} w={190} h={78} title="Alice (a human)" lines={['passkey on her phone', 'passkey on her laptop', 'recovery: 2 guardians']} tone="slate" />
      <Box x={40} y={300} w={190} h={78} title="Bob (a human)" lines={['passkey', 'hardware key', 'recovery: trustee quorum']} tone="slate" />
      <Label x={40} y={160} text="Credentials rotate. The agent does not." size={10.5} italic />

      <Arrow id={id} d="M 230 99 H 288" tone="ink" label="controls" lx={259} ly={92} labelSize={9.5} />
      <Arrow id={id} d="M 230 339 H 288" tone="ink" label="controls" lx={259} ly={332} labelSize={9.5} />

      {/* Person agents */}
      <g><Glyph x={302} y={70} kind="person" /><Box x={290} y={60} w={220} h={78} title="      alice.me" lines={['Person Smart Agent', 'ERC-4337 account · ERC-1271', 'custodies the org + a treasury']} tone="navy" titleMono titleSize={14} /></g>
      <g><Glyph x={302} y={310} kind="person" /><Box x={290} y={300} w={220} h={78} title="      bob.me" lines={['Person Smart Agent', 'member of Missio Nexus', 'holds a bounded permission']} tone="navy" titleMono titleSize={14} /></g>

      {/* Org agent */}
      <g><Glyph x={612} y={170} kind="org" /><Box x={600} y={160} w={240} h={96} title="      missio-nexus.org" lines={['Organization Smart Agent', 'custody: alice (steward)', 'members: alice · bob · carol', 'vault: roster, decisions, receipts']} tone="violet" titleMono titleSize={13.5} /></g>

      <Arrow id={id} d="M 510 99 C 550 99, 560 190, 598 190" tone="ink" label="stewards (custody)" lx={555} ly={150} labelSize={9.5} />
      <Arrow id={id} d="M 510 339 C 550 339, 560 240, 598 240" dashed label="member — a situation in the org's vault" lx={548} ly={300} labelSize={9.5} anchor="start" />

      {/* Service agents */}
      <g><Glyph x={952} y={70} kind="service" /><Box x={940} y={60} w={200} h={88} title="      missio.treasury" lines={['Service Agent · role: treasury', 'holds the organization\'s funds', 'chartered under the org']} tone="teal" titleMono titleSize={12.5} /></g>
      <g><Glyph x={952} y={300} kind="service" /><Box x={940} y={290} w={200} h={98} title="      catalog.svc" lines={['Service Agent', 'signs A2A as itself with a', 'KMS key that is a DELEGATE', 'under a revocable wire']} tone="teal" titleMono titleSize={13} /></g>

      <Arrow id={id} d="M 840 190 C 880 190, 900 104, 938 104" tone="amber" label="charters + delegates" lx={846} ly={178} anchor="start" labelSize={9.5} />
      <Arrow id={id} d="M 840 230 C 880 230, 900 339, 938 339" tone="amber" label="session wire: one skill, bounded" lx={846} ly={270} anchor="start" labelSize={9.5} />

      {/* bounded permission back to bob */}
      <Arrow id={id} d="M 1040 148 C 1040 430, 700 470, 510 372" tone="amber" dashed label="bounded permission: pay ≤ 500 to approved payees, 30 days" lx={790} ly={440} labelSize={9.5} />

      {/* Provenance sentence */}
      <rect x={40} y={460} width={1100} height={100} rx={10} fill={C.slateSoft} stroke={C.faint} />
      <Label x={60} y={486} text="What the audit trail can say afterwards:" size={11.5} weight={700} tone="ink" />
      <Label x={60} y={508} text="bob.me drafted a payment · acting under a bounded permission from missio.treasury · which acts on behalf of missio-nexus.org ·" size={11} tone="ink" mono />
      <Label x={60} y={526} text="whose admin authority is custodied by alice.me · caveats enforced on chain at redemption · receipt anchored · revocable by one transaction." size={11} tone="ink" mono />
      <Pill x={60} y={536} text="Agent performed Activity on behalf of Agent under Delegation with Limits" tone="amber" size={10} />

      <Label x={W - 40} y={H - 12} text="agenticprimitives.dev" size={9.5} anchor="end" mono />
    </Frame>
  );
}
