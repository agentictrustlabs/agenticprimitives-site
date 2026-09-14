import { Wordmark } from '@/components/Logo';

export default function OgExport() {
  return (
    <div id="frame" style={{ width: 1200, height: 630 }} className="relative flex flex-col justify-between overflow-hidden bg-[#07101c] p-16 text-white">
      <div className="grid-fade absolute inset-0 opacity-40" aria-hidden />
      <Wordmark invert markClass="h-14 w-14" />
      <div className="relative">
        <div className="text-[64px] font-semibold leading-[1.05] tracking-tight">One substrate.<br />Every capability an agentic app needs.</div>
        <div className="mt-6 max-w-3xl text-2xl text-slate-300">Identity · Authority · Evidence — designed as one system, not stitched from ten products.</div>
      </div>
      <div className="relative flex items-center justify-between font-mono text-lg text-slate-400">
        <span>agenticprimitives.dev</span>
        <span>ERC-4337 · ERC-7710 · A2A 1.0 · MCP · PROV-O</span>
      </div>
    </div>
  );
}
