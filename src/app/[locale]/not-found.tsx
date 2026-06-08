import { getTranslations } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';

export default async function NotFound() {
  // not-found pages don't receive params, so we can't reliably get locale here.
  // We use getTranslations with a default so the page always renders.
  let t: Awaited<ReturnType<typeof getTranslations<'NotFound'>>>;
  try {
    t = await getTranslations('NotFound');
  } catch {
    // Fallback if called outside locale context
    return (
      <html lang="en">
        <body>
          <main className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center p-12">
              <div className="text-[8rem] font-light text-gray-100 leading-none">404</div>
              <h1 className="text-2xl font-light text-gray-800 mt-4">Page Not Found</h1>
              <a href="/en" className="mt-8 inline-block bg-navy px-8 py-3 text-sm text-white uppercase tracking-widest hover:bg-navy/85 transition-colors">
                Back to Home
              </a>
            </div>
          </main>
        </body>
      </html>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex items-center">
        <Container>
          <div className="flex flex-col items-center py-32 text-center gap-7">
            <p className="text-[9px] font-bold tracking-[0.36em] text-gold-500 uppercase">{t('eyebrow')}</p>
            <div className="font-display text-[7rem] font-light text-navy/10 leading-none select-none md:text-[12rem]">
              404
            </div>
            <h1 className="font-display text-[1.8rem] font-light text-navy leading-snug max-w-md -mt-4 md:text-[2.4rem]">
              {t('heading')}
            </h1>
            <p className="max-w-sm text-[15px] text-charcoal/55 leading-relaxed">
              {t('sub')}
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row mt-2">
              <a
                href="/en"
                className="inline-flex items-center gap-2 bg-navy px-8 py-3.5 text-[9px] font-bold tracking-[0.24em] text-white uppercase hover:bg-navy/85 transition-colors"
              >
                {t('homeBtn')}
                <ArrowRight size={12} />
              </a>
              <a
                href="/en/properties"
                className="inline-flex items-center gap-2 border border-navy/25 px-8 py-3.5 text-[9px] font-bold tracking-[0.24em] text-navy uppercase hover:border-navy hover:bg-navy/5 transition-colors"
              >
                {t('propertiesBtn')}
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-px w-12 bg-gold-500" />
              <div className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
              <div className="h-px w-12 bg-gold-500" />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
