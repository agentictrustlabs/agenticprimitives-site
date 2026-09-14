import type { MetadataRoute } from 'next';
import { SITE, WRITING } from '@apsite/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: new Date('2026-09-14'), changeFrequency: 'weekly', priority: 1 },
    ...['/platform', '/substrate', '/examples/game-night', '/compare', '/developers', '/writing', '/brand', '/ns'].map((p) => ({
      url: `${SITE.url}${p}`,
      lastModified: new Date('2026-09-14'),
      changeFrequency: 'weekly' as const,
      priority: p === '/writing' ? 0.8 : 0.7,
    })),
    ...WRITING.map((w) => ({
      url: `${SITE.url}/writing/${w.slug}`,
      lastModified: new Date(w.date),
      changeFrequency: 'monthly' as const,
      priority: w.kind === 'essay' ? 0.8 : 0.6,
    })),
  ];
  return pages;
}
