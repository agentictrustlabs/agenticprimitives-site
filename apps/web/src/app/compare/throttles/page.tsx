import type { Metadata } from 'next';
import { INDUSTRY_ANSWERS, OUR_ANSWER } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { ThrottlesVsRail } from '@apsite/diagrams';
import { Claim, Figure } from '@/components/ui';
import { GuideHead } from '@/components/GuideLayout';
import { GuidePager } from '@/components/GuideNav';
import { COMPARE_PAGES } from '../pages';

export const metadata: Metadata = pageMeta({
  title: 'Versus — the three throttles',
  description: 'Containment, supervision and platform governance: what each buys, where each stops, and why authority as a signed, revocable grant is a different answer.',
  path: '/compare/throttles',
});

const TABLE = [
  { p: 'Who bounds the agent', c: 'The vendor’s runtime config', s: 'A second model, per action', g: 'Platform admins, in the platform’s ACLs', o: 'The principal, with a signature, from its own account' },
  { p: 'What is bounded', c: 'Reach: files, network, shell', s: 'Individual actions, probabilistically', g: 'Actions the platform can see', o: 'Authority: payee, ceiling, method, target, time, one exact intent' },
  { p: 'Enforced by', c: 'OS sandbox, egress rules', s: 'A classifier with a miss rate', g: 'The platform’s policy engine', o: 'Enforcer contracts that execute at redemption, outside the model' },
  { p: 'Revocation', c: 'Kill the process', s: 'Stop the task', g: 'Edit the ACL; branch and roll back', o: 'One transaction; refused at the next gate, everywhere, with no list to update' },
  { p: 'Evidence', c: 'Process logs', s: 'The monitor’s verdicts', g: 'The platform’s lineage', o: 'A receipt in the owner’s vault: grant · decision · tx · playbook digest — verifiable without the runtime' },
  { p: 'Answers “under whose authority?”', c: 'No', s: 'No', g: 'Inside the platform', o: 'Yes, to any counterparty, cryptographically' },
  { p: 'Survives the vendor', c: 'No', s: 'No', g: 'No', o: 'Yes — the account, the grant and the receipt are the owner’s' },
] as const;

export default function Throttles() {
  return (
    <>
      <GuideHead step="02 · The three throttles" title="Every other answer is a throttle." lede="The labs contain the agent. The labs supervise the agent. The platforms govern the agent inside their walls. All three are honest engineering, and all three leave the same question unanswerable: under whose authority did that act happen, and can the owner end it?" />

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-3">
        {INDUSTRY_ANSWERS.map((a, i) => (
          <article key={a.id} className="flex flex-col bg-ink p-7">
            <div className="flex items-center justify-between">
              <span className="num-mark text-white/40">THROTTLE 0{i + 1}</span>
              <span className="font-mono text-[11px] text-slate-500">{a.who}</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-white">{a.name}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-300">{a.claim}</p>
            <dl className="mt-6 space-y-4 text-sm">
              <div><dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-teal-bright">What it buys</dt><dd className="mt-1 text-slate-300">{a.buys}</dd></div>
              <div><dt className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-rose-bright">Where it stops</dt><dd className="mt-1 text-slate-300">{a.stops}</dd></div>
            </dl>
            <p className="mt-auto border-t border-white/10 pt-5 text-[15px] font-semibold text-white">{a.edge}</p>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <Figure dark caption="Three throttles put the agent in a smaller room, watch it, or fence it inside one vendor. Each bounds something; none bounds authority. The rail leaves the agent as capable as you like and bounds what it MAY do: a grant the principal signs, caveats that are code, enforcement outside the model, a receipt the owner carries, revocation in one transaction.">
          <ThrottlesVsRail />
        </Figure>
      </div>

      <div className="mt-10 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] font-mono text-[10.5px] uppercase tracking-[0.16em] text-slate-400">
              <th className="px-4 py-3">Property</th><th className="px-4 py-3">Containment</th><th className="px-4 py-3">Supervision</th><th className="px-4 py-3">Platform governance</th><th className="px-4 py-3 text-brass">Authority as a grant</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {TABLE.map((r) => (
              <tr key={r.p} className="align-top">
                <td className="px-4 py-4 font-semibold text-white">{r.p}</td>
                <td className="px-4 py-4 text-slate-400">{r.c}</td>
                <td className="px-4 py-4 text-slate-400">{r.s}</td>
                <td className="px-4 py-4 text-slate-400">{r.g}</td>
                <td className="bg-brass/[0.06] px-4 py-4 text-slate-100">{r.o}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12"><Claim attribution="Why the fourth column is a different kind of answer">{OUR_ANSWER.claim}</Claim></div>

      <GuidePager pages={COMPARE_PAGES} current="/compare/throttles" last={{ href: '/examples/game-night', label: 'See it built: Game Night' }} />
    </>
  );
}
