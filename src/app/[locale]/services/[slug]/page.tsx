import { getServices } from '@/lib/strapi';
import { routing } from '@/i18n/routing';
import { ServiceDetailClient } from './ServiceDetailClient';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const services = await getServices(locale);
    for (const service of services) {
      params.push({ locale, slug: service.slug });
    }
  }
  // A static export with no paths yields no pages at all, and Next reports
  // that as a misleading "missing generateStaticParams()". Fail with the
  // real reason instead: the CMS returned no services.
  if (params.length === 0) {
    throw new Error('generateStaticParams: Strapi returned no services.');
  }

  return params;
}

export default function ServiceDetailPage() {
  return <ServiceDetailClient />;
}
