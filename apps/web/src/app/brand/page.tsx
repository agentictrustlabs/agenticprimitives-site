import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { Mark, MarkOnField } from '@/components/Mark';
import { Wordmark } from '@/components/Logo';

export const metadata: Metadata = pageMeta({
  title: 'Brand',
  description: 'The Agentic Primitives mark, wordmark, and downloadable brand artifacts.',
  path: '/brand',
});

const SVGS = [
  { href: '/brand/mark.svg', label: 'Mark — navy, no field' },
  { href: '/brand/mark-light.svg', label: 'Mark — white, no field' },
  { href: '/brand/icon.svg', label: 'Icon — white on navy' },
  { href: '/brand/icon-light.svg', label: 'Icon — navy on light' },
  { href: '/brand/wordmark-dark.svg', label: 'Wordmark — dark' },
  { href: '/brand/wordmark-light.svg', label: 'Wordmark — light' },
];

const PNGS = [
  { href: '/brand/lockup-dark.png', label: 'Lockup — dark 2000×480' },
  { href: '/brand/lockup-light.png', label: 'Lockup — light 2000×480' },
  { href: '/brand/mark-white.png', label: 'Mark — white, transparent 512' },
  { href: '/brand/mark-navy.png', label: 'Mark — navy, transparent 512' },
  { href: '/brand/icon-512.png', label: 'App icon 512' },
  { href: '/brand/apple-touch-icon.png', label: 'Apple touch 180' },
  { href: '/brand/avatar-400.png', label: 'Avatar 400' },
  { href: '/og.png', label: 'Open Graph 1200×630' },
  { href: '/brand/og-writing.png', label: 'Writing card 1200×630' },
  { href: '/brand/banner-1500.png', label: 'Banner 1500×500' },
  { href: '/brand/card-square.png', label: 'Square card 1080' },
];

export default function Brand() {
  return (
    <div className="container-x py-16 md:py-24">
      <p className="eyebrow">Brand</p>
      <h1 className="h1 mt-3 !text-5xl">The mark.</h1>
      <p className="lede mt-5 max-w-2xl">
        A deconstructed A: the peak, the crossbar, the base. Three primitives, one letter. Use the SVG as the source of
        truth; the PNGs are for places that will not take a vector.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <figure className="card flex flex-col items-center justify-center gap-4 py-12">
          <Mark className="h-24 w-24 text-navy" />
          <figcaption className="text-xs font-semibold tracking-[0.14em] text-slate-500">MARK · NAVY</figcaption>
        </figure>
        <figure className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-[#07101c] py-12">
          <Mark className="h-24 w-24 text-white" />
          <figcaption className="text-xs font-semibold tracking-[0.14em] text-slate-400">MARK · WHITE</figcaption>
        </figure>
        <figure className="card flex flex-col items-center justify-center gap-4 py-12">
          <MarkOnField className="h-24 w-24" />
          <figcaption className="text-xs font-semibold tracking-[0.14em] text-slate-500">ICON · ROUNDED FIELD</figcaption>
        </figure>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <figure className="card flex items-center justify-center py-10">
          <Wordmark markClass="h-10 w-10" />
        </figure>
        <figure className="flex items-center justify-center rounded-2xl bg-[#07101c] py-10">
          <Wordmark invert markClass="h-10 w-10" />
        </figure>
      </div>

      <div className="mt-6 flex justify-center rounded-2xl bg-[#07101c] py-16">
        <Wordmark invert markClass="h-16 w-16" className="[&>span:last-child]:text-xl [&>span:last-child]:tracking-[0.24em] md:[&>span:last-child]:text-2xl" />
      </div>

      <section className="mt-16">
        <h2 className="h2">How to use it</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="card">
            <h3 className="h3">Do</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Keep the three strokes together. The A is the mark; do not use one bar alone.</li>
              <li>On light surfaces: navy mark. On dark surfaces: white mark.</li>
              <li>Give it room — at least a quarter of the mark’s height as clear space.</li>
              <li>Pair with Inter (or the system UI sans). Tracking on the wordmark is part of the lockup.</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="h3">Don’t</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Do not recolour the mark except navy / white (or the ink of the surface).</li>
              <li>Do not outline, drop-shadow, or put it in a circle unless you use the provided icon field.</li>
              <li>Do not set the wordmark in a condensed or decorative face.</li>
              <li>Do not add a tagline inside the lockup. The sentence lives next to it, not in it.</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="rounded-lg bg-[#07101c] px-3 py-2 font-mono text-white">#07101c ink</span>
          <span className="rounded-lg bg-navy px-3 py-2 font-mono text-white">#0b2a4a navy</span>
          <span className="rounded-lg border border-line bg-white px-3 py-2 font-mono text-navy">#ffffff paper</span>
          <span className="rounded-lg bg-amber-soft px-3 py-2 font-mono text-amber">#b45309 brass (accent only)</span>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="h2">Downloads</h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">SVG — prefer these</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {SVGS.map((f) => (
                <li key={f.href}><a href={f.href} download className="text-teal hover:underline">{f.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">PNG — social, slides, GitHub</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {PNGS.map((f) => (
                <li key={f.href}><a href={f.href} download className="text-teal hover:underline">{f.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
