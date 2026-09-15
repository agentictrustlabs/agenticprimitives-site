// The Versus area's content — sourced from the repository's maintained comparisons:
//   docs/architecture/agentic-framework-competitive-analysis.md            (the agent-framework field)
//   docs/architecture/product-comparison/web3-agent-substrate-landscape.md  (the Web3 / trust-substrate field)
//   README.md §"What it replaces" · §"How this compares" · §"Where we lose today"
// Every claim here should be traceable to one of those; when they change, this changes.

// ─── The product wall: what you would BUY and WIRE to build an agentic solution without the substrate ─────────
// One realistic pick per need (alternatives in `or`), grouped by the identity model / permission shape / evidence
// format it drags in. Thirty products. Every band boundary is a seam where identity changes shape.

export interface WallProduct { name: string; need: string; or: string; packages: readonly string[] }
export interface WallBand { band: string; brings: string; products: readonly WallProduct[] }

export const PRODUCT_WALL: readonly WallBand[] = [
  {
    band: 'Sign-in and identity',
    brings: 'identity model #1 — a user id in a vendor\u2019s directory',
    products: [
      { name: 'Auth0', need: 'login, SSO, MFA', or: 'Okta · Clerk · Cognito', packages: ['connect-auth', 'connect', 'connect-client', 'fedcm-rp', 'fedcm-idp'] },
      { name: 'Privy', need: 'embedded wallets', or: 'Dynamic · Web3Auth', packages: ['browser-identity'] },
      { name: 'WorkOS', need: 'organizations, members, roles', or: 'Okta groups · your own tables', packages: ['organization', 'situations'] },
    ],
  },
  {
    band: 'Accounts, keys and custody',
    brings: 'identity model #2 — a wallet address, joined to the user id by a table you write',
    products: [
      { name: 'Safe', need: 'smart accounts, multisig', or: 'ZeroDev · Alchemy Account Kit', packages: ['agent-account', 'contracts'] },
      { name: 'Pimlico', need: 'bundler, sponsored gas', or: 'Alchemy Gas Manager · Biconomy', packages: ['agent-account'] },
      { name: 'Turnkey', need: 'key management, signing policy', or: 'Fireblocks · a cloud KMS console', packages: ['key-custody', 'ap-kms', 'delegated-signer'] },
      { name: 'Argent-style guardians', need: 'recovery, trustees', or: 'a Safe recovery module', packages: ['account-custody'] },
    ],
  },
  {
    band: 'Permissions and delegation',
    brings: 'permission shape #1 — roles and policies in a database; shape #2 — session keys on chain; nothing joins them',
    products: [
      { name: 'MetaMask Delegation Toolkit', need: 'scoped agent authority on chain', or: 'Smart Sessions · Lit Vincent', packages: ['delegation', 'chain-state', 'chain-state-viem'] },
      { name: 'Cerbos', need: 'policy engine, per-call decisions', or: 'OPA · Permit.io · Cedar', packages: ['tool-policy', 'agentic-authorization'] },
      { name: 'OpenFGA', need: 'fine-grained data access', or: 'Okta FGA · ABAC in the app', packages: ['entitlements', 'key-authorization'] },
      { name: 'HashiCorp Vault', need: 'secrets, key release', or: 'AWS Secrets Manager', packages: ['key-authorization', 'vault-authority'] },
    ],
  },
  {
    band: 'Private data and credentials',
    brings: 'the third copy of every identity — as a row key, a DID and a credential subject',
    products: [
      { name: 'Postgres + RLS', need: 'private records per user', or: 'Inrupt Solid · an encrypted store', packages: ['vault', 'related-agents', 'privacy-credentials'] },
      { name: 'Veramo', need: 'verifiable credentials', or: 'SpruceID · walt.id', packages: ['verifiable-credentials', 'capability-claims', 'geo-features', 'agent-skills'] },
      { name: 'EAS', need: 'attestations', or: 'Verax', packages: ['attestations'] },
      { name: 'DocuSign', need: 'bilateral agreements', or: 'a signatures table', packages: ['agreements'] },
      { name: 'Box', need: 'content library, sharing', or: 'SharePoint · Drive · Notion', packages: ['content-storage', 'content-primitives'] },
    ],
  },
  {
    band: 'Agent runtime and protocols',
    brings: 'authority as application code — a callback the framework calls if the code remembers to',
    products: [
      { name: 'LangGraph', need: 'the agent loop', or: 'MAF · ADK · OpenAI Agents SDK', packages: ['orchestration', 'orchestration-anthropic', 'orchestration-openai-compat', 'harness', 'context', 'service-agent'] },
      { name: 'Temporal', need: 'durable workflows, approvals', or: 'Dapr · Restate', packages: ['fulfillment', 'coordination', 'collaboration'] },
      { name: 'MCP SDK + custom auth', need: 'tools and data for agents', or: 'an MCP gateway (Permit · Cerbos)', packages: ['mcp-protocol', 'mcp-runtime', 'mcp-oauth'] },
      { name: 'a2a-js + a task store', need: 'agent-to-agent calls', or: 'REST webhooks + API keys', packages: ['a2a', 'acp', 'runtime-member'] },
      { name: 'XMTP', need: 'agent messaging, inbox', or: 'Matrix · Nostr', packages: ['fabric'] },
      { name: 'Stripe', need: 'payments, escrow, recurring', or: 'x402 · AP2', packages: ['payments', 'intent-engagement', 'intent-marketplace', 'intent-resolver'] },
    ],
  },
  {
    band: 'Edge, naming and discovery',
    brings: 'reachability mistaken for authority — an API key at the gateway, a row in a registry',
    products: [
      { name: 'Kong', need: 'admission, rate limits, quotas', or: 'Zuplo · an API gateway', packages: ['admission', 'edge-runtime', 'edge-cloudflare', 'rate-control', 'rate-control-cloudflare', 'surface-catalog'] },
      { name: 'ENS', need: 'names', or: 'Unstoppable · GoDaddy ANS · LF ANS', packages: ['agent-naming', 'registry-resolution'] },
      { name: 'an ERC-8004 registry', need: 'discovery, agent cards', or: 'AGNTCY directory · a hand-kept list', packages: ['registry-kit', 'agent-profile', 'agent-relationships', 'identity-directory', 'identity-directory-adapters', 'home'] },
      { name: 'Tailscale', need: 'private reachability', or: 'DNTLS · a VPN', packages: ['agent-resolution'] },
    ],
  },
  {
    band: 'Evidence, vocabulary and tooling',
    brings: 'evidence format #1 spans · #2 log lines · #3 attestations — joined by ids you invent',
    products: [
      { name: 'Datadog', need: 'tracing, audit, evals', or: 'LangSmith · Langfuse · OpenTelemetry + a backend', packages: ['audit', 'provenance', 'verification-receipts', 'witness', 'evaluation'] },
      { name: 'TopBraid', need: 'a shared vocabulary, schemas', or: 'a hand-rolled types repo', packages: ['types', 'ontology'] },
      { name: 'create-next-app + a wiki', need: 'scaffolding, conventions, CI checks', or: 'a template repo', packages: ['create-app', 'devkit'] },
    ],
  },
];

