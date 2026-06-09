import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { SectionHeadingBlock } from '@/components/ui/SectionHeadingBlock';
import { StatCounter } from '@/components/ui/StatCounter';
import { type StrapiHomepage } from '@/lib/strapi';

export async function WhoWeAre({ homepage }: { homepage: StrapiHomepage | null }) {
  const t = await getTranslations();

  const eyebrow = homepage?.whoWeAreEyebrow ?? t('WhoWeAre.eyebrow');
  const heading  = homepage?.whoWeAreHeading ?? t('WhoWeAre.heading');

  const stats = [
    {
      value: homepage?.whoWeAreStat1Value ?? t('WhoWeAre.stat1Value'),
      label: homepage?.whoWeAreStat1Label ?? t('WhoWeAre.stat1Label'),
    },
    {
      value: homepage?.whoWeAreStat2Value ?? t('WhoWeAre.stat2Value'),
      label: homepage?.whoWeAreStat2Label ?? t('WhoWeAre.stat2Label'),
    },
    {
      value: homepage?.whoWeAreStat3Value ?? t('WhoWeAre.stat3Value'),
      label: homepage?.whoWeAreStat3Label ?? t('WhoWeAre.stat3Label'),
    },
  ];

  return (
    <section aria-label="Who we are" className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeadingBlock
          eyebrow={eyebrow}
          heading={heading}
          center
          className="mb-16"
        />
        <div className="grid grid-cols-3 divide-x divide-line">
          {stats.map((s, i) => (
            <StatCounter key={i} value={s.value} label={s.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}
