import type { ReactNode } from 'react';
import { GuideLayout } from '@/components/GuideLayout';
import { COMPARE_PAGES } from './pages';

export default function CompareLayout({ children }: { children: ReactNode }) {
  return <GuideLayout eyebrow="Versus" pages={COMPARE_PAGES} wide>{children}</GuideLayout>;
}
