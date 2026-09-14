import { Arrow, Band, Box, Brandline, Frame, Kicker, Label, Pill } from './primitives';

/**
 * THE SUBSTRATE, IN LAYERS. Your application sits on the harness; the harness acts only under authority; authority
 * is held by identities; identities and grants are anchored on chain. Edge (admission) and Evidence (receipts,
 * provenance) run alongside every layer; the ontology and the registry kit span the whole.
 */
export function SubstrateLayers() {
  const id = 'layers';
  const W = 1200, H = 820;
  const L = 32;
  const colX = 190, colW = 700;
  const railX = colX + colW + 28, railW = W - railX - 32;
  const bands = [
    { y: 44, h: 110, name: 'Your application', sub: 'web · mobile · service · another agent', tone: 'slate' as const, k: 'relying app', d: 'expresses intents' },
    { y: 178, h: 142, name: 'Harness', sub: 'proposes · authorizes · acts · proves', tone: 'navy' as const, k: 'act under authority', d: 'the loop' },
    { y: 344, h: 138, name: 'Authority', sub: 'delegation · caveats · mandate · custody', tone: 'amber' as const, k: 'grants, not tokens', d: 'the rail' },
    { y: 506, h: 138, name: 'Identity', sub: 'Person · Organization · Service', tone: 'violet' as const, k: 'the agent is an account', d: 'the anchor' },
    { y: 668, h: 112, name: 'Chain', sub: 'any EVM — private L1, L2, testnet', tone: 'teal' as const, k: 'final and global', d: 'the record' },
  ];
  return (
    <Frame id={id} w={W} h={H} title="The Agentic Primitives substrate, in layers: application, harness, authority, identity, chain — with edge admission and evidence alongside">
      {/* Left rail */}
      {bands.map((b) => (
        <g key={b.name}>
          <Kicker x={L} y={b.y + 26} text={b.name} tone={b.tone === 'slate' ? 'ink' : b.tone} />
          <Label x={L} y={b.y + 46} text={b.k} size={11.5} tone="muted" />
        </g>
      ))}

      {/* Bands */}
      {bands.map((b) => <Band key={b.name} x={colX} y={b.y} w={colW} h={b.h} caption={b.d} sub={b.sub} tone={b.tone} />)}

      {/* Application row */}
      {[
        ['Your UI', 'sign in · consent', 'approve · revoke'],
        ['The Ask', '“send Alice 20”', '“who is in Missio?”'],
        ['Domain logic', 'tables · rosters', 'catalog · payments'],
        ['Other agents', 'A2A partners', 'ACP runtimes'],
      ].map(([t, a, b], i) => (
        <Box key={t} x={colX + 16 + i * 168} w={156} y={78} h={62} title={t} lines={[a!, b!]} tone="paper" titleSize={13} lineSize={11} />
      ))}
      <Arrow id={id} d={`M ${colX + colW / 2} 154 V 176`} tone="ink" label="intents — never tool calls" lx={colX + colW / 2 + 14} ly={170} anchor="start" />

      {/* Harness row */}
      {['Ask', 'Intent', 'Mandate', 'Plan', 'Verify', 'Act', 'Receipt'].map((s, i) => {
        const bw = 84, gap = 12, x0 = colX + 16 + i * (bw + gap);
        const tone = s === 'Mandate' || s === 'Verify' ? 'amber' : s === 'Receipt' ? 'teal' : 'paper';
        return (
          <g key={s}>
            <Box x={x0} y={212} w={bw} h={40} title={s} tone={tone} titleSize={13} align="middle" solid={tone !== 'paper'} />
            {i < 6 && <Arrow id={id} d={`M ${x0 + bw} 232 H ${x0 + bw + gap - 2}`} width={1.5} />}
          </g>
        );
      })}
      <Label x={colX + 16} y={280} text="Durable runs — resume re-verifies · streamed progress · parallel read steps · triggers with budgets · a bill per run" size={11.5} tone="ink" />
      <Label x={colX + 16} y={302} text="Playbooks (SKILL.md, compiled by digest) say HOW to behave. They grant nothing. No verifier reads them." size={11.5} italic />
      <Arrow id={id} d={`M ${colX + colW / 2} 320 V 342`} tone="amber" label="every step: is a live grant covering this act?" lx={colX + colW / 2 + 14} ly={336} anchor="start" />

      {/* Authority row */}
      <Box x={colX + 16} y={378} w={218} h={90} title="Delegation · ERC-7710" variant="header" tone="amber" titleMono lines={['delegator → delegate', 'caveats: payee · ceiling · time', 'method · target · intent digest']} lineSize={11.5} />
      <Box x={colX + 246} y={378} w={218} h={90} title="Mandate" variant="header" tone="amber" lines={['a delegation bound to ONE intent', 'the confirmation IS the signature', 'risk floor set by the contract']} lineSize={11.5} />
      <Box x={colX + 476} y={378} w={208} h={90} title="Custody policy" variant="header" tone="amber" lines={['thresholds · guardians', 'credential recovery', 'stewardship links']} lineSize={11.5} />
      <Arrow id={id} d={`M ${colX + colW / 2} 482 V 504`} tone="ink" label="who signs? the principal’s custodian, at their Home" lx={colX + colW / 2 + 14} ly={498} anchor="start" />

      {/* Identity row */}
      <Box x={colX + 16} y={540} w={160} h={88} title="alice.me" variant="header" tone="navy" titleMono lines={['Person Smart Agent', 'passkey-controlled', 'custodies the org']} lineSize={11.5} />
      <Box x={colX + 188} y={540} w={170} h={88} title="missio-nexus.org" variant="header" tone="violet" titleMono lines={['Organization Agent', 'members · stewards', 'own vault, own grants']} lineSize={11.5} />
      <Box x={colX + 370} y={540} w={160} h={88} title="alice.treasury" variant="header" tone="teal" titleMono lines={['Service Agent', 'role: treasury', 'chartered under her']} lineSize={11.5} />
      <Box x={colX + 542} y={540} w={142} h={88} title="house.svc" variant="header" tone="teal" titleMono lines={['Service Agent', 'key = a DELEGATE', 'never the identity']} lineSize={11.5} />
      <Arrow id={id} d={`M ${colX + colW / 2} 644 V 666`} tone="teal" label="projections: names, cards, DID docs, registry rows" lx={colX + colW / 2 + 14} ly={660} anchor="start" />

      {/* Chain row */}
      {[
        ['AgentAccount', 'ERC-4337 · 7579 · 1271'],
        ['DelegationManager', 'redeem · revoke · enforcers'],
        ['Names · Registry', 'typed names · admission log'],
        ['Receipts', 'anchored digests · final'],
      ].map(([t, a], i) => (
        <Box key={t} x={colX + 16 + i * 168} w={156} y={702} h={62} title={t} lines={[a!]} tone="teal" titleMono titleSize={12.5} lineSize={11} />
      ))}

      {/* Right rail */}
      <Box x={railX} y={44} w={railW} h={300} title="Edge — admission" variant="header" tone="rose" lines={[
        'HTTPS required · mTLS optional',
        'cert → transport evidence →',
        'app auth → canonical identity',
        '→ ADMISSION. Never skipped.',
        '',
        'A2A 1.0 (TCK-green) outward.',
        'MCP private, behind admitted',
        'runtimes. A bearer is an',
        'envelope, never the grant.',
      ]} lineSize={11.5} />
      <Box x={railX} y={368} w={railW} h={412} title="Evidence — receipts" variant="header" tone="teal" lines={[
        'Per step: which grant, which',
        'decision, which tx, which',
        'playbook digest.',
        '',
        'PROV-O graph + OpenTelemetry',
        'spans. A trace id is',
        'correlation, never trust.',
        '',
        'Held in the OWNER’s vault —',
        'not a vendor trace store.',
        'Verifiable without the',
        'runtime’s cooperation.',
      ]} lineSize={11.5} />

      <Pill x={colX} y={H - 32} text="Ontology: every record and term bound by IRI — the build fails when code invents vocabulary" tone="slate" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}
