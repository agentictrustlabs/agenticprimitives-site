import { MarkOnField } from '@/components/Mark';

/** LinkedIn company logo: square, no rounded field (LinkedIn crops to a circle/rounded square itself). */
export default function LinkedInLogo() {
  return (
    <div id="frame" style={{ width: 400, height: 400 }} className="flex items-center justify-center bg-[#07101c]">
      <MarkOnField className="h-[400px] w-[400px]" field="#07101c" />
    </div>
  );
}
