import { Wordmark } from '@/components/Logo';

export default function Card() {
  return (
    <div id="frame" style={{ width: 1080, height: 1080 }} className="relative flex flex-col justify-between overflow-hidden bg-[#07101c] p-20 text-white">
      <div className="grid-fade absolute inset-0 opacity-40" aria-hidden />
      <Wordmark invert markClass="h-20 w-20" />
      <div className="relative">
        <div className="text-[72px] font-semibold leading-[1.05] tracking-tight">Intelligence may be probabilistic.<br />Authority must not be.</div>
      </div>
      <div className="relative font-mono text-xl text-slate-400">agenticprimitives.dev</div>
    </div>
  );
}
