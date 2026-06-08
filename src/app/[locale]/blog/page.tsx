'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';

const POST_IDS = [
  { id: 'austin-2025-outlook',    image: '/images/hero-card 1.jpg',             n: 1 },
  { id: 'domain-district-growth', image: '/images/hero-card 2.jpg',             n: 2 },
  { id: 'investing-east-austin',  image: '/images/hero-card 3.jpg',             n: 3 },
  { id: 'luxury-amenities',       image: '/images/hero-card 4.jpg',             n: 4 },
  { id: 'sustainability-leed',    image: '/images/hero-card 5.jpg',             n: 5 },
  { id: 'rainey-street-revival',  image: '/images/showoff section image 1.jpg', n: 6 },
] as const;

export default function BlogPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useTranslations('BlogPage') as any;
  const locale = useLocale();
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHero eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} />

        <div className="py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {POST_IDS.map(({ id, image, n }, i) => (
                <Reveal key={id} delay={i * 50}>
                  <article className="group flex flex-col border border-line hover:border-navy/25 transition-colors">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={image}
                        alt={t(`post${n}Title`)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[8px] font-bold tracking-[0.22em] text-gold-500 uppercase">{t(`post${n}Tag`)}</span>
                        <span className="text-[8px] text-charcoal/30">·</span>
                        <span className="text-[8px] text-charcoal/40">{t(`post${n}Date`)}</span>
                      </div>
                      <h3 className="font-display text-[1rem] font-light text-navy leading-snug flex-1">{t(`post${n}Title`)}</h3>
                      <a
                        href={`/${locale}/blog/${id}`}
                        className="group/link inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-navy uppercase hover:text-gold-500 transition-colors mt-2"
                      >
                        {t('readBtn')}
                        <Arrow size={11} className="transition-transform group-hover/link:translate-x-0.5" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
