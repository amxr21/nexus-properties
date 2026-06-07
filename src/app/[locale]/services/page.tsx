'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/ui/PageHero';
import { cn } from '@/lib/utils';

const SERVICE_KEYS = [
  { id: 's1', icon: '⌂' },
  { id: 's2', icon: '◈' },
  { id: 's3', icon: '▦' },
  { id: 's4', icon: '↔' },
  { id: 's5', icon: '⊞' },
  { id: 's6', icon: '◉' },
  { id: 's7', icon: '✦' },
  { id: 's8', icon: '§' },
] as const;

type ServiceId = typeof SERVICE_KEYS[number]['id'];

function ServiceCard({
  serviceId,
  icon,
  open,
  onToggle,
}: {
  serviceId: ServiceId;
  icon: string;
  open: boolean;
  onToggle: () => void;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useTranslations('ServicesPage') as any;
  const title = t(`${serviceId}Title`);
  const sub   = t(`${serviceId}Sub`);
  const desc  = t(`${serviceId}Desc`);
  const reqs  = [1,2,3,4].map(n => t(`${serviceId}Req${n}`));
  const steps = [1,2,3,4].map(n => t(`${serviceId}Step${n}`));

  return (
    <div className={cn(
      'border border-line transition-all duration-500',
      open ? 'border-navy/30' : 'hover:border-navy/20'
    )}>
      {/* Header row — always visible */}
      <button
        onClick={onToggle}
        className="flex w-full items-start gap-5 p-6 text-start md:p-8"
        aria-expanded={open}
      >
        {/* Icon glyph */}
        <span className={cn(
          'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center text-base border transition-colors',
          open ? 'border-navy bg-navy text-white' : 'border-line text-gold-500'
        )}>
          {icon}
        </span>

        <div className="flex-1 min-w-0">
          <p className="font-display text-[1.15rem] font-light text-navy leading-snug">{title}</p>
          <p className="mt-1 text-[14px] text-charcoal/50 leading-relaxed">{sub}</p>
        </div>

        <ChevronDown
          size={16}
          className={cn(
            'mt-1 shrink-0 text-charcoal/30 transition-transform duration-300',
            open && 'rotate-180'
          )}
        />
      </button>

      {/* Expanded body */}
      <div className={cn(
        'grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      )}>
        <div className="overflow-hidden">
          <div className="border-t border-line px-6 pb-8 pt-6 md:px-8 md:pb-10">
            {/* Description */}
            <p className="max-w-2xl text-[15px] leading-[1.9] text-charcoal/60">{desc}</p>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Requirements */}
              <div>
                <p className="mb-4 text-[8px] font-bold tracking-[0.28em] uppercase text-navy">
                  {t('requirementsHeading')}
                </p>
                <ul className="flex flex-col gap-3">
                  {reqs.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-charcoal/65 leading-relaxed">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process steps */}
              <div>
                <p className="mb-4 text-[8px] font-bold tracking-[0.28em] uppercase text-navy">
                  {t('processHeading')}
                </p>
                <ol className="flex flex-col gap-3">
                  {steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-charcoal/65 leading-relaxed">
                      <span className="mt-0.5 shrink-0 text-[9px] font-bold text-gold-500 leading-none w-4">
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useTranslations('ServicesPage') as any;
  const locale = useLocale();
  const [openId, setOpenId] = useState<ServiceId | null>('s1');

  const toggle = (id: ServiceId) => setOpenId(prev => prev === id ? null : id);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">

        <PageHero eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} />

        {/* Services accordion */}
        <div className="py-20 md:py-28">
          <Container>
            <div className="flex flex-col gap-3">
              {SERVICE_KEYS.map(({ id, icon }, idx) => (
                <Reveal key={id} delay={idx * 40}>
                  <ServiceCard
                    serviceId={id}
                    icon={icon}
                    open={openId === id}
                    onToggle={() => toggle(id)}
                  />
                </Reveal>
              ))}
            </div>

            {/* CTA strip */}
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
                  className="bg-navy px-10 py-4 text-[9px] font-bold tracking-[0.28em] text-white uppercase transition-colors hover:bg-navy/85"
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
