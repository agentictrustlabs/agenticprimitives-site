// The brand site's content model. One typed source for the offerings, the "stitched vs seamless" crosswalk, the
// Game Night case study and the estate map — every page renders FROM this, so a claim is edited once.

export const SITE = {
  name: 'Agentic Primitives',
  url: 'https://agenticprimitives.dev',
  tagline: 'The trust substrate for agentic applications.',
  github: 'https://github.com/agentictrustlabs/agenticprimitives',
  npm: 'https://www.npmjs.com/org/agenticprimitives',
  contact: 'mailto:hello@agenticprimitives.dev',
} as const;

// ─── The three questions ──────────────────────────────────────────────────────────────────────────────────────

export interface Pillar { id: 'identity' | 'authority' | 'evidence'; question: string; title: string; body: string; proof: string }

export const PILLARS: readonly Pillar[] = [
  {
    id: 'identity',
    question: 'Who is acting?',
    title: 'Identity that survives the runtime',
    body: 'Every person, organization and service in your application is a Smart Agent — an on-chain account that can verify signatures, hold value and execute logic. Names, cards, registry entries and DID documents are projections of it, never the identity itself. Passkeys and keys rotate; the agent does not.',
    proof: 'ERC-4337 account · ERC-1271 signatures · typed names (.me .org .svc .treasury .workspace)',
  },
  {
    id: 'authority',
    question: 'May they do this?',
    title: 'Authority that is a grant, not a token',
    body: 'Permission to act is a delegation the principal signs, narrowed by caveats — a payee, a ceiling, one intent, a time window — and revocable in one transaction. It is verified before every step, again after every approval, and again on chain when value moves. No cached verdict ever authorizes an act after the authority behind it is gone.',
    proof: 'ERC-7710 delegations · caveat enforcers · intent-digest mandates · on-chain revocation',
  },
  {
    id: 'evidence',
    question: 'What did they do?',
    title: 'Evidence the owner carries',
    body: 'Every protected step leaves a receipt — which grant, which decision, which transaction, which playbook — into a hash-chained log and a W3C PROV-O graph held in the owner\'s vault, not in a vendor\'s trace store. A receipt travels because the owner carries it, and a counterparty can check it without the runtime\'s cooperation.',
    proof: 'PROV-O provenance · OpenTelemetry spans · hash-chained receipts · vault-resident records',
  },
];

// ─── The nine offerings (spec 351) ────────────────────────────────────────────────────────────────────────────

export interface Offering {
  id: string;
  name: string;
  oneLine: string;
  what: string;
  replaces: string[];
  packages: string[];
  standards: string[];
}

