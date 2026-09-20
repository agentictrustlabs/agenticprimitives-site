import { AUDITS, ESSAYS, OFFERINGS, SERIES, SITE, WRITING } from '@apsite/content';

export const dynamic = 'force-static';

export function GET() {
  const body = `# Agentic Primitives

> ${SITE.tagline} Identity, authority and evidence designed as one system — not stitched from ten products.

Positioning: the industry answers agent risk with throttles — containment (sandboxes, restricted modes, kill switches), supervision (permission prompts, a second model grading the first) and platform governance (one vendor's ACLs, reversibility and lineage). Each bounds something; none bounds authority, so none can say under whose authority an act happened. Agentic Primitives bounds authority: a grant the principal signs, caveats that are enforcer code, verification on every step outside the model, revocation in one transaction, a receipt the owner carries.

- Canonical site: ${SITE.url}
- Public source: ${SITE.github}
- npm: ${SITE.npm}
- License: MIT
- Author: ${SITE.author} (${SITE.org}) — ${SITE.authorUrl}
- Domain ontologies (Rich Canvas): ${SITE.richCanvas} — services ${SITE.richCanvas}/our-services, CommerceCore ${SITE.richCanvas}/commercecore-ontology, did:aa ${SITE.richCanvas}/didaa, writing ${SITE.richCanvas}/muses-of-an-architect
- Reference Home (sign in, ceremonies, vault): ${SITE.home}
- Skills registry (playbooks by digest, ontology graphs): ${SITE.skills}

The one-sentence claim: when an AI agent spends money or touches data on someone's behalf, this stack can prove who allowed it, what was allowed, and lets them take that permission back — without trusting any single vendor.

Intelligence may be probabilistic. Authority must not be.

## Product pages

- [What is Agentic Primitives?](${SITE.url}/what-is-agentic-primitives): the definition, the three primitives, and how it differs from OpenAI's "agentic primitives" (Skills, Shell, Compaction) and from agent frameworks and registries
- [Thesis](${SITE.url}/thesis): against conventional wisdom — the competing bet vs. the IdP-as-control-plane consensus (NIST NCCoE, OIDF AIIM, IETF WIMSE, CSA, W3C CGs, Visa TAP, Mastercard Agent Pay): thirteen hypotheses, the eleven principles, why they accumulate, who holds which, evidence, risks
- [About](${SITE.url}/about): Agentic Trust Labs, the founder, boilerplate for press
- [Home](${SITE.url}/): positioning, stitched vs seamless, nine offerings
- [Platform](${SITE.url}/platform): Identity, Authority, Harness, Edge, Registry Kit, Evidence, Coordination, Ontology, Operations
- [Assessments](${SITE.url}/audits): published production-readiness assessments (self-assessments, labelled). Latest: ${AUDITS.map((a) => `[${a.title} ${a.date}](${SITE.url}/audits/${a.slug}) — PDF ${SITE.url}${a.pdf}`).join('; ')}
- [Demos](${SITE.url}/demos): every live app on the estate — the Home (faithnet.me), your agent inside Claude (Home MCP), Game Night, Gather27 (find / host / ops), Field, the skills registry — with sign-in personas, a script and what each proves
- [Architecture](${SITE.url}/substrate): Smart Agents, mandates, harness sequence, two knowledge tiers
- [Versus](${SITE.url}/compare): the stack you would buy — 29 products in seven bands (Auth0, Privy, WorkOS, Safe, Pimlico, Turnkey, MetaMask DTK, Cerbos, OpenFGA, HashiCorp Vault, Postgres+RLS, Veramo, EAS, DocuSign, Box, LangGraph, Temporal, MCP SDK, a2a-js, XMTP, Stripe, Kong, ENS, an ERC-8004 registry, Tailscale, Datadog, TopBraid …), the seam each band introduces, and the 77 packages + 33 contracts that cover every row on one identity
- [Versus · the composition](${SITE.url}/compare/composition): eight trust-substrate concerns against six peer families — agent frameworks (MAF, ADK, LangGraph, Dapr, Agno, Strands, Mastra, Pydantic, CrewAI, OpenAI SDK, Buzz), Web2 IAM (Auth0, Okta, Entra), smart accounts + delegation (MetaMask DTK, Smart Sessions, Lit Vincent, Safe, Zodiac, Coinbase, Kite), the ERC agent stack (8004, 8001, 8183, 8196, 8273, 8226), registries (ERC-8004, AGNTCY, NANDA, ANS), data/provenance (Inrupt, PROV-AGENT, OTel). Nobody has the composition.
- [Versus · throttles](${SITE.url}/compare/throttles): containment vs supervision vs platform governance vs authority-as-a-grant
- [Versus · frameworks](${SITE.url}/compare/frameworks): per-framework take/differ and the scorecard
- [Versus · Web3](${SITE.url}/compare/web3): the Web3 trust-substrate landscape and the ERC stack
- [Versus · where we lose](${SITE.url}/compare/honest): where peers are ahead today, what we refuse to take
- [Game Night](${SITE.url}/examples/game-night): complete third-party example (gamenight.faithnet.io)
- [Ontology](${SITE.url}/ontology): the Agentic Trust upper ontology and the Texas hold'em domain ontology; how every layer binds to one T-box by IRI; meaning flows, authority never does
- [Developers](${SITE.url}/developers): package map, standards, status
- [Build](${SITE.url}/build): say what application you want; point a coding agent at github.com/agentictrustlabs/agentic-primitives + /pokernight and the faithnet estate; test as six demo people (alice bob carol dave elena nathan); the flow; the gates
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
