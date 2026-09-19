// Where each day of the series lives in the kit: the packages, contracts, docs and pages that implement the idea.
// This is what the site's copy of an article has that the LinkedIn copy does not.

const GH = 'https://github.com/agentictrustlabs/agentic-primitives/blob/main';
const NPM = 'https://www.npmjs.com/package/@agenticprimitives';

export interface KitRef { label: string; href: string; kind: 'package' | 'contract' | 'doc' | 'page' | 'demo' }
const pkg = (n: string): KitRef => ({ label: `@agenticprimitives/${n}`, href: `${NPM}/${n}`, kind: 'package' });
const contract = (n: string, anchor = ''): KitRef => ({ label: n, href: `${GH}/docs/contracts.md${anchor}`, kind: 'contract' });
const doc = (label: string, path: string): KitRef => ({ label, href: `${GH}/${path}`, kind: 'doc' });
const page = (label: string, href: string): KitRef => ({ label, href, kind: 'page' });
const demo = (label: string, id: string): KitRef => ({ label, href: `/demos#${id}`, kind: 'demo' });

/** Keyed by series slug. */
export const KIT_MAP: Readonly<Record<string, readonly KitRef[]>> = {
  'the-missing-layer': [page('The substrate, layer by layer', '/substrate'), page('Versus the alternatives', '/compare'), doc('Principles', 'docs/principles.md'), demo('Run every app on it', 'home')],
  'identity-that-signs': [pkg('agent-account'), pkg('account-custody'), contract('AgentAccount (ERC-4337, ERC-1271)'), doc('Principle 1 — the address is the identity', 'docs/principles.md#1-the-address-is-the-identity-the-name-is-a-facet'), demo('Sign in at the Home', 'home')],
  projections: [pkg('agent-naming'), pkg('agent-profile'), pkg('registry-kit'), pkg('registry-resolution'), contract('AgentNameRegistry · AgentProfileResolver')],
  'credentials-rotate': [pkg('account-custody'), contract('CustodyPolicy module'), doc('Principle 2 — credentials rotate, the identity does not', 'docs/principles.md#2-credentials-rotate-the-identity-does-not')],
  'person-org-service': [pkg('ontology'), page('One ontology, every layer', '/ontology'), doc('Typed subregistries on chain', 'docs/contracts.md'), doc('Principle 8 — authenticating as a person is not being them', 'docs/principles.md#8-authenticating-as-a-person-is-not-being-them')],
  'delegation-is-the-artefact': [pkg('delegation'), contract('DelegationManager + enforcers'), doc('Principle 3 — a token says who, a delegation says what', 'docs/principles.md#3-a-token-says-who-a-delegation-says-what'), doc('Delegation design skill', 'skills/agenticprimitives-delegation-design/SKILL.md'), demo('A grant with caveats, then revoke it', 'gamenight')],
  'checked-once-is-cached': [pkg('harness'), pkg('delegation'), doc('Controls catalog — which control stops what', 'docs/controls-catalog.md'), demo('Revoke, then try again', 'gamenight')],
  'the-mandate': [contract('DigestBindingEnforcer + PaymentEnforcer', '#a-mandate-is-a-delegation-with-two-more-caveats'), pkg('delegation'), pkg('payments'), page('Mandate anatomy', '/substrate'), demo('A buy-in is a mandate', 'gamenight')],
  'confirmation-is-a-signature': [pkg('harness'), pkg('tool-policy'), contract('DigestBindingEnforcer', '#a-mandate-is-a-delegation-with-two-more-caveats'), demo('Sign the buy-in at the Home', 'gamenight')],
  'the-key-is-a-delegate': [pkg('delegated-signer'), pkg('key-custody'), doc('Principle 4 — your app is a delegate, never a custodian', 'docs/principles.md#4-your-app-is-a-delegate-never-a-custodian'), demo('Claude holds a delegate, not you', 'ask')],
  'trust-is-a-graph': [pkg('registry-resolution'), pkg('attestations'), pkg('verification-receipts'), pkg('agent-relationships'), demo('Discovery returns evidence, not a score', 'ask')],
  'what-registries-are-built-from': [pkg('registry-kit'), contract('AgentRegistryBase · PermissionlessSubregistry'), page('Registries in the composition', '/compare/composition'), demo('Gather27 — a listing is a signed event', 'gather27')],
  'resolution-is-not-authority': [pkg('agent-resolution'), pkg('registry-resolution'), pkg('admission'), doc('Principle 8 — authenticating as a person is not being them', 'docs/principles.md#8-authenticating-as-a-person-is-not-being-them'), demo('Find an agent, then ask it', 'ask')],
  'two-tiers': [pkg('context'), doc('interactions-client — the kit’s typed ops', 'packages/interactions-client'), doc('Interactions API — the vault is reached only through it', 'docs/interactions-api.md'), demo('Find is public; the host’s records are not', 'gather27')],
  'vault-is-the-record': [pkg('vault'), doc('interactions-client — the kit’s typed ops', 'packages/interactions-client'), doc('Principle 5 — records live in the owner’s vault', 'docs/principles.md#5-records-live-in-the-owners-vault-not-your-database'), doc('The rebuild-or-bereavement test', 'AGENTS.md'), demo('Open your vault at the Home', 'home')],
  'planner-mandate-executor-receipt': [pkg('harness'), pkg('orchestration'), pkg('tool-policy'), pkg('audit'), pkg('provenance'), page('The harness sequence', '/substrate'), page('Versus the frameworks', '/compare/frameworks')],
  'coordination-vs-orchestration': [pkg('coordination'), pkg('orchestration'), page('Coordination in the composition', '/compare/composition')],
  'dont-build-your-app-twice': [pkg('capability-claims'), pkg('surface-catalog'), pkg('ontology'), page('One ontology, every layer', '/ontology'), demo('Skills registry — playbooks by digest', 'skills')],
  'receipts-that-travel': [pkg('audit'), pkg('provenance'), pkg('verification-receipts'), pkg('witness'), demo('A receipt per buy-in, held by Alice', 'gamenight')],
  'https-mtls-admission': [pkg('admission'), pkg('edge-runtime'), pkg('mcp-oauth'), doc('Live endpoints', 'docs/live-endpoints.md'), doc('Controls catalog', 'docs/controls-catalog.md')],
  'rails-not-throttles-day-21': [page('Versus · throttles', '/compare/throttles'), page('Where we lose, and what we refuse', '/compare/honest'), page('Production readiness assessment', '/audits'), doc('Rails, not throttles — in the kit docs', 'docs/rails-not-throttles.md')],
};
