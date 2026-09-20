import type { Metadata } from 'next';
import Link from 'next/link';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Markdown } from '@/components/Markdown';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'The outside critique, in full',
  description: 'The critical review of the Agentic Primitives thesis that the site’s own review draws on — published unedited in substance, with its sources.',
  path: '/thesis/review/input',
  type: 'article',
  published: '2026-09-20',
});

export default function ReviewInput() {
  const body = readFileSync(join(process.cwd(), 'content/thesis/critical-review.md'), 'utf8');
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid-dark absolute inset-0" aria-hidden />
        <div className="container-x relative max-w-4xl py-16 md:py-20">
          <p className="eyebrow-dark">Against the thesis · the outside critique · 2026-09-20</p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">Agentic Primitives Substrate and Estate: a critical review</h1>
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-slate-400">The strongest outside case against the thesis we have received, published in full and unsoftened. The site’s own review — which agrees with parts of this, disagrees with others, and reaches its own conclusions against the substrate’s code and deployments — is <Link href="/thesis/review" className="text-white underline-offset-2 hover:underline">here</Link>.</p>
        </div>
      </section>
      <div className="bg-white">
        <article className="container-x max-w-4xl py-14 md:py-20">
          <Markdown source={body} />
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm">
            <Link href="/thesis/review" className="text-slate-500 hover:text-navy">← The site’s review</Link>
            <Link href="/thesis" className="text-slate-500 hover:text-navy">The thesis</Link>
          </div>
        </article>
      </div>
    </>
  );
}
