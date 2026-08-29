import { notFound } from 'next/navigation';
import { getProject, getProjects } from '@/lib/strapi';
import { routing } from '@/i18n/routing';
import { ProjectPageClient } from './ProjectPageClient';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const projects = await getProjects(locale);
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }
  // A static export with no paths yields no pages at all, and Next reports
  // that as a misleading "missing generateStaticParams()". Fail with the
  // real reason instead: the CMS returned no projects.
  if (params.length === 0) {
    throw new Error('generateStaticParams: Strapi returned no projects.');
  }

  return params;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProject(slug, locale).catch(() => null);
  if (!project) notFound();

  const imageSrc = project.image?.url
    ? (project.image.url.startsWith('http') ? project.image.url : `${process.env.NEXT_PUBLIC_STRAPI_URL}${project.image.url}`)
    : '/images/project image.jpg';

  return (
    <ProjectPageClient
      strapiProject={project}
      image={imageSrc}
      slug={slug}
    />
  );
}
