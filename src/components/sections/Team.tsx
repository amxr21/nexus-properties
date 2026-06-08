'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';
import { SectionHeadingBlock } from '@/components/ui/SectionHeadingBlock';
import { teamMembers } from '@/lib/content';

export function Team() {
  const t = useTranslations();

  return (
    <section aria-label="Our team" className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeadingBlock
          eyebrow={t('Team.eyebrow')}
          heading={t('Team.heading')}
          sub={t('Team.intro')}
          center
          className="mb-16"
        />

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {teamMembers.map(({ id, image, nameKey, roleKey, imageAltKey }) => (
            <article key={id} className="group flex flex-col">
              <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-200">
                <Image
                  src={image}
                  alt={t(imageAltKey as Parameters<typeof t>[0])}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <div className="mt-4 flex flex-col gap-1">
                <h3 className="font-display text-[15px] font-semibold text-navy leading-tight">
                  {t(nameKey as Parameters<typeof t>[0])}
                </h3>
                <span className="text-[10px] font-medium tracking-[0.14em] text-charcoal/45 uppercase">
                  {t(roleKey as Parameters<typeof t>[0])}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
