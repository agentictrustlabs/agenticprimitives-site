import { Arrow, Box, Brandline, Frame, Label, Pill } from './primitives';

/**
 * WHERE THINGS RUN. An "estate" is one deployment of the substrate: a Home (people, ceremonies), an agent runtime,
 * vaults, an edge, discovery, a skills registry and a chain — and your applications as relying apps around it.
 */
export function EstateTopology() {
  const id = 'estate';
  const W = 1180, H = 640;
  return (
    <Frame id={id} w={W} h={H} title="An estate: Home, agent runtime, vaults, edge, discovery, skills registry and chain — with relying applications around it">
      {/* People */}
      <Box x={40} y={60} w={170} h={70} title="People" lines={['browser · phone', 'passkeys', 'Claude.ai (Home MCP)']} tone="slate" />
      {/* Relying apps */}
      <Box x={40} y={250} w={170} h={110} title="Relying applications" lines={['gamenight.faithnet.io', 'skills.faithnet.io', 'your app', '— OIDC client + A2A caller']} tone="paper" mono lineSize={10.5} />
      {/* Outside agents */}
      <Box x={40} y={440} w={170} h={90} title="Outside agents" lines={['partner A2A agents', 'Claude Code / goose (ACP)', 'MCP clients']} tone="paper" />

      {/* Home */}
      <Box x={300} y={40} w={250} h={130} title="Home  ·  www.faithnet.me" variant="header" lines={['Vercel · Next.js', 'passkey sign-in · OIDC issuer', 'ceremonies: charter, invite, delegate', 'approve parked runs · revoke', 'Today · Work · Library · Build']} tone="navy" lineSize={10.5} />
      {/* Runtime */}
      <Box x={300} y={210} w={250} h={120} title="Agent runtime  ·  a2a.faithnet.io" variant="header" lines={['Cloudflare Workers + Durable Objects', 'one A2aTaskDO per agent · harness', 'playbooks by digest · triggers', 'budget-routed models (Groq / Haiku)']} tone="paper" lineSize={10.5} />
      {/* Vault */}
      <Box x={300} y={370} w={250} h={100} title="Vault  ·  MCP (private)" variant="header" lines={['per-agent encrypted records', 'per-record delegation scope', 'inbox · roster · receipts · memory']} tone="paper" lineSize={10.5} />
      {/* Edge */}
      <Box x={300} y={510} w={250} h={90} title="Edge  ·  edge.faithnet.io" variant="header" lines={['admission (always)', 'standard A2A surface /api/a2a/<name>', 'HTTPS req. · mTLS optional']} tone="rose" lineSize={10.5} />

      {/* Discovery + skills */}
      <Box x={640} y={40} w={250} h={110} title="Discovery  ·  discovery.faithnet.io" variant="header" lines={['indexer → GraphDB', 'public, on-chain-derivable facts ONLY', '/.well-known/ard.json · ACP registry', 'A2A + MCP question surfaces']} tone="paper" lineSize={10.5} />
      <Box x={640} y={190} w={250} h={90} title="Skills registry  ·  skills.faithnet.io" variant="header" lines={['archetypes → SKILL.md contracts', 'compiled AgentHarnessDefinition', 'pinned by digest; assigned at Home']} tone="paper" lineSize={10.5} />
      <Box x={640} y={320} w={250} h={90} title="KMS  ·  GCP / AWS" variant="header" lines={['service keys are DELEGATES', 'session wires the custodian mints', 'revoke one wire, not an identity']} tone="paper" lineSize={10.5} />
      <Box x={640} y={450} w={250} h={150} title="faithchain  ·  rpc.faithnet.io" variant="header" lines={['Besu QBFT · chain 34348 · 2 s blocks', 'AgentAccount factory · names', 'DelegationManager + enforcers', 'registries · attestations', 'Sheqel (the card room\'s coin)', '— any EVM works']} tone="teal" lineSize={10.5} />

      {/* Right: what each layer guarantees */}
      <Box x={980} y={40} w={160} h={560} title="Guarantees" tone="slate" dashed lines={[
        'Home: the only place',
        'a person signs.',
        '',
        'Runtime: no step',
        'without a live grant.',
        '',
        'Vault: records the',
        'owner can carry.',
        '',
        'Edge: admission',
        'before anything.',
        '',
        'Discovery: nothing',
        'the chain does not',
        'already say.',
        '',
        'KMS: compromise',
        'a delegate, never',
        'an identity.',
        '',
        'Chain: revocation',
        'is final and global.',
      ]} lineSize={10.5} />

      {/* Arrows */}
      <Arrow id={id} d="M 210 95 H 298" tone="ink" label="sign in · approve" lx={254} ly={88} />
      <Arrow id={id} d="M 210 290 C 250 290, 260 105, 298 105" label="OIDC + delegation" lx={220} ly={200} anchor="start" />
      <Arrow id={id} d="M 210 320 C 250 320, 260 270, 298 270" tone="ink" label="A2A intents" lx={232} ly={340} anchor="start" />
      <Arrow id={id} d="M 210 485 C 250 485, 260 555, 298 555" tone="rose" label="admitted at the edge" lx={40} ly={552} anchor="start" />
      <Arrow id={id} d="M 425 170 V 208" tone="ink" label="/harness/ask" lx={435} ly={195} anchor="start" />
      <Arrow id={id} d="M 425 330 V 368" label="records under delegation" lx={435} ly={355} anchor="start" />
      <Arrow id={id} d="M 425 510 V 472" label="then the runtime" lx={435} ly={495} anchor="start" />
      <Arrow id={id} d="M 550 260 C 600 260, 600 235, 638 235" label="playbook by digest" lx={582} ly={224} labelSize={9.5} />
      <Arrow id={id} d="M 550 300 C 600 300, 600 365, 638 365" label="signs as delegate" lx={582} ly={344} labelSize={9.5} />
      <Arrow id={id} d="M 550 110 C 590 110, 600 95, 638 95" label="discover" lx={594} ly={90} labelSize={9.5} />
      <Arrow id={id} d="M 550 440 C 600 440, 600 520, 638 520" tone="teal" label="grants · receipts" lx={594} ly={470} labelSize={9.5} />
      <Arrow id={id} d="M 765 450 V 282" tone="teal" dashed label="indexer reads chain" lx={775} ly={300} anchor="start" />

      <Pill x={300} y={612} text="One estate, many applications. A second estate is the same shape with different names." tone="slate" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}
