// Published architecture notes. The Markdown is copied from agenticprimitives docs/architecture — edit there, then
// copy into apps/web/content/architecture with image paths rewritten to /architecture/*.svg. The pictures are
// rendered from @apsite/diagrams by apps/web/scripts/render-diagrams.mts.

export interface ArchitectureDoc {
  slug: string;
  title: string;
  date: string;
  /** ≤160 characters, for the meta description. */
  summary: string;
  file: string;
  /** The picture the index card shows. */
  hero: string;
}

export const ARCHITECTURE_DOCS: readonly ArchitectureDoc[] = [
  {
    slug: 'estate',
    title: 'The estate and the federation',
    date: '2026-10-04',
    summary:
      'An estate is one deployment: Home, runtime, vault, edge, Home MCP and its chain. Estates share naming, a public graph and registries.',
    file: 'estate-architecture.md',
    hero: '/architecture/federation.svg',
  },
  {
    slug: 'chains',
    title: 'Chains and estates',
    date: '2026-10-04',
    summary:
      'Estates share private and public EVM chains. Authority is chain-local; evidence and value cross. One principal across chains, from ERC-8004 and ENS v2.',
    file: 'chains-and-estates.md',
    hero: '/architecture/chains-and-estates.svg',
  },
];

export function architectureDocBySlug(slug: string): ArchitectureDoc | undefined {
  return ARCHITECTURE_DOCS.find((d) => d.slug === slug);
}
