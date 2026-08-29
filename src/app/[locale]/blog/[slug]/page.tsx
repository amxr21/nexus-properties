import { getBlogPosts } from '@/lib/strapi';
import { routing } from '@/i18n/routing';
import { BlogPostClient } from './BlogPostClient';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const posts = await getBlogPosts(locale);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  // A static export with no paths yields no pages at all, and Next reports
  // that as a misleading "missing generateStaticParams()". Fail with the
  // real reason instead: the CMS returned no blog posts.
  if (params.length === 0) {
    throw new Error('generateStaticParams: Strapi returned no blog posts.');
  }

  return params;
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