export const PRODUCT_WALL_COUNT = PRODUCT_WALL.reduce((n, b) => n + b.products.length, 0);

// ─── The composition: eight concerns, who is there, what we ship for each ─────────────────────────────────────

export type Presence = 'full' | 'partial' | 'none';

export interface ConcernRow {
  concern: string;
  short: string;
  /** Presence per peer family, in FAMILIES order. */
  field: readonly Presence[];
  peers: string;
  ahead: string;
  packages: readonly string[];
  contracts: readonly string[];
}

export const FAMILIES = [
  { id: 'frameworks', name: 'Agent frameworks', short: 'frameworks', who: 'MAF · ADK · LangGraph · Dapr · Agno · Strands · Mastra · Pydantic · CrewAI · OpenAI SDK' },
  { id: 'iam', name: 'Web2 IAM for agents', short: 'IAM', who: 'Auth0 · Okta XAA · Entra Agent ID · AWS AgentCore · Permit · Cerbos' },
  { id: 'wallets', name: 'Smart accounts + delegation', short: 'wallets', who: 'MetaMask DTK · Smart Sessions · Lit Vincent · Safe · Zodiac · Coinbase · Turnkey · Kite' },
  { id: 'ercs', name: 'The ERC agent stack', short: 'ERCs', who: 'ERC-8004 · 8001 · 8183 · 8196 · 8273 · 8226 · 8257' },
  { id: 'registries', name: 'Registries + discovery', short: 'registries', who: 'ERC-8004 · AGNTCY · NANDA · LF ANS · HCS-10 · Visa TAP' },
  { id: 'data', name: 'Data + provenance', short: 'data', who: 'Inrupt Solid · PROV-AGENT / Flowcept · OTel GenAI · EAS' },
] as const;

export const CONCERNS: readonly ConcernRow[] = [
  {
    concern: 'Canonical identity is a smart account',
    short: 'identity = account',
    field: ['none', 'partial', 'full', 'full', 'partial', 'none'],
    peers: 'ERC-8004 identity registry (live on 30+ mainnets), Kite Passport, Catena ACK-ID, Coinbase / Crossmint / Turnkey agent wallets, Entra Agent ID (a service-principal subtype).',
    ahead: 'ERC-8004 on footprint and tooling. Nobody on the class model: one address for a person, an organization and a service, surviving credential rotation.',
    packages: ['agent-account', 'account-custody', 'key-custody', 'ap-kms', 'delegated-signer', 'browser-identity'],
    contracts: ['AgentAccount', 'AgentAccountFactory', 'CustodyPolicy', 'UniversalSignatureValidator', 'P256Verifier', 'WebAuthnLib', 'SmartAgentPaymaster'],
  },
  {
    concern: 'Person · organization · service, as classes',
    short: 'the trichotomy',
    field: ['none', 'partial', 'none', 'none', 'none', 'none'],
    peers: 'Entra Agent ID blueprints (≈ archetype + identity, tenant-bound), Hats Protocol roles, Aragon OSx permissions, ACK-ID owner→agent credentials.',
    ahead: 'Nobody. PROV-O\u2019s trichotomy mirrored on chain as atl:agentType, with Treasury / Team / Workspace / Registry as DERIVED types named by a suffix.',
    packages: ['types', 'ontology', 'organization', 'situations', 'agent-naming', 'registry-resolution'],
    contracts: ['AgentNameRegistry', 'PermissionlessSubregistry (×10 typed)', 'AgentNameUniversalResolver', 'AgentNameAttributeResolver', 'OntologyTermRegistry', 'AttributeStorage'],
  },
  {
    concern: 'Delegation with caveats, revocable on chain',
    short: 'the grant',
    field: ['none', 'none', 'full', 'full', 'none', 'none'],
    peers: 'MetaMask DTK (7710 + 7715), Rhinestone / Biconomy Smart Sessions, Lit Vincent policies, Zodiac Roles v2, Safe Policy Engine, ERC-8196, ERC-8226, Kite delegation tokens.',
    ahead: 'DTK on wallet-distributed grant UX; Smart Sessions on a productized session module. We are 7710 wire-compatible and add the intent digest they do not have.',
    packages: ['delegation', 'tool-policy', 'chain-state', 'chain-state-viem', 'agentic-authorization', 'entitlements', 'key-authorization'],
    contracts: ['DelegationManager', 'AllowedTargetsEnforcer', 'AllowedMethodsEnforcer', 'ValueEnforcer', 'TimestampEnforcer', 'CallDataHashEnforcer', 'PaymentEnforcer', 'QuorumEnforcer', 'DigestBindingEnforcer', 'ApprovedHashRegistry'],
  },
  {
    concern: 'An agent loop that re-verifies every step against a mandate',
    short: 'the harness',
    field: ['partial', 'partial', 'partial', 'partial', 'none', 'none'],
    peers: 'ERC-8273 attestation-gated actions (actionDigest, one tx), Vincent ability execution, Strands interventions + Cedar, Dapr / Permit / Cerbos per-call hooks, Turnkey policy in an enclave.',
    ahead: 'Nobody has a planner-level mandate. ERC-8273 is the nearest on-chain shape to DigestBindingEnforcer — as a draft. The Web2 gateways gate per call on tokens, never on a signed intent.',
    packages: ['harness', 'orchestration', 'orchestration-anthropic', 'orchestration-openai-compat', 'service-agent', 'context', 'a2a'],
    contracts: ['DigestBindingEnforcer', 'DelegationManager', 'QuorumEnforcer'],
  },
  {
    concern: 'Mandates, commerce, coordination between agents',
    short: 'engagement',
    field: ['partial', 'none', 'partial', 'full', 'none', 'none'],
    peers: 'Google AP2 (mandates as VCs, FIDO-governed), OpenAI / Stripe ACP, x402 (Linux Foundation), Virtuals ACP on ERC-8183 (12M memos), ERC-8001 (Final), Olas Mech Marketplace, Catena ACK-Pay.',
    ahead: 'AP2 on governance and partners; x402 on volume; Virtuals on live agent-to-agent commerce. An AP2 mandate is a signed document a merchant checks; ours is a delegation verified on chain per step.',
    packages: ['intent-engagement', 'intent-marketplace', 'intent-resolver', 'coordination', 'collaboration', 'payments', 'fulfillment', 'agreements', 'acp'],
    contracts: ['PaymentEscrow', 'PaymentReceiptRegistry', 'AgreementRegistry', 'PaymentEnforcer'],
  },
  {
    concern: 'Private records under per-record delegation',
    short: 'the vault',
    field: ['none', 'partial', 'none', 'none', 'none', 'full'],
    peers: 'Inrupt ESS 3.0 (Solid pods; access grants as VCs with purpose; an MCP resource service where approval is deliberately not a tool), Auth0 Token Vault + FGA.',
    ahead: 'Inrupt — shipped, enterprise-deployed, RDF-native. Nobody else pairs per-record scope with an on-chain principal and on-chain revocation.',
    packages: ['vault', 'vault-authority', 'mcp-runtime', 'mcp-protocol', 'mcp-oauth', 'related-agents', 'privacy-credentials', 'content-storage', 'content-primitives'],
    contracts: ['DelegationManager', 'AllowedMethodsEnforcer', 'AttributeStorage', 'ShapeRegistry'],
  },
  {
    concern: 'Provenance the principal owns',
    short: 'the receipt',
    field: ['partial', 'none', 'none', 'partial', 'none', 'full'],
    peers: 'PROV-AGENT / ORNL Flowcept (W3C PROV for agents, open source), OpenTelemetry GenAI conventions (still Development), ERC-8263 inference attestations, EAS notaries, ERC-8196 hash-chained audit.',
    ahead: 'Flowcept on capture tooling; OTel on adoption. Nobody anchors PROV in the principal\u2019s vault or ties a prov:Activity to a signed mandate.',
    packages: ['provenance', 'verification-receipts', 'witness', 'attestations', 'audit', 'evaluation', 'verifiable-credentials', 'capability-claims'],
    contracts: ['PaymentReceiptRegistry', 'ApprovedHashRegistry', 'AgreementRegistry'],
  },
  {
    concern: 'Discovery, naming, a registry KIT',
    short: 'the registry',
    field: ['none', 'none', 'none', 'full', 'full', 'none'],
    peers: 'ERC-8004 + Agent0, AGNTCY ADS (OASF, Sigstore, DHT), NANDA Index, Linux Foundation ANS, HCS-10, Fetch.ai Almanac, Visa TAP / Web Bot Auth, ERC-8107.',
    ahead: 'AGNTCY on a complete open discovery stack; ERC-8004 on footprint. We ship what registries are built FROM and route every bridge to an adapter outside Ring 0.',
    packages: ['registry-kit', 'registry-resolution', 'agent-naming', 'agent-profile', 'agent-resolution', 'agent-relationships', 'identity-directory', 'identity-directory-adapters', 'surface-catalog', 'home'],
    contracts: ['AgentRegistryBase', 'AgentProfileResolver', 'AgentRelationship', 'RelationshipTypeRegistry', 'GeoFeatureRegistry', 'SkillDefinitionRegistry', 'AgentNameRegistry'],
  },
];