export const OFFERINGS: readonly Offering[] = [
  {
    id: 'identity',
    name: 'Identity',
    oneLine: 'One canonical agent per person, organization and service.',
    what: 'Smart Agent accounts with passkey control, credential recovery, typed on-chain names and signed agent cards. The address is canonical; everything else points at it.',
    replaces: ['Auth0 / Okta / Cognito', 'wallet-connect + a users table', 'a DID method of your own', 'a naming service'],
    packages: ['agent-account', 'identity-auth', 'agent-naming', 'agent-profile', 'key-custody', 'browser-identity'],
    standards: ['ERC-4337', 'ERC-1271', 'WebAuthn / passkeys', 'OIDC + FedCM', 'W3C DID'],
  },
  {
    id: 'authority',
    name: 'Authority',
    oneLine: 'Scoped, revocable grants between agents — the core primitive.',
    what: 'Delegations with caveats, intent-bound mandates, custody policy (thresholds, guardians, recovery) and entitlement resolution. A person delegates to an organization; an organization to a service; a service to a bounded session key.',
    replaces: ['RBAC / ACL tables', 'OAuth scopes as permissions', 'Safe-style multisig', 'session-key managers'],
    packages: ['delegation', 'custody', 'entitlements', 'tool-policy', 'delegated-signer'],
    standards: ['ERC-7710', 'ERC-7579 modules', 'EIP-712', 'ERC-6492'],
  },
  {
    id: 'harness',
    name: 'Harness',
    oneLine: 'Ask → Intent → Mandate → Plan → Verify → Receipt.',
    what: 'An authority-aware agent loop: the planner proposes, the mandate authorizes, the executor acts, the receipt proves. Durable runs, streamed progress, parallel read steps, schedule and message triggers, per-run bills.',
    replaces: ['LangGraph / MAF / CrewAI wiring', 'a human-in-the-loop click UI', 'Temporal for approvals'],
    packages: ['harness', 'orchestration', 'orchestration-anthropic', 'context', 'a2a'],
    standards: ['A2A 1.0 (TCK-green)', 'MCP', 'Agent Skills (SKILL.md)'],
  },
  {
    id: 'edge',
    name: 'Edge',
    oneLine: 'Admission at the boundary — HTTPS required, mTLS optional, authority always.',
    what: 'A2A over HTTPS with application authentication, canonical identity resolution and an admission stage that no transport evidence can skip. Private MCP behind admitted runtimes; public MCP only as labelled interop.',
    replaces: ['API gateways with bespoke auth plugins', 'service-mesh identity as authorization'],
    packages: ['admission', 'edge-cloudflare', 'mcp-oauth', 'mcp-runtime', 'rate-control'],
    standards: ['A2A over HTTPS', 'RFC 9728', 'OAuth 2.1 (ingress only)', 'SPIFFE (optional binding)'],
  },
  {
    id: 'registry',
    name: 'Registry Kit',
    oneLine: 'Build your own registry; be what registries are built from.',
    what: 'SA-anchored registry contracts with pluggable admission hooks, admission receipts, a lifecycle log, signed agent cards, discovery projections (A2A card, ARD, ACP registry) and a public knowledge base projected only from chain state.',
    replaces: ['a hosted agent directory you rent', 'ERC-8004 / ANS / DNS bridges you maintain'],
    packages: ['registry-kit', 'registry-resolution', 'discovery', 'intent-resolver', 'agent-resolution'],
    standards: ['ARD v0.91', 'ACP registry', 'A2A Agent Card', 'SPARQL / RDF'],
  },
  {
    id: 'evidence',
    name: 'Evidence',
    oneLine: 'Receipts, provenance and audit that outlive the platform.',
    what: 'Verification receipts bound to intent + mandate + step + playbook digest; PROV-O graphs with a trace-context spine; append-only audit with forensics tooling; verifiable credentials for claims.',
    replaces: ['LangSmith / Langfuse as the record', 'application audit tables', 'a credentials vendor'],
    packages: ['provenance', 'verifiable-credentials', 'capability-claims', 'audit', 'attestations'],
    standards: ['W3C PROV-O', 'W3C VC 2.0', 'W3C Trace Context', 'OpenTelemetry'],
  },
  {
    id: 'coordination',
    name: 'Coordination',
    oneLine: 'Work between agents: endeavors, plans, commitments, decisions.',
    what: 'A durable Endeavor with a shared plan, participants found through discovery at the capability level, signed contribution commitments against an exact plan revision, decisions and rules. Never confused with in-agent orchestration.',
    replaces: ['a project tool bolted to a chat tool', 'workflow engines as the source of truth'],
    packages: ['coordination', 'intent-engagement', 'fabric', 'content-storage'],
    standards: ['PROV-O plans', 'ERC-8001-shaped commitments', 'ValueFlows'],
  },
  {
    id: 'ontology',
    name: 'Ontology',
    oneLine: 'How the domain is shaped — bound by IRI, checked at build.',
    what: 'A formal vocabulary for agents, credentials, custody, delegation, organizations, interactions and provenance. Vault records are ontology-shaped; behaviour is generated from the model; a gate fails the build when code invents a term.',
    replaces: ['prompt-resident domain rules', 'app tables that disagree with each other'],
    packages: ['ontology', 'types', 'surface-catalog'],
    standards: ['RDF / OWL / SHACL', 'PROV-O', 'JSON-LD'],
  },
  {
    id: 'operations',
    name: 'Operations',
    oneLine: 'Run it: KMS delegates, deploy recipes, live gates, conformance.',
    what: 'Service keys as revocable delegates (never the identity), budget-routed model selection, live verification gates that run nightly against the real estate, `ap conform` for A2A and MCP.',
    replaces: ['a secrets sprawl you audit by hand', 'a QA suite that only runs on mocks'],
    packages: ['ap-kms', 'chain-state', 'chain-state-viem', 'evaluation'],
    standards: ['GCP / AWS KMS', 'A2A TCK', 'MCP conformance'],
  },
];

