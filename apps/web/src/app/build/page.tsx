import type { Metadata } from 'next';
import Link from 'next/link';
import { BUILD_PROMPT } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { BuildPager } from './BuildNav';
import { BuildHead, Note } from './_ui';

export const metadata: Metadata = pageMeta({
  title: 'Build — say what kind of application you want',
  description: 'Describe the application in domain terms, point a coding agent at two repositories and a Home, test as six demo people, and let the gates keep it honest.',
  path: '/build',
});

export default function BuildStart() {
  return (
    <>
      <BuildHead
        step="01 · Start"
        title={<>Say what kind of application you want. Point at the substrate. Let the agent build it.</>}
        lede="You do not assemble thirty products or read six quickstarts. You write one paragraph, in domain terms, and tell the coding agent where to look. The packages and contracts already agree with each other; the rules the agent reads on its first turn say how they are used; a set of gates it cannot argue with says when it is wrong."
      />

      <section className="mt-12">
        <p className="eyebrow-dark">The prompt — all of it</p>
        <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-ink-2 p-6 font-sans text-[15px] leading-relaxed text-slate-100">{BUILD_PROMPT}</pre>
        <Note>No package names. No tool names. No call sequence. Two repositories, one Home, one registry, three demo people to test as. Everything else the agent fetches — it never has to trust a sentence on this site.</Note>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {([
          ['Point at', 'Two public repositories and the live estate’s endpoints — the agent reads code, not prose.', '/build/point-at'],
          ['Test as', 'Six demo people with real Homes, real Smart Agents and real vaults. Sign in as them; exercise every path.', '/build/demo-people'],
          ['Let the gates say no', 'The doctor, the live gates and conformance. A finding is a checkpoint the agent cannot talk past.', '/build/gates'],
        ] as const).map(([k, v, href]) => (
          <Link key={k} href={href} className="card-dark block hover:border-white/25">
            <div className="text-sm font-semibold text-white">{k}</div>
            <div className="mt-1 text-sm leading-relaxed text-slate-400">{v}</div>
          </Link>
        ))}
      </section>

      <section className="mt-12 card-dark">
        <p className="eyebrow-dark">Why this is not just vibe coding</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-300">Vibe coding a permission system gets you a permission system that looks right. Here the agent cannot write one: authority is a contract on chain it can only call, the person signs at her own Home, and every protected act leaves a receipt she carries. The generated part is behaviour. The part that must not be probabilistic never was.</p>
      </section>

      <BuildPager current="/build" />
    </>
  );
}
