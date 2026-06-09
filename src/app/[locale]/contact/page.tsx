'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { PageHero } from '@/components/ui/PageHero';
import { getSiteSettings, type StrapiSiteSettings } from '@/lib/strapi';

type SvgIconProps = { size?: number; className?: string };

function FacebookIcon({ size = 15, className = '' }: SvgIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 15, className = '' }: SvgIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 15, className = '' }: SvgIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function LinkedinIcon({ size = 15, className = '' }: SvgIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ContactInfo({ icon: Icon, heading, children }: {
  icon: React.ElementType;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-navy/15">
        <Icon size={15} className="text-gold-500" />
      </div>
      <div>
        <p className="text-xs font-bold tracking-[0.25em] text-navy uppercase mb-1">{heading}</p>
        <div className="text-[15px] text-charcoal/65 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations('Contact');
  const locale = useLocale();
  const [submitted, setSubmitted] = useState(false);
  const [settings, setSettings] = useState<StrapiSiteSettings | null>(null);

  useEffect(() => {
    getSiteSettings(locale).then(setSettings).catch(() => setSettings(null));
  }, [locale]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass = "w-full border border-line bg-white px-4 py-3 text-[15px] text-charcoal placeholder:text-charcoal/30 outline-none transition-colors focus:border-navy";
  const labelClass = "block text-xs font-bold tracking-[0.22em] text-navy uppercase mb-2";

  const address = settings?.address ?? t('address');
  const phone   = settings?.phone   ?? t('phone');
  const email   = settings?.email   ?? t('email');
  const hours   = [
    settings?.hours1 ?? t('hours1'),
    settings?.hours2 ?? t('hours2'),
    settings?.hours3 ?? t('hours3'),
    settings?.hours4 ?? t('hours4'),
  ];

  const socials = [
    { Icon: InstagramIcon, href: settings?.instagramUrl },
    { Icon: FacebookIcon,  href: settings?.facebookUrl  },
    { Icon: YoutubeIcon,   href: settings?.youtubeUrl   },
    { Icon: LinkedinIcon,  href: settings?.linkedinUrl  },
  ].filter(s => s.href);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">

        <PageHero eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} />

        <div className="py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">

              {/* Form */}
              <div className="lg:col-span-3">
                <Reveal>
                  {submitted ? (
                    <div className="flex flex-col items-start gap-4 border border-line p-10">
                      <div className="h-1.5 w-8 bg-gold-500" />
                      <h2 className="font-display text-[1.6rem] font-light text-navy">{t('successHeading')}</h2>
                      <p className="text-[13px] leading-[1.85] text-charcoal/60">{t('successBody')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>{t('formName')}</label>
                          <input type="text" required placeholder={t('formNamePlaceholder')} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{t('formEmail')}</label>
                          <input type="email" required placeholder={t('formEmailPlaceholder')} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{t('formPhone')}</label>
                          <input type="tel" placeholder={t('formPhonePlaceholder')} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{t('formSubject')}</label>
                          <input type="text" required placeholder={t('formSubjectPlaceholder')} className={inputClass} />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>{t('formMessage')}</label>
                        <textarea required rows={6} placeholder={t('formMessagePlaceholder')} className={`${inputClass} resize-none`} />
                      </div>
                      <button
                        type="submit"
                        className="self-start bg-navy px-10 py-4 text-xs font-bold tracking-[0.28em] text-white uppercase transition-colors hover:bg-navy/85"
                      >
                        {t('formSubmit')}
                      </button>
                    </form>
                  )}
                </Reveal>
              </div>

              {/* Info */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-line" />
                  <div className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
                </div>

                <Reveal direction="left">
                  <ContactInfo icon={MapPin} heading={t('officeHeading')}>
                    <p>{address}</p>
                  </ContactInfo>
                </Reveal>

                <Reveal direction="left" delay={80}>
                  <ContactInfo icon={Clock} heading={t('hoursHeading')}>
                    <ul className="flex flex-col gap-0.5">
                      {hours.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  </ContactInfo>
                </Reveal>

                <Reveal direction="left" delay={160}>
                  <ContactInfo icon={Phone} heading={t('phoneHeading')}>
                    <a href={`tel:${phone}`} className="hover:text-navy transition-colors">{phone}</a>
                  </ContactInfo>
                </Reveal>

                <Reveal direction="left" delay={240}>
                  <ContactInfo icon={Mail} heading={t('emailHeading')}>
                    <a href={`mailto:${email}`} className="hover:text-navy transition-colors">{email}</a>
                  </ContactInfo>
                </Reveal>

                {socials.length > 0 && (
                  <Reveal direction="left" delay={320}>
                    <div className="flex gap-3 pt-2">
                      {socials.map(({ Icon, href }) => (
                        <a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center border border-line text-charcoal/40 transition-colors hover:border-navy hover:text-navy"
                        >
                          <Icon size={14} />
                        </a>
                      ))}
                    </div>
                  </Reveal>
                )}
              </div>
            </div>

            <Reveal className="mt-20">
              <div className="h-72 w-full bg-gray flex items-center justify-center border border-line md:h-96">
                <div className="flex flex-col items-center gap-2 text-charcoal/30">
                  <MapPin size={28} />
                  <p className="text-[10px] font-bold tracking-[0.22em] uppercase">{address}</p>
                </div>
              </div>
            </Reveal>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