// ─── Stitched vs seamless ──────────────────────────────────────────────────────────────────────────────────────

export interface Need { need: string; stitched: string; seamless: string; why: string }

export const NEEDS: readonly Need[] = [
  { need: 'Sign people in', stitched: 'Auth0 / Okta / Cognito + a users table', seamless: 'The Home: passkey sign-in to a Person Smart Agent; OIDC + delegation in one ceremony', why: 'OIDC answers who; delegation answers what the app may do. One screen, both answers.' },
  { need: 'Represent the organization', stitched: 'A tenants table + a Safe multisig + an admin role', seamless: 'An Organization Smart Agent with custody policy and stewardship', why: 'The org can sign, hold, delegate and be audited as one actor.' },
  { need: 'Let a service act for you', stitched: 'A service account with a long-lived secret and broad scopes', seamless: 'A Service Agent whose key is a revocable delegate of its identity', why: 'Compromise a key, lose a delegate — never the identity.' },
  { need: 'Hold and move money', stitched: 'Stripe Connect + a wallet SDK + a ledger you write', seamless: 'A Treasury Service Agent; payments under caveated mandates; receipts on chain', why: 'A payment is authorized by the person who owns the funds, for that payee, up to that ceiling.' },
  { need: 'Run an AI agent safely', stitched: 'LangGraph + a permission prompt + a Slack approval bot', seamless: 'The harness: planner proposes, mandate authorizes, executor acts, receipt proves', why: 'A hijacked planner can be creative; it cannot exceed the caveats.' },
  { need: 'Let agents talk to each other', stitched: 'REST webhooks + API keys per partner', seamless: 'A2A 1.0 over HTTPS with admission; every message signed by an agent', why: 'The counterparty is an identity, not an endpoint.' },
  { need: 'Give agents tools and data', stitched: 'An MCP server with an API key in the config', seamless: 'Private MCP behind admitted runtimes; vault records under per-record delegation', why: 'The bearer is an envelope; the chain is the authority.' },
  { need: 'Find agents and services', stitched: 'A hand-kept directory or a vendor registry', seamless: 'Registry Kit: your own registry with admission hooks; public KB projected from chain', why: 'Many registries will exist. Be what they are built from.' },
  { need: 'Prove what happened', stitched: 'Application logs + a tracing vendor + screenshots', seamless: 'Receipts + PROV-O provenance in the owner\'s vault, cited by the trace', why: 'Evidence belongs to the agent, not the platform.' },
  { need: 'Keep private records', stitched: 'Postgres with row-level security you maintain', seamless: 'Per-agent vaults with per-record delegation scope', why: 'Records the owner can carry to another Home.' },
];

// ─── The Game Night case study ─────────────────────────────────────────────────────────────────────────────────

export interface Requirement { id: string; need: string; stitched: string; built: string; primitive: string; offering: Offering['id'] }

