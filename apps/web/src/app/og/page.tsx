import type { Metadata } from 'next';
import OgExport from '../brand/export/og/page';

export const metadata: Metadata = { robots: { index: false, follow: false }, title: 'OG image' };

export default function Og() {
  return <OgExport />;
}
