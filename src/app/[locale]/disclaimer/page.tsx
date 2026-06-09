'use client';

import { useTranslations } from 'next-intl';
import { LegalPage } from '@/components/ui/LegalPage';

export default function DisclaimerPage() {
  const t = useTranslations('Disclaimer');
  return <LegalPage type="disclaimer" eyebrow={t('eyebrow')} heading={t('heading')} />;
}
