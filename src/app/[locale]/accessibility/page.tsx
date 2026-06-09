'use client';

import { useTranslations } from 'next-intl';
import { LegalPage } from '@/components/ui/LegalPage';

export default function AccessibilityPage() {
  const t = useTranslations('Accessibility');
  return <LegalPage type="accessibility-statement" eyebrow={t('eyebrow')} heading={t('heading')} />;
}
