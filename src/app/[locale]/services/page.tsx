'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/ui/PageHero';
import { getServices, type StrapiService } from '@/lib/strapi';
import { cn } from '@/lib/utils';

const SERVICE_ICONS = ['⌂', '◈', '▦', '↔', '⊞', '◉', '✦', '§'];

function ServiceCard({
  service,
  icon,
  open,
  onToggle,
}: {
  service: StrapiService;
  icon: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={cn(
      'border border-line transition-all duration-500',
      open ? 'border-navy/30' : 'hover:border-navy/20'
    )}>
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-5 p-6 text-start md:p-8"
        aria-expanded={open}
      >
        <span className={cn(
          'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center text-base border transition-colors',
          open ? 'border-navy bg-navy text-white' : 'border-line text-gold-500'
        )}>
          {icon}
        </span>

        <div className="flex-1 min-w-0">
          <p className="font-display text-[1.15rem] font-light text-navy leading-snug">{service.title}</p>
          <p className="mt-1 text-[14px] text-charcoal/50 leading-relaxed">{service.tagline}</p>
        </div>

        <ChevronDown
          size={16}
          className={cn(
            'mt-1 shrink-0 text-charcoal/30 transition-transform duration-300',
            open && 'rotate-180'
          )}
        />
      </button>

      <div className={cn(
        'grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      )}>
        <div className="overflow-hidden">
          <div className="border-t border-line px-6 pb-8 pt-6 md:px-8 md:pb-10">
            <p className="max-w-2xl text-[15px] leading-[1.9] text-charcoal/60">{service.description}</p>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <p className="mb-4 text-xs font-bold tracking-[0.28em] uppercase text-navy">
                  Requirements
                </p>
                <ul className="flex flex-col gap-3">
                  {(service.requirements ?? []).map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-charcoal/65 leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-4 text-xs font-bold tracking-[0.28em] uppercase text-navy">
                  Our Process
                </p>
                <ol className="flex flex-col gap-3">
                  {(service.processSteps ?? []).map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-charcoal/65 leading-relaxed">
                      <span className="mt-0.5 shrink-0 text-xs font-bold text-gold-500 leading-none w-4">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const t = useTranslations('ServicesPage');
  const locale = useLocale();
  const [services, setServices] = useState<StrapiService[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    getServices(locale).then((data) => {
      setServices(data);
      if (data.length > 0) setOpenId(data[0].id);
    }).catch(() => setServices([]));
  }, [locale]);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <PageHero eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} />

        <div className="py-20 md:py-28">
          <Container>
            <div className="flex flex-col gap-3">
              {services.map((service, idx) => (
                <Reveal key={service.id} delay={idx * 40}>
                  <ServiceCard
                    service={service}
                    icon={SERVICE_ICONS[idx % SERVICE_ICONS.length]}
                    open={openId === service.id}
                    onToggle={() => setOpenId(prev => prev === service.id ? null : service.id)}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-20">
              <div className="flex flex-col items-center gap-6 border border-line py-14 text-center">
                <div className="h-px w-8 bg-gold-500" />
                <h2 className="font-display text-[1.5rem] font-light text-navy max-w-md leading-snug">
                  {t('ctaHeading')}
                </h2>
                <p className="max-w-sm text-[15px] text-charcoal/55 leading-relaxed">
                  {t('ctaSub')}
                </p>
                <a
                  href={`/${locale}/contact`}
                  className="bg-navy px-10 py-4 text-xs font-bold tracking-[0.28em] text-white uppercase transition-colors hover:bg-navy/85"
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
