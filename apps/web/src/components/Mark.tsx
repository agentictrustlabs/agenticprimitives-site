/** The Agentic Primitives mark: a deconstructed A — peak, crossbar, base. */
export const MARK_PATHS = (
  <>
    <path d="M32 3 L59 39 H48.2 L32 16.2 L15.8 39 H5 Z" />
    <rect x="17" y="43.2" width="30" height="7" rx="3.5" />
    <rect x="10" y="54" width="44" height="7" rx="3.5" />
  </>
);

export function Mark({ className = 'h-8 w-8', title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" role={title ? 'img' : 'presentation'} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {MARK_PATHS}
    </svg>
  );
}

export function MarkOnField({ className = 'h-8 w-8', field = '#07101c', mark = '#ffffff' }: { className?: string; field?: string; mark?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill={field} />
      <g fill={mark} transform="translate(6 5) scale(0.82)">
        {MARK_PATHS}
      </g>
    </svg>
  );
}
