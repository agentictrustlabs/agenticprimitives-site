import type { Metadata } from 'next';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ExportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`header, footer { display: none !important; } body { margin: 0; background: transparent; }`}</style>
      {children}
    </>
  );
}
