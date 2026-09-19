import type { Metadata } from 'next';
import { FRAMEWORKS, SCORECARD } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { GuideHead, GuideNote } from '@/components/GuideLayout';
import { GuidePager } from '@/components/GuideNav';
import { COMPARE_PAGES } from '../pages';

export const metadata: Metadata = pageMeta({
  title: 'Versus — the agent frameworks',
  description: 'Agentic Primitives beside Microsoft Agent Framework, Google ADK, LangGraph, Dapr Agents, Agno, Strands, Mastra, Pydantic AI, CrewAI and OpenAI — a scorecard.',
  path: '/compare/frameworks',
});

const VERDICT: Record<string, string> = {
  ahead: 'bg-brass/15 text-brass border-brass/40',
  'at par': 'bg-white/5 text-slate-200 border-white/20',
  behind: 'bg-rose/15 text-rose-bright border-rose/40',
  'different by design': 'bg-teal/15 text-teal-300 border-teal/40',
  'deliberately absent': 'bg-white/5 text-slate-400 border-white/10',
};

export default function Frameworks() {
  return (
    <>
      <GuideHead step="03 · Agent frameworks" title="No framework leads every layer. The one layer none of them claims is the one we are ahead on." lede="The capability everyone is selling is a composition of eight layers — edge, harness, orchestration, durability, context, authority, evidence, observability. The field maturing validates the architecture. Its one unclaimed layer, intent-bound delegated authority, is ahead here for a structural reason no framework can copy cheaply: the frameworks treat the ability to call a tool as the authority to act. We separate them, and prove the separation on chain." />

      <section className="mt-12">
        <p className="eyebrow-dark">Scorecard — verdicts we can defend</p>
        <div className="ledger-dark mt-4">
          {SCORECARD.map((r) => (
            <div key={r.capability} className="grid gap-3 py-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.7fr)_auto_minmax(0,1.8fr)] md:items-start">
              <div className="text-sm font-semibold text-white">{r.capability}</div>
              <div className="text-xs text-slate-500">leader: {r.leader}</div>
              <span className={`inline-block w-fit rounded border px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em] ${VERDICT[r.verdict]}`}>{r.verdict}</span>
              <p className="text-sm leading-relaxed text-slate-300">{r.basis}</p>
            </div>
          ))}
        </div>
        <GuideNote>Verdicts are cut from the maintained analysis and re-cut when a framework ships something that changes one. Status claims about our own code match the program’s wave tables — never ahead of them.</GuideNote>
      </section>

      <section className="mt-16">
        <p className="eyebrow-dark">Per framework — best at · what we take · where we differ</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {FRAMEWORKS.map((f) => (
            <article key={f.name} className="card-dark">
              <h2 className="text-lg font-semibold text-white">{f.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{f.bestAt}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400"><span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-teal-300">take · </span>{f.take}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400"><span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-brass">differ · </span>{f.differ}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 card-dark">
        <p className="eyebrow-dark">What we must not do in response</p>
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-300">
          <li>— Build a framework. The loop stays small; capabilities are ports. The day the orchestration core grows a <span className="font-mono">supervise()</span>, we have rebuilt MAF badly.</li>
          <li>— Re-implement on-chain properties as policy. The verifier mirrors the chain for early refusal and evidence; the chain remains the enforcement.</li>
          <li>— Let OAuth, RBAC or Cedar drift inward as authority. They answer who and what standing rules; only the mandate answers why now.</li>
          <li>— Adopt a workflow vendor in Ring 0. Ports and one Durable Object binding; Dapr, Temporal, DBOS, Restate are adapters.</li>
          <li>— Ship a run UI from the primitives repo.</li>
        </ul>
      </section>

      <GuidePager pages={COMPARE_PAGES} current="/compare/frameworks" last={{ href: '/examples/game-night', label: 'See it built: Game Night' }} />
    </>
  );
}
