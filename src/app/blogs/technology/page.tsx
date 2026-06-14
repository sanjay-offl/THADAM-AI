import { BLOG_POSTS } from '@/data/blogs';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';

export const metadata = { title: 'Technology for Good | THADAM AI' };

export default function TechnologyBlogsPage() {
  const posts = BLOG_POSTS.filter(post => post.category === 'AI for Sustainability' || post.category === 'Green Technology');

  return (
    <div className="container" style={{ padding: 'var(--space-4xl) 0', minHeight: '80vh' }}>
      <h1 className="section-title text-gradient font-heading" style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>💻 Technology for Good</h1>
      <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2xl)' }}>How AI, IoT, and Cloud computing are protecting our planet.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
        {posts.map(post => (
          <Link key={post.id} href={`/blogs/${post.slug}`} style={{ textDecoration: 'none' }}>
            <GlassCard padding="var(--space-lg)" style={{ height: '100%' }}>
              <span style={{ color: 'var(--primary)', fontSize: 'var(--text-xs)' }}>{post.category}</span>
              <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--text)', marginTop: 8 }}>{post.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>{post.summary}</p>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
