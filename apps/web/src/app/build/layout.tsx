import type { ReactNode } from 'react';
import { GuideLayout } from '@/components/GuideLayout';
import { BUILD_PAGES } from './pages';

export default function BuildLayout({ children }: { children: ReactNode }) {
  return <GuideLayout eyebrow="Build" pages={BUILD_PAGES}>{children}</GuideLayout>;
}
