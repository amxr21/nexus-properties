'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { ongoingProjects, completedProjects } from '@/lib/content';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'ongoing' | 'completed';

function ProjectCard({
  slug,
  image,
  titleKey,
  metaKey,
  briefKey,
}: {
  slug: string;
  image: string;
  titleKey: string;
  metaKey: string;
  briefKey: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useTranslations('OngoingProjects') as any;
  const tp = useTranslations('PropertiesPage');
  const locale = useLocale();

  const strip = (key: string) => key.replace(/^OngoingProjects\./, '');
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <article className="group relative overflow-hidden border border-line bg-white flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={image}
          alt={t(strip(titleKey))}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-7 gap-4">
        <div>
          <p className="text-[8px] font-bold tracking-[0.26em] text-gold-500 uppercase mb-2">
            {t(strip(metaKey))}
          </p>
          <h3 className="font-display text-[1.15rem] font-light text-navy leading-snug">
            {t(strip(titleKey))}
          </h3>
        </div>
        <p className="text-[13px] leading-relaxed text-charcoal/60 flex-1">
          {t(strip(briefKey))}
        </p>
        <a
          href={`/${locale}/projects/${slug}`}
          className="group/link mt-auto inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.22em] text-navy uppercase hover:text-gold-500 transition-colors"
        >
          {tp('exploreBtn')}
          <Arrow size={12} className="transition-transform group-hover/link:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

export default function PropertiesPage() {
  const t = useTranslations('PropertiesPage');
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { id: Filter; label: string }[] = [
    { id: 'all',       label: t('allLabel') },
    { id: 'ongoing',   label: t('ongoingLabel') },
    { id: 'completed', label: t('completedLabel') },
  ];

  const shown = filter === 'all'
    ? [...ongoingProjects, ...completedProjects]
    : filter === 'ongoing'
      ? [...ongoingProjects]
      : [...completedProjects];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHero eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} />

        <div className="py-20 md:py-28">
          <Container>
            {/* Filter tabs */}
            <Reveal>
              <div className="mb-12 flex flex-wrap gap-2">
                {filters.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setFilter(id)}
                    className={cn(
                      'px-6 py-2.5 text-[9px] font-bold tracking-[0.22em] uppercase transition-all border',
                      filter === id
                        ? 'bg-navy text-white border-navy'
                        : 'bg-white text-navy/60 border-line hover:border-navy/40 hover:text-navy'
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p, i) => (
                <Reveal key={p.slug} delay={i * 40}>
                  <ProjectCard
                    slug={p.slug}
                    image={p.image}
                    titleKey={p.titleKey}
                    metaKey={p.metaKey}
                    briefKey={p.briefKey}
                  />
                </Reveal>
              ))}
            </div>

            {/* CTA strip */}
            <Reveal className="mt-24">
              <div className="border border-line py-16 flex flex-col items-center gap-6 text-center">
                <div className="h-px w-8 bg-gold-500" />
                <h2 className="font-display text-[1.5rem] font-light text-navy max-w-md leading-snug">
                  {t('ctaHeading')}
                </h2>
                <p className="max-w-sm text-[15px] text-charcoal/55 leading-relaxed">{t('ctaSub')}</p>
                <a
                  href={`/${locale}/contact`}
                  className="bg-navy px-10 py-4 text-[9px] font-bold tracking-[0.28em] text-white uppercase hover:bg-navy/85 transition-colors"
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
