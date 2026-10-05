// THE ESTATE AND THE FEDERATION. Six pictures for the estate architecture note: one estate as a block of buildings
// (the ap-home estate as deployed); who lives there; the commons the estates share; the federation of estates; one
// act crossing an estate boundary; and the twelve NANDA layers against the buildings. Names are the deployment's;
// the shapes are the substrate's.
import { Arrow, Box, Brandline, Frame, Glyph, Kicker, Label, Pill } from './primitives';
import { Building, Flag, Plot, Resident, Road } from './estate-kit';

/** One estate: the ap-home deployment on faithchain. */
export function EstateBlock() {
  const id = 'estate-block';
  const W = 1180, H = 720;
  return (
    <Frame id={id} w={W} h={H} title="One estate: Home, agent runtime, vault, edge, Home MCP, RPC gateway and the estate chain, with people, applications and outside agents at the boundary">
      <Plot x={250} y={30} w={900} h={640} caption="Estate · ap-home on faithchain (34348)" sub="five Workers on faithnet.io hosts, the Home on Vercel" />

      {/* Outside the plot */}
      <Box x={30} y={70} w={180} h={78} title="People" lines={['browser · phone', 'passkeys', 'Claude.ai via Home MCP']} tone="slate" lineSize={10.5} />
      <Box x={30} y={300} w={180} h={96} title="Relying applications" lines={['field app · card room', 'your app', 'OIDC client + A2A caller']} tone="paper" lineSize={10.5} />
      <Box x={30} y={540} w={180} h={78} title="Outside agents" lines={['partner A2A agents', 'other estates', 'MCP clients']} tone="paper" lineSize={10.5} />

      {/* The buildings */}
      <Building kind="home" x={300} y={70} w={240} h={140} name="Home" host="apps/home · Vercel" lines={['passkey sign-in · OIDC issuer', 'ceremonies: charter · invite · delegate', 'approve parked runs · revoke', 'the only place a person signs']} />
      <Building kind="runtime" x={300} y={250} w={240} h={140} name="Agent runtime" host="home-a2a.faithnet.io" lines={['Workers + Durable Objects', 'A2aTaskDO · InteractionsDO · huddles', 'harness: plan → verify → act → receipt', 'playbooks by digest · triggers']} />
      <Building kind="vault" x={300} y={430} w={240} h={110} name="Vault · MCP, private" host="home-vault.faithnet.io" lines={['D1 · per-agent encrypted records', 'per-record delegation scope', 'inbox · roster · receipts · memory']} />
      <Building kind="edge" x={300} y={565} w={240} h={100} name="Edge" host="home-edge.faithnet.io" lines={['admission, always · /api/a2a/<name>', 'HTTPS required · mTLS optional']} roofH={22} />

      <Building kind="mcp" x={610} y={70} w={220} h={110} name="Home MCP" host="home-mcp.faithnet.io" lines={['Claude.ai enters as the person', 'OAuth 2.1 AS · a relying app of Home', 'ask-as-me · act-as-me wires']} />
      <Building kind="rpc" x={610} y={245} w={220} h={95} name="RPC gateway" host="home-rpc.faithnet.io" lines={['tokenised JSON-RPC', '→ faithchain-rpc.agentkg.io']} roofH={18} />
      <Building kind="chain" x={610} y={400} w={300} h={160} name="faithchain · the estate chain" host="Besu QBFT · chain 34348 · any EVM" lines={['AgentAccount + CustodyPolicy per resident', 'DelegationManager + enforcers', 'name registries · typed subregistries', 'registry-kit instances · ReceiptAnchorRegistry']} />
      <Building kind="kms" x={940} y={100} w={170} h={160} name="KMS" host="akcs-pilot.faithnet.io" lines={['tenant: this estate', 'service keys are delegates', 'wires the custodian mints', 'revoke a wire, never an identity']} roofH={28} />

      {/* Guarantees */}
      <Box x={940} y={300} w={190} h={260} title="What each building holds to" tone="slate" dashed lines={['Home: only a person signs.', '', 'Runtime: no step without', 'a live grant.', '', 'Vault: records the owner', 'can carry away.', '', 'Edge: admission before', 'anything.', '', 'Chain: revocation is final.']} lineSize={10.5} />

      {/* Roads */}
      <Road id={id} d="M 210 100 H 296" tone="ink" label="sign in · approve" lx={253} ly={92} />
      <Road id={id} d="M 210 330 C 250 330, 260 150, 296 150" label="OIDC + delegation" lx={222} ly={236} anchor="start" />
      <Road id={id} d="M 210 370 C 250 370, 260 620, 296 620" tone="rose" label="A2A intents, admitted" lx={222} ly={558} anchor="start" />
      <Road id={id} d="M 210 580 C 250 580, 260 630, 296 630" tone="rose" />
      <Road id={id} d="M 420 210 V 246" tone="ink" label="/harness/ask" lx={430} ly={232} anchor="start" />
      <Road id={id} d="M 420 390 V 426" label="records under delegation" lx={430} ly={412} anchor="start" />
      <Road id={id} d="M 420 565 V 544" tone="rose" label="then the runtime" lx={430} ly={560} anchor="start" />
      <Road id={id} d="M 540 290 H 606" tone="teal" label="chain reads" lx={600} ly={280} anchor="end" labelSize={9.5} />
      <Road id={id} d="M 720 340 V 396" tone="teal" label="JSON-RPC" lx={730} ly={372} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 540 350 C 580 350, 600 440, 606 460" tone="teal" label="grants · receipts" lx={548} ly={420} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 610 130 C 580 130, 570 250, 540 270" tone="ink" label="ask-as-me, over A2A" lx={548} ly={190} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 540 320 C 700 320, 820 200, 936 200" tone="violet" label="signs as a delegate" lx={760} ly={214} labelSize={9.5} />

      <Pill x={250} y={683} text="One deployment: these buildings, these names, this chain. A second estate is the same shape with other names." tone="slate" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}

/** Who lives in an estate: every resident is an account on the estate chain. */
export function EstateResidents() {
  const id = 'estate-residents';
  const W = 1180, H = 500;
  return (
    <Frame id={id} w={W} h={H} title="Who lives in an estate: people, organizations and services, each a Smart Agent account on the estate chain, each with a typed name">
      <Plot x={30} y={30} w={1120} h={400} caption="Residents of one estate" sub="three kinds, nothing else (PROV-O: Person · Organization · SoftwareAgent)" />

      <Kicker x={60} y={78} text="People · .me" tone="navy" />
      <Resident x={60} y={90} kind="person" name="mara.me" note="passkeys custody the account" />
      <Resident x={60} y={144} kind="person" name="alice.me" note="a Home is where she signs" />
      <Resident x={60} y={198} kind="person" name="nathan.me" note="steward of two orgs" />

      <Kicker x={330} y={78} text="Organizations · .org .team" tone="violet" />
      <Resident x={330} y={90} w={200} kind="org" name="calvary.org" note="holds members and teams" />
      <Resident x={330} y={144} w={200} kind="org" name="outreach.team" note="a team is an organization" />
      <Resident x={330} y={198} w={200} kind="org" name="northern-field.org" note="governs a workspace" />

      <Kicker x={650} y={78} text="Services · .svc .treasury .workspace" tone="teal" />
      <Resident x={650} y={90} w={210} kind="service" name="alice2.treasury" note="the only place value lives" />
      <Resident x={650} y={144} w={210} kind="service" name="corridor.workspace" note="coordinates; cannot have members" />
      <Resident x={650} y={198} w={210} kind="service" name="discovery.registry" note="operates a registry" />

      {/* Relationships, briefly */}
      <Box x={910} y={90} w={210} h={152} title="Between them" tone="slate" dashed lines={['membership: person → org', 'stewardship: person oversees org', 'team of: team → org', 'governed by: workspace → org', 'chartered under: service → holder', 'delegation: any → any, caveated']} lineSize={10.5} />

      <Building kind="chain" x={330} y={300} w={530} h={110} name="faithchain · the estate chain" host="every resident is an AgentAccount here" lines={['AgentAccount + CustodyPolicy · DelegationManager', 'name registries · ReceiptAnchorRegistry']} />

      <Road id={id} d="M 135 246 C 135 290, 330 290, 360 300" tone="navy" />
      <Road id={id} d="M 430 246 V 296" tone="violet" label="anchored" lx={440} ly={282} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 755 246 C 755 290, 800 290, 800 296" tone="teal" />
      <Road id={id} d="M 1015 246 C 1015 290, 880 330, 864 340" tone="line" dashed label="public relationships are chain state" lx={1010} ly={290} anchor="end" labelSize={9.5} />

      <Pill x={60} y={448} text="The address is the identity. A name, a card, a registry entry and a profile are facets that point at it." tone="slate" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}

/** The commons: the services estates share. */
export function EstateCommons() {
  const id = 'estate-commons';
  const W = 1180, H = 600;
  return (
    <Frame id={id} w={W} h={H} title="The commons: agent naming, the public graph, registries, the KMS pilot and public ground, shared by every estate that attaches to them">
      <Plot x={30} y={30} w={1120} h={250} caption="The commons" sub="shared across estates; nothing here is anybody's Home" tone="teal" />

      <Building kind="naming" x={60} y={80} w={200} h={160} name="Agent naming" host="name registries on the chain" lines={['forced-unique names · typed suffixes', '.me .org .team .svc .treasury', '.workspace .registry .church .circle', 'on-chain type is the authority;', 'a wrong suffix fails closed']} />
      <Building kind="graph" x={320} y={80} w={220} h={160} name="Public graph" host="graphdb.agentkg.io · discovery-a2a.faithnet.io" lines={['indexer reads the chain → GraphDB', 'only on-chain-derivable facts', '/.well-known/ard.json · ACP registry', 'A2A + MCP question surfaces', 'passage retrieval over public works']} roofH={30} />
      <Building kind="registry" x={600} y={80} w={210} h={160} name="Registries" host="registry-kit instances" lines={['skills registry · skills.faithnet.io', 'vertical registries, each its own', 'admission receipts · lifecycle log', 'a registry lists; it never grants']} />
      <Building kind="kms" x={870} y={80} w={120} h={160} name="KMS pilot" host="akcs-pilot" lines={['one tenant', 'per estate', 'keys are', 'delegates']} roofH={28} />
      <Building kind="ground" x={1020} y={80} w={110} h={160} name="Public ground" lines={['per-estate roots', 'Estate-', 'Projection-', 'Registry', 'generation 3']} dashed roofH={22} />

      {/* Estates below */}
      <Plot x={60} y={340} w={320} h={150} caption="Estate · ap-home" sub="faithchain" />
      <Building kind="home" x={80} y={378} w={90} h={96} name="Home" roofH={18} />
      <Building kind="runtime" x={185} y={378} w={90} h={96} name="Runtime" roofH={18} />
      <Building kind="vault" x={290} y={378} w={70} h={96} name="Vault" roofH={18} />

      <Plot x={430} y={340} w={320} h={150} caption="Estate · Faithnet" sub="faithchain" />
      <Building kind="home" x={450} y={378} w={90} h={96} name="Home" roofH={18} />
      <Building kind="runtime" x={555} y={378} w={90} h={96} name="Runtime" roofH={18} />
      <Building kind="vault" x={660} y={378} w={70} h={96} name="Vault" roofH={18} />

      <Plot x={800} y={340} w={330} h={150} caption="Estate · another product" sub="its own chain" />
      <Building kind="home" x={820} y={378} w={90} h={96} name="Home" roofH={18} />
      <Building kind="runtime" x={925} y={378} w={90} h={96} name="Runtime" roofH={18} />
      <Building kind="vault" x={1030} y={378} w={80} h={96} name="Vault" roofH={18} />

      <Road id={id} d="M 160 340 V 246" tone="teal" label="registers names" lx={170} ly={300} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 430 246 V 336" tone="violet" dashed label="indexer reads the chain" lx={440} ly={300} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 600 340 C 600 300, 700 260, 705 246" tone="amber" label="playbook by digest" lx={612} ly={316} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 930 340 V 246" tone="violet" label="mints wires" lx={940} ly={300} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 1075 340 V 246" tone="line" dashed label="anchors roots" lx={1085} ly={300} anchor="start" labelSize={9.5} />

      <Label x={60} y={520} text="Shared on one chain: the naming contracts and the indexer are the chain's. Across chains: roots on public ground, designed in spec 410 §4." size={11} tone="ink" />
      <Label x={60} y={540} text="A resolver returns an address, never a credential. A registry's signature binds only the fact that it lists an agent. Trust is read between two parties." size={11} tone="muted" />
      <Flag x={60} y={556} text="naming · public graph · skills registry · KMS tenant" status="live" />
      <Flag x={440} y={556} text="EstateProjectionRegistry on a public L2" status="designed" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}

/** The federation: several estates around the commons. */
export function Federation() {
  const id = 'federation';
  const W = 1180, H = 820;
  const mini = (x: number, y: number, hosts: { home: string; a2a: string; edge: string }) => (
    <>
      <Building kind="home" x={x} y={y} w={110} h={96} name="Home" host={hosts.home} roofH={18} />
      <Building kind="runtime" x={x + 125} y={y} w={120} h={96} name="Runtime" host={hosts.a2a} roofH={18} />
      <Building kind="vault" x={x + 260} y={y} w={90} h={96} name="Vault" roofH={18} />
      <Building kind="edge" x={x + 365} y={y} w={100} h={96} name="Edge" host={hosts.edge} roofH={18} />
    </>
  );
  return (
    <Frame id={id} w={W} h={H} title="The federation: estates on faithchain and on another chain, around the commons they share, with the roads between them">
      {/* Top estates */}
      <Plot x={30} y={30} w={540} h={190} caption="Estate · ap-home" sub="faithchain 34348 · the Home product's own estate" tone="navy" />
      {mini(60, 80, { home: 'Vercel', a2a: 'home-a2a.faithnet.io', edge: 'home-edge.faithnet.io' })}
      <Plot x={610} y={30} w={540} h={190} caption="Estate · Faithnet" sub="faithchain 34348 · Ring 0's deployment" tone="navy" />
      {mini(640, 80, { home: 'www.faithnet.me', a2a: 'a2a.faithnet.io', edge: 'edge.faithnet.io' })}

      {/* Commons */}
      <Plot x={30} y={280} w={1120} h={250} caption="The commons" sub="shared by every estate that attaches" tone="teal" />
      <Building kind="naming" x={70} y={330} w={190} h={150} name="Agent naming" host="name registries · faithchain" lines={['typed names, forced-unique', 'the on-chain type is authority']} />
      <Building kind="graph" x={320} y={330} w={220} h={150} name="Public graph" host="graphdb.agentkg.io" lines={['indexer → GraphDB → discovery', 'on-chain-derivable facts only', 'ARD · ACP · A2A + MCP questions']} roofH={30} />
      <Building kind="registry" x={600} y={330} w={200} h={150} name="Registries" host="skills.faithnet.io + more" lines={['registry-kit instances', 'skills by digest · verticals', 'list, never grant']} />
      <Building kind="kms" x={850} y={330} w={110} h={150} name="KMS pilot" lines={['a tenant', 'per estate']} roofH={28} />
      <Building kind="ground" x={1000} y={330} w={120} h={150} name="Public ground" lines={['per-estate roots', 'spec 410 §4']} dashed roofH={22} />
      <Flag x={70} y={495} text="faithchain commons" status="live" />
      <Flag x={300} y={495} text="public ground on a public L2" status="designed" />

      {/* Bottom estates */}
      <Plot x={30} y={590} w={540} h={190} caption="Estate · faithnet-b" sub="faithchain 34348 · the federation twin" tone="slate" />
      {mini(60, 640, { home: 'Home B', a2a: '*.b.faithnet.io', edge: 'edge-b.faithnet.io' })}
      <Plot x={610} y={590} w={540} h={190} caption="Estate · another product" sub="its own chain · same shape" tone="slate" />
      {mini(640, 640, { home: 'their Home', a2a: 'their runtime', edge: 'their edge' })}

      {/* Roads: estates to the commons */}
      <Road id={id} d="M 165 220 V 326" tone="teal" label="names · reads" lx={175} ly={262} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 500 326 V 224" tone="violet" dashed label="indexer reads chain" lx={510} ly={262} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 700 220 V 326" tone="amber" label="playbooks by digest" lx={710} ly={262} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 905 220 V 326" tone="violet" label="wires" lx={915} ly={262} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 165 590 V 484" tone="teal" />
      <Road id={id} d="M 500 484 V 586" tone="violet" dashed />
      <Road id={id} d="M 700 590 V 484" tone="amber" />
      <Road id={id} d="M 1060 590 V 484" tone="line" dashed label="roots" lx={1070} ly={540} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 1060 220 V 326" tone="line" dashed label="roots" lx={1070} ly={262} anchor="start" labelSize={9.5} />

      {/* Roads between estates */}
      <Road id={id} d="M 570 110 H 636" tone="rose" label="resolve → card → edge" lx={603} ly={74} labelSize={9.5} />
      <Road id={id} d="M 240 240 C 240 260, 240 560, 240 636" tone="rose" dashed label="read + routed act proven · G4–G6 pending" lx={250} ly={575} anchor="start" labelSize={9.5} />

      <Label x={30} y={805} text="Solid roads run today. Dashed roads are designed, or proven only in part. Every road ends at an edge: admission before anything." size={11} tone="muted" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}

/** One act across an estate boundary. */
export function CrossEstateAct() {
  const id = 'cross-estate';
  const W = 1180, H = 600;
  return (
    <Frame id={id} w={W} h={H} title="One act across an estate boundary: Mara, whose Home is in estate A, acts on an organization served by estate B; the act parks for her signature at her own Home">
      <Plot x={30} y={60} w={420} h={400} caption="Estate A · her Home" tone="navy" />
      <Plot x={760} y={60} w={390} h={400} caption="Estate B · the organization's" tone="slate" />
      <Plot x={480} y={60} w={250} h={400} caption="The commons" tone="teal" />

      <Glyph x={250} y={94} kind="person" size={16} />
      <Label x={272} y={107} text="mara.me" size={12} tone="navy" weight={700} mono />
      <Building kind="home" x={60} y={130} w={170} h={110} name="Home A" lines={['she signs here', 'and only here']} />
      <Building kind="runtime" x={260} y={130} w={170} h={110} name="Runtime A" lines={['her agent', 'runs the ask']} />
      <Building kind="vault" x={60} y={300} w={170} h={100} name="Vault A" lines={['her records', 'her receipts']} />

      <Building kind="naming" x={510} y={130} w={160} h={110} name="Agent naming" lines={['outreach.team →', 'address · type']} />
      <Building kind="graph" x={510} y={300} w={190} h={110} name="Public graph" lines={['atl:a2aEndpoint', 'atl:cardUri → signed card']} roofH={24} />

      <Building kind="edge" x={790} y={130} w={160} h={110} name="Edge B" lines={['admission: transport,', 'identity, mandate']} />
      <Building kind="runtime" x={970} y={130} w={160} h={110} name="Runtime B" lines={['act parks', 'until she signs']} />
      <Building kind="chain" x={790} y={300} w={340} h={110} name="faithchain" lines={['grant verified on chain · receipt anchored']} />

      <Road id={id} d="M 230 150 H 256" tone="ink" label="ask" lx={243} ly={142} labelSize={9.5} />
      <Road id={id} d="M 430 170 H 506" tone="teal" label="1 resolve" lx={468} ly={162} labelSize={9.5} />
      <Road id={id} d="M 430 200 C 470 200, 470 340, 506 350" tone="violet" label="2 records → card" lx={440} ly={262} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 700 350 C 740 350, 740 190, 786 190" tone="rose" label="3 A2A, admitted" lx={700} ly={262} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 950 180 H 966" tone="rose" />
      <Road id={id} d="M 1050 130 C 1050 30, 150 30, 145 126" tone="ink" dashed label="4 parks for her signature at Home A" lx={600} ly={44} labelSize={9.5} />
      <Road id={id} d="M 1050 240 V 296" tone="teal" label="5 executes under the grant" lx={1130} ly={272} anchor="end" labelSize={9.5} />
      <Road id={id} d="M 790 380 C 600 450, 300 450, 230 370" tone="amber" label="6 receipt → her vault, apexec:estate = B" lx={510} ly={440} labelSize={9.5} />

      <Flag x={30} y={476} text="read + routed act, Faithnet A ↔ B" status="live" />
      <Flag x={330} y={476} text="completion · hand-off · three-link chain (G4–G6)" status="pending" />
      <Flag x={720} y={476} text="roots on public ground across chains" status="designed" />

      <Pill x={60} y={516} text="Her signature never leaves her Home. B verifies the grant on chain. The registry listed and granted nothing." tone="slate" />
      <Label x={30} y={572} text="Steps 1–3 are discovery and admission: addresses and cards. Step 4 is authority: a mandate she signs. Steps 5–6 are evidence: a receipt she keeps." size={11} tone="muted" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}

/** NANDA's twelve protocol layers against the estate. */
export function NandaLayers() {
  const id = 'nanda-layers';
  const W = 1180, H = 640;
  const rows: Array<[string, string, string, 'live' | 'pending' | 'designed']> = [
    ['01 Transport', 'Edge', 'HTTPS A2A required · mTLS optional evidence · admission always (ADR-0057)', 'live'],
    ['02 Communication', 'Runtime', 'A2A tasks + messages · interactions · Home MCP for clients (specs 340, 397)', 'live'],
    ['03 Identity', 'Chain', 'the Smart Agent account is the identity; names and cards are facets (ADR-0010)', 'live'],
    ['04 Registry', 'Registries · naming', 'registry-kit instances + typed name registries; a registry lists, never grants (ADR-0038)', 'live'],
    ['05 Auth', 'Chain · runtime', 'ERC-7710 delegation + enforcers · per-step verify · intent-digest mandate (spec 350)', 'live'],
    ['06 Trust', 'Public graph · vault', 'a graph read between two parties for an outcome; never a score in the directory', 'live'],
    ['07 Payments', 'Treasury residents', 'value lives only in treasuries · payment enforcer · receipts anchored (spec 420)', 'live'],
    ['08 Coordination', 'Runtime', 'Endeavor + CoordinationPlan between agents; orchestration within one (ADR-0054)', 'live'],
    ['09 Negotiation', 'Runtime', 'intent engagement: projections → probes → offers → mandate (spec 336)', 'pending'],
    ['10 Memory', 'Vault', 'vault-resident records and memory; never a platform store (ADR-0055)', 'live'],
    ['11 Privacy', 'Vault · public graph', 'two tiers never joined; private resolution grants; public tier holds only chain facts', 'live'],
    ['12 Data facts', 'Public graph · chain', 'signed profile + sequenced publication + PROV-O receipts; the agent signs, not the index', 'live'],
  ];
  return (
    <Frame id={id} w={W} h={H} title="Project NANDA's twelve protocol layers, and which part of an estate answers each">
      <Kicker x={40} y={44} text="NANDA layer" />
      <Kicker x={260} y={44} text="Estate element" />
      <Kicker x={460} y={44} text="What answers it here" />
      <Kicker x={1060} y={44} text="status" />
      {rows.map(([layer, element, what, status], i) => {
        const y = 60 + i * 44;
        return (
          <g key={layer}>
            <rect x={30} y={y} width={1120} height={40} rx={6} fill={i % 2 ? 'transparent' : 'var(--dg-slate-soft, #f1f5f9)'} />
            <Label x={40} y={y + 25} text={layer} size={12} tone="navy" weight={700} mono />
            <Label x={260} y={y + 25} text={element} size={12} tone="ink" weight={600} />
            <Label x={460} y={y + 25} text={what} size={11} tone="muted" />
            <Flag x={1060} y={y + 10} text="" status={status} />
          </g>
        );
      })}
      <Label x={30} y={602} text="Where the stacks agree: a lean index, a signed facts document, a quilt of registries." size={11} tone="muted" />
      <Label x={30} y={620} text="Where they differ: here the agent signs its own address and facts, a resolver issues no tokens, and a registry delists but cannot revoke." size={11} tone="muted" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}
