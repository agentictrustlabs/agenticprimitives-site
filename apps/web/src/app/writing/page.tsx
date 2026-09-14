import type { Metadata } from 'next';
import Link from 'next/link';
import { ESSAYS, SERIES, SITE } from '@apsite/content';
import { JsonLd, pageMeta } from '@/lib/seo';
import { Section } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'Writing',
  description: `${SITE.author} on the agentic operating model: Rails, Not Throttles, and the 21-part series The missing layer. Full text here — no LinkedIn login required.`,
  path: '/writing',
});

export default function WritingIndex() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Writing',
          url: `${SITE.url}/writing`,
          isPartOf: { '@id': `${SITE.url}/#website` },
        }}
      />
      <PageHero eyebrow="Writing" title={<>The argument,<br />in full.</>} lede="The essays and the 21-part series first appeared on LinkedIn. The full text lives here so anyone — and any model — can read it without a login wall.">
        <a href="/rss.xml" className="btn-outline-light">RSS</a>
        <a href="/llms.txt" className="btn-outline-light">llms.txt</a>
      </PageHero>
      <Section number="01" eyebrow="Essays" title="Rails, not throttles — and the long version.">
        <div className="grid gap-6">
          {ESSAYS.map((w) => (
            <article key={w.slug} className="card">
              <p className="eyebrow">Essay · {w.date}</p>
              <h2 className="h3 mt-2">
                <Link href={`/writing/${w.slug}`} className="hover:text-teal">{w.title}</Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{w.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <Link href={`/writing/${w.slug}`} className="font-semibold text-navy hover:text-teal">Read on this site →</Link>
                {w.linkedin && (
                  <a href={w.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-navy">
                    Originally on LinkedIn
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="cream" number="02" eyebrow="The missing layer · 21 days" title="One idea a day. The argument, in sequence." lede="Week 1 is the anchor. Week 2 is authority. Week 3 is trust, discovery and privacy. Week 4 is acting. Day 21 is what we owe.">
        <ol className="grid gap-3">
          {SERIES.map((w) => (
            <li key={w.slug} className="flex gap-4 rounded-xl border border-line bg-white px-4 py-3">
              <div className="w-10 shrink-0 font-mono text-sm font-semibold text-slate-400">{String(w.day).padStart(2, '0')}</div>
              <div>
                <Link href={`/writing/${w.slug}`} className="font-semibold text-navy hover:text-teal">{w.title}</Link>
                <p className="mt-1 text-sm text-slate-600">{w.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
