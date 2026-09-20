import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Markdown } from '@/components/Markdown';
import { pageMeta } from '@/lib/seo';
import { GuideHead } from '@/components/GuideLayout';
import { GuidePager } from '@/components/GuideNav';
import { COMPARE_PAGES } from '../pages';

export const metadata: Metadata = pageMeta({
  title: 'Versus — who could assemble it',
  description: 'Competitive analysis of the horizontal agentic market: who could assemble a substrate-and-estate capability by early 2027 — Cloudflare, Okta and Entra, AWS AgentCore and Google AP2, the Web3 stacks — where Agentic Primitives stands, and the dated deficiencies.',
  path: '/compare/assemble',
});

export default function Assemble() {
  const body = readFileSync(join(process.cwd(), 'content/compare/assemble.md'), 'utf8');
  return (
    <>
      <GuideHead step="07 · Who could assemble it" title="The horizontal field, three to five months out." lede="Assume the approach is right and that we use the whole Cloudflare platform. Who in the horizontal agentic market could assemble a similar substrate-and-estate capability by early 2027, with what, and where would that leave us — function by function, with the deficiencies dated to when they start to matter." />
      <div className="mt-10 rounded-xl border border-white/10 bg-white p-6 md:p-10">
        <Markdown source={body} />
      </div>
      <GuidePager pages={COMPARE_PAGES} current="/compare/assemble" last={{ href: '/thesis/review', label: 'The critical review of the thesis' }} />
    </>
  );
}
