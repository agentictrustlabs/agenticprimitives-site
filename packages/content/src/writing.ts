export type WritingKind = 'essay' | 'series';

export interface Writing {
  slug: string;
  title: string;
  description: string;
  kind: WritingKind;
  date: string;
  day?: number;
  week?: string;
  file: string;
  cover?: string;
  linkedin?: string;
}

/** Standalone essay, then the 21-day "The missing layer" series. Full text lives on this site. */
export const WRITING: readonly Writing[] = [
  {
    slug: 'rails-not-throttles',
    title: 'Rails, Not Throttles: The AI Model We Need to Change Isn’t the LLM',
    description:
      'Trust must be built into the infrastructure, not requested from the intelligence. Why pacing and emergency stops are throttles, and why agentic AI needs rails.',
    kind: 'essay',
    date: '2026-09-14',
    file: 'rails-not-throttles.md',
    linkedin: 'https://www.linkedin.com/pulse/rails-throttles-ai-model-we-need-change-isnt-llm-richard-pedersen-5tyvc',
  },
  {
    slug: 'the-missing-layer',
    title: 'The agentic web has a missing layer — and it isn’t discovery',
    description: 'Day 1 of 21. Identity, authority and evidence are substrate problems. A card format or a faster index cannot fix them.',
    kind: 'series',
    date: '2026-09-01',
    day: 1,
    week: 'The anchor',
    file: '01-the-missing-layer.md',
    cover: '/writing/day-01-missing-layer.png',
  },
  { slug: 'identity-that-signs', title: 'Your agent’s identity should be able to sign', description: 'Day 2. The agent is a smart account, not a name, a token, or a document.', kind: 'series', date: '2026-09-02', day: 2, week: 'The anchor', file: '02-identity-that-signs.md', cover: '/writing/day-02-identity-signs.png' },
  { slug: 'projections', title: 'Names, cards, registry entries: all projections', description: 'Day 3. Delete a listing and you have lost a listing, not an identity.', kind: 'series', date: '2026-09-03', day: 3, week: 'The anchor', file: '03-projections.md', cover: '/writing/day-03-projections.png' },
  { slug: 'credentials-rotate', title: 'Credentials rotate. Identity doesn’t.', description: 'Day 4. Lose a passkey: replace the key, never the address.', kind: 'series', date: '2026-09-04', day: 4, week: 'The anchor', file: '04-credentials-rotate.md', cover: '/writing/day-04-credentials-rotate.png' },
  { slug: 'person-org-service', title: 'Every agent is a person, an organization, or a service', description: 'Day 5. PROV-O’s trichotomy as law. A treasury is a service, never a new class.', kind: 'series', date: '2026-09-05', day: 5, week: 'The anchor', file: '05-person-org-service.md', cover: '/writing/day-05-person-org-service.png' },
  { slug: 'delegation-is-the-artefact', title: 'Delegation is the artefact, not the token', description: 'Day 6. Permission is a signed grant with caveats — not a cached OAuth verdict.', kind: 'series', date: '2026-09-06', day: 6, week: 'Authority', file: '06-delegation-is-the-artefact.md', cover: '/writing/day-06-delegation-artefact.png' },
  { slug: 'checked-once-is-cached', title: 'A grant that is checked once is a grant that is cached', description: 'Day 7. Verify per step. Revocation is final at the next gate.', kind: 'series', date: '2026-09-11', day: 7, week: 'Authority', file: '07-checked-once-is-cached.md', cover: '/writing/day-07-checked-once-cached.png' },
  { slug: 'the-mandate', title: 'The mandate: binding authority to one intent', description: 'Day 8. A yes is not a reusable permission slip.', kind: 'series', date: '2026-09-11', day: 8, week: 'Authority', file: '08-the-mandate.md', cover: '/writing/day-08-mandate.png' },
  { slug: 'confirmation-is-a-signature', title: '“Send Alice 10 dollars” — confirmation is a signature', description: 'Day 9. For high-risk acts, the confirmation IS the mandate.', kind: 'series', date: '2026-09-11', day: 9, week: 'Authority', file: '09-confirmation-is-a-signature.md', cover: '/writing/day-09-confirmation-signature.png' },
  { slug: 'the-key-is-a-delegate', title: 'The service that acts as an agent must never be that agent', description: 'Day 10. A relying service signs with a revocable delegate, never the identity.', kind: 'series', date: '2026-09-11', day: 10, week: 'Authority', file: '10-the-key-is-a-delegate.md', cover: '/writing/day-10-key-is-delegate.png' },
  { slug: 'trust-is-a-graph', title: 'Trust is a graph, not a score', description: 'Day 11. Whether you should let this agent do that is a property of the pair of you.', kind: 'series', date: '2026-09-12', day: 11, week: 'Trust, discovery, privacy', file: '11-trust-is-a-graph.md', cover: '/writing/day-11-trust-graph.png' },
  {
    slug: 'what-registries-are-built-from',
    title: 'Be what registries are built from',
    description: 'Day 12. Many registries will exist. Ship the kit, not a tenant of one.',
    kind: 'series',
    date: '2026-09-12',
    day: 12,
    week: 'Trust, discovery, privacy',
    file: '12-what-registries-are-built-from.md',
    cover: '/writing/day-12-registry-kit.png',
    linkedin: 'https://www.linkedin.com/pulse/day-12-what-registries-built-from-richard-pedersen-wabtc',
  },
  {
    slug: 'resolution-is-not-authority',
    title: 'Resolution is not authority',
    description: 'Day 13. Being findable is never permission to act.',
    kind: 'series',
    date: '2026-09-12',
    day: 13,
    week: 'Trust, discovery, privacy',
    file: '13-resolution-is-not-authority.md',
    cover: '/writing/day-13-resolution-not-authority.png',
    linkedin: 'https://www.linkedin.com/pulse/day-13-resolution-authority-richard-pedersen-sflwc',
  },
  {
    slug: 'two-tiers',
    title: 'Two tiers of knowledge that never meet',
    description: 'Day 14. Public KB vs private vault. A generated query is never why something is disclosed.',
    kind: 'series',
    date: '2026-09-12',
    day: 14,
    week: 'Trust, discovery, privacy',
    file: '14-two-tiers.md',
    cover: '/writing/day-14-two-tiers.png',
    linkedin: 'https://www.linkedin.com/pulse/day-14-two-tiers-knowledge-never-meet-richard-pedersen-qabbc',
  },
  {
    slug: 'vault-is-the-record',
    title: 'The vault is the record; everything else is a cache',
    description: 'Day 15. If the runtime were wiped, the loss is a rebuild — never a bereavement.',
    kind: 'series',
    date: '2026-09-13',
    day: 15,
    week: 'Trust, discovery, privacy',
    file: '15-vault-is-the-record.md',
    cover: '/writing/day-15-vault-is-the-record.png',
    linkedin: 'https://www.linkedin.com/pulse/day-15-vault-record-everything-else-cache-richard-pedersen-9l6fc',
  },
  {
    slug: 'planner-mandate-executor-receipt',
    title: 'Planner proposes, mandate authorizes, executor acts, receipt proves',
    description: 'Day 16. The authority-aware harness, compared honestly to LangGraph, MAF, Dapr and the OpenAI Agents SDK.',
    kind: 'series',
    date: '2026-09-13',
    day: 16,
    week: 'Acting',
    file: '16-planner-mandate-executor-receipt.md',
    cover: '/writing/day-16-propose-authorize-act-prove.png',
    linkedin: 'https://www.linkedin.com/pulse/day-16-planner-proposes-mandate-authorizes-executor-acts-pedersen-bgwkc',
  },
  {
    slug: 'coordination-vs-orchestration',
    title: 'Coordination is not orchestration',
    description: 'Day 17. Work between agents is a different plane from work inside one run.',
    kind: 'series',
    date: '2026-09-14',
    day: 17,
    week: 'Acting',
    file: '17-coordination-vs-orchestration.md',
    cover: '/writing/day-17-coordination-vs-orchestration.png',
    linkedin: 'https://www.linkedin.com/pulse/day-17-coordination-orchestration-richard-pedersen-kne9c',
  },
  {
    slug: 'dont-build-your-app-twice',
    title: 'Don’t build your app twice.',
    description: 'Day 18. The screen and the conversation are two entrances to the same product. Define the feature once — and a definition grants nothing.',
    kind: 'series',
    date: '2026-09-17',
    day: 18,
    week: 'Acting',
    file: '18-dont-build-your-app-twice.md',
    cover: '/writing/day-18-behaviour-generated.png',
    linkedin: 'https://www.linkedin.com/pulse/day-18-dont-build-your-app-twice-richard-pedersen-fsygc',
  },
  {
    slug: 'receipts-that-travel',
    title: 'Receipts that travel with the agent',
    description: 'Day 19. Evidence is the owner’s, not the platform’s.',
    kind: 'series',
    date: '2026-09-17',
    day: 19,
    week: 'Acting',
    file: '19-receipts-that-travel.md',
    cover: '/writing/day-19-receipts-that-travel.png',
    linkedin: 'https://www.linkedin.com/pulse/day-19-receipts-travel-agent-richard-pedersen-ju8yc',
  },
  {
    slug: 'https-mtls-admission',
    title: 'HTTPS required, mTLS optional, admission always',
    description: 'Day 20. A certificate is transport evidence, never authority.',
    kind: 'series',
    date: '2026-09-17',
    day: 20,
    week: 'Acting',
    file: '20-https-mtls-admission.md',
    cover: '/writing/day-20-admission-always.png',
    linkedin: 'https://www.linkedin.com/pulse/day-20-https-required-mtls-optional-admission-always-richard-pedersen-dlxxc',
  },
  {
    slug: 'rails-not-throttles-day-21',
    title: 'Rails, not throttles',
    description: 'Day 21. A throttle makes a dangerous agent slower. A rail makes an unauthorized act impossible to commit.',
    kind: 'series',
    date: '2026-09-17',
    day: 21,
    week: 'Close',
    file: '21-rails-not-throttles.md',
    cover: '/writing/day-21-what-we-owe.png',
    linkedin: 'https://www.linkedin.com/pulse/day-21-rails-throttles-richard-pedersen-nyzjc',
  },
];

export const SERIES = WRITING.filter((w) => w.kind === 'series');
export const ESSAYS = WRITING.filter((w) => w.kind === 'essay');

export function writingBySlug(slug: string): Writing | undefined {
  return WRITING.find((w) => w.slug === slug);
}

export function seriesNeighbors(slug: string): { prev?: Writing; next?: Writing } {
  const i = SERIES.findIndex((w) => w.slug === slug);
  if (i < 0) return {};
  return { prev: SERIES[i - 1], next: SERIES[i + 1] };
}
