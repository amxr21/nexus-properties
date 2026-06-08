export const ongoingProjects = [
  {
    slug: 'lamar-collective',
    image: '/images/project image.jpg',
    titleKey: 'OngoingProjects.p1Title',
    metaKey:  'OngoingProjects.p1Meta',
    briefKey: 'OngoingProjects.p1Brief',
    bodyKey:  'OngoingProjects.p1Body',
    imageAltKey: 'OngoingProjects.p1ImageAlt',
  },
  {
    slug: 'eastside-yard',
    image: '/images/showoff section image 4.jpg',
    titleKey: 'OngoingProjects.p2Title',
    metaKey:  'OngoingProjects.p2Meta',
    briefKey: 'OngoingProjects.p2Brief',
    bodyKey:  'OngoingProjects.p2Body',
    imageAltKey: 'OngoingProjects.p2ImageAlt',
  },
  {
    slug: 'domain-north-tower',
    image: '/images/showoff section image 6.jpg',
    titleKey: 'OngoingProjects.p3Title',
    metaKey:  'OngoingProjects.p3Meta',
    briefKey: 'OngoingProjects.p3Brief',
    bodyKey:  'OngoingProjects.p3Body',
    imageAltKey: 'OngoingProjects.p3ImageAlt',
  },
] as const;

export const completedProjects = [
  {
    slug: 'congress-plaza',
    image: '/images/showoff section image 3.jpg',
    titleKey: 'OngoingProjects.c1Title',
    metaKey:  'OngoingProjects.c1Meta',
    briefKey: 'OngoingProjects.c1Brief',
    bodyKey:  'OngoingProjects.c1Body',
    imageAltKey: 'OngoingProjects.c1ImageAlt',
  },
  {
    slug: 'barton-heights',
    image: '/images/showoff section image 5.jpg',
    titleKey: 'OngoingProjects.c2Title',
    metaKey:  'OngoingProjects.c2Meta',
    briefKey: 'OngoingProjects.c2Brief',
    bodyKey:  'OngoingProjects.c2Body',
    imageAltKey: 'OngoingProjects.c2ImageAlt',
  },
  {
    slug: 'rainey-lofts',
    image: '/images/hero-card 3.jpg',
    titleKey: 'OngoingProjects.c3Title',
    metaKey:  'OngoingProjects.c3Meta',
    briefKey: 'OngoingProjects.c3Brief',
    bodyKey:  'OngoingProjects.c3Body',
    imageAltKey: 'OngoingProjects.c3ImageAlt',
  },
  {
    slug: 'mueller-commons',
    image: '/images/hero-card 4.jpg',
    titleKey: 'OngoingProjects.c4Title',
    metaKey:  'OngoingProjects.c4Meta',
    briefKey: 'OngoingProjects.c4Brief',
    bodyKey:  'OngoingProjects.c4Body',
    imageAltKey: 'OngoingProjects.c4ImageAlt',
  },
] as const;

export const images = {
  hero:            '/images/hero.jpg',
  vision:          '/images/vision&message image.jpg',
  banner:          '/images/showoff section image 1.jpg',
  servicesBg:      '/images/showoff section image 2.jpg',
  lamarCollective: '/images/project image.jpg',
  footerBg:        '/images/footer image.jpg',
  gallery: [
    '/images/hero-card 1.jpg',
    '/images/hero-card 2.jpg',
    '/images/hero-card 3.jpg',
    '/images/hero-card 4.jpg',
    '/images/hero-card 5.jpg',
  ],
  showoff: [
    '/images/showoff section image 1.jpg',
    '/images/showoff section image 2.jpg',
    '/images/showoff section image 3.jpg',
    '/images/showoff section image 4.jpg',
    '/images/showoff section image 5.jpg',
    '/images/showoff section image 6.jpg',
  ],
} as const;

export const teamMembers = [
  {
    id: 'james',
    image: '/images/worker 1.jpg',
    nameKey: 'Team.member1Name',
    roleKey: 'Team.member1Role',
    imageAltKey: 'Team.member1ImageAlt',
  },
  {
    id: 'sarah',
    image: '/images/worker 2.jpg',
    nameKey: 'Team.member2Name',
    roleKey: 'Team.member2Role',
    imageAltKey: 'Team.member2ImageAlt',
  },
  {
    id: 'marcus',
    image: '/images/worker 3.jpg',
    nameKey: 'Team.member3Name',
    roleKey: 'Team.member3Role',
    imageAltKey: 'Team.member3ImageAlt',
  },
  {
    id: 'david',
    image: '/images/worker 4.jpg',
    nameKey: 'Team.member4Name',
    roleKey: 'Team.member4Role',
    imageAltKey: 'Team.member4ImageAlt',
  },
] as const;

export const serviceCards = [
  { id: 'residential', titleKey: 'Services.card1Title', taglineKey: 'Services.card1Tagline' },
  { id: 'investment',  titleKey: 'Services.card2Title', taglineKey: 'Services.card2Tagline' },
  { id: 'commercial',  titleKey: 'Services.card3Title', taglineKey: 'Services.card3Tagline' },
  { id: 'relocation',  titleKey: 'Services.card4Title', taglineKey: 'Services.card4Tagline' },
] as const;

export const whoWeAreStats = [
  { id: 'projects', valueKey: 'WhoWeAre.stat1Value', labelKey: 'WhoWeAre.stat1Label' },
  { id: 'awards',   valueKey: 'WhoWeAre.stat2Value', labelKey: 'WhoWeAre.stat2Label' },
  { id: 'rating',   valueKey: 'WhoWeAre.stat3Value', labelKey: 'WhoWeAre.stat3Label' },
] as const;

export const aboutStats = [
  { id: 'agents',       valueKey: 'About.stat1Value', labelKey: 'About.stat1Label' },
  { id: 'coordinators', valueKey: 'About.stat2Value', labelKey: 'About.stat2Label' },
  { id: 'marketing',    valueKey: 'About.stat3Value', labelKey: 'About.stat3Label' },
  { id: 'relations',    valueKey: 'About.stat4Value', labelKey: 'About.stat4Label' },
] as const;

export const navLinks = [
  { key: 'Nav.home',       href: '/' },
  { key: 'Nav.properties', href: '/properties' },
  { key: 'Nav.services',   href: '/services' },
  { key: 'Nav.blog',       href: '/blog' },
  { key: 'Nav.careers',    href: '/careers' },
  { key: 'Nav.contact',    href: '/contact' },
] as const;

export const footerQuickLinks = [
  'Footer.link1', 'Footer.link2', 'Footer.link3', 'Footer.link4',
  'Footer.link5', 'Footer.link6', 'Footer.link7', 'Footer.link8',
] as const;

export const footerServices = [
  'Footer.service1', 'Footer.service2', 'Footer.service3', 'Footer.service4',
  'Footer.service5', 'Footer.service6', 'Footer.service7', 'Footer.service8',
] as const;

export const footerLegal = [
  'Footer.legal1', 'Footer.legal2', 'Footer.legal3',
  'Footer.legal4', 'Footer.legal5', 'Footer.legal6',
] as const;

export const footerSocial = [
  { key: 'Footer.instagram', href: 'https://instagram.com/nexuspropertiesatx' },
  { key: 'Footer.facebook',  href: 'https://facebook.com/NexusPropertiesAustin' },
  { key: 'Footer.youtube',   href: 'https://youtube.com/@NexusPropertiesAustin' },
  { key: 'Footer.linkedin',  href: 'https://linkedin.com/company/nexus-properties' },
  { key: 'Footer.tiktok',    href: 'https://tiktok.com/@nexusatx' },
] as const;
