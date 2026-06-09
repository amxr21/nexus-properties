import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/ui/PageHero';
import { getTranslations } from 'next-intl/server';
import { getProjects } from '@/lib/strapi';
import { PropertiesClient } from './PropertiesClient';

export default async function PropertiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, projects] = await Promise.all([
    getTranslations('PropertiesPage'),
    getProjects(locale).catch(() => []),
  ]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHero eyebrow={t('eyebrow')} heading={t('heading')} sub={t('sub')} />
        <PropertiesClient
          projects={projects}
          locale={locale}
          labels={{
            allLabel: t('allLabel'),
            ongoingLabel: t('ongoingLabel'),
            completedLabel: t('completedLabel'),
            exploreBtn: t('exploreBtn'),
            ctaHeading: t('ctaHeading'),
            ctaSub: t('ctaSub'),
            ctaBtn: t('ctaBtn'),
          }}
        />
      </main>
      <Footer />
    </>
  );
}
