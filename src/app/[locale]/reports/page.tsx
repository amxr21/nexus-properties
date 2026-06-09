'use client';

import { useTranslations, useLocale } from 'next-intl';
import { FileText, Download } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';

const REPORTS = [
  { id: 'q1-2025', quarter: 'Q1 2025', title: 'Austin Market Report', pages: '24 pages' },
  { id: 'q4-2024', quarter: 'Q4 2024', title: 'Annual Portfolio Review', pages: '48 pages' },
  { id: 'q3-2024', quarter: 'Q3 2024', title: 'Austin Market Report', pages: '22 pages' },
  { id: 'q2-2024', quarter: 'Q2 2024', title: 'Mid-Year Market Outlook', pages: '30 pages' },
  { id: 'q1-2024', quarter: 'Q1 2024', title: 'Austin Market Report', pages: '21 pages' },
  { id: 'q4-2023', quarter: 'Q4 2023', title: 'Annual Portfolio Review', pages: '44 pages' },
] as const;

export default function ReportsPage() {
  const t = useTranslations('ReportsPage');
  const locale = useLocale();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHero eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} />

        <div className="py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {REPORTS.map(({ id, quarter, title, pages }, i) => (
                <Reveal key={id} delay={i * 50}>
                  <div className="group border border-line p-7 flex flex-col gap-5 hover:border-navy/30 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-line text-gold-500">
                        <FileText size={18} />
                      </div>
                      <span className="text-xs font-bold tracking-[0.24em] text-charcoal/35 uppercase">{quarter}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-[1rem] font-light text-navy leading-snug">{title}</h3>
                      <p className="mt-1 text-[11px] text-charcoal/40">{pages}</p>
                    </div>
                    <button className="mt-auto inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-navy uppercase hover:text-gold-500 transition-colors">
                      <Download size={12} />
                      {t('downloadBtn')}
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-20">
              <div className="border border-line py-14 flex flex-col items-center gap-5 text-center">
                <div className="h-px w-8 bg-gold-500" />
                <h2 className="font-display text-[1.4rem] font-light text-navy max-w-md leading-snug">{t('ctaHeading')}</h2>
                <p className="max-w-sm text-[15px] text-charcoal/55 leading-relaxed">{t('ctaSub')}</p>
                <a
                  href={`/${locale}/contact`}
                  className="bg-navy px-10 py-4 text-xs font-bold tracking-[0.28em] text-white uppercase hover:bg-navy/85 transition-colors"
                >
                  {t('ctaBtn')}
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
