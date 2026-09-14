import { Wordmark } from '@/components/Logo';

export default function LockupLight() {
  return (
    <div id="frame" style={{ width: 2000, height: 480 }} className="flex items-center justify-center bg-white">
      <Wordmark markClass="h-24 w-24" className="[&>span:last-child]:text-[42px] [&>span:last-child]:tracking-[0.28em]" />
    </div>
  );
}
