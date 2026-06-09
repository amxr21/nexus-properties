'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Layers, Ruler, Building2, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import type { StrapiProject } from '@/lib/strapi';

interface Props {
  strapiProject: StrapiProject;
  image: string;
  slug: string;
}

export function ProjectPageClient({ strapiProject, image, slug }: Props) {
  const tp     = useTranslations('ProjectPage');
  const locale = useLocale();

  const detail = strapiProject.detail;
  const features   = detail?.residenceFeatures   ?? [];
  const amenities  = detail?.buildingAmenities   ?? [];
  const highlights = detail?.locationHighlights  ?? [];
  const hasDetails = !!detail;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <div className="relative w-full overflow-hidden" style={{ height: '60vh', minHeight: '380px' }}>
          <Image src={image} alt={strapiProject.imageAlt || strapiProject.title} fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-8 md:px-16">
            <p className="text-xs font-bold tracking-[0.28em] text-gold-500 uppercase mb-3">{strapiProject.meta}</p>
            <h1 className="font-display text-[2rem] font-light text-white md:text-[3.2rem] leading-tight max-w-2xl">{strapiProject.title}</h1>
          </div>
        </div>

        {/* Back link */}
        <div className="bg-white border-b border-line">
          <Container>
            <a
              href={`/${locale}/properties`}
              className="group inline-flex items-center gap-2 py-4 text-xs font-bold tracking-[0.22em] text-charcoal/40 uppercase transition-colors hover:text-navy"
            >
              {locale === 'ar'
                ? <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                : <ArrowLeft  size={12} className="transition-transform group-hover:-translate-x-0.5" />}
              {tp('back')}
            </a>
          </Container>
        </div>

        <div className="py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">

              {/* Left — main content */}
              <div className="lg:col-span-2 flex flex-col gap-16">

                <Reveal>
                  <div>
                    <p className="text-xs font-bold tracking-[0.3em] text-gold-500 uppercase mb-4">{tp('overview')}</p>
                    <p className="text-[14px] leading-[1.95] text-charcoal/65">{strapiProject.body}</p>
                  </div>
                </Reveal>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-line" />
                  <div className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
                  <div className="h-px flex-1 bg-line" />
                </div>

                {hasDetails && features.length > 0 && (
                  <Reveal delay={80}>
                    <div>
                      <h2 className="font-display text-[1.2rem] font-semibold text-navy mb-6">{tp('features')}</h2>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {features.map((f, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-teal" />
                            <span className="text-[13px] text-charcoal/70">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}

                {hasDetails && amenities.length > 0 && (
                  <Reveal delay={120}>
                    <div>
                      <h2 className="font-display text-[1.2rem] font-semibold text-navy mb-6">{tp('amenities')}</h2>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {amenities.map((a, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-navy" />
                            <span className="text-[13px] text-charcoal/70">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}

                {hasDetails && highlights.length > 0 && (
                  <Reveal delay={160}>
                    <div className="border border-line p-8">
                      <h2 className="font-display text-[1.2rem] font-semibold text-navy mb-6">{tp('locationHighlights')}</h2>
                      <div className="flex flex-col gap-3">
                        {highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <MapPin size={13} className="mt-0.5 shrink-0 text-gold-500" />
                            <span className="text-[13px] text-charcoal/70">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}
              </div>

              {/* Right — specs + CTA */}
              <div className="flex flex-col gap-8">

                {hasDetails && detail && (
                  <Reveal direction="left">
                    <div className="bg-navy p-8 flex flex-col gap-5">
                      <p className="text-xs font-bold tracking-[0.3em] text-gold-500 uppercase">{tp('specs')}</p>
                      {[
                        { Icon: MapPin,    label: tp('specLocation'), value: detail.location },
                        { Icon: Building2, label: tp('specType'),     value: detail.type },
                        { Icon: Layers,    label: tp('specUnits'),    value: detail.units },
                        { Icon: Ruler,     label: tp('specSize'),     value: detail.size },
                        { Icon: Building2, label: tp('specFloors'),   value: detail.floors },
                        { Icon: Calendar,  label: tp('specStatus'),   value: strapiProject.meta },
                      ].map(({ Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                          <Icon size={13} className="mt-0.5 shrink-0 text-gold-500" />
                          <div>
                            <p className="text-xs font-semibold tracking-widest text-white/40 uppercase">{label}</p>
                            <p className="text-[12px] text-white mt-0.5">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )}

                <Reveal direction="left" delay={120}>
                  <div className="border border-line p-8 flex flex-col gap-5">
                    <p className="text-xs font-bold tracking-[0.3em] text-navy uppercase">{tp('ctaHeading')}</p>
                    <p className="text-[12px] text-charcoal/60 leading-relaxed">{tp('ctaBody')}</p>
                    <div className="flex flex-col gap-3">
                      <a href="tel:+15120000000" className="flex items-center gap-2 text-[11px] text-navy font-semibold hover:text-gold-500 transition-colors">
                        <Phone size={13} />
                        <span dir="ltr">+1 (512) 000-0000</span>
                      </a>
                      <a href="mailto:hello@nexusproperties.com" className="flex items-center gap-2 text-[11px] text-navy font-semibold hover:text-gold-500 transition-colors">
                        <Mail size={13} />
                        hello@nexusproperties.com
                      </a>
                    </div>
                    <a
                      href={`/${locale}/contact`}
                      className="mt-2 block bg-navy py-3 text-center text-xs font-bold tracking-[0.22em] text-white uppercase transition-colors hover:bg-navy/85"
                    >
                      {tp('ctaBtn')}
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
