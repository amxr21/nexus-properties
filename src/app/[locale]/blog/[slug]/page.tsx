import { getBlogPosts } from '@/lib/strapi';
import { routing } from '@/i18n/routing';
import { BlogPostClient } from './BlogPostClient';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const posts = await getBlogPosts(locale).catch(() => []);
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