// ─── The five contract-enforced properties ────────────────────────────────────────────────────────────────────

export interface PropertyRow { property: string; frameworks: string; web3: string; here: string; contract: string }

export const PROPERTIES: readonly PropertyRow[] = [
  { property: 'Identity that survives the runtime', frameworks: 'Deployment or service identity — a Dapr workload id, a platform account.', web3: 'A key (Lit PKP, Buzz keypair) or a registry row (ERC-8004 ERC-721).', here: 'The ERC-4337 Smart Agent address IS the agent. Custody rotates; delegations survive rotation; person / org / service on chain.', contract: 'AgentAccount · CustodyPolicy' },
  { property: 'Attenuation', frameworks: 'attenuateMandate(parent, scope) — a function every caller must be trusted to call.', web3: 'Smart Sessions policies AND-composed; Vincent policy params on chain.', here: 'An ERC-7710 chain: a child delegation\u2019s authority is the parent\u2019s hash; the manager enforces the whole caveat chain at redemption. A child cannot widen the parent.', contract: 'DelegationManager' },
  { property: 'Revocation', frameworks: 'A framework flag, checked if the code checks.', web3: 'On chain in DTK / Vincent — checked at redemption, not mid-loop.', here: 'isRevoked read per STEP; a revoke between step 2 and step 3 stops step 3. Live-tested.', contract: 'DelegationManager · chain-state' },
  { property: 'Intent binding', frameworks: 'Nothing mainstream — scopes and policies are standing.', web3: 'ERC-8273 actionDigest (draft); Kite intent-hashed tokens (own L1).', here: 'The delegation carries the JCS digest of the intent. The same capability for a different sentence fails redemption: intent-mismatch, proven live.', contract: 'DigestBindingEnforcer' },
  { property: 'Replay', frameworks: 'Idempotency keys in a store.', web3: 'Nonces per account; 8196 hash-chained audit.', here: 'A single-use on-chain nonce derived from the intent. Replay reverted — NonceReused — with real USDC.', contract: 'DigestBindingEnforcer' },
  { property: 'Approval as a boundary', frameworks: 'Client-submitted approvals — the pattern Pydantic warns against.', web3: 'A wallet click (DTK 7715); Buzz\u2019s approve button.', here: 'An ERC-1271-verified approval record, re-verified per step; QuorumEnforcer requires the quorum at redemption. The person\u2019s confirmation IS the signature.', contract: 'QuorumEnforcer · ApprovedHashRegistry' },
  { property: 'Receipts a third party can check', frameworks: 'Traces in a vendor platform.', web3: 'ACK-Pay VC receipts; EAS attestations.', here: 'Signed receipts binding intent · mandate · step · outcome; PROV-O provenance in the owner\u2019s vault; payment receipts on chain.', contract: 'PaymentReceiptRegistry' },
];

// ─── The framework field ──────────────────────────────────────────────────────────────────────────────────────

