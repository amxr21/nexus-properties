import { notFound } from 'next/navigation';
import { ongoingProjects, completedProjects } from '@/lib/content';
import { ProjectPageClient } from './ProjectPageClient';

const allProjects = [...ongoingProjects, ...completedProjects];

const slugsWithDetails = new Set([
  'lamar-collective',
  'eastside-yard',
  'domain-north-tower',
  'congress-plaza',
  'barton-heights',
  'rainey-lofts',
  'mueller-commons',
]);

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  const strip = (key: string) => key.replace(/^OngoingProjects\./, '');

  return (
    <ProjectPageClient
      titleKey={strip(project.titleKey)}
      metaKey={strip(project.metaKey)}
      bodyKey={strip(project.bodyKey)}
      imageAltKey={strip(project.imageAltKey)}
      image={project.image}
      slug={slug}
      hasDetails={slugsWithDetails.has(slug)}
    />
  );
}
