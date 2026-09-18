import type { Metadata } from 'next';
import Link from 'next/link';
import { AUDITS, SITE } from '@apsite/content';
import { JsonLd, pageMeta } from '@/lib/seo';
import { Section } from '@/components/ui';
import { PageHero } from '@/components/PageHero';

export const metadata: Metadata = pageMeta({
  title: 'Assessments — production readiness, published',
  description: 'Published production-readiness assessments of Agentic Primitives: the verdict, the numbers, every package and contract, the open findings register. Self-assessments from the repository’s own evidence, labelled as such.',
  path: '/audits',
});

export default function Audits() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Assessments', url: `${SITE.url}/audits`, isPartOf: { '@id': `${SITE.url}/#website` } }} />
      <PageHero eyebrow="Assessments" title={<>Where the project stands,<br />in writing.</>} lede="Every finding ever logged is public. These are the full assessments — what we would hand a third-party auditor today — with the verdict first and the gaps named, dated and ordered." />
      <Section number="01" eyebrow="Published" title="Assessments">
        <div className="grid gap-6">
          {AUDITS.map((a) => (
            <article key={a.slug} className="card">
              <p className="eyebrow">{a.date} · HEAD {a.head} · self-assessment</p>
              <h2 className="h3 mt-2"><Link href={`/audits/${a.slug}`} className="hover:text-teal">{a.title}</Link></h2>
              <p className="mt-1 text-sm text-slate-500">{a.subtitle}</p>
              <p className="mt-4 border-l-2 border-amber pl-4 text-[15px] font-semibold text-navy">{a.verdict}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{a.summary}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <Link href={`/audits/${a.slug}`} className="font-semibold text-navy hover:text-teal">Read on this site →</Link>
                <a href={a.pdf} className="text-slate-500 hover:text-navy">PDF</a>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
