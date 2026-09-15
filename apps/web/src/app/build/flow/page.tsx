import type { Metadata } from 'next';
import { BUILD_FLOW, BUILD_UNDER_THE_HOOD } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { Tag } from '@/components/ui';
import { GuidePager } from '@/components/GuideNav';
import { BUILD_PAGES } from '../pages';
import { GuideHead as BuildHead, GuideCode as Code, GuideNote as Note } from '@/components/GuideLayout';

export const metadata: Metadata = pageMeta({
  title: 'Build — the flow',
  description: 'Six steps from an empty directory to a deployed, accountable agentic application — done by a coding agent against the substrate.',
  path: '/build/flow',
});

export default function Flow() {
  return (
    <>
      <BuildHead step="04 · The flow" title="Six steps. One session. The agent does them; you read the receipts." lede="The classical quickstart — a package per step, a config block at the end — is still exactly what happens. It is no longer what you do." />

      <ol className="mt-12 space-y-4">
        {BUILD_FLOW.map((s, i) => (
          <li key={s.t} className="card-dark">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brass font-mono text-sm font-semibold text-ink">{i + 1}</div>
              <h2 className="text-lg font-semibold text-white">{s.t}</h2>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{s.b}</p>
            {s.cmd && <div className="mt-3 overflow-x-auto rounded-lg bg-ink px-3 py-2 font-mono text-[12.5px] leading-6 text-teal-200">{s.cmd}</div>}
            {s.pk && <div className="mt-3 flex flex-wrap gap-1.5">{s.pk.map((p) => <Tag key={p} tone="dark">{p}</Tag>)}</div>}
          </li>
        ))}
      </ol>

      <section className="mt-12">
        <p className="eyebrow-dark">The whole session, from an empty directory</p>
        <Code>{`npx @agenticprimitives/create-app card-room --template product-repo && cd card-room && pnpm install
pnpm ap doctor --rules --write        # the agent rules → .cursor/rules · AGENTS.md · CLAUDE.md
pnpm ap mcp                           # the read-only Developer MCP — hand it to Claude

# paste the prompt from Start. the agent builds, signing in as alice / bob / dave to test. then:
pnpm ap upgrade --pin-definitions https://skills.faithnet.io texas-holdem/holdem-coach
pnpm ap doctor && pnpm ap test --live-gates live-gates.json && pnpm ap conform a2a https://<your-agent>/a2a`}</Code>
        <Note>Honest scope: the template today is the repository shape — pins, rules, CI, nightly gates, deploy layout. The application is what the agent writes into it. A runtime starter (a Next.js + A2A app with one authorized and one denied act) is the next template.</Note>
      </section>

      <details className="group mt-12">
        <summary className="cursor-pointer list-none">
          <span className="eyebrow-dark">Under the hood — the six steps the agent does for you</span>
          <span className="ml-3 text-xs text-slate-500 group-open:hidden">show</span>
        </summary>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {BUILD_UNDER_THE_HOOD.map((s, i) => (
            <li key={s.t} className="card-dark !p-4">
              <div className="flex items-baseline gap-2"><span className="num-mark text-white/40">0{i + 1}</span><h3 className="text-sm font-semibold text-white">{s.t}</h3></div>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">{s.b}</p>
              <div className="mt-3 flex flex-wrap gap-1">{s.pk.map((p) => <Tag key={p} tone="dark">{p}</Tag>)}</div>
            </li>
          ))}
        </ol>
      </details>

      <GuidePager pages={BUILD_PAGES} current="/build/flow" last={{ href: "/examples/game-night", label: "See it built: Game Night" }} />
    </>
  );
}
