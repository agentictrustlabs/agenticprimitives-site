import Link from 'next/link';
import { SCALES, SCALE_STATUS_LABEL, type ScaleStatus } from '@apsite/content';

const STATUS_CLASS: Record<ScaleStatus, string> = {
  live: 'border-teal-400/40 bg-teal-400/10 text-teal-200',
  public: 'border-teal-400/40 bg-teal-400/10 text-teal-200',
  building: 'border-amber-400/40 bg-amber-400/10 text-amber-200',
  next: 'border-white/20 bg-white/5 text-slate-300',
};

/** The four scales as cards: one repository each, its question, its rule, its status. Dark background. */
export function ScaleCards({ compact = false, anchors = false }: { compact?: boolean; anchors?: boolean }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
      {SCALES.map((s, i) => (
        <article key={s.id} id={anchors ? s.id : undefined} className="flex flex-col scroll-mt-24 bg-ink p-6">
          <div className="flex items-center justify-between">
            <p className="eyebrow-dark"><span className="text-white/40">0{i + 1}</span> {s.name}</p>
            <span className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${STATUS_CLASS[s.repo.status]}`}>{SCALE_STATUS_LABEL[s.repo.status]}</span>
          </div>
          <h3 className="mt-3 text-[15px] font-semibold leading-snug text-white">{s.answers}</h3>
          {!compact && <p className="mt-3 text-sm leading-relaxed text-slate-300">{s.is}</p>}
          <p className="mt-3 text-xs leading-relaxed text-slate-400"><span className="text-slate-500">Chain:</span> {s.chain}</p>
          <p className="mt-2 text-xs leading-relaxed text-amber-200/90"><span className="text-slate-500">Rule:</span> {s.rule}</p>
          <p className="mt-auto pt-5 font-mono text-xs">
            {s.repo.status === 'live' || s.repo.status === 'public' ? (
              <a href={s.repo.url} rel="noreferrer" className="text-brass hover:underline">{s.repo.name} →</a>
            ) : (
              <span className="text-slate-400">{s.repo.name}</span>
            )}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">{s.repo.note}</p>
        </article>
      ))}
      <p className="sr-only"><Link href="/architecture/scales">Read the note on the four scales</Link></p>
    </div>
  );
}