export const GAME_NIGHT = {
  name: 'Game Night',
  url: 'https://gamenight.faithnet.io',
  repo: 'https://github.com/agentictrustlabs/pokernight',
  tagline: 'A card room where people and AI agents sit at the same table — and every chip is authorized, settled and receipted by the substrate.',
  summary:
    'Game Night is a Texas Hold\'em and Canasta card room on the faithnet estate. It is a third-party application: it imports the published @agenticprimitives packages, signs people in through the estate\'s Home, and never holds a player\'s keys. It exists to be played — and to exercise every layer of the substrate end to end, for play money.',
  status: 'Testing deployment. Sheqel (SHQ) is a test coin with an open mint; nothing here is a wager.',
  stats: [
    { label: 'Games', value: '2', note: 'Hold\'em (staked) · Canasta (scored)' },
    { label: 'Agent kinds at the table', value: '4', note: 'person · AI player · house treasury · club workspace' },
    { label: 'App-owned contracts', value: '1', note: 'Sheqel — the rest is the platform\'s' },
    { label: 'Player keys held by the house', value: '0', note: 'every buy-in is the player\'s own mandate' },
  ],
  requirements: [
    { id: 'signin', need: 'People sign in with a passkey and are known by a name', stitched: 'Auth0 + a users table + a display-name column', built: 'Home OIDC (PKCE) → session; the player is `alice.me`', primitive: 'Person Smart Agent · typed name · Home ceremony', offering: 'identity' },
    { id: 'treasury', need: 'A player has money that is theirs, not the house\'s', stitched: 'A custodial balance in Postgres, or a hot wallet per player that you hold', built: 'A `.treasury` Service Agent chartered under the person at their Home; one per player', primitive: 'Service Agent · charteredUnder · custody policy', offering: 'identity' },
    { id: 'mandate', need: 'The house may take a buy-in — only this payee, only up to this much, only in this coin', stitched: 'A saved payment method + a max-amount check in application code', built: 'A buy-in mandate the player signs: payee = house treasury, value ceiling, asset pinned, time-bounded', primitive: 'ERC-7710 delegation · caveat enforcers · intent digest', offering: 'authority' },
    { id: 'house', need: 'The house signs settlements without holding an identity key on a server', stitched: 'A private key in an environment variable, signing as the house forever', built: '`pokernight.treasury` signs with a KMS delegate under a session wire; revocable from the Home', primitive: 'delegated-signer · ap-kms · session wire', offering: 'operations' },
    { id: 'currency', need: 'An app-specific currency', stitched: 'An ERC-20 — the one thing you would write either way', built: '`Sheqel`, a parameterised ERC-20 — the only contract the app owns', primitive: 'the app\'s own contract beside the platform\'s', offering: 'authority' },
    { id: 'ai-players', need: 'AI players sit at the same tables as people', stitched: 'Bot accounts with API keys and a bespoke bot protocol', built: '`.svc` agents advertise `poker.act` / `canasta.act`; the table asks each turn over A2A', primitive: 'A2A AgentSkill · standard surface · admission', offering: 'edge' },
    { id: 'clubs', need: 'A club with a roster, but the card room keeps no member list', stitched: 'A members table + an invite-codes table + an admin role', built: 'A club is a `.workspace` Smart Agent at the Home; membership lives in its vault; the room holds only a wire', primitive: 'workspace agent · vault records · membership situations', offering: 'coordination' },
    { id: 'coach', need: 'Your own agent coaches your hand — and pays for its own tokens', stitched: 'An LLM call with the whole table state in the prompt, billed to the house', built: 'The person\'s agent, with a study grant, runs the coach playbook from the skills registry', primitive: 'harness · playbook by digest · scoped grant', offering: 'harness' },
    { id: 'missions', need: 'A mission organization can be a game\'s guest — vetted, not just listed', stitched: 'An allow-list in a config file, edited by hand', built: 'A kit-built registry `urn:ap:registry:gamenight-missions`; the org self-registers, the operator admits', primitive: 'registry-kit · admission receipts · covenant signed by the steward', offering: 'registry' },
    { id: 'receipts', need: 'Every hand replays; every chip movement has a receipt', stitched: 'Application logs + a hand-history table you hope nobody edits', built: 'Seeded shuffle with commit–reveal; on-chain settlement receipts per buy-in and cash-out', primitive: 'provenance · receipts · vault-resident records', offering: 'evidence' },
  ] satisfies readonly Requirement[],
  flow: [
    { step: 'Sign in', actor: 'Alice', where: 'Home (faithnet.me)', what: 'Passkey → OIDC code → the card room mints a session for `alice.me`' },
    { step: 'Get ready', actor: 'Alice', where: 'Home', what: 'Charter `alice.treasury`; seed the play coin; sign the buy-in mandate (payee, ceiling, coin)' },
    { step: 'Sit down', actor: 'Table', where: 'Cloudflare Durable Object', what: 'The table verifies the mandate is live, then asks the house treasury to settle the buy-in' },
    { step: 'Settle', actor: 'House treasury', where: 'faithchain', what: 'KMS delegate signs under its wire; the caveat enforcers check payee, value and time on chain; a receipt lands' },
    { step: 'Play', actor: 'Everyone', where: 'Table', what: 'People act over WebSocket; AI players are asked over A2A in their own game\'s skill; hands replay byte-identically' },
    { step: 'Coach', actor: 'Alice\'s agent', where: 'Agent runtime', what: 'Under a study grant it reads only what her seat sees and offers a move — checked against the rules before a button is drawn' },
    { step: 'Cash out', actor: 'Table → House', where: 'faithchain', what: 'The cash-out settles from the house to Alice\'s treasury; the row and the receipt are hers' },
    { step: 'Revoke', actor: 'Alice', where: 'Home', what: 'One transaction revokes the mandate; the next buy-in is refused everywhere, with no list to update' },
  ],
} as const;

