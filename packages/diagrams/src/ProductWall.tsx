import { Brandline, C, FONT, Frame, Kicker, Label, MONO } from './primitives';

/**
 * THE PRODUCT WALL. Left: the thirty products an agentic solution is assembled from today, banded by the identity
 * model / permission shape / evidence format each band drags in — every band boundary is a seam. Right: one
 * substrate, the same needs as slots. One picture, one argument: buy and wire thirty things, or install one.
 */
const BANDS: readonly { band: string; seam: string; products: readonly [string, string][] }[] = [
  { band: 'Sign-in + identity', seam: 'identity model #1 · a user id', products: [['Auth0', 'login · SSO'], ['Privy', 'embedded wallets'], ['WorkOS', 'orgs · roles']] },
  { band: 'Accounts + custody', seam: 'identity model #2 · a wallet address — joined by a table you write', products: [['Safe', 'accounts · multisig'], ['Pimlico', 'gas · bundler'], ['Turnkey', 'keys · signing policy'], ['guardians', 'recovery']] },
  { band: 'Permissions', seam: 'permission shape #1 in a DB · shape #2 on chain — nothing joins them', products: [['MetaMask DTK', 'scoped authority'], ['Cerbos', 'policy engine'], ['OpenFGA', 'data access'], ['HashiCorp Vault', 'secrets']] },
  { band: 'Private data', seam: 'identity model #3 · a row key, a DID, a credential subject', products: [['Postgres + RLS', 'private records'], ['Veramo', 'credentials'], ['EAS', 'attestations'], ['DocuSign', 'agreements'], ['Box', 'content']] },
  { band: 'Runtime + wire', seam: 'authority as a callback the framework calls — if the code remembers', products: [['LangGraph', 'agent loop'], ['Temporal', 'durable workflows'], ['MCP SDK', 'tools + auth'], ['a2a-js', 'agent calls'], ['XMTP', 'messaging'], ['Stripe', 'payments']] },
  { band: 'Edge + discovery', seam: 'reachability mistaken for authority · an API key, a registry row', products: [['Kong', 'admission · limits'], ['ENS', 'names'], ['8004 registry', 'discovery'], ['Tailscale', 'private reach']] },
  { band: 'Evidence + tooling', seam: 'evidence formats #1 spans · #2 logs · #3 attestations — joined by ids you invent', products: [['Datadog', 'tracing · audit'], ['TopBraid', 'vocabulary'], ['template repo', 'conventions']] },
];

const SLOTS: readonly [string, string][] = [
  ['Identity', 'agent-account · connect · orgs'],
  ['Custody', 'key-custody · account-custody'],
  ['Authority', 'delegation · tool-policy · entitlements'],
  ['Vault', 'vault · content-storage · credentials'],
  ['Harness', 'harness · orchestration · a2a · mcp'],
  ['Edge + registry', 'admission · naming · registry-kit'],
  ['Evidence', 'provenance · receipts · witness'],
  ['Ontology', 'ontology · types — bound by IRI'],
];

