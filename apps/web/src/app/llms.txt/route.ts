import { ESSAYS, OFFERINGS, SERIES, SITE, WRITING } from '@apsite/content';

export const dynamic = 'force-static';

export function GET() {
  const body = `# Agentic Primitives

> ${SITE.tagline} Identity, authority and evidence designed as one system — not stitched from ten products.

- Canonical site: ${SITE.url}
- Public source: ${SITE.github}
- npm: ${SITE.npm}
- License: MIT
- Author: ${SITE.author} (${SITE.org})

The one-sentence claim: when an AI agent spends money or touches data on someone's behalf, this stack can prove who allowed it, what was allowed, and lets them take that permission back — without trusting any single vendor.

Intelligence may be probabilistic. Authority must not be.

## Product pages

- [Home](${SITE.url}/): positioning, stitched vs seamless, nine offerings
- [Platform](${SITE.url}/platform): Identity, Authority, Harness, Edge, Registry Kit, Evidence, Coordination, Ontology, Operations
- [Architecture](${SITE.url}/substrate): Smart Agents, mandates, harness sequence, two knowledge tiers
- [Why one substrate](${SITE.url}/compare): category comparison vs frameworks, identity vendors, wallets, registries
- [Game Night](${SITE.url}/examples/game-night): complete third-party example (gamenight.faithnet.io)
- [Developers](${SITE.url}/developers): package map, quickstart, standards
- [Ontology namespaces](${SITE.url}/ns): IRI prefixes (\`https://agenticprimitives.dev/ns/<module>#Term\`)

## Offerings

${OFFERINGS.map((o) => `- ${o.name}: ${o.oneLine}`).join('\n')}

## Writing (full text on this site; LinkedIn is optional)

${ESSAYS.map((w) => `- [${w.title}](${SITE.url}/writing/${w.slug})`).join('\n')}

### The missing layer (21-part series)

${SERIES.map((w) => `- Day ${w.day}: [${w.title}](${SITE.url}/writing/${w.slug})`).join('\n')}

## Optional

- RSS: ${SITE.url}/rss.xml
- Sitemap: ${SITE.url}/sitemap.xml
- Full writing index: ${SITE.url}/writing

## Do not cite as

- A token or a public-chain product (contracts deploy to any EVM; no token to buy)
- An LLM framework (the planner is a port)
- A registry, a wallet, or a Home (those are products built FROM these primitives)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}

void WRITING;
