import { Arrow, Box, Brandline, C, Frame, Glyph, Label, Pill } from './primitives';

/**
 * GAME NIGHT, END TO END. What the card room built (left, grey) and what the substrate supplied (everything else).
 * The card room owns one contract (Sheqel) and holds no player key; every buy-in is the player's own mandate.
 */
export function GameNightArchitecture() {
  const id = 'gamenight';
  const W = 1180, H = 760;
  return (
    <Frame id={id} w={W} h={H} title="Game Night architecture: the card room's own Workers and one contract, on the substrate's Home, agents, delegations, registries and chain">
      <Label x={40} y={32} text="WHAT THE CARD ROOM BUILT" size={11} weight={700} tone="ink" />
      <Label x={470} y={32} text="WHAT THE SUBSTRATE SUPPLIED" size={11} weight={700} tone="navy" />
      <line x1={450} y1={40} x2={450} y2={700} stroke={C.faint} strokeDasharray="6 5" />

      {/* Card room stack */}
      <Box x={40} y={50} w={380} h={92} title="Web client  ·  gamenight.faithnet.io" lines={['Vite + React · Cloudflare', 'Play · Tables · Your money · your clubs', 'one board per game (hold\'em, canasta)']} tone="slate" lineSize={10.5} />
      <Box x={40} y={160} w={380} h={150} title="Tables Worker  ·  games.faithnet.io" lines={['hono routes · SessionDO · LobbyDO', 'PokerTableDO: WebSockets, SQLite, alarms', 'a table HOSTS a game, never knows which', 'seeded shuffle + commit–reveal; byte-identical replay', 'money in chips; asset + rate PINNED per table', 'asks AI seats for a move over A2A; keeps no roster']} tone="slate" lineSize={10.5} />
      <Box x={40} y={328} w={180} h={78} title="Engines (pure)" lines={['@pokernight/engine', '@pokernight/canasta', 'no I/O, no clock']} tone="slate" titleMono lineSize={10} />
      <Box x={240} y={328} w={180} h={78} title="Agent worker" lines={['A2A personas: poker.act,', 'canasta.act', 'admits the house only']} tone="slate" titleMono lineSize={10} />
      <Box x={40} y={424} w={380} h={60} title="Sheqel (SHQ)  ·  contracts/" lines={['the ONE contract the app owns: a parameterised ERC-20, 6 decimals, open mint']} tone="amber" titleMono lineSize={10} />
      <Box x={40} y={502} w={380} h={60} title="Coach words + playbooks (~/skills)" lines={['SKILL.md contracts: hold\'em / canasta coach · study grant · quiet unless asked']} tone="slate" lineSize={10} />

      {/* Substrate: Home */}
      <g><Glyph x={482} y={62} kind="person" /><Box x={470} y={50} w={330} h={102} title="      Home  ·  www.faithnet.me" lines={['passkey sign-in → OIDC (PKCE) → alice.me', 'charters alice.treasury on first connect', 'ceremonies: buy-in mandate · club charter · club wire', 'the mission registry\'s org-create + covenant signature']} tone="navy" lineSize={10.5} /></g>
      {/* Agents */}
      <Box x={470} y={170} w={160} h={90} title="alice.me" lines={['Person Smart Agent', 'signs the buy-in', 'mandate (ERC-1271)']} tone="navy" titleMono lineSize={10} />
      <Box x={640} y={170} w={160} h={90} title="alice.treasury" lines={['Service Agent, hers', 'holds SHQ', 'payer of buy-ins']} tone="teal" titleMono lineSize={10} />
      <Box x={820} y={50} w={320} h={102} title="pokernight.treasury  (the house)" lines={['Service Agent of the card room', 'payee of every buy-in · payer of cash-outs', 'signs with a KMS key that is a DELEGATE', 'under a session wire — revocable at the Home']} tone="teal" titleMono lineSize={10.5} />
      <Box x={820} y={170} w={150} h={90} title="sharkbot.svc" lines={['AI player', 'advertises poker.act', 'asked by the table']} tone="teal" titleMono lineSize={10} />
      <Box x={990} y={170} w={150} h={90} title="thursday.workspace" lines={['a club = its agent', 'roster in ITS vault', 'room holds a wire']} tone="violet" titleMono lineSize={10} titleSize={11} />

      {/* Authority row */}
      <Box x={470} y={280} w={670} h={96} title="The buy-in mandate  (ERC-7710 delegation, signed by alice.me)" lines={[
        'alice.treasury → pokernight.treasury · caveats: target = SHQ · method = transfer · value ≤ 2,000 SHQ · 30 days',
        'asset pinned — a table refuses a mandate in any other coin · redeemed per buy-in with a single-use nonce',
        'revoke = one transaction from her Home → the next buy-in is refused at every table, with no list to update',
      ]} tone="amber" lineSize={10.5} />

      {/* Runtime + registries */}
      <Box x={470} y={396} w={330} h={110} title="Agent runtime  ·  a2a.faithnet.io" lines={['her agent runs the coach playbook under a STUDY grant:', 'reads only what her seat sees (viewFor), offers a move,', 'the move is checked against the rules before a button', 'is drawn; tokens billed to her, quiet unless asked']} tone="paper" lineSize={10.5} />
      <Box x={820} y={396} w={320} h={110} title="Mission registry  (registry kit)" lines={['gamenight-missions on AgentRegistryBase', 'OPEN: the mission org registers itself (RB-01);', 'the operator admits from chain + vault; the steward', 'signs a 3-clause covenant; a mission is a game\'s GUEST']} tone="paper" lineSize={10.5} />

      {/* Chain */}
      <Box x={470} y={526} w={670} h={96} title="faithchain  (Besu QBFT · chain 34348 · free gas · 2 s blocks)" lines={[
        'an AgentAccount (ERC-4337 / 7579) for every agent above · DelegationManager + caveat enforcers redeem the mandate',
        'Sheqel transfers · a receipt per buy-in and cash-out · club membership and mission admission readable from chain state',
      ]} tone="teal" lineSize={10.5} />

      {/* Arrows: left → right */}
      <Arrow id={id} d="M 420 96 H 468" tone="ink" label="OIDC" lx={444} ly={88} labelSize={9} />
      <Arrow id={id} d="M 420 290 C 445 290, 445 300, 468 300" tone="amber" label="verify · redeem" lx={444} ly={278} labelSize={8.5} />
      <Arrow id={id} d="M 330 328 V 312" dashed />
      <Arrow id={id} d="M 420 454 C 445 454, 445 574, 468 574" tone="teal" label="deploys" lx={444} ly={520} labelSize={8.5} />
      <Arrow id={id} d="M 420 532 C 445 532, 445 450, 468 450" label="playbook" lx={444} ly={496} labelSize={8.5} />

      {/* Arrows inside substrate */}
      <Arrow id={id} d="M 550 152 V 168" tone="ink" />
      <Arrow id={id} d="M 720 152 V 168" tone="ink" label="charter" lx={728} ly={165} anchor="start" labelSize={9} />
      <Arrow id={id} d="M 550 260 V 278" tone="amber" label="signs" lx={558} ly={274} anchor="start" labelSize={9} />
      <Arrow id={id} d="M 720 260 V 278" tone="amber" label="delegator" lx={728} ly={274} anchor="start" labelSize={9} />
      <Arrow id={id} d="M 980 152 V 278" tone="amber" label="delegate" lx={980} ly={273} labelSize={9} />
      <Arrow id={id} d="M 810 376 V 524" tone="teal" label="redeem · receipt" lx={810} ly={519} labelSize={9} />
      <Arrow id={id} d="M 635 506 V 524" tone="teal" />
      <Arrow id={id} d="M 980 506 V 524" tone="teal" />

      {/* Footer facts */}
      <Pill x={40} y={650} text="Player keys held by the house: 0" tone="teal" solid />
      <Pill x={300} y={650} text="Contracts the app owns: 1 (Sheqel)" tone="amber" solid />
      <Pill x={580} y={650} text="Agent kinds at one table: person · AI player · house treasury · club" tone="violet" solid />
      <Label x={40} y={700} text="Everything in the right column is the same code and the same contracts that run the estate's other applications. Game Night wrote a card room." size={11} italic />
      <Brandline w={W} h={H} />
    </Frame>
  );
}
