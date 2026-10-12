import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { GuidePager } from '@/components/GuideNav';
import { BUILD_PAGES } from '../pages';
import { GuideHead as BuildHead, GuideNote as Note } from '@/components/GuideLayout';

export const metadata: Metadata = pageMeta({
  title: 'Build — five builds, pick yours',
  description: 'An app, a behaviour, a service agent, an estate or a town: the five shapes a build on Agentic Primitives takes, how to tell which one you are doing, and the one guide for each.',
  path: '/build/paths',
});

const BUILDS = [
  {
    n: '1',
    what: 'An application',
    who: 'The people using it already have an agent somewhere.',
    youRun: 'your app',
    body: 'A web app, a CLI, an assistant client that acts for a person who already has a Home. You are a relying app: she connects with her Home, you hold a bearer bound to her agent, and an act you cannot authorize comes back naming the page where she signs. You never hold a key.',
    href: 'https://github.com/agentictrustlabs/agentic-primitives/blob/main/docs/getting-started.md',
    label: 'Getting started',
  },
  {
    n: '2',
    what: 'A behaviour',
    who: 'You are describing what an agent should do, not writing a service.',
    youRun: 'nothing — you author documents',
    body: 'A skill is Markdown with an execution contract in its frontmatter: the capability id, the risk, which argument carries the resource a mandate scopes, what evidence follows the act. Define the capability once and the agent’s tool set, its published vocabulary, its card and the Home’s affordance are all projections of it. If a feature needs an invoker and a vocabulary entry and a UI handler, the model is not doing its job.',
    href: 'https://github.com/agentictrustlabs/agentic-primitives/blob/main/docs/authoring-skills.md',
    label: 'Authoring skills',
  },
  {
    n: '3',
    what: 'A service agent',
    who: 'Other people’s agents will call this thing as a peer.',
    youRun: 'one Worker — or nothing at all',
    body: 'An account on chain with a typed name, a card, skills and records of its own. Two shapes: hosted, where your work is an MCP server and the estate’s runtime runs the harness for it; or self-hosted, where you run the A2A door with the Service Host embedded. Either way its runs land in its own vault — a service that answers from its own loop leaves its steward’s Home showing “No runs yet” after a hundred asks.',
    href: 'https://github.com/agentictrustlabs/agentic-primitives/blob/main/docs/build-a-service-agent.md',
    label: 'Build a service agent',
  },
  {
    n: '4',
    what: 'An estate',
    who: 'You need your own people, whose keys and records are yours.',
    youRun: 'five Workers and a Home',
    body: 'A Home where they sign, an agent runtime, a vault, an edge and a Home MCP, on a chain that already has a town. The people in it are different Smart Agents from anyone else’s, because the custody root differs — that one fact is what an estate is, and most of the work is keeping it true.',
    href: 'https://github.com/agentictrustlabs/agentic-primitives/blob/main/docs/estate-anatomy.md',
    label: 'What an estate is made of',
  },
  {
    n: '5',
    what: 'A town',
    who: 'You need your own chain.',
    youRun: 'a chain and its services',
    body: 'The services every estate on one chain shares: naming, the public graph, the registry, chain access, key custody. Single-chain by definition, because every service in it is a contract on that chain or a read of its state. If you want your own people and names but not your own chain, you want build 4 — a day’s work instead of a quarter’s.',
    href: 'https://github.com/agentictrustlabs/ap-town/blob/master/operations/runbooks/new-town.md',
    label: 'New-town runbook',
  },
] as const;

export default function Paths() {
  return (
    <>
      <BuildHead
        step="02 · Five builds"
        title="Five shapes. Pick one; ignore the other four."
        lede="Everything built on this substrate is one of five things, ordered by how much of the stack you run yourself. The first needs nothing but an app and somebody else’s Home. The last needs a chain. The fastest way to waste a week here is to start the wrong one."
      />

      <div className="ledger-dark mt-12">
        {BUILDS.map((b) => (
          <div key={b.n} className="py-6">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-sm font-semibold text-brass">{b.n}</span>
              <h2 className="text-xl font-semibold text-white">{b.what}</h2>
              <span className="text-xs uppercase tracking-wider text-slate-500">you run: {b.youRun}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-200">{b.who}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{b.body}</p>
            <a href={b.href} rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-teal hover:underline">
              {b.label} →
            </a>
          </div>
        ))}
      </div>

      <Note>
        Builds 1–3 are what a coding agent can do almost entirely on its own — that is what the rest of this guide is
        about. Builds 4 and 5 are operations as much as code: each is a runbook in the repository that owns it, and each
        has been run end to end at least twice, which is why the runbooks mark the steps that bit the second time.
      </Note>

      <section className="mt-12 card-dark">
        <p className="eyebrow-dark">True in all five</p>
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-300">
          <li>— <strong className="text-white">The person signs at her own Home.</strong> No build collects a signature on her behalf.</li>
          <li>— <strong className="text-white">Being connected, listed, admitted or a member is never permission.</strong> The effect must be inside the acting principal’s live, scoped delegation at the moment it runs.</li>
          <li>— <strong className="text-white">Behaviour is generated; authority never is.</strong> A generated surface is consulted by no verifier.</li>
          <li>— <strong className="text-white">The record belongs to its owner.</strong> Your database, your Durable Object and your cache are serving planes; the record is the owner’s vault, and she can carry it elsewhere.</li>
        </ul>
      </section>

      <section className="mt-12">
        <p className="eyebrow-dark">Running one of these for real</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-300">
          Builds 4 and 5 sit on a ladder with a rule: a rung never asks the one below it for anything it should not hold.
          An estate takes packages, never a deployment. A town takes an estate’s public facts — its Home, its edge, its
          name roots — never a key, a vault, a delegation or a session.{' '}
          <Link href="/architecture/operating" className="text-teal hover:underline">The operator’s ladder</Link> places them;{' '}
          <Link href="/architecture/scales" className="text-teal hover:underline">the four scales</Link> says what each one is.
        </p>
      </section>

      <GuidePager pages={BUILD_PAGES} current="/build/paths" last={{ href: '/examples/game-night', label: 'See it built: Game Night' }} />
    </>
  );
}
