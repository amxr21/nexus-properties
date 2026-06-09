const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  'https://beneficial-darling-7eb6ac0811.strapiapp.com';

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

type StrapiResponse<T> = { data: T; meta?: unknown };

async function fetchStrapi<T>(path: string): Promise<T> {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (STRAPI_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;

  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers,
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Strapi fetch failed: ${path} (${res.status})`);
  const json: StrapiResponse<T> = await res.json();
  return json.data;
}

// ── Types ────────────────────────────────────────────────────────────────────

export type StrapiProject = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  status: 'ongoing' | 'completed';
  meta: string;
  brief: string;
  body: string;
  imageAlt: string;
  detail?: {
    location: string;
    type: string;
    units: string;
    size: string;
    floors: string;
    residenceFeatures: string[];
    buildingAmenities: string[];
    locationHighlights: string[];
  };
  image?: { url: string };
};

export type StrapiTeamMember = {
  id: number;
  name: string;
  role: string;
  order: number;
  image?: { url: string };
};

export type StrapiService = {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  requirements: string[];
  processSteps: string[];
  order: number;
};

export type StrapiBlogPost = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  tag: string;
  date: string;
  excerpt: string;
  body?: string;
  coverImage?: { url: string };
};

export type StrapiCareer = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  location: string;
  type: string;
  description: string;
  isOpen: boolean;
};

export type StrapiHomepage = {
  heroHeadline1: string;
  heroHeadline2: string;
  heroHeadline3: string;
  heroCta: string;
  heroPhone: string;
  whoWeAreEyebrow: string;
  whoWeAreHeading: string;
  whoWeAreStat1Value: string; whoWeAreStat1Label: string;
  whoWeAreStat2Value: string; whoWeAreStat2Label: string;
  whoWeAreStat3Value: string; whoWeAreStat3Label: string;
  visionLabel: string; visionText: string;
  messageLabel: string; messageText: string;
  sophisticationHeading: string; sophisticationSub: string;
  heroImages?: { url: string }[];
  galleryImages?: { url: string }[];
  visionImage?: { url: string };
};

export type StrapiSiteSettings = {
  companyName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours1: string; hours2: string; hours3: string; hours4: string;
  instagramUrl: string; facebookUrl: string; youtubeUrl: string;
  linkedinUrl: string; tiktokUrl: string;
  copyright: string; copyrightSub: string;
};

export type StrapiLegalPage = {
  heading: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
};

// ── Query helpers ─────────────────────────────────────────────────────────────

export function getProjects(locale: string) {
  return fetchStrapi<StrapiProject[]>(
    `/projects?locale=${locale}&populate=*&sort=createdAt:asc&pagination[pageSize]=50`,
  );
}

export function getProject(slug: string, locale: string) {
  return fetchStrapi<StrapiProject[]>(
    `/projects?locale=${locale}&filters[slug][$eq]=${slug}&populate=*`,
  ).then((data) => data[0] ?? null);
}

export function getTeamMembers(locale: string) {
  return fetchStrapi<StrapiTeamMember[]>(
    `/team-members?locale=${locale}&populate=*&sort=order:asc`,
  );
}

export function getServices(locale: string) {
  return fetchStrapi<StrapiService[]>(
    `/services?locale=${locale}&sort=order:asc&pagination[pageSize]=20`,
  );
}

export function getService(slug: string, locale: string) {
  return fetchStrapi<StrapiService[]>(
    `/services?locale=${locale}&filters[slug][$eq]=${slug}`,
  ).then((data) => data[0] ?? null);
}

export function getBlogPosts(locale: string) {
  return fetchStrapi<StrapiBlogPost[]>(
    `/blog-posts?locale=${locale}&populate=coverImage&sort=date:desc&pagination[pageSize]=20`,
  );
}

export function getBlogPost(slug: string, locale: string) {
  return fetchStrapi<StrapiBlogPost[]>(
    `/blog-posts?locale=${locale}&filters[slug][$eq]=${slug}&populate=coverImage`,
  ).then((data) => data[0] ?? null);
}

export function getCareers(locale: string) {
  return fetchStrapi<StrapiCareer[]>(
    `/careers?locale=${locale}&filters[isOpen][$eq]=true&sort=createdAt:asc`,
  );
}

export function getHomepage(locale: string) {
  return fetchStrapi<StrapiHomepage>(
    `/homepage?locale=${locale}&populate=*`,
  );
}

export function getSiteSettings(locale: string) {
  return fetchStrapi<StrapiSiteSettings>(`/site-setting?locale=${locale}`);
}

export function getLegalPage(
  type: 'privacy-policy' | 'terms-of-service' | 'cookie-policy' | 'disclaimer' | 'accessibility-statement',
  locale: string,
) {
  return fetchStrapi<StrapiLegalPage>(`/${type}?locale=${locale}`);
}

export function getMediaUrl(url?: string) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
