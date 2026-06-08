'use client';

import Image from 'next/image';
import { useTranslations, useLocale, useMessages } from 'next-intl';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Layers, Ruler, Building2, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

interface Props {
  titleKey: string;
  metaKey: string;
  bodyKey: string;
  imageAltKey: string;
  image: string;
  slug: string;
  hasDetails: boolean;
}

export function ProjectPageClient({ titleKey, metaKey, bodyKey, imageAltKey, image, slug, hasDetails }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tProj = useTranslations('OngoingProjects') as any;
  const tp    = useTranslations('ProjectPage');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tDet  = useTranslations('ProjectDetails') as any;
  const locale = useLocale();

  // useMessages gives the raw JSON — the only reliable way to read array values in next-intl 4.x
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages = useMessages() as any;
  const rawDet   = hasDetails ? messages?.ProjectDetails?.[slug] : null;

  const details = hasDetails && rawDet ? {
    location:   tDet(`${slug}.location`)  as string,
    type:       tDet(`${slug}.type`)      as string,
    units:      tDet(`${slug}.units`)     as string,
    size:       tDet(`${slug}.size`)      as string,
    floors:     tDet(`${slug}.floors`)    as string,
    status:     tDet(`${slug}.status`)    as string,
    features:   (rawDet.features   ?? []) as string[],
    amenities:  (rawDet.amenities  ?? []) as string[],
    highlights: (rawDet.highlights ?? []) as string[],
  } : null;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* Hero */}
        <div className="relative w-full overflow-hidden" style={{ height: '60vh', minHeight: '380px' }}>
          <Image src={image} alt={tProj(imageAltKey)} fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-8 md:px-16">
            <p className="text-[9px] font-bold tracking-[0.28em] text-gold-500 uppercase mb-3">{tProj(metaKey)}</p>
            <h1 className="font-display text-[2rem] font-light text-white md:text-[3.2rem] leading-tight max-w-2xl">{tProj(titleKey)}</h1>
          </div>
        </div>

        {/* Back link */}
        <div className="bg-white border-b border-line">
          <Container>
            <a
              href={`/${locale}/properties`}
              className="group inline-flex items-center gap-2 py-4 text-[9px] font-bold tracking-[0.22em] text-charcoal/40 uppercase transition-colors hover:text-navy"
            >
              {locale === 'ar'
                ? <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                : <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />}
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
                    <p className="text-[8px] font-bold tracking-[0.3em] text-gold-500 uppercase mb-4">{tp('overview')}</p>
                    <p className="text-[14px] leading-[1.95] text-charcoal/65">{tProj(bodyKey)}</p>
                  </div>
                </Reveal>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-line" />
                  <div className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
                  <div className="h-px flex-1 bg-line" />
                </div>

                {details && details.features.length > 0 && (
                  <Reveal delay={80}>
                    <div>
                      <p className="text-[8px] font-bold tracking-[0.3em] text-gold-500 uppercase mb-6">{tp('features')}</p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {details.features.map((f, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-teal" />
                            <span className="text-[13px] text-charcoal/70">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}

                {details && details.amenities.length > 0 && (
                  <Reveal delay={120}>
                    <div>
                      <p className="text-[8px] font-bold tracking-[0.3em] text-gold-500 uppercase mb-6">{tp('amenities')}</p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {details.amenities.map((a, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-navy" />
                            <span className="text-[13px] text-charcoal/70">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}

                {details && details.highlights.length > 0 && (
                  <Reveal delay={160}>
                    <div className="border border-line p-8">
                      <p className="text-[8px] font-bold tracking-[0.3em] text-gold-500 uppercase mb-6">{tp('locationHighlights')}</p>
                      <div className="flex flex-col gap-3">
                        {details.highlights.map((h, i) => (
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

                {details && (
                  <Reveal direction="left">
                    <div className="bg-navy p-8 flex flex-col gap-5">
                      <p className="text-[8px] font-bold tracking-[0.3em] text-gold-500 uppercase">{tp('specs')}</p>
                      {[
                        { Icon: MapPin,    label: tp('specLocation'), value: details.location },
                        { Icon: Building2, label: tp('specType'),     value: details.type },
                        { Icon: Layers,    label: tp('specUnits'),    value: details.units },
                        { Icon: Ruler,     label: tp('specSize'),     value: details.size },
                        { Icon: Building2, label: tp('specFloors'),   value: details.floors },
                        { Icon: Calendar,  label: tp('specStatus'),   value: details.status },
                      ].map(({ Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                          <Icon size={13} className="mt-0.5 shrink-0 text-gold-500" />
                          <div>
                            <p className="text-[8px] font-semibold tracking-widest text-white/40 uppercase">{label}</p>
                            <p className="text-[12px] text-white mt-0.5">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )}

                <Reveal direction="left" delay={120}>
                  <div className="border border-line p-8 flex flex-col gap-5">
                    <p className="text-[8px] font-bold tracking-[0.3em] text-navy uppercase">{tp('ctaHeading')}</p>
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
                      className="mt-2 block bg-navy py-3 text-center text-[9px] font-bold tracking-[0.22em] text-white uppercase transition-colors hover:bg-navy/85"
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
