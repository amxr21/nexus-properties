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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <GalleryStrip />
        <WhoWeAre />
        <VisionMessage />
        <Team />
        <SophisticationBanner />
        <AboutComplete />
        <Services />
        <OngoingProjects />
      </main>
      <Footer />
    </>
  );
}