export interface FrameworkCard { name: string; bestAt: string; take: string; differ: string }

export const FRAMEWORKS: readonly FrameworkCard[] = [
  { name: 'Microsoft Agent Framework', bestAt: 'The enterprise architecture reference — agent / workflow / hosting / context-provider / hooks separation; sequential, concurrent, handoff, group-chat, Magentic; a durable extension; FIDES information flow.', take: 'The context-provider boundary (prepare / observe) and hooks as middleware, never authority.', differ: 'FIDES + hooks + approvals never amount to an intent-bound mandate. Their supervise / group-chat live inside the loop; ours are the coordination plane, because between-agent scheduling without a signed commitment is decided by a component that cannot be held to it.' },
  { name: 'Google ADK', bestAt: 'A2A-native, multi-language; sessions / state / memory as separate concepts; resumability.', take: 'The local-subagent vs remote-A2A-agent distinction — one A2A message, one receipt, never in-process.', differ: 'ADK identity is deployment identity. Ours is the SA address; an agent survives its runtime being replaced.' },
  { name: 'LangGraph · Deep Agents · LangSmith', bestAt: 'Graph state, durable checkpoints, interrupts, time travel; an opinionated harness; a mature ops platform with traces becoming evals.', take: 'Checkpoint semantics; production traces as evaluation datasets — ours is the AUTHORITY test set.', differ: 'LangSmith replay re-plays what happened. Ours must re-derive the authority decisions against recorded state; a replay that reuses old verdicts is a defect here.' },
  { name: 'Dapr Agents', bestAt: 'GA distributed durability — durable workflows, resume after failure, durable human approvals, pre-invocation hooks, mTLS.', take: '“Agent reliability is distributed-systems primitives, not serialized chat history” — why a Run is an A2A Task in a Durable Object.', differ: 'Dapr identity authenticates workloads. A workload is never an agent here; which agent it may act as is a signed binding, what it may do is a mandate.' },
  { name: 'Agno AgentOS', bestAt: 'One self-hosted runtime exposing agents, teams, workflows over A2A; RBAC; persisted approvals.', take: 'One runtime, many archetypes — our derived agent types on one SA substrate.', differ: 'AgentOS RBAC is standing permission on endpoints. Our gate asks why now: same endpoint, same caller, different sentence is a deny.' },
  { name: 'Strands', bestAt: 'Intervention handlers with explicit precedence (deny / confirm / guide / transform / proceed); Cedar authorization.', take: 'The intervention point — the closest analog to where verifyMandateForStep sits.', differ: 'Cedar evaluates standing rules (“a Treasurer may pay < $1,000”). A mandate is contextual: pay THIS payee ≤ THIS amount for THIS intent until THIS time after THIS approval.' },
  { name: 'Mastra', bestAt: 'TypeScript DX; A2A 0.3 + 1.0 with task lifecycle, signed cards, a local Studio.', take: 'Their documented caveat — A2A task records are in-memory — is the lesson: protocol-level task support ≠ durable execution.', differ: 'Our cards are released, JWS-signed and EIP-712 bound to an on-chain identity, not just signed by a deployment key.' },
  { name: 'Pydantic AI + Harness', bestAt: 'A typed loop where every harness feature is a composable Capability; deferred SKILL.md loading; two published security lessons.', take: 'Both lessons are doctrine here: skill visibility never authorizes; client approval is not a boundary — which is why approval becomes a redemption precondition on chain.', differ: 'Their Capability is a feature toggle. Ours is a semantic identity that mandates name, discovery matches and receipts cite.' },
  { name: 'CrewAI', bestAt: 'Role-oriented crews plus deterministic flows.', take: 'The crews / flows split restates our coordination / orchestration split.', differ: 'A CrewAI role is prompt configuration. Ours is a situation-plane record that grants nothing; the delegation does.' },
  { name: 'OpenAI Agents SDK', bestAt: 'The minimal loop — agents-as-tools, handoffs, guardrails, serializable HITL state.', take: 'Proof the loop should stay small; our orchestration core is ~400 lines for the same reason.', differ: 'Their handoff is in-process. Ours crosses an authority boundary with a child delegation.' },
  { name: 'Buzz.xyz (Block)', bestAt: 'A human + agent workspace on Nostr: agents as first-class members with keypairs, one permission framework, workflows that pause for approval, external runtimes over ACP.', take: 'Triggers as playbook-declared automations; ACP runtimes admitted as member agents under scoped delegations — “your Goose agent, with on-chain-revocable scope.”', differ: 'It is our Home\u2019s shape on a weaker trust base: identity is a keypair (no custody, recovery or revocation), permission is an ACL, approval is a click. Ours: a signature, a grant, a revocation.' },
];

export interface ScoreRow { capability: string; leader: string; verdict: 'ahead' | 'at par' | 'behind' | 'different by design' | 'deliberately absent'; basis: string }

export const SCORECARD: readonly ScoreRow[] = [
  { capability: 'Intent-bound delegated authority', leader: 'nobody', verdict: 'ahead', basis: 'Mandates, per-step verify, attenuation, revocation, digest binding — all on chain, demonstrated live 2026-09-03.' },
  { capability: 'Signed, bound agent cards', leader: 'Mastra', verdict: 'ahead', basis: 'JWS + EIP-712 binding to the SA — bound to an identity, not a key.' },
  { capability: 'Skills as executable semantic contracts', leader: 'Pydantic (closest)', verdict: 'ahead', basis: 'SkillExecutionContractV1 + the archetype compiler; the authority shape of every tool recorded and diffed on upgrade.' },
  { capability: 'Receipts and evidence chain', leader: 'nobody', verdict: 'ahead', basis: 'In model; anchoring and signing waves still landing.' },
  { capability: 'Knowledge and context contract', leader: 'MAF context providers', verdict: 'ahead', basis: 'Two tiers live — generated CONSTRUCT over the public KB, compiled selectors over vaults — with evidence in every answer. Packaging lift pending.' },
  { capability: 'Policy interception', leader: 'Strands / Cedar', verdict: 'at par', basis: 'The risk ladder at par; on-chain enforcers beneath it are ours alone.' },
  { capability: 'Tracing · evaluation · replay', leader: 'LangSmith', verdict: 'at par', basis: 'Firewalled GenAI spans + OTLP; replay re-derives verdicts; PROV graph is record-form only.' },
  { capability: 'A2A 1.0 wire · cards · tasks', leader: 'ADK · Mastra', verdict: 'at par', basis: 'Wire, cards and tasks live; the official TCK run in CI is a program item.' },
  { capability: 'Human-in-the-loop', leader: 'LangGraph · Dapr', verdict: 'at par', basis: 'Input-required + approval port live; approval waits surviving restart are a wave.' },
  { capability: 'Multi-agent patterns (handoff · supervisor · group chat)', leader: 'MAF · CrewAI', verdict: 'different by design', basis: 'Between-agent work is an Endeavor with a child delegation per participant, never a loop operator.' },
  { capability: 'Graph / state orchestration operators', leader: 'LangGraph', verdict: 'behind', basis: 'sequence / parallel / branch / join are program waves.' },
  { capability: 'Durable execution (checkpoint · resume · durable waits)', leader: 'Dapr · MAF', verdict: 'behind', basis: 'Durable tasks yes; run checkpoints and resume-with-recheck are a wave; engine adapters live outside Ring 0.' },
  { capability: 'Managed control plane / run UI', leader: 'LangSmith · AgentOS', verdict: 'deliberately absent', basis: 'Ring 0 ships data and events; product repos render.' },
  { capability: 'Model / provider breadth', leader: 'MAF · ADK', verdict: 'deliberately absent', basis: 'Adapters behind one Planner port; budget-routed.' },
];

