import Image from 'next/image';

interface OverlayImageProps {
  src: string;
  overlay?: string;
}

export function OverlayImage({
  src,
  overlay = 'bg-navy/88',
}: OverlayImageProps) {
  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className={`absolute inset-0 ${overlay}`} />
    </>
  );
}
