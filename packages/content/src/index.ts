// The brand site's content model. One typed source for the offerings, the "stitched vs seamless" crosswalk, the
// Game Night case study and the estate map — every page renders FROM this, so a claim is edited once.

export const SITE = {
  name: 'Agentic Primitives',
  url: 'https://agenticprimitives.dev',
  tagline: 'Rails, not throttles. Authority for agents that the agent cannot exceed.',
  github: 'https://github.com/agentictrustlabs/agentic-primitives',
  pokerGithub: 'https://github.com/agentictrustlabs/pokernight',
  npm: 'https://www.npmjs.com/org/agenticprimitives',
  npmPackage: 'https://www.npmjs.com/package',
  contact: 'mailto:hello@agenticprimitives.dev',
  author: 'Richard Pedersen',
  org: 'Agentic Trust Labs',
} as const;

// ─── Positioning: the industry's three answers to agent risk, and ours ────────────────────────────────────────
//
// Every serious vendor now concedes the same fact — a capable agent has a blast radius — and offers one of three
// remedies. Each is real engineering and each stops at the same place: none of them can say, for an act that
// happened, under whose authority it happened, or refuse the next one because that authority is gone.

export interface IndustryAnswer {
  id: 'containment' | 'supervision' | 'platform';
  name: string;
  who: string;
  claim: string;
  buys: string;
  stops: string;
  edge: string;
}

export const INDUSTRY_ANSWERS: readonly IndustryAnswer[] = [
  {
    id: 'containment',
    name: 'Containment',
    who: 'The frontier labs',
    claim: 'Shrink what the agent can reach: sandboxes, restricted modes, egress denied by default, a kill switch.',
    buys: 'A smaller blast radius for one process on one machine.',
    stops: 'A sandbox is a wall around a room. It says nothing about who let the agent into the room, on whose behalf, or for what. Every act inside the wall is equally authorized — which is to say, none of them are.',
    edge: 'Containment bounds reach. It cannot bound authority, because it has no concept of it.',
  },
  {
    id: 'supervision',
    name: 'Supervision',
    who: 'The frontier labs, again',
    claim: 'Watch the agent: permission prompts, then — when people approve 93% of them — a second model that grades the first.',
    buys: 'Fewer catastrophic actions, on average, with a non-zero miss rate the vendors acknowledge.',
    stops: 'A click is not consent and a classifier is not a grant. When a probabilistic monitor approves a probabilistic agent, the result is still probabilistic — and the record of it is a log line in a vendor’s store.',
    edge: 'Supervision is a better throttle. It is not a rail.',
  },
  {
    id: 'platform',
    name: 'Platform governance',
    who: 'The enterprise platforms',
    claim: 'Anchor agents in one platform’s ontology: purpose-based permissions, a human-in-the-loop dial, reversible actions, lineage across the estate.',
    buys: 'Real control — inside the platform, for the workloads it hosts, on terms it sets.',
    stops: 'The permission is the platform’s ACL. The reversal is the platform’s branch. The evidence is the platform’s lineage. Your sovereignty is exactly as large as your contract, and a counterparty outside it has to take the platform’s word.',
    edge: 'Reversibility inside one vendor is that vendor’s sovereignty. Revocability the owner holds is yours.',
  },
];

export const OUR_ANSWER = {
  name: 'Authority as a grant',
  claim: 'Let the agent be as capable as you like. Bound what it MAY do with a signed, caveated, revocable grant — enforced by code that runs outside the model, on every step, and receipted for the owner.',
  points: [
    { t: 'Signed by the principal, not configured by the platform.', b: 'A person, an organization or a service issues the grant from its own account, with a passkey, at its own Home. No vendor holds the key.' },
    { t: 'Bounded by caveats that are code.', b: 'Payee, ceiling, method, target, time window, the digest of one exact intent. Each caveat is an enforcer contract that runs at redemption. A scope is a string; an enforcer executes.' },
    { t: 'Verified every time, cached never.', b: 'Before the step, after the approval, and on chain when value moves. Revocation is one transaction, final at the next gate, everywhere — no expiry to wait out, no list to update.' },
    { t: 'Receipted for the owner.', b: 'Which grant, which decision, which transaction, which playbook — into a PROV-O graph in the owner’s vault. A counterparty verifies it without the runtime’s cooperation.' },
  ],
  line: 'Intelligence may be probabilistic. Authority must not be.',
} as const;

/**
 * THE BILL OF MATERIALS. What you assemble, and what you then configure, to stand up the same capability
 * set from products — versus one substrate. The counts on the right are the repository's: 77 packages under
 * one npm scope, 33 concrete EVM contracts. The products on the left are representative, not exhaustive;
 * every row was built at least once before this substrate existed, and the seams are why.
 */