// ─── The Web3 / trust-substrate field ──────────────────────────────────────────────────────────────────────────

export interface Web3Card { name: string; what: string; ahead: string; stops: string; take: string }

export const WEB3_DELEGATION: readonly Web3Card[] = [
  { name: 'MetaMask Delegation Toolkit — ERC-7710 + 7715', what: 'A session account requests execution permissions; the person approves a typed permission in the wallet; the session redeems through the 7710 Delegation Manager from her own account. Explicit agentic-AI positioning; 7702 brings EOAs in.', ahead: 'Wallet distribution of the grant ceremony; human-readable, adjustable permission types.', stops: 'One account model. No person / org classes, no harness, no provenance.', take: 'The 7715 request / grant shape for the Home ceremony — a mandate request the person can ADJUST before signing. We stay 7710 wire-compatible.' },
  { name: 'Rhinestone / Biconomy Smart Sessions', what: 'One ERC-7579 validator for session keys across Nexus, Kernel, Safe7579; permissions and policies AND-composed. Their thesis in our words: “the user owns the wallet; the agent is a delegate, not a co-owner.”', ahead: 'A productized session module; ours is still inlined in AgentAccount.sol.', stops: 'Sessions and spend only; no identity classes, no intent.', take: 'The validator / policy split when we extract SessionKeyValidator.' },
  { name: 'Lit Protocol Vincent', what: 'The closest single analog on the delegation + loop axis: Abilities governed by Policies with a precheck → evaluate → commit lifecycle; user params on chain the app cannot alter; a Connect page to approve and revoke; an app registry.', ahead: 'Shipped per-execution policy with persistent state (daily spend ledgers) and a marketplace UX.', stops: 'The trust root is Lit\u2019s threshold network — the key is THEIR MPC. Policies are JavaScript. No smart-account classes, no A2A / MCP admission, no provenance the user owns.', take: 'The commit phase — post-execution state — is what our ObligationEnforcer must model explicitly.' },
  { name: 'Zodiac Roles v2 · karpatkey', what: 'Permissions as code: declarative, diffable, version-controlled permission sets on a Safe; DAOs let a treasury operator act under a voted policy.', ahead: 'The permission-diff UX; operational maturity of treasury delegation.', stops: 'Safe-shaped, operator-shaped; no agents, no intent.', take: 'The diff view — for caveat changes and for playbook upgrades (skills gained / lost).' },
  { name: 'Safe · Brahma ConsoleKit', what: 'Safe: deny-by-default guards referencing policy contracts. Brahma: policies stored OFF chain with a commit hash on chain, validated by a service whose signature the guard checks.', ahead: 'Safe on TVL and battle-testing.', stops: 'Brahma is the architecture we refuse: the enforcement point is a service; the chain only verifies the service\u2019s attestation.', take: 'Deny-by-default as a stated invariant for treasury agents. Read Brahma to recognise the drift, not to copy it.' },
  { name: 'Coinbase Agentic Wallets · Turnkey · Privy · Crossmint', what: 'Policy enforced in a TEE or on the vendor\u2019s servers (Coinbase, Turnkey, Privy) or in the contract (Crossmint). x402 spend controls ship an in-memory store by default.', ahead: 'Volume, KYT, card rails; Turnkey\u2019s DENY-overrides-ALLOW circuit breaker.', stops: 'Vendor-side policy as the authority.', take: 'A steward-toggled deny / kill-switch caveat; one ceremony that revokes every live wire for an agent.' },
  { name: 'Kite Chain + Agent Passport', what: 'A purpose-built L1; user account → BIP-32 agent → ephemeral session keys; delegation tokens carrying an intent hash; x402 / MPP / AP2 bridges.', ahead: 'The identity SHAPE is nearly ours, shipped.', stops: 'Proprietary chain, closed core, payments only.', take: 'Watch, don\u2019t adopt.' },
];

export interface ErcRow { erc: string; title: string; status: string; overlap: string; position: string }

export const ERC_STACK: readonly ErcRow[] = [
  { erc: '8004', title: 'Trustless Agents — identity / reputation / validation registries', status: 'identity + reputation live on mainnet', overlap: 'A registry entry as a FACET of the Smart Agent.', position: 'A facet target since ADR-0010; the adapter lives in a sibling repo. The largest external-footprint gap we have.' },
  { erc: '8001', title: 'Agent Coordination Framework — intent + per-participant acceptances', status: 'Final', overlap: 'CoordinationPlan adoption + ContributionCommitment against a plan hash.', position: 'Publish an 8001 projection of a commitment externally; apcoord: unchanged.' },
  { erc: '8183', title: 'Agentic Commerce — job escrow, evaluator-only completion', status: 'Draft; Virtuals runs it (12M memos)', overlap: 'The offer algebra and fulfillment evidence; evaluator ≈ attestor.', position: 'Crosswalked; escrow stays an external commerce adapter. Evaluator-as-an-address is the right abstraction.' },
  { erc: '8196', title: 'AI Agent Authenticated Wallet — policy proof per tx, hash-chained audit', status: 'Last Call', overlap: 'Caveat-bound execution + receipts.', position: 'Their policy is a struct; ours is enforcer contracts. Their hash-chained audit requirement is one we should meet.' },
  { erc: '8273', title: 'Attestation-Gated Agentic Actions — capability + actionDigest, one tx', status: 'Draft', overlap: 'DigestBindingEnforcer + the intent-derived single-use nonce — our core differentiator, as a draft ERC.', position: 'Study before DigestBindingEnforcer is final; consider an 8273-compatible read as an external profile.' },
  { erc: '8226', title: 'Regulated Agent Mandate — scoped, time-bounded, capped authority', status: 'Draft', overlap: 'Our Mandate: a delegation + intent caveat.', position: 'Same noun, narrower domain; a future adapter target for regulated assets.' },
  { erc: '8257', title: 'Agent Tool Registry — manifest hash + invocation predicate', status: 'Draft', overlap: 'tool-policy, capability ids.', position: 'Tool manifests on chain are not our model: capabilities are the record; tools are operations.' },
  { erc: '8126 · 8107', title: 'Verification risk score · ENS transitive trust graph', status: 'Final · Draft', overlap: 'agent-relationships, discovery.', position: 'Reputation and trust-graph proximity are NEVER gates here. Signals for discovery, never permission.' },
];

