import { Arrow, Band, Box, C, Frame, Label, Pill } from './primitives';

/**
 * THE SUBSTRATE, IN LAYERS. Your application sits on the harness; the harness acts only under authority; authority
 * is held by identities; identities and grants are anchored on chain. Edge (admission) and Evidence (receipts,
 * provenance) run alongside every layer; the ontology and the registry kit span the whole.
 */
export function SubstrateLayers() {
  const id = 'layers';
  const W = 1180, H = 784;
  const L = 40, R = W - 40;
  const colX = L + 150, colW = 660;
  return (
    <Frame id={id} w={W} h={H} title="The Agentic Primitives substrate, in layers: application, harness, authority, identity, chain — with edge admission and evidence alongside">
      {/* Left rail: layer names */}
      <Label x={L} y={70} text="YOUR APPLICATION" size={11} weight={700} tone="ink" />
      <Label x={L} y={190} text="HARNESS" size={11} weight={700} tone="navy" />
      <Label x={L} y={206} text="act under authority" size={10} />
      <Label x={L} y={340} text="AUTHORITY" size={11} weight={700} tone="amber" />
      <Label x={L} y={356} text="grants, not tokens" size={10} />
      <Label x={L} y={490} text="IDENTITY" size={11} weight={700} tone="violet" />
      <Label x={L} y={506} text="the agent is an account" size={10} />
      <Label x={L} y={640} text="CHAIN" size={11} weight={700} tone="teal" />
      <Label x={L} y={656} text="the anchor" size={10} />

      {/* Application band */}
      <Band x={colX} y={40} w={colW} h={100} caption="Relying application — web, mobile, service, another agent" tone="slate" />
      <Box x={colX + 16} y={68} w={150} h={58} title="Home UI / your UI" lines={['sign in · consent', 'approve · revoke']} tone="paper" />
      <Box x={colX + 180} y={68} w={150} h={58} title="Ask (conversation)" lines={['"send Alice 20"', '"who is in Missio?"']} tone="paper" />
      <Box x={colX + 344} y={68} w={150} h={58} title="Domain logic" lines={['tables · rosters', 'catalog · payments']} tone="paper" />
      <Box x={colX + 508} y={68} w={136} h={58} title="Other agents" lines={['A2A partners', 'ACP runtimes']} tone="paper" />

      <Arrow id={id} d={`M ${colX + colW / 2} 140 V 160`} tone="ink" label="intents, never tool calls" lx={colX + colW / 2 + 12} ly={155} anchor="start" />

      {/* Harness band */}
      <Band x={colX} y={160} w={colW} h={130} caption="Harness — proposes · authorizes · acts · proves" tone="navy" />
      {['Ask', 'Intent', 'Mandate', 'Plan', 'Verify', 'Act', 'Receipt'].map((s, i) => {
        const bw = 80, gap = 12, x0 = colX + 16 + i * (bw + gap);
        const tone = s === 'Mandate' || s === 'Verify' ? 'amber' : s === 'Receipt' ? 'teal' : 'paper';
        return (
          <g key={s}>
            <Box x={x0} y={190} w={bw} h={40} title={s} tone={tone} titleSize={12.5} />
            {i < 6 && <Arrow id={id} d={`M ${x0 + bw} 210 H ${x0 + bw + gap - 1}`} width={1.25} />}
          </g>
        );
      })}
      <Label x={colX + 16} y={258} text="Durable runs (resume re-verifies) · streamed progress · parallel read steps · triggers with budgets · per-run bill" size={10.5} />
      <Label x={colX + 16} y={276} text="Playbooks (SKILL.md → compiled by digest) say HOW to behave. They grant nothing." size={10.5} italic />

      <Arrow id={id} d={`M ${colX + colW / 2} 290 V 310`} tone="amber" label="every step: is a live grant covering this act?" lx={colX + colW / 2 + 12} ly={305} anchor="start" />

      {/* Authority band */}
      <Band x={colX} y={310} w={colW} h={130} caption="Authority — delegation · caveats · mandates · custody · entitlements" tone="amber" />
      <Box x={colX + 16} y={340} w={208} h={84} title="Delegation (ERC-7710)" lines={['delegator → delegate', 'caveats: payee · ceiling · time', 'method · target · intent digest']} tone="paper" titleMono lineSize={10.5} />
      <Box x={colX + 236} y={340} w={208} h={84} title="Mandate" lines={['a delegation bound to ONE intent', 'confirmation = the signature', 'risk floor from the contract']} tone="paper" lineSize={10.5} />
      <Box x={colX + 456} y={340} w={188} h={84} title="Custody policy" lines={['thresholds · guardians', 'credential recovery', 'stewardship links']} tone="paper" lineSize={10.5} />

      <Arrow id={id} d={`M ${colX + colW / 2} 440 V 460`} tone="ink" label="who signs? the principal's custodian, at their Home" lx={colX + colW / 2 + 12} ly={455} anchor="start" />

      {/* Identity band */}
      <Band x={colX} y={460} w={colW} h={130} caption="Identity — Person · Organization · Service Smart Agents" tone="violet" />
      <Box x={colX + 16} y={490} w={150} h={84} title="alice.me" lines={['Person Smart Agent', 'passkey-controlled', 'custodies the org']} tone="paper" titleMono titleSize={13} lineSize={10.5} />
      <Box x={colX + 180} y={490} w={150} h={84} title="missio-nexus.org" lines={['Organization Agent', 'members · stewards', 'own vault, own grants']} tone="paper" titleMono titleSize={12} lineSize={10.5} />
      <Box x={colX + 344} y={490} w={150} h={84} title="alice.treasury" lines={['Service Agent', 'role: treasury', 'chartered under her']} tone="paper" titleMono titleSize={13} lineSize={10.5} />
      <Box x={colX + 508} y={490} w={136} h={84} title="house.svc" lines={['Service Agent', 'key = a DELEGATE', 'never the identity']} tone="paper" titleMono titleSize={13} lineSize={10.5} />

      <Arrow id={id} d={`M ${colX + colW / 2} 590 V 610`} tone="teal" label="projections: names, cards, DID docs, registry rows" lx={colX + colW / 2 + 12} ly={605} anchor="start" />

      {/* Chain band */}
      <Band x={colX} y={610} w={colW} h={110} caption="Chain — the anchor (any EVM: private L1, L2, testnet)" tone="teal" />
      <Box x={colX + 16} y={640} w={150} h={64} title="AgentAccount" lines={['ERC-4337 · ERC-7579', 'ERC-1271 verify']} tone="paper" titleMono lineSize={10.5} />
      <Box x={colX + 180} y={640} w={150} h={64} title="DelegationManager" lines={['redeem · revoke', 'caveat enforcers']} tone="paper" titleMono titleSize={12} lineSize={10.5} />
      <Box x={colX + 344} y={640} w={150} h={64} title="Names + Registry" lines={['typed names · admission', 'lifecycle log']} tone="paper" titleMono lineSize={10.5} />
      <Box x={colX + 508} y={640} w={136} h={64} title="Receipts" lines={['anchored digests', 'revocation is final']} tone="paper" titleMono lineSize={10.5} />

      {/* Right rail: cross-cutting */}
      <Box x={colX + colW + 24} y={40} w={R - (colX + colW + 24)} h={320} title="Edge — admission" tone="rose" dashed lines={[
        'HTTPS required; mTLS optional',
        'certificate → transport evidence',
        '→ app auth → canonical identity',
        '→ ADMISSION. Never skipped.',
        '',
        'A2A 1.0 (TCK-green) outward',
        'MCP private, behind admitted',
        'runtimes. A bearer is an',
        'envelope, never the grant.',
      ]} lineSize={10.5} />
      <Box x={colX + colW + 24} y={376} w={R - (colX + colW + 24)} h={344} title="Evidence — receipts" tone="teal" dashed lines={[
        'Per step: which grant, which',
        'decision, which tx, which',
        'playbook digest.',
        '',
        'PROV-O graph + OpenTelemetry',
        'spans; a trace id is',
        'correlation, never trust.',
        '',
        'Held in the OWNER\'s vault —',
        'not a vendor trace store.',
        'Verifiable without the runtime.',
      ]} lineSize={10.5} />

      {/* Spanning pills */}
      <Pill x={colX} y={728} text="Ontology: every record and term bound by IRI — the build fails when code invents vocabulary" tone="slate" />
      <Pill x={colX + 560} y={728} text="Registry Kit: be what registries are built from" tone="slate" />
      <Label x={R} y={H - 12} text="agenticprimitives.dev" size={9.5} anchor="end" mono />
      <rect x={0} y={0} width={W} height={H} fill="none" stroke={C.faint} />
    </Frame>
  );
}
