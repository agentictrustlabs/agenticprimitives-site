import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SCALES, SCALES_INTRO, SCALE_STATUS_LABEL } from '@apsite/content';
import { ScaleGlyph } from '@apsite/diagrams';

/**
 * The four scales for a reader who is not an engineer: one picture, one plain sentence, one familiar comparison, and
 * what it means for a person, an organization and a builder. Light background; no repository names in the body.
 */
export function ScalesPlain({ id = 'scales', showIntro = true, showClose = true }: { id?: string; showIntro?: boolean; showClose?: boolean }) {
  return (
    <section id={id} className="bg-cream py-24">
      <div className="container-x">
        {showIntro && (
          <div className="max-w-3xl">
            <p className="eyebrow">{SCALES_INTRO.eyebrow}</p>
            <h2 className="h2 mt-3">{SCALES_INTRO.title}</h2>
            <p className="lede mt-5">{SCALES_INTRO.lede}</p>
          </div>
        )}
        <ol className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {SCALES.map((s, i) => (
            <li key={s.id} className="card flex flex-col !p-0">
              <div className="border-b border-line bg-white p-4">
                <ScaleGlyph id={s.id} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-baseline justify-between">
                  <p className="eyebrow"><span className="text-slate-400">0{i + 1}</span> {s.name}</p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">{SCALE_STATUS_LABEL[s.repo.status]}</span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-800">{s.plain}</p>
                <p className="mt-3 text-sm italic leading-relaxed text-slate-500">{s.analogy}</p>
                <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm leading-relaxed">
                  <div><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">If you are a person</dt><dd className="mt-1 text-slate-700">{s.means.person}</dd></div>
                  <div><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">If you run an organization</dt><dd className="mt-1 text-slate-700">{s.means.organization}</dd></div>
                  <div><dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">If you build</dt><dd className="mt-1 text-slate-700">{s.means.builder}</dd></div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
        {showClose && (
          <div className="mt-12 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <p className="text-lg font-semibold leading-snug text-navy md:text-xl">{SCALES_INTRO.close}</p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link href="/architecture/scales" className="btn-brass">The four scales, in full <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/architecture" className="btn-ghost">All architecture notes</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** A one-line strip naming the four scales, for the top of a page that lives at one of them. */
export function ScalesStrip({ here }: { here?: 'substrate' | 'estate' | 'town' | 'federation' }) {
  return (
    <div className="border-y border-white/10 bg-ink-2 text-white">
      <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-2 py-3 text-sm">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brass">Built at four scales</span>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {SCALES.map((s, i) => (
            <li key={s.id} className="flex items-center gap-2">
              <Link href={`/architecture/scales#${s.id}`} className={`rounded px-2 py-0.5 ${here === s.id ? 'bg-white/10 font-semibold text-white' : 'text-slate-300 hover:text-white'}`}>
                {s.name}
              </Link>
              {i < SCALES.length - 1 && <span className="text-white/30">→</span>}
            </li>
          ))}
        </ol>
        {here && <span className="text-slate-400">You are reading about the <span className="text-white">{SCALES.find((s) => s.id === here)?.name.toLowerCase()}</span>.</span>}
        <Link href="/architecture" className="ml-auto text-slate-300 hover:text-white">What the four words mean →</Link>
      </div>
    </div>
  );
}