export const WEB3_IDENTITY: readonly Web3Card[] = [
  { name: 'ERC-8004 + Agent0 + ChaosChain', what: 'ERC-721 identity → registration JSON listing A2A / MCP / OASF / ENS endpoints; reputation feedback; deterministic addresses on 30+ chains.', ahead: 'Footprint and tooling — create-8004-agent, subgraphs, explorers.', stops: 'A row is not a principal; no authority model.', take: 'The registry entry is a facet; the SA is the anchor; registry-kit is what registries are built FROM.' },
  { name: 'AGNTCY (Linux Foundation · Cisco)', what: 'OASF skill taxonomy, a content-addressed Agent Directory (OCI, Sigstore, DHT), VC badges for agents and MCP servers, observability. Webex-integrated.', ahead: 'A complete open discovery stack with enterprise adoption.', stops: 'Workload / badge identity, not principal identity; no authority.', take: 'Sigstore-style transparency for released cards; OASF taxon publication via an adapter.' },
  { name: 'NANDA (MIT)', what: 'One index record per organization mapping identity to the next discovery object; an IETF draft on registry-assisted discovery without DNS anchors; AgentFacts as JSON-LD.', ahead: 'A standards venue for identity-first resolution.', stops: 'Signs at the index / issuer / resolver; we sign from the anchor.', take: 'Nothing new — our private-resolution stance already says naming ≠ resolution ≠ listing.' },
  { name: 'Linux Foundation ANS · GoDaddy ANS · ENS · HCS-10', what: 'DNS-anchored or chain-native naming and profile standards with their own identity roots.', ahead: 'DNS-scale reach; mature registrars and resolvers; a live Hedera network.', stops: 'Each makes the NAME or the record the principal.', take: 'All are facets. External names resolve to the same Smart Agent; bridges live outside Ring 0.' },
  { name: 'Visa Trusted Agent Protocol · Cloudflare Web Bot Auth', what: 'Agents sign HTTP requests (RFC 9421); merchant edges verify against a key directory; AWS WAF, Vercel, Shopify, Akamai verify it.', ahead: 'Deployed at the CDN layer.', stops: 'Transport evidence about a request.', take: 'Admit RFC 9421 signatures at the edge as transport evidence — like mTLS, never authority, never a stage skipped.' },
];

export const WEB3_COMMERCE_DATA: readonly Web3Card[] = [
  { name: 'Google AP2', what: 'Intent / Cart / Payment mandates as W3C VCs signed by the user\u2019s wallet or the agent\u2019s key; A2A + UCP extension; donated to the FIDO Alliance.', ahead: 'Governance and 60+ partners.', stops: 'A mandate is a signed DOCUMENT the merchant verifies.', take: 'Same word, different enforcement plane: ours is a delegation + intent-digest caveat verified on chain per step and revocable by the principal.' },
  { name: 'x402 · Stripe MPP · OpenAI/Stripe ACP · Virtuals ACP · Olas', what: 'HTTP-402 stablecoin micropayments; multi-method machine payments; cart / feed / orders over MCP; live agent-to-agent hiring with escrow and an evaluator role.', ahead: 'Volume and live commerce.', stops: 'These are RAILS.', take: 'payments pays an x402 challenge under a mandate without importing any of them into Ring 0; the client / provider / evaluator split for fulfillment evidence.' },
  { name: 'Inrupt Enterprise Solid Server 3.0', what: 'Per-user RDF pods; access requests and grants as VCs with purpose, owner-revocable; an MCP resource service where APPROVING a request is deliberately not a tool.', ahead: 'Shipped, enterprise-deployed, standards-tracked; the nearest thing to our vault + per-record delegation, and RDF-native like our ontology.', stops: 'The principal is a WebID, not an on-chain account; grants are VCs the server checks, not revocable on chain.', take: 'A purpose field on vault delegations; “approval is never a tool” as a stated invariant.' },
  { name: 'PROV-AGENT / ORNL Flowcept · OpenTelemetry GenAI', what: 'W3C PROV extended for agents — prompts, tool calls as first-class provenance, MCP-based capture, a queryable store. OTel GenAI: invoke_agent / execute_tool / plan spans, still Development.', ahead: 'Capture adapters and query tooling; vocabulary adoption.', stops: 'A platform store; no principal ownership; no link to authority.', take: 'PROV class alignment so a Flowcept query works over our A-box; an OTel GenAI projection with a pinned version — a projection, never the record.' },
  { name: 'Auth0 for AI Agents · Okta Cross-App Access · Entra Agent ID · AWS AgentCore · Permit · Cerbos', what: 'The Web2 answer: secretless credential brokers, short-lived scoped tokens, per-call policy, universal logout. Okta\u2019s own write-up lists provenance through the delegation chain and continuous evaluation as requirements.', ahead: 'Enterprise integration, kill-switch UX, SIEM.', stops: 'Authority is an issuer-granted scope.', take: 'The ID-JAG lineage idea is our portable authority chain (adapters outside Ring 0); an instant kill switch at the Home. Ours stays a principal-signed, on-chain-revocable grant.' },
  { name: 'Oasis ROFL · Phala dstack · TEE-verified agents', what: 'Attested containers, on-chain policy registries, integrity receipts.', ahead: 'Enclave attestation as a product.', stops: 'Attestation as identity or authority.', take: 'Transport evidence about a workload — an optional WorkloadIdentityBinding source; nothing more.' },
];

