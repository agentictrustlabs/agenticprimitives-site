export function Logo({ className = 'h-8 w-8' }: { className?: string }) {
  // Three stacked primitives on one anchor — person, organization, service, sharing one base.
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="7" fill="#0b2a4a" />
      <rect x="8" y="20" width="16" height="4" rx="1.2" fill="#ffffff" />
      <rect x="10" y="14" width="12" height="4" rx="1.2" fill="#ffffff" opacity="0.8" />
      <rect x="12" y="8" width="8" height="4" rx="1.2" fill="#fbbf24" />
    </svg>
  );
}
