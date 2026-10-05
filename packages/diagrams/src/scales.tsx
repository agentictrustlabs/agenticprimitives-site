// THE FOUR SCALES. Substrate → estate → town → federation, drawn bottom-up as the ground each stands on: packages
// are the bedrock, an estate is a block of buildings, a town is several blocks and the services between them on one
// chain, a federation is towns on several chains joined on public ground. One repository per scale.
import { Box, Brandline, Frame, Kicker, Label, Pill } from './primitives';
import { Building, Flag, Plot, Road } from './estate-kit';

export function Scales() {
  const id = 'scales';
  const W = 1180, H = 900;
  const estateMinis = (x: number, y: number, s = 1) => (
    <>
      <Building kind="home" x={x} y={y} w={54 * s} h={62 * s} name="Home" roofH={12} titleSize={9} />
      <Building kind="runtime" x={x + 62 * s} y={y} w={54 * s} h={62 * s} name="Run" roofH={12} titleSize={9} />
      <Building kind="vault" x={x + 124 * s} y={y} w={54 * s} h={62 * s} name="Vault" roofH={12} titleSize={9} />
      <Building kind="edge" x={x + 186 * s} y={y} w={54 * s} h={62 * s} name="Edge" roofH={12} titleSize={9} />
    </>
  );
  // Band geometry: four horizontal bands, federation on top.
  const F = { y: 40, h: 200 };  // federation
  const T = { y: 260, h: 200 }; // town
  const E = { y: 480, h: 180 }; // estate
  const S = { y: 680, h: 150 }; // substrate
  return (
    <Frame id={id} w={W} h={H} title="The four scales: substrate, estate, town, federation — one repository each, each depending only on the one below, each answering a question the one below cannot">
      {/* ── Federation ── */}
      <Plot x={30} y={F.y} w={1120} h={F.h} caption="Federation · ap-federation" sub="towns on several chains, joined on public ground" tone="violet" />
      <Kicker x={50} y={F.y + 48} text="04" tone="violet" />
      <Label x={50} y={F.y + 72} text="How does an agent from one chain" size={12} tone="ink" weight={600} />
      <Label x={50} y={F.y + 90} text="act in an estate on another?" size={12} tone="ink" weight={600} />
      <Label x={50} y={F.y + 114} text="Authority stays on each chain." size={10.5} tone="muted" />
      <Label x={50} y={F.y + 130} text="Evidence and value cross; a grant never does." size={10.5} tone="muted" />
      <Flag x={50} y={F.y + 150} text="ap-federation · spec 410 §4" status="designed" />

      <Plot x={330} y={F.y + 40} w={280} h={130} caption="town · faithchain" tone="amber" solid />
      {estateMinis(345, F.y + 80, 0.72)}
      <Building kind="naming" x={535} y={F.y + 80} w={62} h={62} name="svcs" roofH={12} titleSize={9} />
      <Plot x={850} y={F.y + 40} w={280} h={130} caption="town · Base" tone="amber" solid />
      {estateMinis(865, F.y + 80, 0.72)}
      <Building kind="naming" x={1055} y={F.y + 80} w={62} h={62} name="svcs" roofH={12} titleSize={9} />
      <Building kind="ground" x={650} y={F.y + 48} w={160} h={120} name="Public ground" lines={['roots per estate', 'bindings per principal', 'presentations']} titleSize={11.5} lineSize={10} dashed roofH={22} />
      <Road id={id} d="M 610 105 H 646" tone="line" dashed label="roots" lx={628} ly={97} labelSize={9} />
      <Road id={id} d="M 850 105 H 814" tone="line" dashed label="reads" lx={832} ly={97} labelSize={9} />

      {/* ── Town ── */}
      <Plot x={30} y={T.y} w={1120} h={T.h} caption="Town · ap-town" sub="several estates on one chain, and the services they share" tone="teal" />
      <Kicker x={50} y={T.y + 48} text="03" tone="teal" />
      <Label x={50} y={T.y + 72} text="How do estates on one chain find," size={11.5} tone="ink" weight={600} />
      <Label x={50} y={T.y + 90} text="name and read each other?" size={11.5} tone="ink" weight={600} />
      <Label x={50} y={T.y + 114} text="Nothing in a town grants: a resolver" size={10.5} tone="muted" />
      <Label x={50} y={T.y + 130} text="returns an address, a registry lists." size={10.5} tone="muted" />
      <Flag x={50} y={T.y + 150} text="ap-town · public" status="live" />

      <Building kind="naming" x={360} y={T.y + 40} w={120} h={130} name="Agent naming" lines={['typed registries', 'forced-unique']} titleSize={11.5} lineSize={10} />
      <Building kind="graph" x={495} y={T.y + 40} w={140} h={130} name="Public graph" lines={['indexer → GraphDB', 'discovery · ARD · ACP']} titleSize={11.5} lineSize={10} roofH={26} />
      <Building kind="registry" x={650} y={T.y + 40} w={120} h={130} name="Registries" lines={['registry kit', 'skills by digest']} titleSize={11.5} lineSize={10} />
      <Building kind="kms" x={785} y={T.y + 40} w={85} h={130} name="KMS" lines={['a tenant', 'per estate']} titleSize={11.5} lineSize={10} roofH={24} />
      <Building kind="rpc" x={885} y={T.y + 40} w={115} h={130} name="Chain ops" lines={['RPC · governance', 'paymaster']} titleSize={11.5} lineSize={10} roofH={16} />
      <Plot x={1015} y={T.y + 40} w={115} h={130} caption="estates" tone="navy" />
      <Building kind="home" x={1028} y={T.y + 72} w={40} h={44} name="" roofH={10} />
      <Building kind="home" x={1074} y={T.y + 72} w={40} h={44} name="" roofH={10} />
      <Building kind="home" x={1028} y={T.y + 122} w={40} h={44} name="" roofH={10} />
      <Building kind="home" x={1074} y={T.y + 122} w={40} h={44} name="" roofH={10} />

      {/* ── Estate ── */}
      <Plot x={30} y={E.y} w={1120} h={E.h} caption="Estate · ap-home" sub="one deployment: Home, agent runtime, vault, edge, Home MCP, RPC gateway, on one chain" tone="navy" />
      <Kicker x={50} y={E.y + 48} text="02" tone="navy" />
      <Label x={50} y={E.y + 72} text="Where does a person sign, where" size={11.5} tone="ink" weight={600} />
      <Label x={50} y={E.y + 90} text="do her agents run, where is the record?" size={11.5} tone="ink" weight={600} />
      <Label x={50} y={E.y + 114} text="The vault is the record. Only a person" size={10.5} tone="muted" />
      <Label x={50} y={E.y + 130} text="signs, and only at her Home." size={10.5} tone="muted" />
      <Flag x={50} y={E.y + 150} text="ap-home · public · deploys Faithnet" status="live" />

      <Building kind="home" x={360} y={E.y + 40} w={110} h={120} name="Home" host="apps/home" lines={['passkeys · ceremonies', 'approvals']} titleSize={11.5} lineSize={10} />
      <Building kind="runtime" x={485} y={E.y + 40} w={130} h={120} name="Agent runtime" host="A2A · harness" lines={['plan → verify → act', '→ receipt']} titleSize={11.5} lineSize={10} />
      <Building kind="vault" x={630} y={E.y + 40} w={110} h={120} name="Vault" host="private MCP" lines={['the record']} titleSize={11.5} lineSize={10} />
      <Building kind="edge" x={755} y={E.y + 40} w={105} h={120} name="Edge" host="admission" lines={['always']} titleSize={11.5} lineSize={10} roofH={20} />
      <Building kind="mcp" x={875} y={E.y + 40} w={125} h={120} name="Home MCP" host="spec 397" lines={['Claude.ai as', 'the person']} titleSize={11.5} lineSize={10} />
      <Building kind="rpc" x={1015} y={E.y + 40} w={115} h={120} name="RPC gateway" lines={['to the chain']} titleSize={11.5} lineSize={10} roofH={16} />

      {/* ── Substrate ── */}
      <Plot x={30} y={S.y} w={1120} h={S.h} caption="Substrate · agentic-primitives" sub="published packages and contracts; any EVM; nothing here names a deployment" tone="slate" solid />
      <Kicker x={50} y={S.y + 48} text="01" tone="ink" />
      <Label x={50} y={S.y + 72} text="What is an agent, what may it do," size={12} tone="ink" weight={600} />
      <Label x={50} y={S.y + 90} text="and how is that proven?" size={12} tone="ink" weight={600} />
      <Label x={50} y={S.y + 114} text="Generic: no vertical, no brand, no hostname." size={10.5} tone="muted" />
      <Flag x={50} y={S.y + 124} text="Ring 0 · npm · exact-pinned" status="live" />

      <Box x={360} y={S.y + 40} w={490} h={90} title="@agenticprimitives/* · 77 packages" tone="paper" lines={['Identity · Authority · Harness · Edge · Registry Kit', 'Evidence · Coordination · Ontology · Operations']} titleMono titleSize={12} lineSize={10.5} />
      <Building kind="chain" x={870} y={S.y + 30} w={260} h={105} name="33 contracts" host="deployed per chain" lines={['AgentAccount · CustodyPolicy · DelegationManager', 'enforcers · naming · registry kit · anchors']} titleSize={11.5} lineSize={10} />

      {/* Dependency arrows, down only */}
      <Road id={id} d="M 1140 480 V 462" tone="ink" width={1.5} />
      <Road id={id} d="M 1140 260 V 242" tone="ink" width={1.5} />
      <Road id={id} d="M 1140 680 V 662" tone="ink" width={1.5} />
      <Label x={1150} y={850} text="dependencies point down; nothing imports upward" size={10} tone="muted" anchor="end" />

      <Pill x={30} y={848} text="One chain per estate. One chain per town. Many chains per federation. Authority never leaves the chain it was signed into." tone="slate" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}
