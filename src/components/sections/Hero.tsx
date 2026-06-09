'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SlideNavButton } from '@/components/ui/SlideNavButton';
import { getMediaUrl, type StrapiHomepage } from '@/lib/strapi';
import { cn } from '@/lib/utils';

const FALLBACK_HERO = '/images/hero.jpg';

export function Hero({
  homepage,
  locale,
}: {
  homepage: StrapiHomepage | null;
  locale: string;
}) {
  const t = useTranslations();
  const isRTL = locale === 'ar';
  const [current, setCurrent] = useState(0);

  const heroImages: { src: string; altKey: string }[] = homepage?.heroImages?.length
    ? homepage.heroImages.map((img: { url: string }, i: number) => ({
        src: getMediaUrl(img.url) ?? FALLBACK_HERO,
        altKey: `Hero.slide${i + 1}Alt`,
      }))
    : [
        { src: FALLBACK_HERO, altKey: 'Hero.slide1Alt' },
        { src: FALLBACK_HERO, altKey: 'Hero.slide2Alt' },
        { src: FALLBACK_HERO, altKey: 'Hero.slide3Alt' },
      ];

  const prev = () => setCurrent((c) => (c - 1 + heroImages.length) % heroImages.length);
  const next = () => setCurrent((c) => (c + 1) % heroImages.length);

  const headline1 = homepage?.heroHeadline1 ?? t('Hero.headline1');
  const headline2 = homepage?.heroHeadline2 ?? t('Hero.headline2');
  const headline3 = homepage?.heroHeadline3 ?? t('Hero.headline3');
  const cta       = homepage?.heroCta       ?? t('Hero.cta');
  const phone     = homepage?.heroPhone     ?? t('Hero.phone');

  return (
    <section aria-label="Hero" className="relative flex h-screen min-h-150 flex-col overflow-hidden z-0">

      {heroImages.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={cn('absolute inset-0 transition-opacity duration-700', i === current ? 'opacity-100' : 'opacity-0')}
        >
          <Image src={slide.src} alt={t(slide.altKey as Parameters<typeof t>[0])} fill priority={i === 0} className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/55" />
        </div>
      ))}

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="h-18" />

        <div className="flex flex-1 items-center">
          <Container>
            <div className="flex justify-end">
              <div className="max-w-xl text-end">
                <h1 className="font-display font-light text-[2.6rem] uppercase leading-20 tracking-[0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block">{headline1}</span>
                  <span className="block">{headline2}</span>
                  <span className="block">{headline3}</span>
                </h1>
                <div className="mt-8">
                  <a
                    href={`/${locale}/properties`}
                    className="inline-block border border-white/55 px-8 py-3 text-[10px] font-bold tracking-[0.28em] text-white uppercase transition-all hover:border-white hover:bg-white/10"
                  >
                    {cta}
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className="flex items-end justify-between pb-36">
            <a href={`tel:${phone}`} className="flex flex-col leading-tight">
              <span className="text-xs font-bold tracking-[0.25em] text-white/50 uppercase">{t('Hero.callLabel')}</span>
              <span dir="ltr" className="mt-1 font-display text-xl font-light tracking-wider text-white">{phone}</span>
            </a>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      'h-0.5 rounded-full transition-all duration-300',
                      i === current ? 'w-7 bg-white' : 'w-2 bg-white/35 hover:bg-white/60',
                    )}
                  />
                ))}
              </div>
              <div className="ms-2 flex gap-1">
                <SlideNavButton icon={isRTL ? ChevronRight : ChevronLeft} label="Previous slide" onClick={prev} />
                <SlideNavButton icon={isRTL ? ChevronLeft : ChevronRight} label="Next slide" onClick={next} />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
