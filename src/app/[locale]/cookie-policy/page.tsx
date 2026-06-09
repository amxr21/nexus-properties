'use client';

import { useTranslations } from 'next-intl';
import { LegalPage } from '@/components/ui/LegalPage';

export default function CookiePolicyPage() {
  const t = useTranslations('CookiePolicy');
  return <LegalPage type="cookie-policy" eyebrow={t('eyebrow')} heading={t('heading')} />;
}
