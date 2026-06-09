import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/ui/Container';
import { SectionHeadingBlock } from '@/components/ui/SectionHeadingBlock';
import { OverlayImage } from '@/components/ui/OverlayImage';
import { getMediaUrl, type StrapiHomepage } from '@/lib/strapi';

const SERVICES_BG = '/images/showoff section image 2.jpg';

const SERVICE_CARD_KEYS = [
  { titleKey: 'Services.card1Title', taglineKey: 'Services.card1Tagline' },
  { titleKey: 'Services.card2Title', taglineKey: 'Services.card2Tagline' },
  { titleKey: 'Services.card3Title', taglineKey: 'Services.card3Tagline' },
  { titleKey: 'Services.card4Title', taglineKey: 'Services.card4Tagline' },
] as const;

export async function Services({
  locale: _locale,
  homepage,
}: {
  locale: string;
  homepage: StrapiHomepage | null;
}) {
  const t = await getTranslations();

  const bgSrc = homepage?.heroImages?.[1]
    ? (getMediaUrl((homepage.heroImages[1] as unknown as { url: string }).url) ?? SERVICES_BG)
    : SERVICES_BG;

  return (
    <section aria-label="Our services" className="relative overflow-hidden py-24 md:py-32">
      <OverlayImage src={bgSrc} />

      <div className="relative z-10">
        <Container>
          <SectionHeadingBlock
            eyebrow={t('Services.eyebrow')}
            heading={t('Services.heading')}
            sub={t('Services.sub')}
            light
            center
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_CARD_KEYS.map(({ titleKey, taglineKey }, i) => (
              <article
                key={i}
                className="group relative flex flex-col gap-6 border border-white/10 p-8 transition-colors duration-300 hover:bg-white/5 hover:border-white/20"
              >
                <span aria-hidden="true" className="absolute right-4 top-3 font-display text-[6rem] font-bold leading-none text-white/4 select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-bold tracking-[0.25em] text-gold-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-[1.1rem] font-light leading-snug text-white">
                  {t(titleKey as Parameters<typeof t>[0])}
                </h3>
                <p className="text-[12px] leading-[1.8] text-white/45">
                  {t(taglineKey as Parameters<typeof t>[0])}
                </p>
                <div className="mt-auto h-px w-8 bg-gold-500/35 transition-all duration-300 group-hover:w-full group-hover:bg-gold-500/55" />
              </article>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
