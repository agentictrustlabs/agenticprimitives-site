import type { Metadata } from 'next';
import { Logo } from '@/components/Logo';

export const metadata: Metadata = { robots: { index: false, follow: false }, title: 'OG image' };

// Rendered once by scripts/og.mjs into public/og.png (1200×630). Not linked from navigation.
export default function Og() {
  return (
    <div style={{ width: 1200, height: 630 }} className="relative flex flex-col justify-between overflow-hidden bg-navy p-16 text-white">
      <div className="grid-fade absolute inset-0 opacity-60" aria-hidden />
      <div className="relative flex items-center gap-4">
        <Logo className="h-14 w-14" />
        <span className="text-3xl font-semibold tracking-tight">Agentic Primitives</span>
      </div>
      <div className="relative">
        <div className="text-[64px] font-semibold leading-[1.05] tracking-tight">One substrate.<br />Every capability an agentic app needs.</div>
        <div className="mt-6 text-2xl text-slate-300">Identity · Authority · Evidence — designed as one system, not stitched from ten products.</div>
      </div>
      <div className="relative flex items-center justify-between font-mono text-xl text-slate-400">
        <span>agenticprimitives.dev</span>
        <span>ERC-4337 · ERC-7710 · A2A 1.0 · MCP · PROV-O</span>
      </div>
    </div>
  );
}
