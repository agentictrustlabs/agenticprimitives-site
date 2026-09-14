import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { BuildPager } from '../BuildNav';
import { BuildHead, Code, Note } from '../_ui';

export const metadata: Metadata = pageMeta({
  title: 'Build — the gates',
  description: 'ap doctor, live gates and conformance: what fails the build when a coding agent gets it wrong on Agentic Primitives.',
  path: '/build/gates',
});

const GATES = [
  { cmd: 'ap doctor', what: 'Static rules over the tree, under one config. Fails when code invents an ontology term, holds a private key, calls MCP from the browser, drifts from the pinned agent rules, or when the lock is incoherent. A rule that throws is an error, never a pass.' },
  { cmd: 'ap doctor --rules', what: 'Proves the agent rules in .cursor/rules, AGENTS.md and CLAUDE.md are byte-identical to the pinned source. A coding agent that "helpfully" edits a rule fails this.' },
  { cmd: 'ap upgrade --pin-definitions', what: 'Pins an archetype’s digest and the AUTHORITY SHAPE of every tool it carries — risk, action, requirement type, approval policy, effects. An upgrade that changes what a tool may do stops and names the change; a wording change does not.' },
  { cmd: 'ap test --live-gates', what: 'Runs the real flow against the real estate: sign in, charter, grant, act, receipt, revoke, refuse. Nightly in the template’s CI. If the estate says no, the gate says no.' },
  { cmd: 'ap conform a2a | mcp <url>', what: 'Conformance for the surfaces your app exposes: the A2A agent card and task lifecycle; the MCP protocol if you expose one. The A2A suite is TCK-green on the estate.' },
];

export default function Gates() {
  return (
    <>
      <BuildHead step="05 · The gates" title="A finding is a checkpoint. The agent cannot talk its way past it." lede="The reason a coding agent can be trusted with this is not that it is careful. It is that the things that must not be probabilistic are contracts and gates it can only call — and a build that fails, fails." />

      <div className="ledger-dark mt-12">
        {GATES.map((g) => (
          <div key={g.cmd} className="grid gap-2 py-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]">
            <div className="font-mono text-sm font-semibold text-brass">{g.cmd}</div>
            <p className="text-sm leading-relaxed text-slate-300">{g.what}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <p className="eyebrow-dark">In CI, from the template</p>
        <Code>{`# ci.yml — every push
pnpm typecheck && pnpm test
pnpm ap doctor && pnpm ap doctor --rules

# live-gates-nightly.yml — against the estate
pnpm ap test --live-gates live-gates.json
pnpm ap conform a2a https://<your-agent>/a2a`}</Code>
        <Note>None of this is authority. A green doctor is a review checkpoint, never a verifier input; the verifier is the DelegationManager on chain, checking the grant at redemption. The gates keep the code honest about how it uses that — they do not stand in for it.</Note>
      </section>

      <section className="mt-12 card-dark">
        <p className="eyebrow-dark">What the agent cannot do, by construction</p>
        <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-slate-300">
          <li>— Write a permission system. Authority is <span className="font-mono">DelegationManager</span> + enforcer contracts; the app can only present a grant.</li>
          <li>— Hold an identity. The person signs at her Home; a service signs with a delegate key under a revocable wire.</li>
          <li>— Invent a domain fact. Terms are bound by IRI to the ontology; the doctor fails on a term the T-box does not have.</li>
          <li>— Skip the receipt. Every protected step on the harness leaves PROV-O provenance in the owner&apos;s vault.</li>
          <li>— Approve for the person. A confirmation is a signature bound to the digest of the exact intent; a chat &quot;yes&quot; authorizes nothing.</li>
        </ul>
      </section>

      <BuildPager current="/build/gates" />
    </>
  );
}
