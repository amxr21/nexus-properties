'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/ui/PageHero';

interface Section {
  heading: string;
  body: string;
}

interface Props {
  eyebrow: string;
  heading: string;
  lastUpdated: string;
  sections: Section[];
}

export function LegalPage({ eyebrow, heading, lastUpdated, sections }: Props) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <PageHero eyebrow={eyebrow} heading={heading} />
        <div className="py-20 md:py-28">
          <Container>
            <div className="mx-auto max-w-3xl">
              <p className="mb-12 text-[11px] text-charcoal/40 tracking-wide">{lastUpdated}</p>
              <div className="flex flex-col gap-12">
                {sections.map(({ heading: h, body }) => (
                  <div key={h}>
                    <h2 className="font-display text-[1.1rem] font-light text-navy mb-4">{h}</h2>
                    <p className="text-[15px] leading-[1.9] text-charcoal/65">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
