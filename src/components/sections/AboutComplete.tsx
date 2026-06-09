'use client';

import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionHeadingBlock } from '@/components/ui/SectionHeadingBlock';
import { StatCounter } from '@/components/ui/StatCounter';

// About section stats and text are static brand content kept in next-intl.
// They describe fixed company facts (agent count, years of experience).
export function AboutComplete() {
  const t = useTranslations();

  const aboutStats = [
    { value: t('About.stat1Value'), label: t('About.stat1Label') },
    { value: t('About.stat2Value'), label: t('About.stat2Label') },
    { value: t('About.stat3Value'), label: t('About.stat3Label') },
    { value: t('About.stat4Value'), label: t('About.stat4Label') },
  ];

  return (
    <section id="about" aria-label="About Nexus Properties" className="bg-gray py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-16 md:flex-row md:items-start md:gap-20">

          <div className="flex flex-col gap-6 md:w-[38%] shrink-0">
            <SectionHeadingBlock
              eyebrow={t('About.eyebrow')}
              heading={t('About.heading')}
            />
            <div className="h-px w-10 bg-gold-500/60" />
            <p className="text-[13px] leading-[1.85] text-charcoal/60">{t('About.body')}</p>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-10">
            {aboutStats.map((s, i) => (
              <StatCounter key={i} value={s.value} label={s.label} />
            ))}
          </div>
        </div>

        <div className="mt-20 flex items-center gap-8">
          <div className="h-px flex-1 bg-charcoal/15" />
          <p className="text-sm font-bold tracking-[0.28em] text-gold-500 uppercase whitespace-nowrap">
            {t('About.experienceLine')}
          </p>
          <div className="h-px flex-1 bg-charcoal/15" />
        </div>
      </Container>
    </section>
  );
}
