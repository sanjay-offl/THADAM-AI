import ArticleClient from './ArticleClient';
import { BLOG_POSTS } from '@/data/blogs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const post = BLOG_POSTS.find(p_ => p_.slug === p.slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: `${post.title} | THADAM Insights`,
    description: post.summary,
    alternates: {
      canonical: `https://thadam.ai/blogs/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.imageUrl],
      type: 'article',
      authors: [post.author.name],
      publishedTime: post.publishDate
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const post = BLOG_POSTS.find(p_ => p_.slug === p.slug);
  if (!post) return notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        '@id': `https://thadam.ai/blogs/${post.slug}#article`,
        'isPartOf': {
          '@type': 'WebPage',
          '@id': `https://thadam.ai/blogs/${post.slug}`,
          'url': `https://thadam.ai/blogs/${post.slug}`,
          'name': post.title,
        },
        'headline': post.title,
        'image': [post.imageUrl],
        'datePublished': new Date(post.publishDate).toISOString(),
        'dateModified': new Date(post.publishDate).toISOString(),
        'author': {
          '@type': 'Person',
          'name': post.author.name,
          'jobTitle': post.author.role,
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'THADAM AI',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://thadam.ai/logo.png'
          }
        },
        'description': post.summary
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `https://thadam.ai/blogs/${post.slug}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://thadam.ai'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Blogs',
            'item': 'https://thadam.ai/blogs'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': post.title,
            'item': `https://thadam.ai/blogs/${post.slug}`
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld-json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleClient post={post} />
    </>
  );
}
