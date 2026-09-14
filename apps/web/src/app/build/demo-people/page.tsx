import type { Metadata } from 'next';
import { DEMO_PEOPLE } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { BuildPager } from '../BuildNav';
import { BuildHead, Code, Note } from '../_ui';

export const metadata: Metadata = pageMeta({
  title: 'Build — the six demo people',
  description: 'Six demo people on the live Home — real Smart Agents with real vaults — to sign in as while building and testing an application on Agentic Primitives.',
  path: '/build/demo-people',
});

export default function DemoPeople() {
  return (
    <>
      <BuildHead step="03 · Demo people" title="Six people to build and test as. Each is a real Home." lede="The estate seeded six people, each with a passkey-controlled Smart Agent, a name, a vault and — for some — an organization they steward. Your application, and the coding agent building it, signs in as them. Nothing is mocked: the token is the one a passkey ceremony would mint, the grants are on chain, the receipts land in their vaults." />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {DEMO_PEOPLE.map((p) => (
          <div key={p.handle} className="card-dark flex flex-col">
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-base font-semibold text-white">{p.name}</div>
              <span className="font-mono text-[12px] text-brass">{p.agent}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{p.role}</p>
            <p className="mt-3 text-xs leading-relaxed text-slate-500"><span className="font-semibold text-slate-400">Test:</span> {p.testFor}.</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <p className="eyebrow-dark">Signing in as one</p>
        <Code>{`# the roster
curl https://www.faithnet.me/connect/demo-personas

# a session for alice, as your app (client_id is the app the Home registered)
curl -X POST https://www.faithnet.me/connect/demo-signin \\
  -H 'content-type: application/json' \\
  -d '{"handle":"alice","client_id":"<your client_id>"}'
# → { id_token, agent }   an AgentSession JWT — verify it the way the app verifies any session`}</Code>
        <Note>In a browser test, seed the token where the app already looks for its session before the first script runs, then load the app signed in. The skills app&apos;s e2e harness does exactly this; the Game Night sign-in offers the same people from its own screen. A demo person is a throwaway Home, not a bypass: everything downstream is verified as if a passkey had signed.</Note>
      </section>

      <section className="mt-12">
        <p className="eyebrow-dark">What to try, in order</p>
        <ol className="mt-4 space-y-3 text-[15px] leading-relaxed text-slate-300">
          <li><span className="font-mono text-brass">alice</span> signs in, gets a treasury chartered, signs a grant with caveats, and an agent acts under it. Read the receipt in her vault. Revoke. Watch the next act refuse.</li>
          <li><span className="font-mono text-brass">bob</span> custodies a service. Have <span className="font-mono">alice</span> grant it a narrow study grant. Confirm the service sees exactly what the grant names and nothing else.</li>
          <li><span className="font-mono text-brass">alice</span> pays <span className="font-mono text-brass">carol</span>. Confirm the payment is a delegation with a payee caveat, redeemed on chain, receipted on both sides.</li>
          <li><span className="font-mono text-brass">dave</span> hosts a club; <span className="font-mono">alice</span> and <span className="font-mono">carol</span> join. Membership is a situation in the club&apos;s vault; the club pays from its own balance.</li>
          <li><span className="font-mono text-brass">elena</span> hosts a second club. Confirm one club cannot see the other&apos;s records, and the workspace switcher shows the right stewardship.</li>
          <li><span className="font-mono text-brass">nathan</span> admits an AI agent to his workspace over ACP. It shows up in the roster; it acts under a grant; its acts are receipted like anyone else&apos;s.</li>
        </ol>
      </section>

      <BuildPager current="/build/demo-people" />
    </>
  );
}