export interface BomRow {
  need: string;
  /** Products you would assemble. */
  products: readonly string[];
  /** The configuration surface each of them leaves you with. */
  config: string;
  /** Where the seam bites. */
  seam: string;
  /** How the substrate covers it. */
  substrate: string;
  packages: readonly string[];
  contracts: readonly string[];
}

export const BOM: readonly BomRow[] = [
  {
    need: 'Sign-in and identity',
    products: ['an identity vendor (Auth0 · Okta · Clerk)', 'a WebAuthn library', 'an embedded-wallet SDK (Privy · Dynamic · Web3Auth)'],
    config: 'three identity models — a user id, a wallet address, a passkey credential id — and the mapping tables between them; OIDC clients per app; JWKS rotation; a recovery flow you write.',
    seam: 'The person is a row in one system, an address in another and a credential in a third. Rotate a credential and the address changes; nothing downstream survives it.',
    substrate: 'One Smart Agent per person, organization and service. Passkeys and wallets are rotating credentials on it; the address never changes.',
    packages: ['agent-account', 'browser-identity', 'connect', 'connect-auth', 'connect-client', 'fedcm-idp', 'fedcm-rp'],
    contracts: ['AgentAccount', 'AgentAccountFactory', 'UniversalSignatureValidator', 'P256Verifier'],
  },
  {
    need: 'Accounts, custody and recovery',
    products: ['a multisig (Safe)', 'a guardian / social-recovery product', 'a cloud KMS'],
    config: 'owner sets and thresholds per account; Safe modules; recovery ceremonies you design; key-rotation runbooks; who is allowed to add an owner, decided in a spreadsheet.',
    seam: 'Custody governance lives in the multisig, application authority in your database. They do not know about each other.',
    substrate: 'Custody is an ERC-7579 module on the account: thresholds, guardians, recovery, approvals — governed on chain, one policy.',
    packages: ['account-custody', 'key-custody', 'ap-kms', 'delegated-signer'],
    contracts: ['CustodyPolicy', 'ApprovedHashRegistry', 'QuorumEnforcer'],
  },
  {
    need: 'Permissions and delegation',
    products: ['a policy engine (OPA · Cerbos · Permit.io)', 'a session-key or delegation toolkit (ZeroDev · MetaMask DTK)', 'your own roles table'],
    config: 'two permission shapes — roles in a database, caveats on chain — kept in sync by hand; policy files; scopes on tokens standing in for authority; expiry as the only revocation.',
    seam: 'A permission granted in the app is a token; a permission granted on chain is a delegation; nobody can say which one authorized a given act.',
    substrate: 'One grant mechanism: an ERC-7710 delegation with caveats that are enforcer code, verified at redemption, revoked in one transaction.',
    packages: ['delegation', 'agentic-authorization', 'entitlements', 'key-authorization', 'tool-policy', 'vault-authority'],
    contracts: ['DelegationManager', 'AllowedMethodsEnforcer', 'AllowedTargetsEnforcer', 'TimestampEnforcer', 'ValueEnforcer', 'CallDataHashEnforcer', 'DigestBindingEnforcer', 'PaymentEnforcer'],
  },
  {
    need: 'Agent runtime and orchestration',
    products: ['an agent framework (LangGraph · MAF · ADK)', 'a tracing product (LangSmith · Langfuse)', 'a memory store', 'a model gateway'],
    config: 'prompts that carry the domain rules; tool JSON schemas per agent; per-agent config; retries; a human-in-the-loop hook you wire to a chat approval.',
    seam: 'The planner decides and the executor acts inside the same process. A "yes" in chat is the approval. Nothing outside the model checks the step.',
    substrate: 'Planner proposes, mandate authorizes, executor acts, receipt proves — the loop is a Ring-0 package; every step is verified outside the model.',
    packages: ['harness', 'orchestration', 'orchestration-anthropic', 'orchestration-openai-compat', 'service-agent', 'context', 'runtime-member'],
    contracts: ['DigestBindingEnforcer'],
  },
  {
    need: 'Tools and MCP',
    products: ['an MCP server framework', 'an OAuth authorization server for MCP', 'a per-tool secrets scheme'],
    config: 'bearer scopes per tool; a service-account key in each server config; token exchange between hops; scopes that mean "decrypt everything" because they cannot mean less.',
    seam: 'The MCP server holds the key. Whoever holds the server holds the identity, for anything, forever.',
    substrate: 'MCP is a private capability interface behind an admitted runtime; OAuth is the envelope; the on-chain grant is the authority; the service key is a revocable delegate.',
    packages: ['mcp-runtime', 'mcp-protocol', 'mcp-oauth', 'tool-policy', 'vault', 'vault-authority'],
    contracts: ['DelegationManager', 'AllowedMethodsEnforcer'],
  },
  {
    need: 'Agent-to-agent and admission',
    products: ['an A2A SDK', 'a message bus', 'an API gateway', 'mTLS / SPIFFE tooling', 'an agent-card you type'],
    config: 'agent cards by hand; an endpoint registry; certificates per workload; rate limits per gateway; an allow-list nobody remembers to prune.',
    seam: 'A certificate says which workload connected. It cannot say which agent, under whose authority, for what purpose.',
    substrate: 'A2A over HTTPS with admission always required; mTLS optional transport evidence; agent cards projected from the profile and signed; the edge admits, it does not orchestrate.',
    packages: ['a2a', 'acp', 'admission', 'edge-runtime', 'edge-cloudflare', 'rate-control', 'rate-control-cloudflare', 'agent-profile', 'fabric'],
    contracts: [],
  },
  {
    need: 'Payments and treasury',
    products: ['a payments processor (Stripe · Circle)', 'a paymaster / bundler (Pimlico · Alchemy)', 'a spend-control product', 'a reconciliation job'],
    config: 'webhooks and their retries; two ledgers to reconcile; spending limits in a dashboard; who may pay whom, as a setting.',
    seam: 'The limit lives in the processor; the approval lives in Slack; the transfer lives on chain. Three records, no receipt.',
    substrate: 'A treasury is a Service Agent. A payment is a delegation with a PaymentEnforcer caveat; the paymaster sponsors gas; the receipt is anchored.',
    packages: ['payments', 'agreements', 'fulfillment', 'intent-engagement', 'intent-marketplace', 'intent-resolver'],
    contracts: ['SmartAgentPaymaster', 'PaymentEscrow', 'PaymentReceiptRegistry', 'PaymentEnforcer', 'ValueEnforcer', 'AgreementRegistry'],
  },
  {
    need: 'Human approval',
    products: ['a Slack / Teams approvals bot', 'a workflow tool (Jira · ServiceNow)', 'a signing UI you build'],
    config: 'approval rules per workflow; who is an approver, in a group nobody audits; a click recorded in a SaaS.',
    seam: 'The approval is a click in someone else\u2019s database. It authorizes nothing the executor can verify.',
    substrate: 'The approval is a signature: the confirmation IS the mandate, bound to the digest of the exact intent, verified at redemption.',
    packages: ['home', 'harness', 'delegation', 'surface-catalog'],
    contracts: ['DigestBindingEnforcer', 'ApprovedHashRegistry'],
  },
  {
    need: 'Evidence, audit and provenance',
    products: ['OpenTelemetry', 'a SIEM (Datadog · Splunk)', 'an LLM-tracing product', 'an attestation scheme (EAS)'],
    config: 'three formats — spans, log lines, attestations — joined by correlation ids you invent; retention policies; a dashboard per product.',
    seam: 'A trace says what ran. It cannot say who allowed it. Provenance and authorization are in different systems with different ids.',
    substrate: 'One PROV-O graph: a span IS an activity; every protected step leaves a receipt the owner carries; a trace id is correlation, never trust.',
    packages: ['provenance', 'verification-receipts', 'audit', 'attestations', 'witness', 'evaluation'],
    contracts: ['AttestationRegistry', 'PaymentReceiptRegistry'],
  },
  {
    need: 'Records, privacy and consent',
    products: ['a database', 'a field-encryption library', 'a KMS', 'a consent-management platform'],
    config: 'a PII schema; a key per tenant; consent flags disconnected from the code path that reads the field; a DSAR process.',
    seam: 'Consent is a flag; access is a query. Nothing makes the second depend on the first.',
    substrate: 'Vaults are the record: encrypted envelopes with per-record scope, released only under a delegation the owner signed; the KB holds only what the chain already says.',
    packages: ['vault', 'vault-authority', 'privacy-credentials', 'verifiable-credentials', 'content-storage', 'content-primitives'],
    contracts: [],
  },
  {
    need: 'Organizations, relationships, coordination',
    products: ['an org / team model in your DB', 'a project tool (Linear · Jira)', 'a workflow engine (Temporal)'],
    config: 'membership tables; roles per org; tasks with an assignee but no principal; workflows that cannot say under whose authority a step ran.',
    seam: 'An organization is a tenant id. A relationship is a foreign key. Neither can sign, hold funds or be verified by a counterparty.',
    substrate: 'Organizations are Smart Agents; relationships and roles are on-chain records and vault situations; coordination plans are signed and adopted by decision.',
    packages: ['organization', 'agent-relationships', 'related-agents', 'situations', 'coordination', 'collaboration', 'geo-features'],
    contracts: ['AgentRelationship', 'RelationshipTypeRegistry', 'AgenticGovernance', 'GeoFeatureRegistry'],
  },
  {
    need: 'Naming, registry and discovery',
    products: ['ENS or DNS', 'an internal directory', 'a search index', 'an ERC-8004 registry', 'sync jobs between them'],
    config: 'three name systems; a directory schema; an indexer you run; the mapping from name to address to card to endpoint, maintained by hand.',
    seam: 'A name resolves to an address in one place and to an endpoint in another. Discovery is a search box over a table you own.',
    substrate: 'Typed names on chain (`.me .org .svc .treasury`); a registry kit with pluggable membership; discovery projected only from chain state; resolution grants that are never authority.',
    packages: ['agent-naming', 'registry-kit', 'registry-resolution', 'agent-resolution', 'identity-directory', 'identity-directory-adapters', 'capability-claims'],
    contracts: ['AgentNameRegistry', 'AgentNameUniversalResolver', 'AgentNameAttributeResolver', 'PermissionlessSubregistry', 'AgentProfileResolver', 'AgentRegistryBase', 'SkillDefinitionRegistry'],
  },
  {
    need: 'Domain vocabulary',
    products: ['— nothing. It lives in prompts, in tables, and in the heads of two engineers.'],
    config: 'a system prompt per agent that explains the domain; app tables that encode it differently; a glossary in a wiki.',
    seam: 'Three encodings of one fact, none checkable against the others. The one the resolver used was wrong.',
    substrate: 'One ontology, bound by IRI, checked at build. Vault records, Ask vocabulary, agent cards and playbooks are projections of it.',
    packages: ['ontology', 'types', 'surface-catalog'],
    contracts: ['OntologyTermRegistry', 'ShapeRegistry'],
  },
  {
    need: 'Chain access and operations',
    products: ['an RPC provider', 'a block indexer', 'a secrets manager', 'CI you write for nightly checks'],
    config: 'RPC keys per environment; an indexer schema; env vars in a dozen deploys; a service account per service that IS the service\u2019s identity.',
    seam: 'The service-account credential is the identity. Compromise it and you are that agent, for anything, until someone notices.',
    substrate: 'Typed chain reads with no log scans on hot paths; service keys as revocable delegates; live gates run nightly against the real estate; `ap doctor` and `ap conform`.',
    packages: ['chain-state', 'chain-state-viem', 'contracts', 'ap-kms', 'devkit', 'create-app', 'evaluation'],
    contracts: ['SmartAgentPaymaster', 'MultiSendCallOnly'],
  },
] as const;

