'use client';

import Image from 'next/image';
import { Container } from './Container';
import { Reveal } from './Reveal';

interface PageHeroProps {
  eyebrow: string;
  heading: string;
  sub?: string;
}

export function PageHero({ eyebrow, heading, sub }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28">
      {/* Hero image */}
      <Image
        src="/images/hero.jpg"
        alt=""
        aria-hidden="true"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-navy/75" />

      <Container className="relative z-10">
        <Reveal>
          <span className="text-[10px] font-bold tracking-[0.32em] text-gold-500 uppercase">
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="font-display mt-5 text-[2.4rem] font-light text-white md:text-[3.6rem] leading-[1.1] max-w-3xl">
            {heading}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-base leading-[1.9] text-white/60">
              {sub}
            </p>
          </Reveal>
        )}
        <Reveal delay={240}>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-12 bg-gold-500" />
            <div className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
