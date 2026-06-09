'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { getMediaUrl, type StrapiProject } from '@/lib/strapi';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'ongoing' | 'completed';

type Labels = {
  allLabel: string;
  ongoingLabel: string;
  completedLabel: string;
  exploreBtn: string;
  ctaHeading: string;
  ctaSub: string;
  ctaBtn: string;
};

function ProjectCard({
  project,
  exploreBtn,
  locale,
}: {
  project: StrapiProject;
  exploreBtn: string;
  locale: string;
}) {
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const imageSrc = getMediaUrl(project.image?.url) ?? '/images/project image.jpg';

  return (
    <article className="group relative overflow-hidden border border-line bg-white flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={project.imageAlt || project.title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-7 gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.26em] text-gold-500 uppercase mb-2">{project.meta}</p>
          <h3 className="font-display text-[1.15rem] font-light text-navy leading-snug">{project.title}</h3>
        </div>
        <p className="text-[13px] leading-relaxed text-charcoal/60 flex-1">{project.brief}</p>
        <a
          href={`/${locale}/projects/${project.slug}`}
          className="group/link mt-auto inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-navy uppercase hover:text-gold-500 transition-colors"
        >
          {exploreBtn}
          <Arrow size={12} className="transition-transform group-hover/link:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

export function PropertiesClient({
  projects,
  locale,
  labels,
}: {
  projects: StrapiProject[];
  locale: string;
  labels: Labels;
}) {
  const [filter, setFilter] = useState<Filter>('all');

  const filters: { id: Filter; label: string }[] = [
    { id: 'all',       label: labels.allLabel },
    { id: 'ongoing',   label: labels.ongoingLabel },
    { id: 'completed', label: labels.completedLabel },
  ];

  const shown = filter === 'all' ? projects : projects.filter(p => p.status === filter);

  return (
    <div className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="mb-12 flex flex-wrap gap-2">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={cn(
                  'px-6 py-2.5 text-xs font-bold tracking-[0.22em] uppercase transition-all border',
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={i * 40}>
              <ProjectCard project={p} exploreBtn={labels.exploreBtn} locale={locale} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <div className="border border-line py-16 flex flex-col items-center gap-6 text-center">
            <div className="h-px w-8 bg-gold-500" />
            <h2 className="font-display text-[1.5rem] font-light text-navy max-w-md leading-snug">{labels.ctaHeading}</h2>
            <p className="max-w-sm text-[15px] text-charcoal/55 leading-relaxed">{labels.ctaSub}</p>
            <a
              href={`/${locale}/contact`}
              className="bg-navy px-10 py-4 text-xs font-bold tracking-[0.28em] text-white uppercase hover:bg-navy/85 transition-colors"
            >
              {labels.ctaBtn}
            </a>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
