import { Brandline, C, FONT, Frame, Kicker, Label, MONO } from './primitives';

/**
 * THE COMPOSITION NOBODY ELSE HAS. Eight concerns down the side; six peer families across; a filled cell where a
 * family has a real answer for that concern, a half cell where it has part of one. Every row has a peer — several
 * ahead on that one row. No column is full. The last column is: we ship every row, as packages AND contracts, on
 * one identity. That is the claim, drawn.
 */
type P = 'full' | 'partial' | 'none';

const FAMILIES = [
  ['Agent', 'frameworks'],
  ['Web2 IAM', 'for agents'],
  ['Smart accounts', '+ delegation'],
  ['The ERC', 'agent stack'],
  ['Registries', '+ discovery'],
  ['Data +', 'provenance'],
] as const;

const ROWS: readonly { concern: string; peer: string; field: readonly P[]; pkg: string; sol: string }[] = [
  { concern: 'Identity is a smart account', peer: 'ERC-8004 · Kite · Coinbase', field: ['none', 'partial', 'full', 'full', 'partial', 'none'], pkg: 'agent-account · key-custody', sol: 'AgentAccount · CustodyPolicy' },
  { concern: 'Person · org · service classes', peer: 'Entra blueprints · Hats', field: ['none', 'partial', 'none', 'none', 'none', 'none'], pkg: 'types · ontology · organization', sol: 'AgentNameRegistry · 10 typed subregistries' },
  { concern: 'Caveated delegation, on-chain revocable', peer: 'DTK · Smart Sessions · Vincent', field: ['none', 'none', 'full', 'full', 'none', 'none'], pkg: 'delegation · tool-policy · chain-state', sol: 'DelegationManager · 9 enforcers' },
  { concern: 'Per-step verify against a mandate', peer: 'ERC-8273 · Strands · Dapr hooks', field: ['partial', 'partial', 'partial', 'partial', 'none', 'none'], pkg: 'harness · orchestration · a2a', sol: 'DigestBindingEnforcer' },
  { concern: 'Mandates · commerce · coordination', peer: 'AP2 · x402 · ERC-8001/8183', field: ['partial', 'none', 'partial', 'full', 'none', 'none'], pkg: 'intent-engagement · coordination · payments', sol: 'PaymentEscrow · AgreementRegistry' },
  { concern: 'Records under per-record delegation', peer: 'Inrupt Solid · Auth0 Token Vault', field: ['none', 'partial', 'none', 'none', 'none', 'full'], pkg: 'vault · mcp-runtime · entitlements', sol: 'AllowedMethodsEnforcer · AttributeStorage' },
  { concern: 'Provenance the principal owns', peer: 'PROV-AGENT · OTel GenAI · ERC-8196', field: ['partial', 'none', 'none', 'partial', 'none', 'full'], pkg: 'provenance · verification-receipts · witness', sol: 'PaymentReceiptRegistry · ApprovedHashRegistry' },
  { concern: 'Naming · discovery · a registry KIT', peer: 'ERC-8004 · AGNTCY · NANDA · ANS', field: ['none', 'none', 'none', 'full', 'full', 'none'], pkg: 'registry-kit · agent-naming · agent-profile', sol: 'AgentRegistryBase · AgentProfileResolver' },
];

