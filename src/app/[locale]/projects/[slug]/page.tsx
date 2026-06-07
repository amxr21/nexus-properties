import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Layers, Ruler, Building2, CheckCircle2, Phone, Mail } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ongoingProjects, completedProjects } from '@/lib/content';

const allProjects = [...ongoingProjects, ...completedProjects];

// Static detail data keyed by slug — swap with CMS later
const projectDetails: Record<string, {
  location: string;
  type: string;
  units: string;
  size: string;
  floors: string;
  status: string;
  features: string[];
  amenities: string[];
  highlights: string[];
}> = {
  'lamar-collective': {
    location: 'South Austin, TX',
    type: 'Mixed-Use Development',
    units: '240 Residences',
    size: 'From 650 – 2,400 sq ft',
    floors: '14 Floors',
    status: 'Est. Completion Q4 2025',
    features: [
      'Floor-to-ceiling windows with city views',
      'Private balconies on select units',
      'Gourmet kitchen with quartz countertops',
      'In-unit washer & dryer',
      'Smart home technology pre-installed',
      'Secure underground parking',
    ],
    amenities: [
      'Resort-style rooftop pool & lounge',
      'State-of-the-art fitness center',
      'Co-working & private meeting suites',
      'Ground-floor curated retail & dining',
      'Concierge services 7 days a week',
      'Pet-friendly with dedicated dog run',
      'EV charging stations',
      'Bike storage & repair station',
    ],
    highlights: [
      'LEED Silver certified construction',
      'Walking distance to Barton Springs & Zilker Park',
      'Steps from Austin\'s most vibrant cultural corridor',
      'Direct access to Austin MetroRapid transit',
    ],
  },
  'eastside-yard': {
    location: 'East Austin, TX',
    type: 'Mixed-Use Creative Campus',
    units: '120 Live-Work Lofts',
    size: 'From 800 – 1,800 sq ft',
    floors: '8 Floors',
    status: 'Est. Completion Q2 2026',
    features: [
      'Polished concrete floors & exposed ductwork',
      'Soaring 14-ft ceilings',
      'Industrial-chic kitchen with gas range',
      'Private studio mezzanine in select units',
      'High-speed fiber internet infrastructure',
      'Dedicated maker storage rooms',
    ],
    amenities: [
      '60,000 sq ft of maker & creative studio space',
      '12,000 sq ft curated food hall',
      'Outdoor event lawn & amphitheater',
      'Rooftop bar & garden terrace',
      'Dedicated freight elevator for studios',
      'On-site gallery & exhibition space',
      'Childcare center',
      'Secure bike valet',
    ],
    highlights: [
      'Three city blocks of activated streetscape',
      'Anchor tenant partnerships with local creative brands',
      'Adjacent to East 6th Street entertainment district',
      'Public art installation program',
    ],
  },
  'domain-north-tower': {
    location: 'The Domain, Austin, TX',
    type: 'Class-A Office Tower',
    units: '520,000 sq ft Office Space',
    size: 'Floors 2–28 available',
    floors: '28 Floors',
    status: 'Est. Completion Q1 2027',
    features: [
      'Column-free floor plates up to 24,000 sq ft',
      'Floor-to-ceiling glazing with solar shading',
      'Private terraces on floors 10, 18, & 28',
      'Fiber-optic & redundant power infrastructure',
      'LEED Platinum pursuit certification',
      'Advanced HVAC with MERV-16 filtration',
    ],
    amenities: [
      'Panoramic rooftop amenity deck',
      'Full-service conference & event center',
      'Premium fitness center & locker rooms',
      'Ground-floor dining & retail activation',
      'Secure parking at 3:1,000 ratio',
      'EV charging for 30% of stalls',
      'Bike valet & full shower facilities',
      'On-site property management',
    ],
    highlights: [
      'Positioned at the gateway to The Domain tech corridor',
      'Adjacent to Apple, Amazon, Meta, and Google campuses',
      'Direct connection to MetroRail Red Line',
      'WELL Building Standard certification targeted',
    ],
  },
  'congress-plaza': {
    location: 'Downtown Austin, TX',
    type: 'Class-A Commercial Office',
    units: '380,000 sq ft',
    size: 'Floors 3–22 available',
    floors: '22 Floors',
    status: 'Completed Q2 2023',
    features: [
      'Efficient 18,000 sq ft floor plates',
      'Triple-glazed curtain wall façade',
      'Private balconies on corner suites',
      'Built-in data center infrastructure',
      'LEED Platinum certified',
      '24/7 secured access control',
    ],
    amenities: [
      'Signature restaurant on ground floor',
      'Fitness & wellness center with spa',
      'Conference center with AV package',
      'Rooftop terrace with panoramic views',
      'Valet & self-park garage',
      'Concierge & building management',
      'On-site dry cleaning & postal services',
      'EV charging infrastructure',
    ],
    highlights: [
      'Congress Avenue address with Capitol views',
      'Walking distance to Austin City Hall',
      'Surrounded by Austin\'s premier dining & culture',
      'WELL Building Standard Gold certification',
    ],
  },
  'barton-heights': {
    location: 'Barton Hills, Austin, TX',
    type: 'Boutique Residential',
    units: '48 Bespoke Homes',
    size: '2,200 – 4,800 sq ft',
    floors: '2–3 Floors per home',
    status: 'Completed Q4 2022',
    features: [
      'Hill Country limestone & cedar exteriors',
      'Chef\'s kitchen with Thermador appliances',
      'Primary suite with spa bath & soaking tub',
      'Private pool & outdoor kitchen on select lots',
      'Three-car garages with workshop space',
      'Whole-home automation system',
    ],
    amenities: [
      'Gated community with 24-hr security',
      'Residents-only hiking trail network',
      'Neighborhood park & picnic area',
      'Shared garden & orchard',
      'Community clubhouse for private events',
      'Proximity to Barton Creek Greenbelt',
      'HOA-managed landscaping',
      'Guest parking & visitor management',
    ],
    highlights: [
      'Backing directly onto Barton Creek Greenbelt',
      'Minutes from Barton Springs Pool',
      'Top-rated AISD school district',
      'Each home sited for maximum privacy',
    ],
  },
  'rainey-lofts': {
    location: 'Rainey Street, Austin, TX',
    type: 'Urban Residential Lofts',
    units: '72 Loft Residences',
    size: '680 – 1,600 sq ft',
    floors: '10 Floors',
    status: 'Completed Q1 2022',
    features: [
      'Exposed concrete ceilings at 11 ft',
      'Polished concrete & hardwood floors',
      'Open-concept kitchen with waterfall island',
      'Floor-to-ceiling steel-framed windows',
      'Private juliet balconies',
      'In-unit Bosch washer/dryer stack',
    ],
    amenities: [
      'Rooftop terrace overlooking Rainey Street',
      'Resort pool & outdoor lounge',
      'Fitness studio with Peloton bikes',
      'Ground-floor bar & coffee lounge',
      'Controlled-access parking garage',
      'Package concierge & cold storage',
      'Dog spa & grooming station',
      'Co-working lounge with private pods',
    ],
    highlights: [
      'Steps from Austin\'s most celebrated bar scene',
      'Walk score of 94 — walker\'s paradise',
      'Lady Bird Lake hike & bike trail access',
      'Surrounded by James Beard-nominated restaurants',
    ],
  },
  'mueller-commons': {
    location: 'Mueller District, Austin, TX',
    type: 'Mixed-Use Community',
    units: '160 Residences',
    size: '720 – 1,900 sq ft',
    floors: '6 Floors',
    status: 'Completed Q3 2021',
    features: [
      'Energy-efficient double-pane windows',
      'Quartz countertops & tile backsplash',
      'Stainless Whirlpool appliance package',
      'Private patios on ground-level units',
      'Flexible open floorplans',
      'Walk-in closets in all bedrooms',
    ],
    amenities: [
      '40,000 sq ft neighborhood retail below',
      'Central park with fountain & seating',
      'Hike-and-bike trail network',
      'Community pool & splash pad',
      'Fitness center & yoga studio',
      'Children\'s playground',
      'Farmers market pavilion',
      'Underground secured parking',
    ],
    highlights: [
      'Mueller central park frontage',
      'Walkable to Mueller\'s retail & dining',
      'Sustainable design with solar canopies',
      'Connected to citywide trail system',
    ],
  },
};

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const details = projectDetails[slug];
  const t  = await getTranslations('OngoingProjects');
  const tp = await getTranslations('ProjectPage');
  const ns = (key: string) => t(key.replace('OngoingProjects.', '') as Parameters<typeof t>[0]);

  const title    = ns(project.titleKey);
  const meta     = ns(project.metaKey);
  const body     = ns(project.bodyKey);
  const imageAlt = ns(project.imageAltKey);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">

        {/* Hero image — full bleed with gradient */}
        <div className="relative w-full overflow-hidden" style={{ height: '60vh', minHeight: '380px' }}>
          <Image
            src={project.image}
            alt={imageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

          {/* Overlay title */}
          <div className="absolute inset-0 flex flex-col justify-end pb-12 px-8 md:px-16">
            <p className="text-[9px] font-bold tracking-[0.28em] text-gold-500 uppercase mb-3">{meta}</p>
            <h1 className="font-display text-[2rem] font-light text-white md:text-[3.2rem] leading-tight max-w-2xl">{title}</h1>
          </div>
        </div>

        {/* Back link */}
        <div className="bg-white border-b border-line">
          <Container>
            <a
              href={`/${locale}#properties`}
              className="group inline-flex items-center gap-2 py-4 text-[9px] font-bold tracking-[0.22em] text-charcoal/40 uppercase transition-colors hover:text-navy"
            >
              {locale === 'ar'
                ? <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                : <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />}
              {tp('back')}
            </a>
          </Container>
        </div>

        <div className="py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">

              {/* Left — main content */}
              <div className="lg:col-span-2 flex flex-col gap-16">

                {/* Overview */}
                <Reveal>
                  <div>
                    <p className="text-[8px] font-bold tracking-[0.3em] text-gold-500 uppercase mb-4">{tp('overview')}</p>
                    <p className="text-[14px] leading-[1.95] text-charcoal/65">{body}</p>
                  </div>
                </Reveal>

                {/* Divider shape */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-line" />
                  <div className="h-1.5 w-1.5 rotate-45 bg-gold-500" />
                  <div className="h-px flex-1 bg-line" />
                </div>

                {/* Features */}
                {details && (
                  <Reveal delay={80}>
                    <div>
                      <p className="text-[8px] font-bold tracking-[0.3em] text-gold-500 uppercase mb-6">{tp('features')}</p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {details.features.map((f) => (
                          <div key={f} className="flex items-start gap-3">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-teal" />
                            <span className="text-[13px] text-charcoal/70">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Amenities */}
                {details && (
                  <Reveal delay={120}>
                    <div>
                      <p className="text-[8px] font-bold tracking-[0.3em] text-gold-500 uppercase mb-6">{tp('amenities')}</p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {details.amenities.map((a) => (
                          <div key={a} className="flex items-start gap-3">
                            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-navy" />
                            <span className="text-[13px] text-charcoal/70">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}

                {/* Location highlights */}
                {details && (
                  <Reveal delay={160}>
                    <div className="border border-line p-8">
                      <p className="text-[8px] font-bold tracking-[0.3em] text-gold-500 uppercase mb-6">{tp('locationHighlights')}</p>
                      <div className="flex flex-col gap-3">
                        {details.highlights.map((h) => (
                          <div key={h} className="flex items-start gap-3">
                            <MapPin size={13} className="mt-0.5 shrink-0 text-gold-500" />
                            <span className="text-[13px] text-charcoal/70">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                )}
              </div>

              {/* Right — specs sidebar + CTA */}
              <div className="flex flex-col gap-8">

                {/* Specs card */}
                {details && (
                  <Reveal direction="left">
                    <div className="bg-navy p-8 flex flex-col gap-5">
                      <p className="text-[8px] font-bold tracking-[0.3em] text-gold-500 uppercase">{tp('specs')}</p>

                      {[
                        { Icon: MapPin,    label: tp('specLocation'), value: details.location },
                        { Icon: Building2, label: tp('specType'),     value: details.type },
                        { Icon: Layers,    label: tp('specUnits'),    value: details.units },
                        { Icon: Ruler,     label: tp('specSize'),     value: details.size },
                        { Icon: Building2, label: tp('specFloors'),   value: details.floors },
                        { Icon: Calendar,  label: tp('specStatus'),   value: details.status },
                      ].map(({ Icon, label, value }) => (
                        <div key={label} className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                          <Icon size={13} className="mt-0.5 shrink-0 text-gold-500" />
                          <div>
                            <p className="text-[8px] font-semibold tracking-widest text-white/40 uppercase">{label}</p>
                            <p className="text-[12px] text-white mt-0.5">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )}

                {/* CTA card */}
                <Reveal direction="left" delay={120}>
                  <div className="border border-line p-8 flex flex-col gap-5">
                    <p className="text-[8px] font-bold tracking-[0.3em] text-navy uppercase">{tp('ctaHeading')}</p>
                    <p className="text-[12px] text-charcoal/60 leading-relaxed">{tp('ctaBody')}</p>
                    <div className="flex flex-col gap-3">
                      <a
                        href="tel:+15120000000"
                        className="flex items-center gap-2 text-[11px] text-navy font-semibold hover:text-gold-500 transition-colors"
                      >
                        <Phone size={13} />
                        +1 (512) 000-0000
                      </a>
                      <a
                        href="mailto:hello@nexusproperties.com"
                        className="flex items-center gap-2 text-[11px] text-navy font-semibold hover:text-gold-500 transition-colors"
                      >
                        <Mail size={13} />
                        hello@nexusproperties.com
                      </a>
                    </div>
                    <a
                      href={`/${locale}/contact`}
                      className="mt-2 block bg-navy py-3 text-center text-[9px] font-bold tracking-[0.22em] text-white uppercase transition-colors hover:bg-navy/85"
                    >
                      {tp('ctaBtn')}
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
