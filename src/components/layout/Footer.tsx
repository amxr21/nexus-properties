'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { FooterLinkList } from '@/components/ui/FooterLinkList';
import { footerSocial, images } from '@/lib/content';

export function Footer() {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const base = `/${locale}`;

  const quickLinks = [
    { label: t('link1'), href: base },
    { label: t('link2'), href: `${base}#about` },
    { label: t('link3'), href: `${base}/properties` },
    { label: t('link4'), href: `${base}/services` },
    { label: t('link5'), href: `${base}/careers` },
    { label: t('link6'), href: `${base}/reports` },
    { label: t('link7'), href: `${base}/blog` },
    { label: t('link8'), href: `${base}/contact` },
  ];

  const legalLinks = [
    { label: t('legal1'), href: `${base}/privacy-policy` },
    { label: t('legal2'), href: `${base}/terms` },
    { label: t('legal3'), href: `${base}/cookie-policy` },
    { label: t('legal4'), href: `${base}/disclaimer` },
    { label: t('legal5'), href: `${base}/accessibility` },
    { label: t('legal6'), href: `${base}/sitemap-page` },
  ];

  return (
    <footer aria-label="Site footer" className="relative overflow-hidden">
      <Image
        src={images.footerBg}
        alt=""
        aria-hidden="true"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="relative z-10 pt-16 pb-8">
        <Container>
          {/* Brand block */}
          <div className="mb-12 flex flex-col items-center gap-2 text-center">
            <p className="font-display text-[13px] font-bold tracking-[0.4em] text-black uppercase">NEXUS</p>
            <p className="text-[7px] tracking-[0.5em] text-black/50 uppercase">PROPERTIES</p>
            <p className="mt-2 text-[11px] italic text-black/40">&ldquo;{t('tagline')}&rdquo;</p>
          </div>

          {/* 6-column info grid */}
          <div className="grid grid-cols-2 gap-y-10 gap-x-8 border-t border-black/10 pt-10 sm:grid-cols-3 lg:grid-cols-6">

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[8px] font-bold tracking-[0.28em] text-black uppercase">{t('contactHeading')}</h3>
              <address className="not-italic flex flex-col gap-1.5 text-[11px] leading-relaxed text-black/60">
                <span>{t('address')}</span>
                <span>{t('phone')}</span>
                <a href={`mailto:${t('email')}`} className="transition-colors hover:text-black">{t('email')}</a>
              </address>
            </div>

            {/* Office Hours */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[8px] font-bold tracking-[0.28em] text-black uppercase">{t('hoursHeading')}</h3>
              <ul className="flex flex-col gap-1.5 text-[11px] leading-relaxed text-black/60">
                {(['hours1', 'hours2', 'hours3', 'hours4'] as const).map(k => (
                  <li key={k}>{t(k)}</li>
                ))}
              </ul>
            </div>

            <FooterLinkList heading={t('quickLinksHeading')} items={quickLinks} />

            {/* Services links pointing to /services */}
            <FooterLinkList
              heading={t('servicesHeading')}
              items={[
                t('service1'), t('service2'), t('service3'), t('service4'),
                t('service5'), t('service6'), t('service7'), t('service8'),
              ].map(label => ({ label, href: `${base}/services` }))}
            />

            <FooterLinkList heading={t('legalHeading')} items={legalLinks} />

            <FooterLinkList
              heading={t('followHeading')}
              items={footerSocial.map(({ key, href }) => ({
                label: t(key.replace('Footer.', '') as Parameters<typeof t>[0]),
                href,
                external: true,
              }))}
            />
          </div>

          {/* Bottom bar */}
          <div className="mt-10 border-t border-black/10 pt-8 text-center">
            <p className="text-[10px] text-black/40">{t('copyright')}</p>
            <p className="mt-1 text-[10px] text-black/30">{t('copyrightSub')}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
