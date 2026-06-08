'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { images } from '@/lib/content';

const altKeys = [
  'Gallery.image1Alt',
  'Gallery.image2Alt',
  'Gallery.image3Alt',
  'Gallery.image4Alt',
  'Gallery.image5Alt',
] as const;

export function GalleryStrip() {
  const t = useTranslations();

  return (
    <div
      aria-label="Property gallery"
      className="relative z-20 -mt-24 mx-auto w-full px-6 flex h-48 sm:h-60 md:h-112 gap-3 md:gap-5"
      style={{ maxWidth: '1368px' }}
    >
      {images.gallery.map((src, i) => (
        <div key={src} className="relative flex-1 overflow-hidden">
          <Image
            src={src}
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
