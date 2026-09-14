import type { MetadataRoute } from 'next';
import { SITE } from '@apsite/content';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/platform', '/substrate', '/examples/game-night', '/compare', '/developers', '/ns'].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7,
  }));
}
