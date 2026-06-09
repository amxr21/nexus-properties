'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { getProjects, type StrapiProject } from '@/lib/strapi';

export default function SitemapPage() {
  const t = useTranslations('SitemapPage');
  const locale = useLocale();
  const [projects, setProjects] = useState<StrapiProject[]>([]);

  useEffect(() => {
    getProjects(locale).then(setProjects).catch(() => setProjects([]));
  }, [locale]);

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
      links: projects.map(p => ({
        label: p.title,
        href: `/${locale}/projects/${p.slug}`,
      })),
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
                    <p className="mb-5 text-xs font-bold tracking-[0.28em] text-gold-500 uppercase">{h}</p>
                    <ul className="flex flex-col gap-3">
                      {links.map(({ label, href }) => (
                        <li key={href}>
                          <a href={href} className="text-[14px] text-charcoal/65 hover:text-navy transition-colors">
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
