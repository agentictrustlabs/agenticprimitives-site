import { SITE, WRITING } from '@apsite/content';

export const dynamic = 'force-static';

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function GET() {
  const items = [...WRITING]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((w) => {
      const url = `${SITE.url}/writing/${w.slug}`;
      return `<item><title>${esc(w.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(w.date).toUTCString()}</pubDate><description>${esc(w.description)}</description></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE.name)}</title><link>${SITE.url}</link><description>${esc(SITE.tagline)}</description><language>en-us</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
