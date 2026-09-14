import { Wordmark } from '@/components/Logo';

export default function OgExport() {
  return (
    <div id="frame" style={{ width: 1200, height: 630 }} className="relative flex flex-col justify-between overflow-hidden bg-[#07101c] p-16 text-white">
      <div className="grid-dark absolute inset-0" aria-hidden />
      <div className="glow-brass absolute inset-0" aria-hidden />
      <Wordmark invert markClass="h-14 w-14" />
      <div className="relative">
        <div className="text-[96px] font-semibold leading-[0.96] tracking-[-0.035em]">Rails,<br />not throttles.</div>
        <div className="mt-7 max-w-3xl text-[26px] leading-snug text-slate-300">
          Authority for agents that the agent cannot exceed — signed by the principal, bounded by caveats that are code, revocable in one transaction.
        </div>
      </div>
      <div className="relative flex items-center justify-between font-mono text-lg text-slate-400">
        <span>agenticprimitives.dev</span>
        <span className="text-[#d4a24c]">Intelligence may be probabilistic. Authority must not be.</span>
      </div>
    </div>
  );
}
