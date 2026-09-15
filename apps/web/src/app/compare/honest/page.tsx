import type { Metadata } from 'next';
import { REFUSED, WHERE_WE_LOSE } from '@apsite/content';
import { pageMeta } from '@/lib/seo';
import { Ledger } from '@/components/ui';
import { GuideHead, GuideNote } from '@/components/GuideLayout';
import { GuidePager } from '@/components/GuideNav';
import { COMPARE_PAGES } from '../pages';

export const metadata: Metadata = pageMeta({
  title: 'Versus — where we lose today, and what we refuse to take',
  description: 'Stated because the audit states it: production hours, durable execution, composition operators, the session module, public-by-default naming, transport peer identity, and not-yet-production. Plus the patterns we deliberately do not adopt from the field.',
  path: '/compare/honest',
});

export default function Honest() {
  return (
    <>
      <GuideHead step="06 · Where we lose" title="Stated plainly, because the audit states it." lede="Most comparisons in this space are marketing. Ours is scored from a maintained technical audit that grades both sides. Here is the side where we lose today, what the program does about each, and the patterns from the field we deliberately refuse — with the reason." />

      <section className="mt-12">
        <p className="eyebrow-dark">Where they are honestly better today</p>
        <div className="ledger-dark mt-4">
          {WHERE_WE_LOSE.map((g) => (
            <div key={g.gap} className="grid gap-3 py-5 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.5fr)_minmax(0,1.3fr)]">
              <div className="text-base font-semibold text-white">{g.gap}</div>
              <p className="text-sm leading-relaxed text-slate-300">{g.detail}</p>
              <p className="text-sm leading-relaxed text-slate-400"><span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-brass">program · </span>{g.answer}</p>
            </div>
          ))}
        </div>
        <GuideNote>The through-line: every catch-up item lands with the authority twist attached. A resumed run re-verifies; a replay re-derives verdicts; a branch is N mandates; compiled skills carry mandate requirements. Parity features, each authority-aware, on a substrate where authority is on chain — that is the compounding part.</GuideNote>
      </section>

      <section className="mt-16">
        <p className="eyebrow-dark">What we refuse to take — and from whom</p>
        <div className="ledger-dark mt-4">
          {REFUSED.map((r) => (
            <div key={r.what} className="grid gap-3 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)]">
              <div className="text-base font-semibold text-white">{r.what}</div>
              <p className="text-xs leading-relaxed text-slate-500">{r.from}</p>
              <p className="text-sm leading-relaxed text-slate-300">{r.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="eyebrow-dark">What we deliberately are not</p>
        <div className="mt-4">
          <Ledger
            dark
            rows={[
              { k: 'Not an LLM framework.', v: 'The planner is a port. Bring your model and your prompting; the harness makes sure what it proposes runs only under a grant.' },
              { k: 'Not a token or a public chain.', v: 'Contracts deploy to any EVM — a private QBFT network, an L2, a testnet. The demo estate runs a free-gas private chain. There is no token to buy.' },
              { k: 'Not a registry, a wallet or a Home.', v: 'Ring 0 is the primitives those are built from. The Home, discovery and naming services you see running are products in their own repositories, importing the packages — as yours will.' },
              { k: 'Not a replacement for containment.', v: 'Sandbox your runtimes. Supervise where it helps. Then answer the question neither can: under whose authority, and can the owner end it. That is the layer this is.' },
            ]}
          />
        </div>
      </section>

      <section className="mt-16 card-dark">
        <p className="eyebrow-dark">The rule that makes coexistence work</p>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-300">Any of these systems may contribute a name, an endpoint, a transport key, a resolution proof, or membership evidence. None of them contributes canonical identity, delegation, entitlement, vault, payment or custody authority. Verified peer context is complementary exactly as long as it stays below authority.</p>
      </section>

      <GuidePager pages={COMPARE_PAGES} current="/compare/honest" last={{ href: '/examples/game-night', label: 'See it built: Game Night' }} />
    </>
  );
}
