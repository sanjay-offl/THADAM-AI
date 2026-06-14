'use client';
import { BlogPost, BLOG_POSTS } from '@/data/blogs';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function ArticleClient({ post }: { post: BlogPost }) {
  const { scrollYProgress } = useScroll();
  const [bookmarked, setBookmarked] = useState(false);

  const related = BLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <>
      <motion.div 
        style={{ scaleX: scrollYProgress, position: 'fixed', top: 0, left: 0, right: 0, height: 4, background: 'var(--primary)', transformOrigin: '0%', zIndex: 100 }}
      />
      
      <div className="container" style={{ padding: 'var(--space-2xl) 0', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 'var(--space-3xl)' }}>
        
        {/* Main Content */}
        <article>
          <span style={{ color: 'var(--primary)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{post.category}</span>
          <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: 'var(--space-sm) 0 var(--space-md)' }}>{post.title}</h1>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xl)' }}>{post.summary}</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-2xl)', paddingBottom: 'var(--space-lg)', borderBottom: '1px solid var(--border)' }}>
            <Image src={post.author.avatar} alt={post.author.name} width={48} height={48} style={{ borderRadius: '50%' }} />
            <div>
              <div style={{ color: 'var(--text)', fontWeight: 600 }}>{post.author.name}</div>
              <div style={{ color: 'var(--dim)', fontSize: 'var(--text-sm)' }}>{post.author.role} • {post.publishDate} • ⏱️ {post.readTime}</div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <Button variant="ghost" onClick={() => setBookmarked(!bookmarked)}>{bookmarked ? '🔖 Saved' : '🔖 Bookmark'}</Button>
              <Button variant="ghost" onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }}>🔗 Share</Button>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', height: 400, marginBottom: 'var(--space-2xl)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Image src={post.imageUrl} alt={post.title} fill style={{ objectFit: 'cover' }} />
          </div>

          {/* Key Takeaways */}
          <GlassCard padding="var(--space-lg)" style={{ marginBottom: 'var(--space-2xl)', borderLeft: '4px solid var(--primary)' }}>
            <h3 style={{ margin: '0 0 12px 0' }}>Key Takeaways</h3>
            <ul style={{ color: 'var(--muted)', margin: 0, paddingLeft: 20 }}>
              <li>Understand your baseline carbon emissions.</li>
              <li>Small behavioral changes compound into massive impact.</li>
              <li>THADAM AI helps automate and reward this process.</li>
            </ul>
          </GlassCard>

          {/* Markdown Content */}
          <div className="prose" style={{ color: 'var(--text)', lineHeight: 1.8 }}>
             <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--border)' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ padding: '4px 12px', background: 'var(--surface)', borderRadius: 16, fontSize: '12px', color: 'var(--muted)' }}>#{tag}</span>
            ))}
          </div>

          {/* Author Card */}
          <GlassCard padding="var(--space-xl)" style={{ marginTop: 'var(--space-2xl)', display: 'flex', gap: 'var(--space-lg)', alignItems: 'center' }}>
            <Image src={post.author.avatar} alt={post.author.name} width={80} height={80} style={{ borderRadius: '50%' }} />
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>{post.author.name}</h3>
              <p style={{ color: 'var(--primary)', fontSize: '12px', textTransform: 'uppercase', marginBottom: 8 }}>{post.author.role}</p>
              <p style={{ color: 'var(--muted)', margin: 0, fontSize: '14px' }}>Dedicated to building a sustainable future through data-driven insights and AI innovations.</p>
            </div>
          </GlassCard>
        </article>

        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
          {/* Sustainability Score */}
          <GlassCard padding="var(--space-lg)" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, transparent 100%)' }}>
             <div style={{ fontSize: 48, marginBottom: 8 }}>🌱</div>
             <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--primary)' }}>92/100</div>
             <div style={{ color: 'var(--text)', fontWeight: 600, marginTop: 4 }}>High Sustainability Impact</div>
             <p style={{ color: 'var(--muted)', fontSize: '12px', marginTop: 8 }}>This article aligns highly with global carbon reduction targets.</p>
          </GlassCard>

          {/* Table of Contents */}
          <GlassCard padding="var(--space-lg)" style={{ position: 'sticky', top: 100 }}>
             <h3 style={{ margin: '0 0 16px 0', fontSize: 'var(--text-lg)' }}>Table of Contents</h3>
             <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li><a href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>What is a Carbon Footprint?</a></li>
                <li><a href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>Why it Matters</a></li>
                <li><a href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '14px' }}>How THADAM Helps</a></li>
             </ul>
          </GlassCard>
        </aside>
      </div>

      {/* Related Articles */}
      <section className="container" style={{ paddingBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-2xl)' }}>Related Articles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
          {related.length > 0 ? related.map(p => (
            <Link key={p.id} href={`/blogs/${p.slug}`} style={{ textDecoration: 'none' }}>
              <GlassCard padding="var(--space-lg)">
                <h3 style={{ color: 'var(--text)', fontSize: '18px', marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: 12 }}>{p.summary.substring(0, 80)}...</p>
                <span style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 600 }}>Read Article →</span>
              </GlassCard>
            </Link>
          )) : (
            <p style={{ color: 'var(--muted)' }}>No related articles found.</p>
          )}
        </div>
      </section>
    </>
  );
}
