import { Wordmark } from '@/components/Logo';

/** LinkedIn company cover: 1128×191 (rendered at 2× by the raster script). LinkedIn overlays the logo on the bottom-left ~200px, so content starts right of it. */
export default function LinkedInCover() {
  return (
    <div id="frame" style={{ width: 1128, height: 191 }} className="relative flex items-center justify-between overflow-hidden bg-[#07101c] pl-[230px] pr-12 text-white">
      <div className="grid-fade absolute inset-0 opacity-40" aria-hidden />
      <div className="glow-brass absolute inset-0" aria-hidden />
      <div className="relative flex items-center gap-10">
        <Wordmark invert markClass="h-12 w-12" />
        <div className="h-10 w-px bg-white/15" />
        <p className="max-w-[560px] text-[21px] leading-snug tracking-[-0.02em]">
          <span className="font-semibold text-white">Rails, not throttles.</span>
          <br />
          <span className="text-slate-400">Identity, authority and evidence for agents that act on your behalf.</span>
        </p>
      </div>
      <p className="relative font-mono text-sm text-slate-500">agenticprimitives.dev</p>
    </div>
  );
}
