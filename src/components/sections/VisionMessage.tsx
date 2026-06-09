import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getMediaUrl, type StrapiHomepage } from '@/lib/strapi';

const FALLBACK_VISION = '/images/vision&message image.jpg';

function TextBlock({ label, body }: { label: string; body: string }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-bold tracking-[0.28em] text-gold-500 uppercase">{label}</p>
      <p className="text-lg leading-[1.85] text-charcoal/65">{body}</p>
    </div>
  );
}

export async function VisionMessage({ homepage }: { homepage: StrapiHomepage | null }) {
  const t = await getTranslations('VisionMessage');

  const visionSrc = homepage?.visionImage
    ? (getMediaUrl((homepage.visionImage as unknown as { url: string }).url) ?? FALLBACK_VISION)
    : FALLBACK_VISION;

  const visionLabel  = homepage?.visionLabel   ?? t('visionLabel');
  const visionText   = homepage?.visionText    ?? t('visionText');
  const messageLabel = homepage?.messageLabel  ?? t('messageLabel');
  const messageText  = homepage?.messageText   ?? t('messageText');

  return (
    <section aria-label="Vision and Message">
      <div className="flex flex-col md:flex-row md:min-h-140">

        <div className="relative w-full md:w-[45%] shrink-0 aspect-3/4 md:aspect-auto">
          <Image
            src={visionSrc}
            alt={t('imageAlt')}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 45vw"
          />
        </div>

        <div className="flex flex-col justify-center gap-10 bg-white-gray px-10 py-16 md:px-16 lg:px-24 flex-1">
          <TextBlock label={visionLabel} body={visionText} />
          <div className="h-px w-full bg-line" />
          <TextBlock label={messageLabel} body={messageText} />
        </div>

      </div>
    </section>
  );
}