export const BOM_TOTALS = {
  stitched: [
    { value: '30+', label: 'products to select, contract, integrate', note: 'and keep on the same page, release after release' },
    { value: '3', label: 'identity models', note: 'user id · wallet address · credential id — and the joins' },
    { value: '2', label: 'permission shapes', note: 'roles in a database; caveats on chain; nothing that says which one authorized an act' },
    { value: '3+', label: 'evidence formats', note: 'spans, log lines, attestations — joined by ids you invent' },
    { value: '33', label: 'contracts to write or fork', note: 'then audit, then deploy, then keep in step with the packages' },
    { value: '∞', label: 'seams', note: 'every one of them is where identity becomes a token and a token becomes a log line' },
  ],
  substrate: [
    { value: '77', label: 'packages under one scope', note: '@agenticprimitives/* — one install, one type system, one changelog' },
    { value: '33', label: 'contracts, written and under audit', note: 'ERC-4337 · 7710 · 7579 · 1271 · 6492 — deployed to any EVM' },
    { value: '1', label: 'identity', note: 'the Smart Agent address; credentials rotate around it' },
    { value: '1', label: 'grant mechanism', note: 'a signed, caveated delegation, verified at redemption, revoked in one transaction' },
    { value: '1', label: 'evidence trail', note: 'PROV-O receipts the owner carries; a span is an activity' },
    { value: '0', label: 'seams', note: 'the needs are slots in one model, not products at a boundary' },
  ],
} as const;

