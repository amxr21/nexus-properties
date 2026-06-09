import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { GalleryStrip } from '@/components/sections/GalleryStrip';
import { WhoWeAre } from '@/components/sections/WhoWeAre';
import { VisionMessage } from '@/components/sections/VisionMessage';
import { Team } from '@/components/sections/Team';
import { SophisticationBanner } from '@/components/sections/SophisticationBanner';
import { AboutComplete } from '@/components/sections/AboutComplete';
import { Services } from '@/components/sections/Services';
import { OngoingProjects } from '@/components/sections/OngoingProjects';
import { getHomepage, getProjects } from '@/lib/strapi';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [homepage, allProjects] = await Promise.all([
    getHomepage(locale).catch(() => null),
    getProjects(locale).catch(() => []),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero homepage={homepage} locale={locale} />
        <GalleryStrip homepage={homepage} />
        <WhoWeAre homepage={homepage} />
        <VisionMessage homepage={homepage} />
        <Team locale={locale} />
        <SophisticationBanner homepage={homepage} />
        <AboutComplete />
        <Services locale={locale} homepage={homepage} />
        <OngoingProjects allProjects={allProjects} locale={locale} />
      </main>
      <Footer />
    </>
  );
}
