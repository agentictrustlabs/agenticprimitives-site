import { Wordmark } from '@/components/Logo';

export default function OgWriting() {
  return (
    <div id="frame" style={{ width: 1200, height: 630 }} className="relative flex flex-col justify-between overflow-hidden bg-[#07101c] p-16 text-white">
      <div className="grid-fade absolute inset-0 opacity-40" aria-hidden />
      <Wordmark invert markClass="h-12 w-12" />
      <div className="relative">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Writing</p>
        <div className="mt-4 text-[56px] font-semibold leading-[1.08] tracking-tight">Rails, not throttles.</div>
        <div className="mt-5 max-w-3xl text-2xl text-slate-300">The AI model we need to change isn’t the LLM. Trust belongs in the infrastructure.</div>
      </div>
      <div className="relative font-mono text-lg text-slate-400">agenticprimitives.dev/writing</div>
    </div>
  );
}
