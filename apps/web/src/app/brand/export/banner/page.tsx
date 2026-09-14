import { Wordmark } from '@/components/Logo';

export default function Banner() {
  return (
    <div id="frame" style={{ width: 1500, height: 500 }} className="relative flex items-center justify-between overflow-hidden bg-[#07101c] px-20 text-white">
      <div className="grid-fade absolute inset-0 opacity-40" aria-hidden />
      <div className="relative">
        <Wordmark invert markClass="h-16 w-16" />
        <p className="mt-8 max-w-xl text-2xl text-slate-300">The trust substrate for agentic applications.</p>
      </div>
      <p className="relative font-mono text-xl text-slate-500">agenticprimitives.dev</p>
    </div>
  );
}
