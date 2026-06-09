'use client';

import { useTranslations } from 'next-intl';
import { LegalPage } from '@/components/ui/LegalPage';

export default function PrivacyPolicyPage() {
  const t = useTranslations('PrivacyPolicy');
  return <LegalPage type="privacy-policy" eyebrow={t('eyebrow')} heading={t('heading')} />;
}
