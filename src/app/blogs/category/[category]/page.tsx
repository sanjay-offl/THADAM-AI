import { CATEGORIES, BLOG_POSTS } from '@/data/blogs';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const p = await params;
  const decodedCategory = p.category.replace(/-/g, ' ').toLowerCase();
  const categoryData = CATEGORIES.find(c => c.name.toLowerCase() === decodedCategory);
  
  const posts = BLOG_POSTS.filter(post => post.category.toLowerCase() === decodedCategory);

  return (
    <div className="container" style={{ padding: 'var(--space-4xl) 0', minHeight: '80vh' }}>
      <h1 className="section-title text-gradient font-heading" style={{ fontSize: '3rem', marginBottom: 'var(--space-md)' }}>
        {categoryData ? `${categoryData.icon} ${categoryData.name}` : decodedCategory}
      </h1>
      <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2xl)' }}>
        Explore all articles related to {categoryData ? categoryData.name : decodedCategory}.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
        {posts.length > 0 ? posts.map(post => (
          <Link key={post.id} href={`/blogs/${post.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ height: '100%', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
              <GlassCard padding="var(--space-lg)" style={{ height: '100%' }}>
                <span style={{ color: 'var(--primary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{post.category}</span>
                <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--text)', marginTop: 8, marginBottom: 12 }}>{post.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 16 }}>{post.summary}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--dim)', fontSize: 'var(--text-xs)' }}>
                  <span>⏱️ {post.readTime}</span>
                  <span>👁️ {post.views}</span>
                </div>
              </GlassCard>
            </div>
          </Link>
        )) : (
          <GlassCard padding="var(--space-xl)" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)' }}>No articles found for this category yet.</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
