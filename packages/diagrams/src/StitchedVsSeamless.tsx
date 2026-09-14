import { Arrow, Box, C, Frame, Label, Pill } from './primitives';

/**
 * TEN PRODUCTS OR ONE SUBSTRATE. On the left, the stack most teams assemble for an agentic application and the
 * glue between them — each seam a place where identity, permission and evidence change shape. On the right, the
 * same needs as slots in one model with one identity, one authority mechanism and one evidence trail.
 */
export function StitchedVsSeamless() {
  const id = 'stitch';
  const W = 1180, H = 640;
  const left = [
    { t: 'Auth0 / Okta', s: 'users, sessions' },
    { t: 'Safe multisig', s: 'org money' },
    { t: 'Postgres RBAC', s: 'roles, ACLs' },
    { t: 'Stripe + wallet SDK', s: 'payments' },
    { t: 'LangGraph', s: 'agent loop' },
    { t: 'Slack approvals', s: 'human in loop' },
    { t: 'LangSmith', s: 'traces' },
    { t: 'Vault / secrets', s: 'service keys' },
    { t: 'Directory / registry', s: 'find agents' },
    { t: 'MCP server + keys', s: 'tools' },
  ];
  const pos = left.map((_, i) => ({ x: 60 + (i % 2) * 210, y: 80 + Math.floor(i / 2) * 92 }));
  return (
    <Frame id={id} w={W} h={H} title="Stitched: ten products and the glue between them. Seamless: one substrate where identity, authority and evidence are one model.">
      <Label x={60} y={44} text="STITCHED — ten products, ten identity models, ten permission shapes" size={11} weight={700} tone="rose" />
      <Label x={640} y={44} text="SEAMLESS — one identity, one authority mechanism, one evidence trail" size={11} weight={700} tone="teal" />
      <line x1={560} y1={40} x2={560} y2={600} stroke={C.faint} strokeDasharray="6 5" />

      {/* left boxes */}
      {left.map((b, i) => (
        <Box key={b.t} x={pos[i]!.x} y={pos[i]!.y} w={180} h={56} title={b.t} lines={[b.s]} tone="slate" titleSize={12} lineSize={10} />
      ))}
      {/* glue: a tangle of dashed lines between boxes */}
      {[[0, 2], [0, 4], [1, 3], [2, 4], [2, 9], [3, 5], [4, 5], [4, 6], [4, 9], [5, 1], [7, 9], [7, 4], [8, 4], [8, 9], [6, 2], [0, 7], [1, 6], [3, 8]].map(([a, b], i) => {
        const A = pos[a!]!, B = pos[b!]!;
        // Leave from a different point of each box (an edge midpoint or a corner) so same-column pairs do not collapse
        // into one straight line; bow each curve sideways by an amount that varies with the pair.
        const ax = A.x + [20, 90, 160, 180, 0][i % 5]!, ay = A.y + [56, 56, 56, 28, 28][i % 5]!;
        const bx = B.x + [160, 20, 90, 0, 180][i % 5]!, by = B.y + [0, 0, 0, 28, 28][i % 5]!;
        const bow = ((i % 3) - 1) * 110 + (i % 2 ? 40 : -40);
        return <path key={i} d={`M ${ax} ${ay} C ${ax + bow} ${(ay + by) / 2}, ${bx - bow} ${(ay + by) / 2}, ${bx} ${by}`} fill="none" stroke={C.rose} strokeWidth={1} strokeDasharray="3 4" opacity={0.6} />;
      })}
      <rect x={60} y={548} width={470} height={44} rx={8} fill={C.roseSoft} stroke={C.rose} />
      <Label x={72} y={566} text="Every seam: a token becomes a role becomes a row becomes a log line." size={10.5} tone="rose" weight={600} />
      <Label x={72} y={582} text="Revocation waits for expiry. Evidence lives in five vendors. Nobody can answer “who acted?”" size={10.5} tone="rose" />

      {/* right: one substrate */}
      <rect x={620} y={70} width={520} height={470} rx={14} fill={C.tealSoft} stroke={C.teal} strokeWidth={1.5} />
      <Label x={640} y={96} text="THE SUBSTRATE" size={12} weight={700} tone="teal" />
      <Box x={640} y={110} w={230} h={74} title="Identity" lines={['Person · Organization · Service', 'Smart Agents; passkeys; names']} tone="paper" lineSize={10.5} />
      <Box x={890} y={110} w={230} h={74} title="Authority" lines={['delegations · caveats · mandates', 'custody policy · revocation']} tone="paper" lineSize={10.5} />
      <Box x={640} y={200} w={230} h={74} title="Harness" lines={['planner proposes, mandate', 'authorizes, receipt proves']} tone="paper" lineSize={10.5} />
      <Box x={890} y={200} w={230} h={74} title="Evidence" lines={['receipts · PROV-O · audit', 'in the owner\'s vault']} tone="paper" lineSize={10.5} />
      <Box x={640} y={290} w={230} h={74} title="Edge + A2A + MCP" lines={['admission first; agents and', 'tools as identities, not keys']} tone="paper" lineSize={10.5} />
      <Box x={890} y={290} w={230} h={74} title="Registry Kit + Discovery" lines={['your own registry; a public', 'KB projected from chain']} tone="paper" lineSize={10.5} />
      <Box x={640} y={380} w={230} h={74} title="Coordination" lines={['endeavors · plans · commitments', 'between agents']} tone="paper" lineSize={10.5} />
      <Box x={890} y={380} w={230} h={74} title="Ontology + Operations" lines={['terms bound by IRI; KMS delegates;', 'live gates; conformance']} tone="paper" lineSize={10.5} />
      {/* the one line that joins them */}
      <Arrow id={id} d="M 755 184 V 198" tone="teal" />
      <Arrow id={id} d="M 1005 184 V 198" tone="teal" />
      <Arrow id={id} d="M 755 274 V 288" tone="teal" />
      <Arrow id={id} d="M 1005 274 V 288" tone="teal" />
      <Arrow id={id} d="M 755 364 V 378" tone="teal" />
      <Arrow id={id} d="M 1005 364 V 378" tone="teal" />
      <Arrow id={id} d="M 870 147 H 888" tone="teal" />
      <Arrow id={id} d="M 870 237 H 888" tone="teal" />
      <Arrow id={id} d="M 870 327 H 888" tone="teal" />
      <Arrow id={id} d="M 870 417 H 888" tone="teal" />
      <Box x={640} y={470} w={480} h={54} title="One anchor: the Smart Agent address" lines={['Every layer reads and writes the same identity, the same grants, the same receipts.']} tone="teal" solid lineSize={10.5} />

      <rect x={620} y={548} width={520} height={44} rx={8} fill={C.tealSoft} stroke={C.teal} />
      <Label x={632} y={566} text="One question, answered everywhere: who acted, for whom, under what grant, with what limits?" size={10.5} tone="teal" weight={600} />
      <Label x={632} y={582} text="Revoke once, refused everywhere. Evidence travels with the owner. Standards you already know." size={10.5} tone="teal" />

      <Pill x={60} y={606} text="Same needs. One model instead of ten seams." tone="slate" />
      <Label x={W - 40} y={H - 12} text="agenticprimitives.dev" size={9.5} anchor="end" mono />
    </Frame>
  );
}
