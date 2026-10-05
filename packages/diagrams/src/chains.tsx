// CHAINS AND ESTATES. Two pictures for the chains note: estates standing on shared and separate chains, with what
// crosses between them; and the ledger of what crosses a chain boundary, as what. A chain is drawn as ground, not as
// a building: an estate enforces ON it, and several estates may stand on one.
import { Box, Brandline, Frame, Kicker, Label, Pill } from './primitives';
import { Building, Flag, Plot, Road } from './estate-kit';

/** Three estates, two chains: A and B share faithchain; C stands on Base, which is also public ground. */
export function ChainsAndEstates() {
  const id = 'chains-and-estates';
  const W = 1180, H = 780;
  const mini = (x: number, y: number) => (
    <>
      <Building kind="home" x={x} y={y} w={72} h={80} name="Home" roofH={16} titleSize={11} />
      <Building kind="runtime" x={x + 84} y={y} w={72} h={80} name="Runtime" roofH={16} titleSize={11} />
      <Building kind="vault" x={x + 168} y={y} w={72} h={80} name="Vault" roofH={16} titleSize={11} />
      <Building kind="edge" x={x + 252} y={y} w={72} h={80} name="Edge" roofH={16} titleSize={11} />
    </>
  );
  return (
    <Frame id={id} w={W} h={H} title="Chains and estates: two estates share a private chain, a third stands on a public one; authority stays on its chain, evidence and value cross">
      {/* Estates */}
      <Plot x={30} y={30} w={350} h={190} caption="Estate A · ap-home" tone="navy" />
      {mini(43, 78)}
      <Plot x={410} y={30} w={350} h={190} caption="Estate B · Faithnet" sub="same chain as A" tone="navy" />
      {mini(423, 78)}
      <Plot x={790} y={30} w={360} h={190} caption="Estate C · another product" sub="a public chain" tone="slate" />
      {mini(808, 78)}

      {/* Chains as ground */}
      <Plot x={30} y={300} w={730} h={190} caption="faithchain · private · eip155:34348" sub="one chain under two estates" tone="amber" solid />
      <Building kind="chain" x={60} y={340} w={330} h={130} name="The authority set" host="shared by A and B by construction" lines={['AgentAccount + CustodyPolicy per resident', 'DelegationManager + enforcers · isRevoked', 'name registries · ReceiptAnchorRegistry']} />
      <Box x={420} y={352} w={310} h={112} title="What sharing a chain gives" tone="paper" lines={['one address per resident, in both estates', 'a grant verified by either runtime', 'a revocation seen by both, next block', 'cross-estate acts are chain-local']} lineSize={10.5} />

      <Plot x={790} y={300} w={360} h={190} caption="Base · public · eip155:8453" tone="amber" solid />
      <Building kind="chain" x={810} y={340} w={150} h={130} name="C's authority set" lines={['the same contracts', 'C\u2019s accounts and grants']} titleSize={12} />
      <Building kind="ground" x={980} y={340} w={150} h={130} name="Public ground" lines={['EstateProjectionRegistry', 'roots of A, B and C', 'grants · members · charter']} titleSize={12} lineSize={10} dashed />

      {/* Roads: estates to their chain */}
      <Road id={id} d="M 205 220 V 296" tone="teal" label="enforces here" lx={215} ly={262} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 585 220 V 296" tone="teal" label="enforces here" lx={595} ly={262} anchor="start" labelSize={9.5} />
      <Road id={id} d="M 885 220 V 296" tone="teal" label="enforces here" lx={875} ly={262} anchor="end" labelSize={9.5} />
      <Road id={id} d="M 700 220 C 700 262, 1055 250, 1055 296" tone="line" dashed label="A and B anchor roots" lx={1045} ly={250} anchor="end" labelSize={9.5} />

      {/* Roads: between estates */}
      <Road id={id} d="M 380 110 H 406" tone="rose" label="same chain: a chain-local act" lx={393} ly={70} labelSize={9.5} />
      <Road id={id} d="M 760 150 H 786" tone="rose" dashed label="other chain: a Base grant, parked at Home A" lx={773} ly={70} labelSize={9.5} />

      {/* The three rules */}
      <Box x={30} y={530} w={355} h={150} title="Authority never crosses" tone="rose" lines={['a grant is signed into an EIP-712 domain', 'with the chain id and the DelegationManager;', 'on another chain it means nothing.', 'An act in C runs under a grant issued', 'and redeemed on Base.']} lineSize={10.5} />
      <Box x={412} y={530} w={355} h={150} title="Evidence crosses as a root or an anchor" tone="violet" lines={['A\u2019s live-grant and membership roots on', 'public ground; a presentation reveals one leaf;', 'C\u2019s edge reads the root it anchored, never', 'the proof in hand. A receipt cites the chain', 'and the anchor it was written to.']} lineSize={10.5} />
      <Box x={795} y={530} w={355} h={150} title="Value crosses under a bound mandate" tone="amber" lines={['a treasury moves funds through a bridge', 'adapter (CCTP, xERC20, ERC-7683) under a', 'mandate bound to the destination chain;', 'the bridge is outside Ring 0 and is never', 'the reason a payment was allowed.']} lineSize={10.5} />

      <Flag x={30} y={696} text="two estates on one chain" status="live" />
      <Flag x={240} y={696} text="roots on a public chain · cross-chain admission" status="designed" />
      <Flag x={660} y={696} text="one principal with accounts on two chains, bound" status="pending" />
      <Pill x={30} y={736} text="A chain is ground, not a building. An estate enforces on one; several estates may stand on it; none of them is it." tone="slate" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}

/** The ledger: what crosses a chain boundary, as what, by which standard. */
export function ChainBoundary() {
  const id = 'chain-boundary';
  const W = 1180, H = 620;
  const rows: Array<[string, string, string, string, 'live' | 'pending' | 'designed']> = [
    ['Address', 'as a reference', 'eip155:<chain>:<address>; one hex on two chains is two accounts until a signed binding joins them', 'CAIP-10 · CREATE2', 'live'],
    ['Name', 'as a record', 'a name belongs to the registry on its chain; its native-id record may point at an account on another', 'spec 215 records', 'live'],
    ['Grant', 'never', 're-issued on the chain where it acts; the EIP-712 domain carries the chain id and the manager', 'EIP-712 · ERC-7710', 'live'],
    ['Revocation', 'never read across', 'one read on the grant\u2019s chain; the live-grant root is refreshed and a stale root is a refusal', 'spec 410 §4', 'designed'],
    ['Membership', 'as a proof', 'the membership root on public ground; a Merkle presentation reveals one leaf, nothing else', 'merkle-membership-v1', 'designed'],
    ['Receipt', 'as an anchor', 'anchored where the act ran; the vault record names the chain; a mirrored anchor is evidence only', 'ReceiptAnchorRegistry · ERC-7786', 'live'],
    ['Value', 'as a transfer', 'a treasury invokes a bridge adapter under a mandate redeemable only on the destination chain', 'CCTP V2 · xERC20 · ERC-7683', 'pending'],
    ['Public graph', 'as tagged facts', 'the indexer reads each chain; every fact carries its chain; still only what the chain can prove', 'CAIP-2 on every fact', 'pending'],
    ['Charter', 'as a hash', 'the estate\u2019s governance address is its id on public ground; the charter hash sits beside its roots', 'spec 410 §9', 'designed'],
  ];
  return (
    <Frame id={id} w={W} h={H} title="What crosses a chain boundary between estates, as what, and by which standard">
      <Kicker x={40} y={44} text="Thing" />
      <Kicker x={170} y={44} text="Crosses" />
      <Kicker x={320} y={44} text="How" />
      <Kicker x={870} y={44} text="Standard" />
      <Kicker x={1095} y={44} text="status" />
      {rows.map(([thing, crosses, how, std, status], i) => {
        const y = 60 + i * 46;
        return (
          <g key={thing}>
            <rect x={30} y={y} width={1120} height={42} rx={6} fill={i % 2 ? 'transparent' : 'var(--dg-slate-soft, #f1f5f9)'} />
            <Label x={40} y={y + 26} text={thing} size={12} tone="navy" weight={700} />
            <Label x={170} y={y + 26} text={crosses} size={12} tone={crosses.startsWith('never') ? 'rose' : 'ink'} weight={600} />
            <Label x={320} y={y + 26} text={how} size={10} tone="muted" />
            <Label x={870} y={y + 26} text={std} size={10} tone="ink" mono />
            <Flag x={1095} y={y + 11} text="" status={status} />
          </g>
        );
      })}
      <Label x={30} y={520} text="Two things never cross: a grant and the read of its revocation. Everything else crosses as a reference, a proof, an anchor or a transfer." size={11} tone="ink" />
      <Label x={30} y={540} text="Bridges and messaging gateways are adapters in sibling repositories. Ring 0 ships the fields they carry: a chain on every reference, a chain and an anchor on every receipt, a root per estate." size={11} tone="muted" />
      <Pill x={30} y={566} text="A message from another chain is evidence that something happened there. It is never a mandate here." tone="slate" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}
