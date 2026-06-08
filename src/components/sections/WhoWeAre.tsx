'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionHeadingBlock } from '@/components/ui/SectionHeadingBlock';
import { StatCounter } from '@/components/ui/StatCounter';
import { whoWeAreStats } from '@/lib/content';

export function WhoWeAre() {
  const t = useTranslations();

  return (
    <section aria-label="Who we are" className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeadingBlock
          eyebrow={t('WhoWeAre.eyebrow')}
          heading={t('WhoWeAre.heading')}
          center
          className="mb-16"
        />
        <div className="grid grid-cols-3 divide-x divide-line">
          {whoWeAreStats.map(({ id, valueKey, labelKey }) => (
            <StatCounter
              key={id}
              value={t(valueKey as Parameters<typeof t>[0])}
              label={t(labelKey as Parameters<typeof t>[0])}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
