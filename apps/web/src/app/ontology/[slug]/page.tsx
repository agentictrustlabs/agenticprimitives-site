import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ONTOLOGY_DOCS, ontologyDocBySlug, SITE } from '@apsite/content';
import { Markdown } from '@/components/Markdown';
import { PageHero } from '@/components/PageHero';
import { JsonLd, pageMeta } from '@/lib/seo';

export function generateStaticParams() {
  return ONTOLOGY_DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = ontologyDocBySlug(slug);
  if (!d) return {};
  return pageMeta({ title: d.title, description: d.summary, path: `/ontology/${d.slug}`, type: 'article', published: d.date });
}

function body(file: string): string {
  const raw = readFileSync(join(process.cwd(), 'content/ontology', file), 'utf8').replace(/\r\n/g, '\n');
  return raw.replace(/^\s*# [^\n]+\n+/, '');
}

export default async function OntologyDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = ontologyDocBySlug(slug);
  if (!d) notFound();
  const url = `${SITE.url}/ontology/${d.slug}`;
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
        }}
      />
      <PageHero eyebrow={`Ontology · ${d.date}`} title={d.title} lede={d.summary}>
        <Link href="/ontology" className="btn-outline-light">Ontology</Link>
        <a href={SITE.github} className="btn-outline-light" rel="noreferrer">Source repository</a>
      </PageHero>
      <div className="bg-white">
        <article className="container-x max-w-4xl py-14 md:py-20">
          <Markdown source={body(d.file)} />
          <div className="mt-12 border-t border-line pt-6 text-sm">
            <Link href="/ontology" className="text-slate-500 hover:text-navy">← Ontology</Link>
          </div>
        </article>
      </div>
    </>
  );
}
