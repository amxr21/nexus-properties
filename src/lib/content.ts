// Navigation and footer structural data — these are layout-only constants.
// All displayable content (text, images, listings) is fetched from Strapi.

export const navLinks = [
  { key: 'Nav.home',       href: '/' },
  { key: 'Nav.properties', href: '/properties' },
  { key: 'Nav.services',   href: '/services' },
  { key: 'Nav.blog',       href: '/blog' },
  { key: 'Nav.careers',    href: '/careers' },
  { key: 'Nav.contact',    href: '/contact' },
] as const;

export const footerSocial = [
  { key: 'Footer.instagram', href: 'https://instagram.com/nexuspropertiesatx' },
  { key: 'Footer.facebook',  href: 'https://facebook.com/NexusPropertiesAustin' },
  { key: 'Footer.youtube',   href: 'https://youtube.com/@NexusPropertiesAustin' },
  { key: 'Footer.linkedin',  href: 'https://linkedin.com/company/nexus-properties' },
  { key: 'Footer.tiktok',    href: 'https://tiktok.com/@nexusatx' },
] as const;
