import { MarkOnField } from '@/components/Mark';

export default function Avatar() {
  return (
    <div id="frame" style={{ width: 400, height: 400 }} className="flex items-center justify-center bg-[#07101c]">
      <MarkOnField className="h-[400px] w-[400px]" field="#07101c" />
    </div>
  );
}