// ─── What we deliberately do not take ─────────────────────────────────────────────────────────────────────────

export const REFUSED: readonly { what: string; from: string; why: string }[] = [
  { what: 'Vendor-side or off-chain policy as the enforcement point', from: 'Brahma commit-hash pattern · Coinbase / Turnkey / Privy TEE or server policy · Permit / Cerbos as the authority', why: 'Our gates are contracts. A service that returns a signature the chain trusts is a service you must trust.' },
  { what: 'OAuth scopes or ID-JAG as authority', from: 'Auth0 · Okta · Entra', why: 'An ingress envelope only. Field-level access is never a scope; an inbound token is never reused for the next hop; the Web3 gates never skip because “OAuth already authenticated the caller.”' },
  { what: 'Reputation or risk scores as gates', from: 'ERC-8126 · ERC-8107 · vendor trust scores', why: 'Signals for discovery, never permission. A resolver returns subject / context / relationship / bindings / authority / evidence as SEPARATE signals — never one number.' },
  { what: 'TEE attestation as identity or authority', from: 'Oasis ROFL · NEAR Shade (deprecated)', why: 'Transport evidence about a workload. A SPIFFE ID names a workload, never an agent; a signed binding does.' },
  { what: 'A proprietary L1 or a threshold network as the trust root', from: 'Kite · Lit', why: 'Any EVM. The identity is an account the person custodies, not a key someone else\u2019s network holds.' },
  { what: 'Their words for our things, without the crosswalk', from: 'AP2 “mandate” · ERC-8257 “tool registry” · Pydantic “capability”', why: 'Same noun, different layer. The vocabulary map exists to keep them apart.' },
  { what: 'A framework, a workflow vendor in Ring 0, a run UI', from: 'MAF · Temporal / Dapr · LangSmith', why: 'The loop stays small; capabilities are ports; durability engines are adapters; product repos render.' },
];

// ─── Where we lose today — stated because the audit states it ────────────────────────────────────────────────

export const WHERE_WE_LOSE: readonly { gap: string; detail: string; answer: string }[] = [
  { gap: 'Production hours', detail: 'Several peers have more production time on their one layer than we have on all of ours: ERC-8004 on identity footprint, Coinbase and x402 on payment volume, Inrupt on consented vaults, AGNTCY on discovery.', answer: 'Breadth is also exposure. The ERC adapters (8004 · 8001 · 8183 · 8273) must exist and be current for “the substrate registries are built from” to hold.' },
  { gap: 'Durable execution', detail: 'Dapr, MAF and LangGraph lead on checkpoint / resume, time travel and approval waits that survive a restart. We have durable tasks, not durable runs.', answer: 'Resume-with-recheck: a resumed run re-verifies every remaining step. The twist is the point; the wave is scheduled.' },
  { gap: 'Composition operators', detail: 'sequence / parallel / branch / join / race on the step model — LangGraph has them; we have the model.', answer: 'A branch is N mandates; a fan-out runs only over a modelled, bounded relation. Waves W3–W4.' },
  { gap: 'Session module', detail: 'Smart Sessions productized the ERC-7579 session validator we still inline in AgentAccount.sol.', answer: 'Extract SessionKeyValidator, then a spend hook. The direction stands; do not assert it is done.' },
  { gap: 'Public-by-default naming', detail: 'Names and much discovery metadata are enumerable. DNTLS targets private, anti-enumerable resolution correctly; we have the structural answer and not the default posture.', answer: 'agent-resolution: opaque recipient-bound grants, not salted names. Later waves of spec 338 are unshipped.' },
  { gap: 'Transport peer identity', detail: 'Before A2A / MCP parse, peer trust often collapses to Web PKI or host trust. App-layer signatures are not channel binding.', answer: 'mTLS on a separate hostname as additive evidence; RFC 9421 admitted as transport evidence. Channel binding stays open.' },
  { gap: 'Not production', detail: 'External audit gates, governance key posture and residual findings are explicit and public. Pilot is not production.', answer: 'Test and pre-production estates today, with the findings ledger open.' },
];

// ─── The contract inventory, grouped ─────────────────────────────────────────────────────────────────────────

export interface ContractGroup { group: string; note: string; contracts: readonly string[] }

export const CONTRACT_GROUPS: readonly ContractGroup[] = [
  { group: 'Account', note: 'ERC-4337 · ERC-7579 modular core · ERC-1271 / 6492 · P-256 passkeys', contracts: ['AgentAccount', 'AgentAccountFactory', 'CustodyPolicy', 'UniversalSignatureValidator', 'SmartAgentPaymaster', 'ApprovedHashRegistry'] },
  { group: 'Delegation', note: 'ERC-7710 manager + caveat enforcers; the intent digest is ours', contracts: ['DelegationManager', 'AllowedTargetsEnforcer', 'AllowedMethodsEnforcer', 'ValueEnforcer', 'TimestampEnforcer', 'CallDataHashEnforcer', 'PaymentEnforcer', 'QuorumEnforcer', 'DigestBindingEnforcer'] },
  { group: 'Naming', note: '.agent root · ten typed subregistries (.me .org .team .svc .workspace .treasury .registry .church .circle .household)', contracts: ['AgentNameRegistry', 'PermissionlessSubregistry', 'AgentNameUniversalResolver', 'AgentNameAttributeResolver', 'AgentNamePredicates'] },
  { group: 'Registry kit · profile · relationships', note: 'What registries are built from; SA-anchored facets', contracts: ['AgentRegistryBase', 'AgentProfileResolver', 'AgentProfilePredicates', 'AgentRelationship', 'RelationshipTypeRegistry', 'AgentRelationshipPredicates', 'SkillDefinitionRegistry', 'GeoFeatureRegistry'] },
  { group: 'Ontology on chain', note: 'Terms, shapes and typed attributes anchored for public facts', contracts: ['OntologyTermRegistry', 'ShapeRegistry', 'AttributeStorage'] },
  { group: 'Commerce · evidence · governance', note: 'Receipts and agreements on chain; governance of the deployment itself', contracts: ['PaymentEscrow', 'PaymentReceiptRegistry', 'AgreementRegistry', 'AgenticGovernance', 'GovernanceManaged'] },
  { group: 'Libraries', note: 'Ported patterns, no runtime dependency', contracts: ['P256Verifier', 'WebAuthnLib', 'SignatureSlotRecovery', 'MultiSendCallOnly'] },
];

