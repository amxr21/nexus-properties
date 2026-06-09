import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getMediaUrl, type StrapiHomepage } from '@/lib/strapi';

const FALLBACK_GALLERY = [
  '/images/hero-card 1.jpg',
  '/images/hero-card 2.jpg',
  '/images/hero-card 3.jpg',
  '/images/hero-card 4.jpg',
  '/images/hero-card 5.jpg',
];

const altKeys = [
  'Gallery.image1Alt',
  'Gallery.image2Alt',
  'Gallery.image3Alt',
  'Gallery.image4Alt',
  'Gallery.image5Alt',
] as const;

export async function GalleryStrip({ homepage }: { homepage: StrapiHomepage | null }) {
  const t = await getTranslations();

  const galleryImages: string[] = homepage?.galleryImages?.length
    ? homepage.galleryImages.map((img: { url: string }) => getMediaUrl(img.url) ?? '')
    : FALLBACK_GALLERY;

  return (
    <div
      aria-label="Property gallery"
      className="relative z-20 -mt-24 mx-auto w-full px-6 flex h-48 sm:h-60 md:h-112 gap-3 md:gap-5"
      style={{ maxWidth: '1368px' }}
    >
      {galleryImages.slice(0, 5).map((src, i) => (
        <div key={i} className="relative flex-1 overflow-hidden">
          <Image
            src={src || FALLBACK_GALLERY[i]}
            alt={t(altKeys[i])}
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.05]"
            sizes="20vw"
          />
          <div className="absolute inset-0 bg-black/15 transition-opacity duration-500 hover:bg-black/0" />
        </div>
      ))}
    </div>
  );
}
