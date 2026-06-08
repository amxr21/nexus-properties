'use client';

import { useTranslations } from 'next-intl';
import { LegalPage } from '@/components/ui/LegalPage';

export default function CookiePolicyPage() {
  const t = useTranslations('CookiePolicy');
  return (
    <LegalPage
      eyebrow={t('eyebrow')}
      heading={t('heading')}
      lastUpdated={t('lastUpdated')}
      sections={[
        { heading: t('s1Heading'), body: t('s1Body') },
        { heading: t('s2Heading'), body: t('s2Body') },
        { heading: t('s3Heading'), body: t('s3Body') },
        { heading: t('s4Heading'), body: t('s4Body') },
      ]}
    />
  );
}