// ─── What it replaces — every package in one row ─────────────────────────────────────────────────────────────

export interface ReplacesRow { instead: string; packages: readonly string[]; note: string }

export const REPLACES: readonly ReplacesRow[] = [
  { instead: 'Privy · Dynamic · Web3Auth · Auth0 · Okta — login, embedded wallets, SSO', packages: ['connect-auth', 'connect', 'connect-client', 'browser-identity', 'fedcm-rp', 'fedcm-idp'], note: 'Sessions bound to the Smart Agent, not a vendor account.' },
  { instead: 'Safe · ZeroDev · Alchemy Account Kit + Pimlico gas sponsorship — smart accounts', packages: ['agent-account', 'contracts'], note: 'ERC-4337 + ERC-7579 modular core, paymaster included.' },
  { instead: 'Turnkey · Fireblocks · cloud-KMS consoles — key management, signing policy', packages: ['key-custody', 'ap-kms', 'delegated-signer'], note: 'A KMS boundary your HSM plugs INTO; signing infra never owns the identity.' },
  { instead: 'Safe multisig + Argent guardians — org control, recovery', packages: ['account-custody'], note: 'Quorums, trustees, recovery — the native CustodyPolicy module.' },
  { instead: 'MetaMask DTK · session keys · Lit Protocol — scoped agent authority', packages: ['delegation', 'tool-policy', 'chain-state', 'chain-state-viem', 'agentic-authorization'], note: 'Caveats enforced on chain; replay-protected off chain; revocation reads with evidence.' },
  { instead: 'OAuth scopes · ABAC engines · HashiCorp Vault policies — field-level data access', packages: ['entitlements', 'key-authorization'], note: 'Field-level, purpose-bound, key-release-gated.' },
  { instead: 'Solid pods · app PII tables · custom encrypted stores — private data', packages: ['vault', 'vault-authority', 'related-agents', 'privacy-credentials'], note: 'Delegated vaults with a classification taxonomy; private relationship credentials; selective disclosure.' },
  { instead: 'Kong · Zuplo · API gateways — admission, rate limits', packages: ['admission', 'edge-runtime', 'edge-cloudflare', 'rate-control', 'rate-control-cloudflare', 'surface-catalog'], note: 'Admission only, never authority.' },
  { instead: 'ENS · Unstoppable · GoDaddy ANS · LF ANS — naming', packages: ['agent-naming', 'registry-resolution'], note: '.agent TLD with typed suffixes; external names consumed as facets.' },
  { instead: 'ERC-8004 registries · agent-card directories — discovery, profiles', packages: ['agent-profile', 'agent-relationships', 'identity-directory', 'identity-directory-adapters', 'registry-kit', 'home'], note: 'Signed cards + directory reads; 8004 / ANS / HCS mapping stays external.' },
  { instead: 'DNTLS · Tailscale-style private discovery · IPNS + TUF — private naming, current endpoints', packages: ['agent-resolution'], note: 'Unlisted, pairwise and unnamed agents resolvable by grant; sequenced publications with anti-rollback.' },
  { instead: 'EAS · Verax + DocuSign-style consent — attestations, agreements', packages: ['attestations', 'agreements'], note: 'Bilateral consent, joint assertions, EIP-712-bound.' },
  { instead: 'Veramo · SpruceID · walt.id — verifiable credentials', packages: ['verifiable-credentials', 'capability-claims', 'geo-features', 'agent-skills'], note: 'W3C VC 2.0 with EIP-712 / ERC-1271 proofs; capability and geo claims.' },
  { instead: '@modelcontextprotocol/sdk + custom auth — agent tool access', packages: ['mcp-protocol', 'mcp-runtime', 'mcp-oauth'], note: 'MCP tools gated by the same delegations; JTI replay protection.' },
  { instead: '@a2aproject/a2a-js + a task store — agent-to-agent calls', packages: ['a2a', 'acp', 'runtime-member'], note: 'Async, delegation-authorized Task / Message / Artifact runtime; ACP runtimes admitted as members.' },
  { instead: 'XMTP · Matrix · Nostr · Signal — agent messaging', packages: ['fabric'], note: 'One A2A-native exchange substrate; bodies recipient-owned and vault-resident.' },
  { instead: 'SharePoint · Drive · Box · Notion · Confluence — content libraries', packages: ['content-storage', 'content-primitives'], note: 'Per-artifact on-chain-revocable entitlements; Merkle provenance log; native discussion bound to the artifact.' },
  { instead: 'LangChain · LangGraph · a harness product — the agent loop', packages: ['orchestration', 'orchestration-anthropic', 'orchestration-openai-compat', 'harness', 'context', 'service-agent'], note: 'A vendor-free plan → execute → observe core; per-step mandate verification; LLM bindings as adapters.' },
  { instead: 'Stripe · x402 · AP2 — payments', packages: ['payments'], note: 'Payment mandates; x402 / escrow / recurring rails; receipt VCs.' },
  { instead: 'Anoma · ERC-7683 resolvers · marketplace backends — intent matching and engagement', packages: ['intent-marketplace', 'intent-resolver', 'intent-engagement'], note: 'Constraint matching, composite scoring, offers that commit and a mandate that alone authorizes.' },
  { instead: 'Temporal · case-management tools — fulfillment, coordination', packages: ['fulfillment', 'coordination', 'collaboration', 'situations'], note: 'Case lifecycle; Endeavor + signed commitments; situation and role bindings.' },
  { instead: 'Okta groups · custom RBAC + membership tables — org membership, roles', packages: ['organization'], note: 'Enrollment, roles, revocation cascade anchored on Smart Agents. A role with no live wire authorizes nothing.' },
  { instead: 'Custom audit logs · OTel event shapes · SCITT-style logs — evidence', packages: ['audit', 'provenance', 'verification-receipts', 'witness', 'evaluation'], note: 'Append-only events, PROV-O lineage, verifier-retained receipts, dispute attestation, truthfulness evals.' },
  { instead: 'Hand-rolled schemas · custom OWL / SHACL repos — types, vocabulary', packages: ['types', 'ontology'], note: 'Branded chain primitives + the formal vocabulary every package binds to by IRI.' },
  { instead: 'create-next-app + a README — developer tooling', packages: ['create-app', 'devkit'], note: 'A product template with pinned rules; ap doctor / test / conform; a read-only Developer MCP.' },
];
