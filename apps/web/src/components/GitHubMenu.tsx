// The nav's GitHub control: one button, a menu of the public repositories in scale order, and the organisation.
// Rendered from `REPOS`, so a new repository is one content entry. `<details>` keeps it keyboard- and no-JS-friendly.
import { ArrowUpRight } from 'lucide-react';
import { REPOS, SITE } from '@apsite/content';

const SCALE_LABEL: Record<string, string> = { substrate: 'Substrate', estate: 'Estate', town: 'Town', federation: 'Federation', example: 'Example' };
const STATUS: Record<string, string> = { live: 'live', public: 'public', building: 'building', next: 'next' };

export function GitHubMenu() {
  return (
    <details className="group relative">
      <summary className="btn-outline-light !px-3 !py-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden" aria-haspopup="menu">
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg> GitHub
        <svg className="h-3 w-3 transition group-open:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </summary>
      <div role="menu" className="absolute right-0 z-50 mt-2 w-[22rem] overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-2xl">
        <p className="px-4 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Repositories · by scale</p>
        <ul className="py-2">
          {REPOS.map((r) => (
            <li key={r.id}>
              {r.url ? (
                <a role="menuitem" href={r.url} rel="noreferrer" className="flex items-start gap-3 px-4 py-2.5 hover:bg-white/5">
                  <span className="mt-0.5 w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-brass">{SCALE_LABEL[r.scale]}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-white">agentictrustlabs/{r.name} <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" /></span>
                    <span className="block text-xs leading-snug text-slate-400">{r.blurb}</span>
                  </span>
                </a>
              ) : (
                <div className="flex items-start gap-3 px-4 py-2.5 opacity-60" aria-disabled>
                  <span className="mt-0.5 w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">{SCALE_LABEL[r.scale]}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-300">agentictrustlabs/{r.name} <span className="rounded border border-white/15 px-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">{STATUS[r.status]}</span></span>
                    <span className="block text-xs leading-snug text-slate-500">{r.blurb}</span>
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>
        <a href={SITE.githubOrg} rel="noreferrer" className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white">
          All repositories · github.com/agentictrustlabs <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </details>
  );
}
