import { notFound } from 'next/navigation';
import { getProject } from '@/lib/strapi';
import { ProjectPageClient } from './ProjectPageClient';

export const dynamic = 'force-dynamic';

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
