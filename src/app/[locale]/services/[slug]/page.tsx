import { getServices } from '@/lib/strapi';
import { routing } from '@/i18n/routing';
import { ServiceDetailClient } from './ServiceDetailClient';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const services = await getServices(locale).catch(() => []);
    for (const service of services) {
      params.push({ locale, slug: service.slug });
    }
  }
  return params;
}

export default function ServiceDetailPage() {
  return <ServiceDetailClient />;
}
