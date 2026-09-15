import type { Metadata } from 'next';
import { BUILD_ENDPOINTS, BUILD_REPOS } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { GuidePager } from '@/components/GuideNav';
import { BUILD_PAGES } from '../pages';
import { GuideHead as BuildHead, GuideCode as Code, GuideNote as Note } from '@/components/GuideLayout';

export const metadata: Metadata = pageMeta({
  title: 'Build — where to point the agent',
  description: 'The two public repositories and the live faithnet estate endpoints a coding agent needs to build on Agentic Primitives.',
  path: '/build/point-at',
});

export default function PointAt() {
  return (
    <>
      <BuildHead step="02 · Point at" title="Two repositories. One estate. Give the agent the URLs." lede="A coding agent works from what it can fetch. These are the sources: the substrate itself, a complete reference application, and the live endpoints your application will talk to while it is being built." />

      <section className="mt-12">
        <p className="eyebrow-dark">Repositories</p>
        <div className="mt-4 space-y-4">
          {BUILD_REPOS.map((r) => (
            <div key={r.name} className="card-dark">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <a href={r.url} rel="noreferrer" className="font-mono text-base font-semibold text-white hover:text-brass">{r.url.replace('https://', '')}</a>
                <span className="num-mark">MIT</span>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-slate-300">{r.what}</p>
              {r.readFirst && (
                <div className="mt-3">
                  <span className="text-xs text-slate-500">Read first: </span>
                  {r.readFirst.map((f) => <span key={f} className="mr-1.5 inline-block rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-slate-300">{f}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <p className="eyebrow-dark">The live estate</p>
        <div className="ledger-dark mt-4">
          {BUILD_ENDPOINTS.map((e) => (
            <div key={e.name} className="grid gap-2 py-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
              <div>
                <div className="text-sm font-semibold text-white">{e.name}</div>
                <a href={e.url.replace(/<[^>]+>/g, '')} rel="noreferrer" className="mt-0.5 block break-all font-mono text-[12px] text-brass hover:underline">{e.url}</a>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-slate-300">{e.use}</p>
                {e.note && <p className="mt-1 text-xs leading-relaxed text-slate-500">{e.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <p className="eyebrow-dark">Environment</p>
        <Code>{`# any EVM · any Home — these are the estate's
AP_RPC_URL=https://rpc.faithnet.io
AP_CHAIN_ID=34348
AP_HOME_ISSUER=https://www.faithnet.me
AP_SKILLS_REGISTRY=https://skills.faithnet.io`}</Code>
        <Note>The estate is a testing deployment. Sheqel, the card room&apos;s coin, has an open mint and is worth nothing anywhere else. Build against it freely; read <span className="font-mono">docs/AUDIT-2026-09-13.md</span> in pokernight before pointing any of this at an asset with value.</Note>
      </section>

      <GuidePager pages={BUILD_PAGES} current="/build/point-at" last={{ href: "/examples/game-night", label: "See it built: Game Night" }} />
    </>
  );
}