export const MANIFESTO: readonly string[] = [
  'You do not make a train safe by slowing it down. You lay track.',
  'A sandbox bounds reach. A grant bounds authority. Only one of them can answer “under whose say-so?”',
  'A click is not consent. A signature is.',
  'The agent is an account. Names, cards, registry rows and DID documents are projections of it.',
  'Revocation that waits for a token to expire is not revocation.',
  'Evidence that lives in the vendor’s trace store is the vendor’s evidence.',
  'The planner may propose anything. It may authorize nothing.',
  'Trust is a relationship you can check, never a score you are handed.',
];

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
    what: 'An upper ontology for everything agentic — agents, credentials, custody, delegation, capabilities, situations, provenance — that a domain ontology imports and subclasses. From the two, an agent archetype bundles skills, capabilities and ontology areas; from the archetype, the A2A signed agent card and the SKILL.md packages are projected. Vault records are ontology-shaped; behaviour is generated from the model; a gate fails the build when code invents a term.',
    replaces: ['prompt-resident domain rules', 'app tables that disagree with each other', 'an agent card typed by hand'],
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

export * from './compare';

// ─── Ontology: how one description of the world reaches every layer ────────────────────────────────────────────

export interface OntologyLayer { layer: string; question: string; binds: string; gate: string; bug: string }

