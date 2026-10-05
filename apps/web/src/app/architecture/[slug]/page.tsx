import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ARCHITECTURE_DOCS, architectureDocBySlug, SITE } from '@apsite/content';
import { Markdown } from '@/components/Markdown';
import { PageHero } from '@/components/PageHero';
import { JsonLd, pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return ARCHITECTURE_DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = architectureDocBySlug(slug);
  if (!d) return {};
  return pageMeta({ title: d.title, description: d.summary, path: `/architecture/${d.slug}`, type: 'article', published: d.date });
}

function body(file: string): string {
  const raw = readFileSync(join(process.cwd(), 'content/architecture', file), 'utf8').replace(/\r\n/g, '\n');
  return raw.replace(/^\s*# [^\n]+\n+/, '');
}

export default async function ArchitectureDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = architectureDocBySlug(slug);
  if (!d) notFound();
  const url = `${SITE.url}/architecture/${d.slug}`;
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: d.title,
          description: d.summary,
          datePublished: d.date,
          author: { '@type': 'Organization', name: SITE.org, url: SITE.url },
          publisher: { '@type': 'Organization', name: SITE.org, url: SITE.url },
          mainEntityOfPage: url,
          url,
          image: `${SITE.url}${d.hero}`,
        }}
      />
      <PageHero eyebrow={`Architecture · ${d.date}`} title={d.title} lede={d.summary}>
        <Link href="/architecture" className="btn-outline-light">Architecture notes</Link>
        <Link href="/platform" className="btn-outline-light">Platform</Link>
      </PageHero>
      <div className="bg-white">
        <article className="container-x max-w-4xl py-14 md:py-20">
          <Markdown source={body(d.file)} />
          <div className="mt-12 border-t border-line pt-6 text-sm">
            <Link href="/architecture" className="text-slate-500 hover:text-navy">← Architecture notes</Link>
          </div>
        </article>
      </div>
    </>
  );
}
