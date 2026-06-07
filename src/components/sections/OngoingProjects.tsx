'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ongoingProjects, completedProjects } from '@/lib/content';
import { cn } from '@/lib/utils';

type Tab = 'ongoing' | 'completed';
type Project = typeof ongoingProjects[number] | typeof completedProjects[number];

function ProjectSlide({
  project,
  exploreLabel,
  locale,
  t,
}: {
  project: Project;
  exploreLabel: string;
  locale: string;
  t: ReturnType<typeof useTranslations<'OngoingProjects'>>;
}) {
  const ns = (key: string) =>
    t(key.replace('OngoingProjects.', '') as Parameters<typeof t>[0]);

  return (
    <div className="w-full">
      {/* Image — short strip, ~30vh */}
      <div className="relative w-full overflow-hidden" style={{ height: '32vh', minHeight: '200px', maxHeight: '320px' }}>
        <Image
          src={project.image}
          alt={ns(project.imageAltKey)}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1200px) 100vw, 1200px"
        />
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2 max-w-2xl">
          <p className="text-[9px] font-bold tracking-[0.22em] text-gold-500 uppercase">
            {ns(project.metaKey)}
          </p>
          <h3 className="font-display text-[1.5rem] font-light text-navy md:text-[1.9rem]">
            {ns(project.titleKey)}
          </h3>
          <p className="text-[13px] leading-[1.85] text-charcoal/55 mt-1">
            {ns(project.briefKey)}
          </p>
        </div>

        <a
          href={`/${locale}/projects/${project.slug}`}
          className="group inline-flex shrink-0 items-center gap-2 border border-navy px-6 py-3 text-[9px] font-bold tracking-[0.22em] text-navy uppercase transition-colors hover:bg-navy hover:text-white"
        >
          {exploreLabel}
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

export function OngoingProjects() {
  const t = useTranslations('OngoingProjects');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [activeTab, setActiveTab] = useState<Tab>('ongoing');
  const [index, setIndex] = useState(0);

  const projects = activeTab === 'ongoing'
    ? (ongoingProjects as unknown as Project[])
    : (completedProjects as unknown as Project[]);

  const total = projects.length;

  function goTo(next: number) {
    setIndex((next + total) % total);
  }

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    setIndex(0);
  }

  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <section id="properties" aria-label="Projects" className="bg-white py-20 md:py-28">
      <Container>
        {/* Tab header + arrows */}
        <div className="mb-10 flex items-end justify-between border-b border-line pb-0">
          <div className="flex items-end">
            <button
              onClick={() => handleTabChange('ongoing')}
              className={cn(
                'pb-3 text-[9px] font-bold tracking-[0.28em] uppercase transition-colors',
                activeTab === 'ongoing'
                  ? 'border-b-2 border-navy text-navy'
                  : 'text-charcoal/30 hover:text-charcoal/60'
              )}
            >
              {t('eyebrow')}
            </button>
            <button
              onClick={() => handleTabChange('completed')}
              className={cn(
                'ms-8 pb-3 text-[9px] font-bold tracking-[0.28em] uppercase transition-colors',
                activeTab === 'completed'
                  ? 'border-b-2 border-navy text-navy'
                  : 'text-charcoal/30 hover:text-charcoal/60'
              )}
            >
              {t('eyebrowAlt')}
            </button>
          </div>

          {/* Arrow controls + counter */}
          <div className="flex items-center gap-3 pb-3">
            <span className="text-[9px] font-semibold tracking-widest text-charcoal/35">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Previous project"
              className="flex h-8 w-8 items-center justify-center border border-charcoal/20 text-charcoal/50 transition-colors hover:border-navy hover:text-navy"
            >
              <PrevIcon size={14} />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Next project"
              className="flex h-8 w-8 items-center justify-center border border-charcoal/20 text-charcoal/50 transition-colors hover:border-navy hover:text-navy"
            >
              <NextIcon size={14} />
            </button>
          </div>
        </div>

        {/* Active slide */}
        <ProjectSlide
          project={projects[index]}
          exploreLabel={t('exploreBtn')}
          locale={locale}
          t={t}
        />

        {/* Dot indicators */}
        <div className="mt-6 flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to project ${i + 1}`}
              className={cn(
                'h-1 rounded-full transition-all duration-300',
                i === index ? 'w-6 bg-navy' : 'w-2 bg-charcoal/20 hover:bg-charcoal/40'
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
