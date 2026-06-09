import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getMediaUrl, type StrapiHomepage } from '@/lib/strapi';

const FALLBACK_SHOWOFF = [
  '/images/showoff section image 1.jpg',
  '/images/showoff section image 2.jpg',
  '/images/showoff section image 3.jpg',
  '/images/showoff section image 4.jpg',
  '/images/showoff section image 5.jpg',
  '/images/showoff section image 6.jpg',
];

export async function SophisticationBanner({ homepage }: { homepage: StrapiHomepage | null }) {
  const t = await getTranslations('SophisticationBanner');

  const showoffImages: string[] = homepage?.heroImages?.length
    ? homepage.heroImages.slice(0, 6).map((img: { url: string }, i: number) =>
        getMediaUrl(img.url) ?? FALLBACK_SHOWOFF[i] ?? FALLBACK_SHOWOFF[0]
      )
    : FALLBACK_SHOWOFF;

  const heading = homepage?.sophisticationHeading ?? t('heading');
  const sub     = homepage?.sophisticationSub    ?? t('sub');

  return (
    <section className="overflow-hidden" aria-label="Sophistication banner">

      <div className="grid grid-cols-3 sm:grid-cols-6">
        {showoffImages.map((src, i) => (
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
            {heading}
          </h2>
          <div className="mx-auto mt-6 h-px w-12 bg-gold-500" />
          <p className="mx-auto mt-6 max-w-xl text-[13px] leading-[1.85] text-charcoal/55">
            {sub}
          </p>
        </div>
      </div>

    </section>
  );
}
