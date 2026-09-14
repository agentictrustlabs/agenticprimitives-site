import { Arrow, Box, Brandline, C, Frame, Kicker, Pill } from './primitives';

/**
 * TEN PRODUCTS OR ONE SUBSTRATE. On the left, the stack most teams assemble for an agentic application and the
 * glue between them — each seam a place where identity, permission and evidence change shape. On the right, the
 * same needs as slots in one model with one identity, one authority mechanism and one evidence trail.
 */
export function StitchedVsSeamless() {
  const id = 'stitch';
  const W = 1200, H = 660;
  const left = [
    { t: 'Auth0 / Okta', s: 'users, sessions' },
    { t: 'Safe multisig', s: 'org money' },
    { t: 'Postgres RBAC', s: 'roles, ACLs' },
    { t: 'Stripe + wallet SDK', s: 'payments' },
    { t: 'LangGraph', s: 'agent loop' },
    { t: 'Slack approvals', s: 'human in loop' },
    { t: 'LangSmith', s: 'traces' },
    { t: 'Vault / secrets', s: 'service keys' },
    { t: 'Directory', s: 'find agents' },
    { t: 'MCP server + keys', s: 'tools' },
  ];
  const pos = left.map((_, i) => ({ x: 48 + (i % 2) * 226, y: 84 + Math.floor(i / 2) * 92 }));
  const rx = 620, rw = 548;
  return (
    <Frame id={id} w={W} h={H} title="Stitched: ten products and the glue between them. Seamless: one substrate where identity, authority and evidence are one model.">
      <Kicker x={48} y={48} text="Stitched — ten products, ten identity models, ten permission shapes" tone="rose" />
      <Kicker x={rx} y={48} text="Seamless — one identity, one authority mechanism, one evidence trail" tone="teal" />
      <line x1={572} y1={40} x2={572} y2={620} stroke={C.faint} strokeDasharray="6 5" />

      {/* glue */}
      {[[0, 2], [0, 4], [1, 3], [2, 4], [2, 9], [3, 5], [4, 5], [4, 6], [4, 9], [5, 1], [7, 9], [7, 4], [8, 4], [8, 9], [6, 2], [0, 7], [1, 6], [3, 8]].map(([a, b], i) => {
        const A = pos[a!]!, B = pos[b!]!;
        const ax = A.x + [20, 100, 180, 200, 0][i % 5]!, ay = A.y + [60, 60, 60, 30, 30][i % 5]!;
        const bx = B.x + [180, 20, 100, 0, 200][i % 5]!, by = B.y + [0, 0, 0, 30, 30][i % 5]!;
        const bow = ((i % 3) - 1) * 120 + (i % 2 ? 40 : -40);
        return <path key={i} d={`M ${ax} ${ay} C ${ax + bow} ${(ay + by) / 2}, ${bx - bow} ${(ay + by) / 2}, ${bx} ${by}`} fill="none" stroke={C.rose} strokeWidth={1.1} strokeDasharray="3 4" opacity={0.55} />;
      })}
      {left.map((b, i) => (
        <Box key={b.t} x={pos[i]!.x} y={pos[i]!.y} w={200} h={60} title={b.t} lines={[b.s]} tone="slate" titleSize={13} lineSize={11} />
      ))}
      <Box x={48} y={556} w={474} h={58} tone="rose" lines={['Every seam: a token becomes a role becomes a row becomes a log line.', 'Revocation waits for expiry. Evidence lives in five vendors. Nobody can answer “who acted?”']} lineSize={11.5} />

      {/* right */}
      <rect x={rx} y={70} width={rw} height={470} rx={16} fill={C.tealSoft} stroke={C.teal} strokeWidth={1.5} />
      <Kicker x={rx + 20} y={98} text="the substrate" tone="teal" />
      {[
        ['Identity', 'Person · Organization · Service', 'Smart Agents · passkeys · names'],
        ['Authority', 'delegations · caveats · mandates', 'custody policy · revocation'],
        ['Harness', 'planner proposes · mandate', 'authorizes · receipt proves'],
        ['Evidence', 'receipts · PROV-O · audit', 'in the owner’s vault'],
        ['Edge · A2A · MCP', 'admission first; agents and', 'tools as identities, not keys'],
        ['Registry Kit', 'your own registry; a public', 'KB projected from chain'],
        ['Coordination', 'endeavors · plans · commitments', 'between agents'],
        ['Ontology · Ops', 'terms bound by IRI · KMS', 'delegates · live gates'],
      ].map(([t, a, b], i) => {
        const col = i % 2, row = Math.floor(i / 2);
        const x = rx + 20 + col * 258, y = 112 + row * 88;
        return <Box key={t} x={x} y={y} w={238} h={72} title={t} variant="header" tone="teal" lines={[a!, b!]} titleSize={12.5} lineSize={11} />;
      })}
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <Arrow id={id} d={`M ${rx + 139} ${184 + r * 88} V ${196 + r * 88}`} tone="teal" width={1.5} />
          <Arrow id={id} d={`M ${rx + 397} ${184 + r * 88} V ${196 + r * 88}`} tone="teal" width={1.5} />
        </g>
      ))}
      <Box x={rx + 20} y={468} w={496} h={56} title="One anchor: the Smart Agent address" lines={['Every layer reads and writes the same identity, the same grants, the same receipts.']} tone="teal" solid align="middle" lineSize={11.5} />
      <Box x={rx} y={556} w={rw} h={58} tone="teal" lines={['One question, answered everywhere: who acted, for whom, under what grant, with what limits?', 'Revoke once, refused everywhere. Evidence travels with the owner. Standards you already know.']} lineSize={11.5} />

      <Pill x={48} y={H - 34} text="Same needs. One model instead of ten seams." tone="slate" />
      <Brandline w={W} h={H} />
    </Frame>
  );
}