export function ProductWall() {
  const id = 'product-wall';
  const W = 1200, H = 700;
  const left = 40, bandLabelW = 128, tileW = 104, tileH = 46, gapX = 5, rowGap = 14;
  const tilesX = left + bandLabelW + 8;
  const wallRight = tilesX + 6 * (tileW + gapX) - gapX;
  const subX = wallRight + 72, subW = W - subX - 40;
  let y = 92;
  const bandTops: number[] = [];
  const bandBottoms: number[] = [];
  const total = BANDS.reduce((n, b) => n + b.products.length, 0);

  const bands = BANDS.map((b) => {
    const top = y;
    bandTops.push(top);
    const tiles = b.products.map(([name, need], j) => {
      const x = tilesX + j * (tileW + gapX);
      return (
        <g key={name}>
          <rect x={x} y={top} width={tileW} height={tileH} rx={7} fill={C.paper} stroke={C.line} />
          <text x={x + 9} y={top + 19} fontSize={11.5} fontWeight={700} fill={C.ink} fontFamily={FONT}>{name}</text>
          <text x={x + 9} y={top + 35} fontSize={9.5} fill={C.muted} fontFamily={FONT}>{need}</text>
        </g>
      );
    });
    const el = (
      <g key={b.band}>
        <text x={left} y={top + 19} fontSize={11.5} fontWeight={700} fill={C.ink} fontFamily={FONT}>{b.band}</text>
        <text x={left} y={top + 34} fontSize={9.5} fill={C.muted} fontFamily={MONO}>{`${b.products.length} products`}</text>
        {tiles}
        {/* the seam this band drags in */}
        <line x1={tilesX} y1={top + tileH + rowGap / 2 + 4} x2={wallRight} y2={top + tileH + rowGap / 2 + 4} stroke={C.rose} strokeDasharray="3 4" strokeWidth={1} opacity={0.8} />
        <text x={wallRight} y={top + tileH + rowGap / 2 + 1} textAnchor="end" fontSize={8.5} fill={C.rose} fontFamily={MONO} opacity={0.9}>{b.seam}</text>
      </g>
    );
    y = top + tileH + rowGap + 12;
    bandBottoms.push(y);
    return el;
  });
  const wallBottom = y - 12;

  // the substrate column
  const subTop = 92, subBottom = wallBottom;
  const slotH = (subBottom - subTop - 40) / SLOTS.length;

  return (
    <Frame id={id} w={W} h={H} title="Thirty products, seven seams, three identity models, two permission shapes, three evidence formats — or one substrate where the same needs are slots in one model">
      <Kicker x={left} y={40} text={`stitched — ${total} products to select, contract, integrate, and keep agreeing`} tone="rose" />
      <Kicker x={subX} y={40} text="or the substrate" tone="teal" />
      <Label x={left} y={62} text="Every band boundary is a seam: a person becomes a token, the token becomes a row, the row becomes a log line." size={11} tone="ink" />
      <Label x={subX} y={62} text="pnpm add @agenticprimitives/*" size={11} tone="teal" mono weight={600} />

      <rect x={left - 12} y={82} width={wallRight - left + 24} height={wallBottom - 82 + 6} rx={12} fill={C.roseSoft} opacity={0.35} stroke={C.rose} strokeOpacity={0.35} />
      {bands}

      {/* OR */}
      <circle cx={(wallRight + subX) / 2} cy={(subTop + subBottom) / 2} r={18} fill={C.paper} stroke={C.ink} strokeWidth={1.5} />
      <text x={(wallRight + subX) / 2} y={(subTop + subBottom) / 2 + 4} textAnchor="middle" fontSize={11} fontWeight={800} fill={C.ink} fontFamily={FONT}>or</text>

      <rect x={subX} y={82} width={subW} height={wallBottom - 82 + 6} rx={12} fill={C.tealSoft} stroke={C.teal} strokeWidth={1.5} />
      {SLOTS.map(([slot, pkgs], i) => {
        const sy = subTop + 8 + i * slotH;
        return (
          <g key={slot}>
            <rect x={subX + 10} y={sy} width={subW - 20} height={slotH - 8} rx={7} fill={C.paper} stroke={C.teal} strokeOpacity={0.5} />
            <text x={subX + 20} y={sy + 20} fontSize={12} fontWeight={700} fill={C.teal} fontFamily={FONT}>{slot}</text>
            <text x={subX + 20} y={sy + 36} fontSize={9.5} fill={C.ink} fontFamily={MONO} opacity={0.85}>{pkgs}</text>
          </g>
        );
      })}
      <text x={subX + subW / 2} y={wallBottom - 8} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.teal} fontFamily={FONT}>77 packages · 33 contracts · one identity</text>

      {/* tallies */}
      {(() => {
        const ty = wallBottom + 26;
        const cols = [
          [String(total), 'products'], ['7', 'seams'], ['3', 'identity models'], ['2', 'permission shapes'], ['3', 'evidence formats'], ['33', 'contracts to write or fork'],
        ] as const;
        const cw = (wallRight - left + 24) / cols.length;
        return (
          <g>
            {cols.map(([v, l], i) => (
              <g key={l}>
                <text x={left - 12 + i * cw + 10} y={ty + 22} fontSize={22} fontWeight={800} fill={C.rose} fontFamily={FONT}>{v}</text>
                <text x={left - 12 + i * cw + 10} y={ty + 38} fontSize={9.5} fill={C.muted} fontFamily={FONT}>{l}</text>
              </g>
            ))}
            {([['1', 'install'], ['0', 'seams'], ['1', 'identity'], ['1', 'grant'], ['1', 'trail']] as const).map(([v, l], i) => (
              <g key={l}>
                <text x={subX + 10 + i * (subW / 5)} y={ty + 22} fontSize={22} fontWeight={800} fill={C.teal} fontFamily={FONT}>{v}</text>
                <text x={subX + 10 + i * (subW / 5)} y={ty + 38} fontSize={9.5} fill={C.muted} fontFamily={FONT}>{l}</text>
              </g>
            ))}
          </g>
        );
      })()}

      <Brandline w={W} h={H} left="one identity, one grant mechanism, one evidence trail — the seams are designed out, not papered over" />
    </Frame>
  );
}
