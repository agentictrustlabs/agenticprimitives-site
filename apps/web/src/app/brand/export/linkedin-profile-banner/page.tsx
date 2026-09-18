import { Wordmark } from '@/components/Logo';

const QUESTIONS = [
  ['01', 'Who is acting?', 'Identity that survives the runtime'],
  ['02', 'May they do this?', 'Authority that is a grant, not a token'],
  ['03', 'What did they do?', 'Evidence the owner carries'],
];

/** LinkedIn personal profile banner: 1584×396 (rendered at 2×). The profile photo overlays the bottom-left ~330px, so content starts right of it. */
export default function LinkedInProfileBanner() {
  return (
    <div id="frame" style={{ width: 1584, height: 396 }} className="relative flex items-center overflow-hidden bg-[#07101c] pl-[400px] pr-16 text-white">
      <div className="grid-fade absolute inset-0 opacity-40" aria-hidden />
      <div className="glow-brass absolute inset-0" aria-hidden />
      <div className="relative flex w-full items-center justify-between gap-12">
        <div>
          <Wordmark invert markClass="h-11 w-11" />
          <p className="mt-6 text-[40px] font-semibold leading-none tracking-[-0.03em] text-white">Rails, not throttles.</p>
          <p className="mt-4 max-w-[520px] text-[19px] leading-snug text-slate-400">
            Authority for AI agents that the agent cannot exceed. <span className="font-mono text-[15px] text-slate-500">agenticprimitives.dev</span>
          </p>
        </div>
        <ol className="grid w-[540px] shrink-0 divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.03] px-6">
          {QUESTIONS.map(([n, q, a]) => (
            <li key={n} className="grid grid-cols-[2.2rem_1fr] items-baseline gap-2 py-3.5">
              <span className="font-mono text-xs text-white/40">{n}</span>
              <span>
                <span className="text-[19px] font-semibold text-white">{q}</span>
                <span className="ml-2 text-[13.5px] text-slate-400">{a}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
