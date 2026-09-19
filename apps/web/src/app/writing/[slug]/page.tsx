import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { KIT_MAP, SERIES, SITE, seriesNeighbors, writingBySlug, WRITING } from '@apsite/content';
import { Markdown } from '@/components/Markdown';
import { JsonLd, pageMeta } from '@/lib/seo';
import { essayBody } from '@/lib/essays';

export function generateStaticParams() {
  return WRITING.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = writingBySlug(slug);
  if (!w) return {};
  return pageMeta({
    title: w.title,
    description: w.description,
    path: `/writing/${w.slug}`,
    type: 'article',
    image: w.cover ?? '/og.png',
    published: w.date,
  });
}

export default async function Essay({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = writingBySlug(slug);
  if (!w) notFound();
  const raw = essayBody(slug);
  const { prev, next } = seriesNeighbors(slug);
  const url = `${SITE.url}/writing/${w.slug}`;
  // Lift a leading "# Title" out of the body so the head can be set in the hero.
  const blocks = raw.replace(/\r\n/g, '\n').split(/\n{2,}/);
  const first = blocks[0]?.trim() ?? '';
  const heading = first.startsWith('# ') ? first.slice(2) : w.title;
  const body = first.startsWith('# ') ? blocks.slice(1).join('\n\n') : raw;
  const kicker = w.kind === 'series' ? `Day ${w.day} of ${SERIES.length} · The missing layer${w.week ? ` · ${w.week}` : ''}` : 'Essay';
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: w.title,
          description: w.description,
          datePublished: w.date,
          author: { '@type': 'Person', name: SITE.author, url: SITE.authorUrl, sameAs: [SITE.richCanvas, 'https://www.linkedin.com/in/richardpedersen1'] },
          publisher: { '@type': 'Organization', name: SITE.org, url: SITE.url },
          mainEntityOfPage: url,
          image: `${SITE.url}${w.cover ?? '/og.png'}`,
          url,
          ...(w.linkedin ? { sameAs: w.linkedin } : {}),
        }}
      />
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-dark absolute inset-0" aria-hidden />
        <div className="glow-brass absolute inset-0" aria-hidden />
        <div className="container-x relative max-w-3xl py-20 md:py-28">
          <p className="eyebrow-dark">
            {kicker}
            {' · '}
            <time dateTime={w.date}>{w.date}</time>
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-5xl">{heading}</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">{w.description}</p>
          <p className="mt-8 text-sm text-slate-400">
            <a href={SITE.authorUrl} rel="noreferrer" className="hover:text-white">{SITE.author}</a> · {SITE.org} ·{' '}
            <a href={SITE.richCanvas} rel="noreferrer" className="hover:text-white">Rich Canvas</a>
          </p>
        </div>
      </section>
      <div className="bg-white">
      <article className="container-x max-w-3xl py-14 md:py-20">
        {w.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={w.cover} alt="" className="w-full rounded-2xl border border-line" />
        )}
        <div className={w.cover ? 'mt-10' : ''}>
          <Markdown source={body} />
        </div>
        {KIT_MAP[w.slug] && (
          <aside className="mt-12 rounded-xl border border-line bg-cream p-6" aria-label="In the kit">
            <div className="flex items-baseline justify-between gap-4">
              <span className="eyebrow">In the kit</span>
              <span className="text-xs text-slate-500">Where this idea is implemented — packages, contracts, docs, and a demo that shows it.</span>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {KIT_MAP[w.slug]!.map((r) => {
                const ext = r.href.startsWith('http');
                const inner = (
                  <>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{r.kind}</span>
                    <span className={`block ${r.kind === 'package' ? 'font-mono text-[13px]' : 'text-sm font-semibold'} text-navy group-hover:text-teal`}>{r.label}</span>
                  </>
                );
                return (
                  <li key={r.href + r.label}>
                    {ext ? (
                      <a href={r.href} className="group block rounded-lg border border-line bg-white px-4 py-3 hover:border-navy" target="_blank" rel="noreferrer">{inner}</a>
                    ) : (
                      <Link href={r.href} className="group block rounded-lg border border-line bg-white px-4 py-3 hover:border-navy">{inner}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
        )}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm">
          <span className="flex flex-wrap gap-4">
            <Link href="/writing" className="text-slate-500 hover:text-navy">← All writing</Link>
            <a href={`${SITE.richCanvas}/muses-of-an-architect`} rel="noreferrer" className="text-slate-500 hover:text-navy">More at Rich Canvas: Muses of an architect</a>
          </span>
          {w.linkedin && (
            <a href={w.linkedin} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-navy">
              Discuss on LinkedIn
            </a>
          )}
        </div>
        {(prev || next) && (
          <nav className="mt-8 grid gap-4 border-t border-line pt-8 md:grid-cols-2" aria-label="Series">
            {prev ? (
              <Link href={`/writing/${prev.slug}`} className="card hover:border-navy">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Previous</div>
                <div className="mt-1 font-semibold text-navy">Day {prev.day}: {prev.title}</div>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/writing/${next.slug}`} className="card hover:border-navy md:text-right">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Next</div>
                <div className="mt-1 font-semibold text-navy">Day {next.day}: {next.title}</div>
              </Link>
            )}
          </nav>
        )}
      </article>
      </div>
    </>
  );
}
