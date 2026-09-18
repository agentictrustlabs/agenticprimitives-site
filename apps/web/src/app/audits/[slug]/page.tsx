import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { AUDITS, auditBySlug, SITE } from '@apsite/content';
import { Markdown } from '@/components/Markdown';
import { JsonLd, pageMeta } from '@/lib/seo';
import { Ledger } from '@/components/ui';

export function generateStaticParams() {
  return AUDITS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = auditBySlug(slug);
  if (!a) return {};
  return pageMeta({ title: `${a.title} (${a.date})`, description: a.verdict, path: `/audits/${a.slug}`, type: 'article', published: a.date });
}

function body(file: string): string {
  // Drop the YAML front matter and the leading H1 (the hero carries both); the rest renders as written.
  const raw = readFileSync(join(process.cwd(), 'content/audits', file), 'utf8').replace(/\r\n/g, '\n');
  const noFm = raw.startsWith('---\n') ? raw.slice(raw.indexOf('\n---\n', 4) + 5) : raw;
  return noFm.replace(/^\s*# [^\n]+\n/, '');
}

export default async function AuditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = auditBySlug(slug);
  if (!a) notFound();
  const url = `${SITE.url}/audits/${a.slug}`;
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Report',
          headline: `${a.title} — ${a.date}`,
          description: a.verdict,
          datePublished: a.date,
          author: { '@type': 'Organization', name: SITE.org, url: SITE.url },
          publisher: { '@type': 'Organization', name: SITE.org, url: SITE.url },
          mainEntityOfPage: url,
          url,
          encoding: { '@type': 'MediaObject', encodingFormat: 'application/pdf', contentUrl: `${SITE.url}${a.pdf}` },
        }}
      />
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-dark absolute inset-0" aria-hidden />
        <div className="glow-brass absolute inset-0" aria-hidden />
        <div className="container-x relative grid items-end gap-12 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div>
            <p className="eyebrow-dark">Assessment · {a.date} · repository HEAD {a.head}</p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-5xl">{a.title}</h1>
            <p className="mt-3 text-lg text-slate-400">{a.subtitle}</p>
            <p className="mt-8 border-l-2 border-brass pl-5 text-lg leading-relaxed text-white">{a.verdict}</p>
            <p className="mt-6 text-sm text-slate-400">{a.status}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={a.pdf} className="btn-brass">Download the PDF</a>
              <Link href="/audits" className="btn-outline-light">All assessments</Link>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-ink-2/80 p-6 backdrop-blur">
            <span className="eyebrow-dark">The numbers</span>
            <div className="mt-4">
              <Ledger dark rows={a.numbers.map((n) => ({ k: n.k, v: n.v }))} cols="md:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]" />
            </div>
          </div>
        </div>
      </section>
      <div className="bg-white">
        <article className="container-x max-w-4xl py-14 md:py-20">
          <Markdown source={body(a.file)} />
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm">
            <Link href="/audits" className="text-slate-500 hover:text-navy">← All assessments</Link>
            <a href={a.pdf} className="text-slate-500 hover:text-navy">This document as PDF</a>
          </div>
        </article>
      </div>
    </>
  );
}
