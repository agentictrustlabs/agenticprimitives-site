import type { MetadataRoute } from 'next';
import { AUDITS, SITE, WRITING } from '@apsite/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: new Date('2026-09-19'), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE.url}/thesis`, lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/thesis/review`, lastModified: new Date('2026-09-20'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE.url}/what-is-agentic-primitives`, lastModified: new Date('2026-09-19'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE.url}/about`, lastModified: new Date('2026-09-19'), changeFrequency: 'monthly', priority: 0.8 },
    ...['/platform', '/substrate', '/demos', '/examples/game-night', '/compare', '/compare/throttles', '/compare/frameworks', '/compare/web3', '/compare/composition', '/compare/honest', '/developers', '/ontology', '/build', '/build/point-at', '/build/demo-people', '/build/flow', '/build/gates', '/writing', '/brand', '/ns', '/audits'].map((p) => ({
      url: `${SITE.url}${p}`,
      lastModified: new Date('2026-09-14'),
      changeFrequency: 'weekly' as const,
      priority: p === '/writing' ? 0.8 : 0.7,
    })),
    ...AUDITS.map((a) => ({ url: `${SITE.url}/audits/${a.slug}`, lastModified: new Date(a.date), changeFrequency: 'monthly' as const, priority: 0.7 })),
    ...WRITING.map((w) => ({
      url: `${SITE.url}/writing/${w.slug}`,
      lastModified: new Date(w.date),
      changeFrequency: 'monthly' as const,
      priority: w.kind === 'essay' ? 0.8 : 0.6,
    })),
  ];
  return pages;
}
