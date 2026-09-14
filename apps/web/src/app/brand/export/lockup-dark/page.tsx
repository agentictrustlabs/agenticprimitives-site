import { Wordmark } from '@/components/Logo';

export default function LockupDark() {
  return (
    <div id="frame" style={{ width: 2000, height: 480 }} className="flex items-center justify-center bg-[#07101c]">
      <Wordmark invert markClass="h-24 w-24" className="[&>span:last-child]:text-[42px] [&>span:last-child]:tracking-[0.28em]" />
    </div>
  );
}