// ─── The estate (where things run) ────────────────────────────────────────────────────────────────────────────

export interface EstateNode { id: string; name: string; host: string; role: string; runs: string }

export const ESTATE: readonly EstateNode[] = [
  { id: 'home', name: 'Home', host: 'www.faithnet.me', role: 'Passkeys · OIDC · ceremonies · vault UI', runs: 'Next.js on Vercel' },
  { id: 'a2a', name: 'Agent runtime', host: 'a2a.faithnet.io', role: 'A2A tasks · harness · playbooks', runs: 'Cloudflare Workers + Durable Objects' },
  { id: 'mcp', name: 'Vault (MCP)', host: 'private', role: 'Per-agent encrypted records under delegation', runs: 'Cloudflare Workers' },
  { id: 'edge', name: 'Edge', host: 'edge.faithnet.io', role: 'Admission · standard A2A surface', runs: 'Cloudflare Workers' },
  { id: 'discovery', name: 'Discovery', host: 'discovery.faithnet.io', role: 'Public KB · ARD · ACP registry', runs: 'Workers + GraphDB' },
  { id: 'skills', name: 'Skills registry', host: 'skills.faithnet.io', role: 'Playbooks compiled by digest', runs: 'Cloudflare Workers' },
  { id: 'chain', name: 'faithchain', host: 'rpc.faithnet.io', role: 'Accounts · delegations · receipts', runs: 'Besu QBFT L1 · chain 34348 · 2s blocks' },
  { id: 'app', name: 'Your app', host: 'gamenight.faithnet.io', role: 'Relying app: OIDC client + A2A caller', runs: 'Anything that speaks HTTPS' },
];

// ─── Audiences ─────────────────────────────────────────────────────────────────────────────────────────────────

export const AUDIENCES = [
  { who: 'Product & business leads', want: 'One platform decision instead of ten vendor integrations, and a story your auditors accept.', get: 'Identity, authority and evidence designed as one system; a reference application you can play today.' },
  { who: 'Architects & platform teams', want: 'Primitives that compose, standards you already know, no framework lock-in.', get: 'Publishable packages with one-directional boundaries, Foundry contracts, A2A/MCP conformance, live gates.' },
  { who: 'Security & compliance', want: '“Who acted, on behalf of whom, under what grant, with which limits?” — answerable for every action.', get: 'On-chain revocation at every gate, receipts bound to intent + mandate, PROV-O graphs the owner holds.' },
] as const;