/** Seven layers, one T-box. Each row: what the layer asks the ontology, what binds it by IRI, what checks it, and the bug the binding replaced. */
export const ONTOLOGY_LAYERS: readonly OntologyLayer[] = [
  { layer: 'Ask — the conversation', question: 'Who is "alice"? Which account pays? What is "20 USDC"?', binds: 'party-roles.ts · arg-types.ts · decisions.ts — a party is a KIND plus a RELATION to follow (ap:charteredUnder), never a name match', gate: 'check:ontology-bindings · check:ask-truth', bug: 'The Ask looked for a treasury whose NAME resembled the person\u2019s — alice → alice.treasury. Hers is alice2.treasury. A payment that should have worked dead-ended on a rule nobody wrote down.' },
  { layer: 'Harness — playbooks and plans', question: 'What may this agent mean? What may a plan fan out over?', binds: 'SKILL.md knowledge.requires names T-box classes; plan-shapes.ts says which relations are bounded and owner-recorded', gate: 'the skills compiler refuses an unknown class · check:interaction-coverage', bug: 'A planner improvised "pay every member" over a public search result — an unbounded list of strangers, array-shaped. Nothing could refuse it because the difference lived nowhere.' },
  { layer: 'Agent cards and discovery', question: 'What does the world see? What can it ask?', binds: 'profile.capabilities[] is the record; A2A skills[] and ARD capabilities[] are projections; the KB is RDF and a question is a generated CONSTRUCT query', gate: 'check:capability-vocabulary · SHACL on the KB', bug: 'A card editor titled a section "Capabilities" and filled it with protocol flags, next to "Skills" holding what the agent could do. Backwards twice, in the one screen where a steward decides what the world sees.' },
  { layer: 'Vault records', question: 'What is this record? Which of mine answer this question?', binds: 'vault-records.ts binds every record key to a T-box class; a question compiles to a selector evaluated INSIDE the store', gate: 'check:no-cross-subject-vault-reads · check:privacy-lint', bug: 'A Home listed an organization\u2019s vault faithfully and uselessly — coordination.endeavor:end_05b… · show. Every key was already a class; nothing had said so.' },
  { layer: 'Interaction and coordination', question: 'What situation are we in? Who committed to what?', binds: 'apix:Interaction / Exchange with a pinned profile version; apcoord:Endeavor / CoordinationPlan; SHACL shapes constrain STRUCTURE only', gate: 'cbox/interaction-shapes.shacl.ttl · check:coordination-coverage', bug: 'An unauthorized command must stay shape-valid — refusing to record overreach deletes the evidence. Shapes that encoded permission would have hidden the incident.' },
  { layer: 'Provenance and receipts', question: 'What ran, under whose authority, and what did it touch?', binds: 'run-provenance.jsonld — a run is an ep-plan:ExecutionTraceBundle; a span IS a prov:Activity and names it (ap.prov.activity.id)', gate: 'the context and the T-box are tested byte-for-byte against each other', bug: 'Spans, log lines and attestations joined by ids somebody invented. Three evidence formats; no one graph a stock RDF stack could load.' },
  { layer: 'Identity and the chain', question: 'What kind of agent is this? What does its name say?', binds: 'prov:Person / prov:Organization / prov:SoftwareAgent — mirrored by AgentType in code and atl:agentType on chain; a typed name suffix (.me .org .svc .treasury) names the derived type', gate: 'a mismatched suffix fails closed · check:demo-person-org-distinct', bug: 'A demo person pointed at as his own organization. The operator check compared one address to itself and went green; the workspace switcher walked a person as if he were a parent org.' },
];

export interface OntologyCorrespondence { domain: string; relation: string; upper: string; means: string }