export function CompositionMatrix() {
  const id = 'composition';
  const W = 1200, H = 720;
  const left = 40, labelW = 290;
  const cellW = 76, cellH = 54, gap = 6;
  const gridX = left + labelW + 10;
  const gridY = 96;
  const oursX = gridX + FAMILIES.length * (cellW + gap) + 18;
  const oursW = W - oursX - 40;

  const cell = (p: P, x: number, y: number, key: string) => {
    if (p === 'none') return <rect key={key} x={x} y={y} width={cellW} height={cellH} rx={6} fill="none" stroke={C.faint} strokeDasharray="3 3" />;
    if (p === 'partial') return (
      <g key={key}>
        <rect x={x} y={y} width={cellW} height={cellH} rx={6} fill={C.slateSoft} stroke={C.line} />
        <path d={`M ${x} ${y + cellH - 6} a 6 6 0 0 0 6 6 h ${cellW - 12} a 6 6 0 0 0 6 -6 v -${cellH / 2 - 6} h -${cellW} z`} fill={C.line} opacity={0.55} />
      </g>
    );
    return <rect key={key} x={x} y={y} width={cellW} height={cellH} rx={6} fill={C.navy} opacity={0.85} />;
  };

  return (
    <Frame id={id} w={W} h={H} title="Eight trust-substrate concerns against six peer families: every concern has a peer, no family covers the column, and Agentic Primitives ships every row as packages and contracts on one identity">
      <Kicker x={left} y={40} text="the eight concerns" tone="ink" />
      <Kicker x={gridX} y={40} text="who has an answer today" tone="muted" />
      <Kicker x={oursX} y={40} text="here — package · contract" tone="navy" />

      {FAMILIES.map(([a, b], j) => {
        const x = gridX + j * (cellW + gap);
        return (
          <g key={a + b}>
            <text x={x + cellW / 2} y={gridY - 26} textAnchor="middle" fontSize={10.5} fontWeight={650} fill={C.ink} fontFamily={FONT}>{a}</text>
            <text x={x + cellW / 2} y={gridY - 12} textAnchor="middle" fontSize={10.5} fontWeight={650} fill={C.ink} fontFamily={FONT}>{b}</text>
          </g>
        );
      })}

      {ROWS.map((r, i) => {
        const y = gridY + i * (cellH + gap);
        return (
          <g key={r.concern}>
            <rect x={left} y={y} width={labelW} height={cellH} rx={6} fill={C.paper} stroke={C.line} />
            <text x={left + 12} y={y + 21} fontSize={12.5} fontWeight={650} fill={C.ink} fontFamily={FONT}>{r.concern}</text>
            <text x={left + 12} y={y + 40} fontSize={10} fill={C.muted} fontFamily={FONT}>{`peers: ${r.peer}`}</text>
            {r.field.map((p, j) => cell(p, gridX + j * (cellW + gap), y, `${i}-${j}`))}
            <rect x={oursX} y={y} width={oursW} height={cellH} rx={6} fill={C.tealSoft} stroke={C.teal} />
            <text x={oursX + 12} y={y + 21} fontSize={10.5} fontWeight={600} fill={C.teal} fontFamily={MONO}>{r.pkg}</text>
            <text x={oursX + 12} y={y + 40} fontSize={10.5} fill={C.ink} fontFamily={MONO} opacity={0.85}>{r.sol}</text>
          </g>
        );
      })}

      {/* legend + the claim */}
      {(() => {
        const y = gridY + ROWS.length * (cellH + gap) + 14;
        return (
          <g>
            <rect x={left} y={y} width={16} height={12} rx={3} fill={C.navy} opacity={0.85} />
            <Label x={left + 22} y={y + 10} text="has it" size={10.5} />
            <rect x={left + 76} y={y} width={16} height={12} rx={3} fill={C.slateSoft} stroke={C.line} />
            <Label x={left + 98} y={y + 10} text="part of it" size={10.5} />
            <rect x={left + 164} y={y} width={16} height={12} rx={3} fill="none" stroke={C.faint} strokeDasharray="3 3" />
            <Label x={left + 186} y={y + 10} text="not in scope" size={10.5} />

            <rect x={left} y={y + 30} width={W - 80} height={58} rx={10} fill={C.navySoft} stroke={C.navy} />
            <Label x={left + 16} y={y + 53} text="Read down any column: nobody fills it. Read across any row: somebody is there, several ahead on that one row." tone="navy" weight={700} size={12.5} />
            <Label x={left + 16} y={y + 73} text="The composition — one Smart Agent identity across every row, authority a contract enforces, provenance the owner keeps — is the thing no project found has. 77 packages · 33 contracts · any EVM." tone="ink" size={11.5} />
          </g>
        );
      })()}

      <Brandline w={W} h={H} left="sources: agentic-framework-competitive-analysis · web3-agent-substrate-landscape (2026-09)" />
    </Frame>
  );
}
