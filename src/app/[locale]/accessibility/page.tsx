'use client';

import { useTranslations } from 'next-intl';
import { LegalPage } from '@/components/ui/LegalPage';

export default function AccessibilityPage() {
  const t = useTranslations('Accessibility');
  return (
    <LegalPage
      eyebrow={t('eyebrow')}
      heading={t('heading')}
      lastUpdated={t('lastUpdated')}
      sections={[
        { heading: t('s1Heading'), body: t('s1Body') },
        { heading: t('s2Heading'), body: t('s2Body') },
        { heading: t('s3Heading'), body: t('s3Body') },
      ]}
    />
  );
}
