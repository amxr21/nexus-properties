'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SlideNavButton } from '@/components/ui/SlideNavButton';
import { images } from '@/lib/content';
import { cn } from '@/lib/utils';

const slides = [
  { id: 1, src: images.hero, altKey: 'Hero.slide1Alt' as const },
  { id: 2, src: null,        altKey: 'Hero.slide2Alt' as const },
  { id: 3, src: null,        altKey: 'Hero.slide3Alt' as const },
];

export function Hero() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section aria-label="Hero" className="relative flex h-screen min-h-150 flex-col overflow-hidden z-0">

      {/* Slide backgrounds */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== current}
          className={cn('absolute inset-0 transition-opacity duration-700', i === current ? 'opacity-100' : 'opacity-0')}
        >
          {slide.src
            ? <Image src={slide.src} alt={t(slide.altKey)} fill priority={i === 0} className="object-cover" sizes="100vw" />
            : <div className="h-full w-full bg-navy" />}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/55" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Top spacer — navbar height */}
        <div className="h-20 md:h-24" />

        {/* Hero headline — vertically centered */}
        <div className="flex flex-1 items-center">
          <Container>
            <div className={cn('flex', isRTL ? 'justify-start' : 'justify-end')}>
              <div className={cn('max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl', isRTL ? 'text-start' : 'text-end')}>
                <h1 className="font-display font-light uppercase leading-[1.05] tracking-[0.04em] text-white text-[2.4rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]">
                  <span className="block">{t('Hero.headline1')}</span>
                  <span className="block">{t('Hero.headline2')}</span>
                  <span className="block">{t('Hero.headline3')}</span>
                </h1>
                <div className="mt-6 md:mt-8">
                  <a
                    href={isRTL ? '/ar#properties' : '#properties'}
                    className="inline-block border border-white/55 px-6 py-3 md:px-8 text-[9px] md:text-[10px] font-bold tracking-[0.28em] text-white uppercase transition-all hover:border-white hover:bg-white/10"
                  >
                    {t('Hero.cta')}
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Bottom bar — phone + nav */}
        <Container>
          <div className="flex items-end justify-between pb-8 md:pb-16">
            <a href={`tel:${t('Hero.phone')}`} className="flex flex-col leading-tight">
              <span className="text-[7px] md:text-[8px] font-bold tracking-[0.25em] text-white/50 uppercase">{t('Hero.callLabel')}</span>
              <span className="mt-1 font-display text-base md:text-xl font-light tracking-wider text-white">{t('Hero.phone')}</span>
            </a>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
                {slides.map((slide, i) => (
                  <button
                    key={slide.id}
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
