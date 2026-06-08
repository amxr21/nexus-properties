'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';

export default function SitemapPage() {
  const t = useTranslations('SitemapPage');
  const locale = useLocale();

  const sections = [
    {
      heading: t('mainHeading'),
      links: [
        { label: t('linkHome'),        href: `/${locale}` },
        { label: t('linkAbout'),       href: `/${locale}#about` },
        { label: t('linkProperties'),  href: `/${locale}/properties` },
        { label: t('linkServices'),    href: `/${locale}/services` },
        { label: t('linkCareers'),     href: `/${locale}/careers` },
        { label: t('linkContact'),     href: `/${locale}/contact` },
      ],
    },
    {
      heading: t('projectsHeading'),
      links: [
        { label: 'Lamar Collective',   href: `/${locale}/projects/lamar-collective` },
        { label: 'Eastside Yard',      href: `/${locale}/projects/eastside-yard` },
        { label: 'Domain North Tower', href: `/${locale}/projects/domain-north-tower` },
        { label: 'Congress Plaza',     href: `/${locale}/projects/congress-plaza` },
        { label: 'Barton Heights',     href: `/${locale}/projects/barton-heights` },
        { label: 'Rainey Lofts',       href: `/${locale}/projects/rainey-lofts` },
        { label: 'Mueller Commons',    href: `/${locale}/projects/mueller-commons` },
      ],
    },
    {
      heading: t('insightsHeading'),
      links: [
        { label: t('linkReports'), href: `/${locale}/reports` },
        { label: t('linkBlog'),    href: `/${locale}/blog` },
      ],
    },
    {
      heading: t('legalHeading'),
      links: [
        { label: t('linkPrivacy'),       href: `/${locale}/privacy-policy` },
        { label: t('linkTerms'),         href: `/${locale}/terms` },
        { label: t('linkCookie'),        href: `/${locale}/cookie-policy` },
        { label: t('linkDisclaimer'),    href: `/${locale}/disclaimer` },
        { label: t('linkAccessibility'), href: `/${locale}/accessibility` },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHero eyebrow={t('eyebrow')} heading={t('heading')} />

        <div className="py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {sections.map(({ heading: h, links }, i) => (
                <Reveal key={h} delay={i * 60}>
                  <div>
                    <p className="mb-5 text-[8px] font-bold tracking-[0.28em] text-gold-500 uppercase">{h}</p>
                    <ul className="flex flex-col gap-3">
                      {links.map(({ label, href }) => (
                        <li key={href}>
                          <a
                            href={href}
                            className="text-[14px] text-charcoal/65 hover:text-navy transition-colors"
                          >
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
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