/** How the hold'em coaching module grounds on the upper ontology — subsumption where it is real, alignment where it is not. */
export const HOLDEM_GROUNDING: readonly OntologyCorrespondence[] = [
  { domain: 'th:CoachService', relation: '⊑ cr:CoachService ⊑', upper: 'at:ServiceAgent', means: 'A coaching service a person custodies — its own card, endpoint and playbook; the only language model on the clock. Never the table\u2019s addressee, never a seat.' },
  { domain: 'th:StudyGrant', relation: '⊑ cr:StudyGrant ⊑', upper: 'at:Delegation', means: 'The signed, scoped, revocable authority one person gives ONE service to read her study records and append a note — no spend, no seat, no poker.act. Revoking it on chain fires the coach at the next hand.' },
  { domain: 'th:Consultation', relation: '⊑ cr:Consultation ⊑', upper: 'at:SkillInvocation', means: 'Her own agent asking its coach: the same seat payload the table sent, plus the grant, one hop, no model call on her agent. Refused when the grant is missing or revoked.' },
  { domain: 'th:HandReview', relation: '⊑ cr:PlayReview ⊑', upper: 'at:Assessment', means: 'Asked for in her own words, in her own time, through th:ReviewRequest ⊑ at:SkillInvocation. Never sent at hand end by the table: a review is asked for, or it is a bill.' },
  { domain: 'th:HandRecord · th:CoachNote', relation: '⊑ cr:StudyRecord ⊑', upper: 'at:KnowledgeRecord', means: 'Her records, in her vault. The coach reads them under the grant and writes exactly one kind of thing back — its own notes — into hers, never its own.' },
  { domain: 'th:AdviserAppointment', relation: '⊑ cr:AdviserAppointment ⊑', upper: 'at:RoleBinding', means: 'The person naming her own agent as adviser at a table — a role bound for a while, with a start and an end, not a flag on a row.' },
];

// ─── Build: the vibe-coding entrance ───────────────────────────────────────────────────────────────────────────
//
// You describe the application; a coding agent builds it against the substrate. What the agent needs from us is
// WHERE TO POINT — the two public repositories, the live estate's endpoints, and the six demo people it can sign
// in as while it builds and tests. Everything below is a fact the agent can fetch, never a claim it must trust.

export const BUILD_PROMPT = `Build a card room on Agentic Primitives.

Read https://github.com/agentictrustlabs/agentic-primitives (CLAUDE.md, AGENTS.md, docs/architecture) before you
write anything, and use https://github.com/agentictrustlabs/pokernight as the reference application — it is a
complete card room on the same substrate. Do not copy it; build mine the same way.

People sign in as Smart Agents at their Home (https://www.faithnet.me) — a passkey, not a password. Each player
gets a treasury the Home charters on first connect. A buy-in is a grant the player signs with caveats (this
table, this token, this ceiling, tonight); the house never holds anyone's key.

Two AI players and a coach are A2A agents on the harness. The coach is the texas-holdem/holdem-coach archetype
from https://skills.faithnet.io; it reads a player's hands only under a study grant she signed and never sees
another seat's cards. Every chip that moves leaves a receipt in the player's vault.

Test as the demo people: sign in as alice to play, as bob to custody the coach, as dave to host a club.
Deploy the runtime to Cloudflare Workers and the UI to Vercel. Run ap doctor before you tell me it works.`;

export interface BuildPointer { name: string; url: string; what: string; readFirst?: readonly string[] }

export const BUILD_REPOS: readonly BuildPointer[] = [
  {
    name: 'agentic-primitives',
    url: SITE.github,
    what: 'Ring 0: the 77 packages, the 33 contracts, every spec and ADR, and the agent rules. The coding agent reads CLAUDE.md and AGENTS.md first — they are written for it.',
    readFirst: ['CLAUDE.md', 'AGENTS.md', 'docs/architecture/agent-rules/', 'docs/architecture/package-consumer-map.md', 'docs/architecture/task-routing.md', 'specs/'],
  },
  {
    name: 'pokernight',
    url: SITE.pokerGithub,
    what: 'The reference application — Game Night. A complete card room on the substrate: OIDC client of the Home, a treasury per player, buy-ins as grants, A2A players, a coach under a study grant, Sheqel settlement, receipts. Point the agent at it as the worked example.',
    readFirst: ['README.md', 'CLAUDE.md', 'docs/DESIGN.md', 'docs/AUDIT-2026-09-13.md', 'apps/tables/', 'apps/agent/'],
  },
];

export interface BuildEndpoint { name: string; url: string; use: string; note?: string }

