'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { images } from '@/lib/content';

export function SophisticationBanner() {
  const t = useTranslations('SophisticationBanner');

  return (
    <section className="overflow-hidden" aria-label="Sophistication banner">

      <div className="grid grid-cols-3 sm:grid-cols-6">
        {images.showoff.map((src, i) => (
          <div
            key={i}
            className={`relative w-full overflow-hidden ${i % 2 === 0 ? 'h-52 sm:h-72' : 'h-64 sm:h-96'}`}
          >
            <Image
              src={src}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover object-center grayscale"
              sizes="(max-width: 640px) 33vw, 17vw"
            />
          </div>
        ))}
      </div>

      <div className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-[1.5rem] font-light leading-snug text-navy md:text-[2rem] lg:text-[2.4rem]">
            {t('heading')}
          </h2>
          <div className="mx-auto mt-6 h-px w-12 bg-gold-500" />
          <p className="mx-auto mt-6 max-w-xl text-[13px] leading-[1.85] text-charcoal/55">
            {t('sub')}
          </p>
        </div>
      </div>

    </section>
  );
}
