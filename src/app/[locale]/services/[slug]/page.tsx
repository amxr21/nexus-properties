'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { getService, type StrapiService } from '@/lib/strapi';

export default function ServiceDetailPage() {
  const t = useTranslations('ServicesPage');
  const locale = useLocale();
  const params = useParams<{ slug: string }>();
  const Arrow = locale === 'ar' ? ArrowRight : ArrowLeft;

  const [service, setService] = useState<StrapiService | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getService(params.slug, locale)
      .then((data) => {
        if (!data) setNotFound(true);
        else setService(data);
      })
      .catch(() => setNotFound(true));
  }, [params.slug, locale]);

  if (notFound) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center flex flex-col items-center gap-4">
            <div className="h-1.5 w-8 bg-gold-500" />
            <p className="font-display text-[1.4rem] font-light text-navy">{t('notFoundService')}</p>
            <a
              href={`/${locale}/services`}
              className="text-xs font-bold tracking-[0.22em] text-navy uppercase hover:text-gold-500 transition-colors"
            >
              {t('backToServices')}
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!service) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white" />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHero eyebrow={t('eyebrow')} heading={service.title} sub={service.tagline} />

        <div className="py-20 md:py-28">
          <Container>
            <Reveal>
              <a
                href={`/${locale}/services`}
                className="mb-12 inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-navy uppercase hover:text-gold-500 transition-colors"
              >
                <Arrow size={11} />
                {t('backToServices')}
              </a>
            </Reveal>

            <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">

              {/* Description */}
              <Reveal className="lg:col-span-2">
                <p className="text-[15px] leading-[1.9] text-charcoal/65">{service.description}</p>
              </Reveal>

              {/* Requirements */}
              {service.requirements?.length > 0 && (
                <Reveal delay={60} className="lg:col-span-1">
                  <div className="border border-line p-8">
                    <h2 className="mb-6 text-xs font-bold tracking-[0.28em] text-navy uppercase">
                      {t('requirementsHeading')}
                    </h2>
                    <ul className="flex flex-col gap-3">
                      {service.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-gold-500" />
                          <span className="text-[13px] leading-snug text-charcoal/65">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Process steps */}
            {service.processSteps?.length > 0 && (
              <div className="mt-20">
                <Reveal>
                  <h2 className="mb-10 text-xs font-bold tracking-[0.28em] text-navy uppercase">
                    {t('processHeading')}
                  </h2>
                </Reveal>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {service.processSteps.map((step, i) => (
                    <Reveal key={i} delay={i * 60}>
                      <div className="border border-line p-7 flex flex-col gap-4">
                        <span className="font-display text-[3rem] font-bold leading-none text-navy/8 select-none">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-[13px] leading-relaxed text-charcoal/65">{step}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <Reveal className="mt-20">
              <div className="border border-line py-16 flex flex-col items-center gap-6 text-center">
                <div className="h-px w-8 bg-gold-500" />
                <h2 className="font-display text-[1.5rem] font-light text-navy max-w-md leading-snug">{t('ctaHeading')}</h2>
                <p className="max-w-sm text-[15px] text-charcoal/55 leading-relaxed">{t('ctaSub')}</p>
                <a
                  href={`/${locale}/contact`}
                  className="bg-navy px-10 py-4 text-xs font-bold tracking-[0.28em] text-white uppercase hover:bg-navy/85 transition-colors"
                >
                  {t('ctaButton')}
                </a>
              </div>
            </Reveal>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
