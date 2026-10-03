// Published ontology notes. The Markdown is copied from agenticprimitives
// docs/architecture — edit there, then copy into apps/web/content/ontology.

export interface OntologyDoc {
  slug: string;
  title: string;
  date: string;
  /** ≤160 characters, for the meta description. */
  summary: string;
  file: string;
}

export const ONTOLOGY_DOCS: readonly OntologyDoc[] = [
  {
    slug: 'membership-role-stewardship',
    title: 'Membership, role, and stewardship',
    date: '2026-10-01',
    summary:
      'People and teams belong to an organization. A workspace names that organization and reaches them through it.',
    file: 'membership-role-stewardship.md',
  },
];

export function ontologyDocBySlug(slug: string): OntologyDoc | undefined {
  return ONTOLOGY_DOCS.find((d) => d.slug === slug);
}
