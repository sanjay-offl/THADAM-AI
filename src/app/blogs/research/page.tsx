import { BLOG_POSTS } from '@/data/blogs';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';

export const metadata = { title: 'Research Spotlight | THADAM AI' };

export default function ResearchPage() {
  const posts = BLOG_POSTS.filter(post => post.tags.includes('Innovation'));

  return (
    <div className="container" style={{ padding: 'var(--space-4xl) 0', minHeight: '80vh' }}>
      <h1 className="section-title text-gradient font-heading" style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>🔬 Research Spotlight</h1>
      <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2xl)' }}>Deep-dives into climate science and environmental data.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
        {posts.length > 0 ? posts.map(post => (
          <Link key={post.id} href={`/blogs/${post.slug}`} style={{ textDecoration: 'none' }}>
            <GlassCard padding="var(--space-lg)" style={{ height: '100%' }}>
              <span style={{ color: 'var(--primary)', fontSize: 'var(--text-xs)' }}>{post.category}</span>
              <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--text)', marginTop: 8 }}>{post.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>{post.summary}</p>
            </GlassCard>
          </Link>
        )) : (
          <p style={{ color: 'var(--muted)' }}>New research reports coming soon.</p>
        )}
      </div>
    </div>
  );
}
