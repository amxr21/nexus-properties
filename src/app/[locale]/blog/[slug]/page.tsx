'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { getBlogPost, getMediaUrl, type StrapiBlogPost } from '@/lib/strapi';

export default function BlogPostPage() {
  const t = useTranslations('BlogPage');
  const locale = useLocale();
  const params = useParams<{ slug: string }>();
  const Arrow = locale === 'ar' ? ArrowRight : ArrowLeft;

  const [post, setPost] = useState<StrapiBlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getBlogPost(params.slug, locale)
      .then((data) => {
        if (!data) setNotFound(true);
        else setPost(data);
      })
      .catch(() => setNotFound(true));
  }, [params.slug, locale]);

  const coverSrc = post?.coverImage?.url
    ? (getMediaUrl(post.coverImage.url) ?? '/images/hero-card 1.jpg')
    : '/images/hero-card 1.jpg';

  if (notFound) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center flex flex-col items-center gap-4">
            <div className="h-1.5 w-8 bg-gold-500" />
            <p className="font-display text-[1.4rem] font-light text-navy">{t('notFound')}</p>
            <a
              href={`/${locale}/blog`}
              className="text-xs font-bold tracking-[0.22em] text-navy uppercase hover:text-gold-500 transition-colors"
            >
              {t('backToBlog')}
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white" />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* Hero image */}
        <div className="relative h-[50vh] min-h-[320px] max-h-[560px] w-full">
          <Image
            src={coverSrc}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
          <div className="absolute inset-0 flex flex-col justify-end pb-12">
            <Container>
              <Reveal>
                <div className="max-w-2xl">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xs font-bold tracking-[0.22em] text-gold-400 uppercase">{post.tag}</span>
                    <span className="text-xs text-white/40">·</span>
                    <span className="text-xs text-white/50">
                      {new Date(post.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h1 className="font-display text-[1.8rem] font-light leading-snug text-white md:text-[2.2rem]">
                    {post.title}
                  </h1>
                </div>
              </Reveal>
            </Container>
          </div>
        </div>

        {/* Body */}
        <div className="py-16 md:py-24">
          <Container>
            <div className="mx-auto max-w-2xl">
              <Reveal>
                <a
                  href={`/${locale}/blog`}
                  className="mb-10 inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-navy uppercase hover:text-gold-500 transition-colors"
                >
                  <Arrow size={11} />
                  {t('backToBlog')}
                </a>
              </Reveal>

              {post.excerpt && (
                <Reveal delay={40}>
                  <p className="mb-8 text-[1.05rem] leading-[1.85] text-charcoal/70 font-light border-s-2 border-gold-500 ps-5">
                    {post.excerpt}
                  </p>
                </Reveal>
              )}

              {post.body && (
                <Reveal delay={80}>
                  <div className="flex flex-col gap-6">
                    {post.body.split('\n\n').map((para, i) => (
                      <p key={i} className="text-[15px] leading-[1.9] text-charcoal/65">{para}</p>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