export const BUILD_ENDPOINTS: readonly BuildEndpoint[] = [
  { name: 'Home · OIDC issuer', url: 'https://www.faithnet.me', use: 'Sign people in as Smart Agents; ceremonies (charter a treasury, mint a grant, approve a parked step, revoke).', note: 'Your app is an OIDC client with PKCE. A client_id is registered at the Home — a ceremony, not a form. While prototyping, sign in through the demo people below.' },
  { name: 'Demo sign-in', url: 'https://www.faithnet.me/connect/demo-signin', use: 'POST { handle, client_id } → an AgentSession JWT for a demo person, the same token a passkey ceremony would mint. Roster at /connect/demo-personas.', note: 'A test harness, not a bypass: the token is real, verified the same way, and the personas are throwaway Homes seeded for exactly this.' },
  { name: 'Agent runtime', url: 'https://a2a.faithnet.io', use: 'A2A tasks on the harness; one Durable Object per agent; playbooks by digest.' },
  { name: 'Edge', url: 'https://edge.faithnet.io/api/a2a/<name>', use: 'The standard A2A surface for any named agent; admission on every request; HTTPS required, mTLS optional.' },
  { name: 'Discovery', url: 'https://discovery.faithnet.io/.well-known/ard.json', use: 'The public knowledge base — only what the chain already says. ARD + ACP registry; A2A and MCP question surfaces.' },
  { name: 'Skills registry', url: 'https://skills.faithnet.io', use: 'Ontologies, archetypes, SKILL.md packages and signed agent cards. Pin an archetype by digest with ap upgrade --pin-definitions.' },
  { name: 'faithchain RPC', url: 'https://rpc.faithnet.io', use: 'Chain 34348 · Besu QBFT · 2 s blocks. AgentAccount factory, names, DelegationManager + enforcers, registries, attestations, Sheqel.', note: 'Any EVM works; this one is free to use for testing and is worth nothing anywhere else.' },
  { name: 'Game Night', url: 'https://gamenight.faithnet.io', use: 'The reference app, running. Sign in as a demo person and watch what your app should be able to do.' },
];

export interface DemoPerson { handle: string; name: string; agent: string; role: string; testFor: string }

/** The six demo people on the live Home. Each is a real Home this estate seeded — a real Smart Agent, a real vault. */
export const DEMO_PEOPLE: readonly DemoPerson[] = [
  { handle: 'alice', name: 'Alice Okoro', agent: 'alice.me', role: 'The player. Stewards the organization Missio Nexus; has a treasury the Home chartered for her.', testFor: 'the person flow end to end — sign in, charter, a grant with caveats, an agent acting under it, the receipt in her vault, revocation' },
  { handle: 'bob', name: 'Bob Tanaka', agent: 'bob.me', role: 'Custodies the Hold\u2019em coach service. Not at the table; his service is consulted through the player\u2019s own agent.', testFor: 'a service one person custodies that another person grants access to — the delegate key, the study grant, what the service may and may not see' },
  { handle: 'carol', name: 'Carol Mbeki', agent: 'carol.me', role: 'A second person and counterparty. Can be paid, invited, granted to.', testFor: 'anything with two people in it — a payment to a peer, an invitation, a relationship the vault records' },
  { handle: 'dave', name: 'Dave Silva', agent: 'dave.me', role: 'Hosts a club. An organization he custodies, with members and a table.', testFor: 'organizations — membership as a situation, roles, an org paying from its own balance, a steward approving' },
  { handle: 'elena', name: 'Elena Voss', agent: 'elena.me', role: 'Hosts a second club. A different organization, so two orgs never share a vault.', testFor: 'two organizations side by side — the workspace switcher, acting-as, what one org cannot see of another' },
  { handle: 'nathan', name: 'Nathan', agent: 'nathan.me', role: 'Steward of a workspace with runtime members — AI agents that joined over ACP.', testFor: 'agents as members — an AI agent admitted to a workspace, acting under a grant, showing up in the roster and the receipts' },
];

export interface BuildStep { t: string; b: string; cmd: string | null; pk?: readonly string[] }

