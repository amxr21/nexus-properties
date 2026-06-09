'use client';

import { useTranslations } from 'next-intl';
import { LegalPage } from '@/components/ui/LegalPage';

export default function TermsPage() {
  const t = useTranslations('Terms');
  return <LegalPage type="terms-of-service" eyebrow={t('eyebrow')} heading={t('heading')} />;
}
