'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { getBlogPosts, type StrapiBlogPost } from '@/lib/strapi';

const FALLBACK_IMAGES = [
  '/images/hero-card 1.jpg',
  '/images/hero-card 2.jpg',
  '/images/hero-card 3.jpg',
  '/images/hero-card 4.jpg',
  '/images/hero-card 5.jpg',
  '/images/showoff section image 1.jpg',
];

export default function BlogPage() {
  const t = useTranslations('BlogPage');
  const locale = useLocale();
  const Arrow = locale === 'ar' ? ArrowLeft : ArrowRight;
  const [posts, setPosts] = useState<StrapiBlogPost[]>([]);

  useEffect(() => {
    getBlogPosts(locale).then(setPosts).catch(() => setPosts([]));
  }, [locale]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHero eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} />

        <div className="py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => {
                const imgUrl = post.coverImage?.url
                  ? (post.coverImage.url.startsWith('http') ? post.coverImage.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${post.coverImage.url}`)
                  : FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];

                return (
                  <Reveal key={post.id} delay={i * 50}>
                    <article className="group flex flex-col border border-line hover:border-navy/25 transition-colors">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={imgUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6 gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold tracking-[0.22em] text-gold-500 uppercase">{post.tag}</span>
                          <span className="text-xs text-charcoal/30">·</span>
                          <span className="text-xs text-charcoal/40">
                            {new Date(post.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', { month: 'long', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="font-display text-[1rem] font-light text-navy leading-snug flex-1">{post.title}</h3>
                        <a
                          href={`/${locale}/blog/${post.slug}`}
                          className="group/link inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-navy uppercase hover:text-gold-500 transition-colors mt-2"
                        >
                          {t('readBtn')}
                          <Arrow size={11} className="transition-transform group-hover/link:translate-x-0.5" />
                        </a>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