export const BUILD_FLOW: readonly BuildStep[] = [
  { t: 'Say what you want', b: 'One paragraph, in domain terms. Name the people, the money, the agents; point at the two repositories and the Home. You are not naming packages, tools or call sequences — that is the agent\u2019s job, and the substrate\u2019s rules tell it how.', cmd: null },
  { t: 'Scaffold a repository that already knows the rules', b: 'The product template ships with the same agent rules that built the substrate — projected into .cursor/rules, AGENTS.md and CLAUDE.md — plus exact pins in agentic.lock.json and CI that runs the doctor. Your coding agent reads them on the first turn.', cmd: 'npx @agenticprimitives/create-app card-room --template product-repo', pk: ['create-app', 'devkit'] },
  { t: 'Give the agent the Developer MCP', b: 'A read-only MCP over your install: which packages exist, what each exports, what an ontology term means, where the contracts are deployed, the recipes, the doctor. The agent asks the substrate instead of guessing. It holds no key and reads no vault.', cmd: 'pnpm ap mcp   # add to Claude as a stdio MCP server', pk: ['devkit'] },
  { t: 'Let it build — and test as the demo people', b: 'Sign-in becomes an OIDC client of a Home; permissions become grants with caveats; agents run on the harness under those grants; inbound agents are admitted at the edge; the agent card is projected, not typed. The agent signs in as alice, bob, dave to exercise each path against the live estate.', cmd: 'pnpm ap upgrade --pin-definitions <skills registry> texas-holdem/holdem-coach', pk: ['agent-account', 'delegation', 'harness', 'a2a', 'admission', 'agent-profile', 'ontology'] },
  { t: 'Let the gates say no', b: 'The doctor fails the build when code invents vocabulary, holds a private key, calls MCP from the browser, or drifts from the pinned rules. Live gates run the real flow against the real estate. Conformance checks the A2A and MCP surfaces. A finding is a review checkpoint — never something the agent can talk its way past.', cmd: 'pnpm ap doctor && pnpm ap test --live-gates live-gates.json && pnpm ap conform a2a https://<your-agent>/a2a', pk: ['devkit', 'evaluation', 'a2a', 'mcp-protocol'] },
  { t: 'Ship. Keep the keys.', b: 'Deploy anywhere the template targets. Your application holds no identity key: the person signs at her Home, the service signs with a revocable delegate, and every protected step leaves a receipt in the owner\u2019s vault. What the agent wrote is fast; what makes it trustworthy was never up to the agent.', cmd: 'pnpm ap upgrade --canary   # one coherent exact set, then doctor', pk: ['provenance', 'verification-receipts', 'ap-kms', 'vault'] },
];

export const BUILD_UNDER_THE_HOOD: readonly { t: string; b: string; pk: readonly string[] }[] = [
  { t: 'Sign people in as Smart Agents', b: 'An OIDC client of a Home. A passkey sign-in yields alice.me — an account, not a session. The Home charters what the app needs on first connect.', pk: ['agent-account', 'connect', 'agent-naming'] },
  { t: 'Express permissions as grants', b: 'A delegation with caveats — targets, methods, ceilings, time — minted at the person\u2019s Home, verified before every action, redeemed on chain when value moves.', pk: ['delegation', 'account-custody', 'tool-policy'] },
  { t: 'Let agents act under those grants', b: 'An A2A agent on the runtime with a playbook compiled from a SKILL.md contract. The harness parks steps that need a mandate; the confirmation is the signature; each step leaves a receipt.', pk: ['harness', 'orchestration', 'a2a', 'context'] },
  { t: 'Admit outside agents at the edge', b: 'A projected, signed Agent Card; inbound A2A over HTTPS with application auth, canonical resolution and Admission. MCP stays private behind admitted runtimes.', pk: ['admission', 'agent-profile', 'agent-resolution'] },
  { t: 'Stand up your own registry', b: 'A registry from the kit with your membership and validation hooks; cards projected to it and, from a sibling repo, to external registries.', pk: ['registry-kit', 'registry-resolution', 'capability-claims'] },
  { t: 'Prove it', b: 'Receipts and PROV-O provenance for every protected step, in the owner\u2019s vault; conformance and live gates in CI.', pk: ['provenance', 'evaluation', 'audit'] },
];

// ─── Audiences ─────────────────────────────────────────────────────────────────────────────────────────────────

export { WRITING, SERIES, ESSAYS, writingBySlug, seriesNeighbors } from './writing';
export type { Writing, WritingKind } from './writing';

export const AUDIENCES = [
  { who: 'Product & business leads', want: 'One platform decision instead of ten vendor integrations, and a story your auditors accept.', get: 'Identity, authority and evidence designed as one system; a reference application you can play today.' },
  { who: 'Architects & platform teams', want: 'Primitives that compose, standards you already know, no framework lock-in.', get: 'Publishable packages with one-directional boundaries, Foundry contracts, A2A/MCP conformance, live gates.' },
  { who: 'Security & compliance', want: '“Who acted, on behalf of whom, under what grant, with which limits?” — answerable for every action.', get: 'On-chain revocation at every gate, receipts bound to intent + mandate, PROV-O graphs the owner holds.' },
] as const;
