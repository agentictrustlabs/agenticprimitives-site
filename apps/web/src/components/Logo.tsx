import { Mark } from './Mark';

export function Logo({ className = 'h-8 w-8' }: { className?: string }) {
  return <Mark className={className} title="Agentic Primitives" />;
}

export function Wordmark({
  className = '',
  markClass = 'h-8 w-8',
  invert = false,
}: {
  className?: string;
  markClass?: string;
  invert?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${invert ? 'text-white' : 'text-navy'} ${className}`}>
      <Mark className={markClass} />
      <span className="text-[13px] font-semibold tracking-[0.22em]">AGENTIC PRIMITIVES</span>
    </span>
  );
}
