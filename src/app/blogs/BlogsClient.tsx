'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS, CATEGORIES, FACTS } from '@/data/blogs';

export default function BlogsClient() {
  const featured = BLOG_POSTS.filter(p => p.featured);
  const trending = BLOG_POSTS.filter(p => p.trending);

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [factIndex, setFactIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex(prev => (prev + 1) % FACTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ paddingBottom: 'var(--space-4xl)' }}>
      {/* SECTION 1: SUSTAINABILITY HERO */}
      <section style={{ position: 'relative', padding: 'var(--space-4xl) 0', overflow: 'hidden', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 60%)', opacity: 0.15, zIndex: -1 }} />
        
        <div className="container" style={{ textAlign: 'center', zIndex: 1 }}>
          <motion.h1 
            className="section-title text-gradient font-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.1, marginBottom: 'var(--space-lg)' }}
          >
            KNOW MORE.<br/>WASTE LESS.<br/>ACT BETTER.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 600, margin: '0 auto', marginBottom: 'var(--space-2xl)' }}
          >
            Explore sustainability insights, environmental innovations, carbon reduction strategies, and AI-powered climate solutions.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search articles, topics, or insights..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '20px 24px', borderRadius: 'var(--radius-full)', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 'var(--text-md)', outline: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
              />
              <span style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>🔍</span>
            </div>
            
            {/* FILTER TABS */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 'var(--space-xl)' }}>
               {['All', 'Carbon', 'Climate', 'Energy', 'AI', 'Waste', 'Technology', 'Research'].map(filter => (
                 <button 
                   key={filter}
                   onClick={() => setActiveFilter(filter)}
                   style={{ padding: '6px 16px', borderRadius: 20, background: activeFilter === filter ? 'var(--primary)' : 'var(--surface)', color: activeFilter === filter ? '#000' : 'var(--text)', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s' }}
                 >
                   {filter}
                 </button>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEARCH OR FILTER RESULTS */}
      {(debouncedSearch || activeFilter !== 'All') ? (
        <section className="container" style={{ marginBottom: 'var(--space-4xl)', minHeight: '50vh' }}>
          <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>
            {debouncedSearch ? `Search results for "${debouncedSearch}"` : `Filtered by "${activeFilter}"`}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
            {BLOG_POSTS.filter(p => {
               const matchSearch = debouncedSearch ? (p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || p.content.toLowerCase().includes(debouncedSearch.toLowerCase()) || p.tags.join(' ').toLowerCase().includes(debouncedSearch.toLowerCase())) : true;
               const matchFilter = activeFilter === 'All' ? true : (p.category.includes(activeFilter) || p.tags.includes(activeFilter));
               return matchSearch && matchFilter;
            }).map(post => (
              <Link key={post.id} href={`/blogs/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ height: '100%', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                  <GlassCard padding="var(--space-lg)" style={{ height: '100%' }}>
                     <span style={{ color: 'var(--primary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{post.category}</span>
                     <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--text)', marginTop: 8, marginBottom: 12 }}>{post.title}</h3>
                     <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>{post.summary.substring(0, 100)}...</p>
                  </GlassCard>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <>

      {/* SECTION 2: FEATURED ARTICLE CAROUSEL */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Featured Stories</h2>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
          <AnimatePresence mode="wait">
            {featured.map((post, idx) => idx === carouselIndex && (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <GlassCard padding="0" style={{ overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 400, width: '100%' }}>
                    <Image src={post.imageUrl} alt={post.title} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'var(--space-2xl)' }}>
                       <span style={{ background: 'var(--primary)', color: '#000', padding: '4px 12px', borderRadius: 16, fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: 12, display: 'inline-block' }}>{post.category}</span>
                       <h3 className="font-heading" style={{ fontSize: 'var(--text-3xl)', color: 'var(--text)', marginBottom: 8 }}>{post.title}</h3>
                       <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: 600, marginBottom: 'var(--space-md)' }}>{post.summary}</p>
                       <Link href={`/blogs/${post.slug}`}>
                          <Button variant="primary">Read Article</Button>
                       </Link>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Carousel controls */}
          {featured.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 16 }}>
              <Button size="sm" variant="ghost" onClick={() => setCarouselIndex(prev => (prev - 1 + featured.length) % featured.length)}>‹ Previous</Button>
              <div style={{ display: 'flex', gap: 6 }}>
                {featured.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: idx === carouselIndex ? 'var(--primary)' : 'var(--border)',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
              <Button size="sm" variant="ghost" onClick={() => setCarouselIndex(prev => (prev + 1) % featured.length)}>Next ›</Button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: TRENDING NOW */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--space-lg)' }}>
           <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', color: 'var(--text)', margin: 0 }}>Trending Now</h2>
           <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '4px 12px', borderRadius: 16, fontSize: 'var(--text-xs)', fontWeight: 600 }}>🔥 HOT</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
           {trending.map(post => (
             <Link key={post.id} href={`/blogs/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ height: '100%', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                  <GlassCard padding="var(--space-lg)" style={{ height: '100%' }}>
                     <span style={{ color: 'var(--primary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{post.category}</span>
                     <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--text)', marginTop: 8, marginBottom: 12 }}>{post.title}</h3>
                     <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--dim)', fontSize: 'var(--text-xs)' }}>
                        <span>⏱️ {post.readTime}</span>
                        <span>👁️ {post.views}</span>
                     </div>
                  </GlassCard>
                </div>
             </Link>
           ))}
        </div>
      </section>

      {/* SECTION 4: SUSTAINABILITY EXPLORER */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Explore Categories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-sm)' }}>
          {CATEGORIES.map(cat => (
             <Link key={cat.name} href={`/blogs/category/${cat.name.toLowerCase().replace(/ /g, '-')}`} style={{ textDecoration: 'none' }}>
                <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                   <span style={{ fontSize: 24 }}>{cat.icon}</span>
                   <div style={{ flex: 1 }}>
                      <div style={{ color: 'var(--text)', fontWeight: 500, fontSize: 'var(--text-sm)' }}>{cat.name}</div>
                      <div style={{ color: 'var(--dim)', fontSize: 'var(--text-xs)' }}>{cat.count} Articles</div>
                   </div>
                </div>
             </Link>
          ))}
        </div>
      </section>

      {/* SECTION: GLOBAL SUSTAINABILITY INITIATIVES */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Global Sustainability Initiatives</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
          {[
            {
              title: 'AI for Climate Action',
              desc: 'Deploying neural networks to optimize energy usage and predict forest fires globally.',
              illustration: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 40, height: 40, color: 'var(--primary)' }}>
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              )
            },
            {
              title: 'Smart Transportation',
              desc: 'AI-guided transit grids minimizing urban congestion and carbon output.',
              illustration: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 40, height: 40, color: 'var(--primary)' }}>
                  <rect x="1" y="3" width="22" height="13" rx="2" ry="2" />
                  <line x1="12" y1="16" x2="12" y2="21" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                </svg>
              )
            },
            {
              title: 'Renewable Energy Systems',
              desc: 'Integrating offshore wind and space-based solar panels into public grids.',
              illustration: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 40, height: 40, color: 'var(--primary)' }}>
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M2 12h20" />
                </svg>
              )
            },
            {
              title: 'Sustainable Cities',
              desc: 'Hyper-localized recycling and zero-carbon urban communities.',
              illustration: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 40, height: 40, color: 'var(--primary)' }}>
                  <path d="M3 21h18M3 7v14M13 3v18M17 10v11M9 9v12" />
                </svg>
              )
            },
            {
              title: 'Carbon Reduction Technologies',
              desc: 'Scaling Direct Air Capture (DAC) and bio-oil injection.',
              illustration: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 40, height: 40, color: 'var(--primary)' }}>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              )
            },
            {
              title: 'Waste Reduction Innovations',
              desc: 'Enforcing localized zero-plastic policies using automated monitoring.',
              illustration: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 40, height: 40, color: 'var(--primary)' }}>
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              )
            },
            {
              title: 'Circular Economy Models',
              desc: 'Fostering product lifecycle loops from design to material recovery.',
              illustration: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 40, height: 40, color: 'var(--primary)' }}>
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              )
            },
            {
              title: 'Environmental Research Programs',
              desc: 'Tracking biodiversity indices and ocean temperature trends.',
              illustration: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 40, height: 40, color: 'var(--primary)' }}>
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              )
            }
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
            >
              <GlassCard padding="var(--space-xl)" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: 'var(--space-md)' }}>{item.illustration}</div>
                <h3 className="font-heading" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-xs)', color: 'var(--text)' }}>{item.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-lg)', flex: 1 }}>{item.desc}</p>
                <Link href="/blogs"><Button variant="ghost" size="sm" style={{ alignSelf: 'flex-start' }}>Read More</Button></Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION: SUSTAINABILITY INNOVATION SHOWCASE */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Sustainability Innovation Showcase</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
          {[
            {
              title: 'Carbon Tracker',
              icon: '📊',
              benefit: 'Automatic travel & activity tracking.',
              stat: '-25% emissions avg',
              cta: 'Start Tracking',
              link: '/carbon'
            },
            {
              title: 'Carbon Twin AI',
              icon: '👥',
              benefit: 'Real-time personalized digital climate coach.',
              stat: '98.5% advisory accuracy',
              cta: 'Chat with Twin',
              link: '/chat'
            },
            {
              title: 'Waste Scanner',
              icon: '👁️',
              benefit: 'Instantly identifies recyclability of waste items.',
              stat: '96% sorting success',
              cta: 'Scan Now',
              link: '/scan'
            },
            {
              title: 'Smart Recycling Machines',
              icon: '♻️',
              benefit: 'Drop waste at physical units and get rewarded.',
              stat: '48 active locations',
              cta: 'Find Bins',
              link: '/machines'
            },
            {
              title: 'Rewards Engine',
              icon: '🏆',
              benefit: 'Convert recycling and tracking habits into points.',
              stat: '₹4,80,000 distributed',
              cta: 'View Rewards',
              link: '/rewards'
            },
            {
              title: 'Environmental Analytics',
              icon: '📈',
              benefit: 'In-depth dashboard showcasing global progress.',
              stat: '18.2 Tons waste recycled',
              cta: 'See Dashboard',
              link: '/dashboard'
            }
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard padding="var(--space-xl)" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                    <span style={{ fontSize: '32px' }}>{card.icon}</span>
                    <h3 className="font-heading" style={{ fontSize: 'var(--text-lg)', margin: 0, color: 'var(--text)' }}>{card.title}</h3>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-lg)' }}>{card.benefit}</p>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)', fontWeight: 600 }}>{card.stat}</span>
                    <Link href={card.link}><Button variant="ghost" size="sm">{card.cta}</Button></Link>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 5: THADAM INSIGHTS */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>THADAM Insights</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 8 }}>Most Recycled Materials</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Based on smart machine data across 48 locations.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[{ name: 'Plastic Bottles', pct: 45 }, { name: 'Aluminum Cans', pct: 30 }, { name: 'Glass', pct: 15 }, { name: 'Cardboard', pct: 10 }].map(item => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--dim)', marginBottom: 4 }}>
                    <span>{item.name}</span><span>{item.pct}%</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'var(--surface)', borderRadius: 3, overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.pct}%` }} viewport={{ once: true }} style={{ height: '100%', background: 'var(--primary)' }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 8 }}>Carbon Reduction Trends</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 16 }}>Community carbon offset over the last 6 months.</p>
            <div style={{ height: 150, display: 'flex', alignItems: 'flex-end', gap: 8, marginTop: 'auto' }}>
              {[20, 35, 45, 60, 85, 100].map((h, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} style={{ flex: 1, background: 'var(--primary)', borderRadius: '4px 4px 0 0', opacity: 0.6 + (i * 0.08) }} />
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* SECTION 6: LATEST ARTICLES */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Latest Articles</h2>
        <div style={{ columns: '300px', columnGap: 'var(--space-lg)' }}>
          {BLOG_POSTS.map(post => (
             <Link key={post.id} href={`/blogs/${post.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 'var(--space-lg)', breakInside: 'avoid' }}>
                <div style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
                  <GlassCard padding="var(--space-lg)">
                     <div style={{ position: 'relative', width: '100%', height: 180, borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 16 }}>
                        <Image src={post.imageUrl} alt={post.title} fill style={{ objectFit: 'cover' }} />
                     </div>
                     <span style={{ color: 'var(--primary)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{post.category}</span>
                     <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--text)', marginTop: 8, marginBottom: 12 }}>{post.title}</h3>
                     <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>{post.summary.substring(0, 80)}...</p>
                  </GlassCard>
                </div>
             </Link>
          ))}
        </div>
      </section>

      {/* SECTION 7: RESEARCH SPOTLIGHT */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-lg)' }}>
          <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', margin: 0, color: 'var(--text)' }}>Research Spotlight</h2>
          <Link href="/blogs/research"><Button variant="ghost">View All</Button></Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
           {['Climate Reports', 'Carbon Analytics', 'Environmental Data', 'AI Sustainability Research'].map(topic => (
             <GlassCard key={topic} padding="var(--space-lg)">
               <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 8 }}>{topic}</h3>
               <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 16 }}>Comprehensive studies and datasets.</p>
               <div style={{ display: 'flex', gap: 8 }}>
                 <Button variant="outline" style={{ flex: 1 }}>Read</Button>
                 <Button variant="ghost" style={{ flex: 1 }}>PDF</Button>
               </div>
             </GlassCard>
           ))}
        </div>
      </section>

      {/* SECTION 8: TECHNOLOGY FOR GOOD */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Technology For Good</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
           {['AI', 'IoT', 'Smart Recycling', 'Carbon Analytics'].map(tech => (
             <Link key={tech} href="/blogs/technology" style={{ textDecoration: 'none' }}>
               <div style={{ textAlign: 'center', height: '100%', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                 <GlassCard padding="var(--space-lg)" style={{ height: '100%' }}>
                   <h3 style={{ fontSize: 'var(--text-md)', margin: 0 }}>{tech}</h3>
                 </GlassCard>
               </div>
             </Link>
           ))}
        </div>
      </section>

      {/* SECTION 9: COMMUNITY STORIES */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Community Stories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
          <GlassCard padding="0" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
             <div style={{ height: 200, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🎓</div>
             <div style={{ padding: 'var(--space-lg)' }}>
               <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 8 }}>Green Campuses</h3>
               <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 16 }}>How universities are reducing their footprint using THADAM machines.</p>
               <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(16,185,129,0.1)', color: 'var(--primary)', borderRadius: 16, fontSize: '12px', fontWeight: 600 }}>-40% Emissions</div>
             </div>
          </GlassCard>
          <GlassCard padding="0" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
             <div style={{ height: 200, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>♻️</div>
             <div style={{ padding: 'var(--space-lg)' }}>
               <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 8 }}>Recycling Champions</h3>
               <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 16 }}>Local heroes tracking their impact and inspiring communities.</p>
               <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(16,185,129,0.1)', color: 'var(--primary)', borderRadius: 16, fontSize: '12px', fontWeight: 600 }}>10k Points Earned</div>
             </div>
          </GlassCard>
        </div>
      </section>

      {/* SECTION: ENVIRONMENTAL IMPACT STORIES */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Environmental Impact Stories</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
          {[
            {
              title: 'How students reduced emissions using daily tracking',
              summary: 'Students at central university campuses tracked carbon footprint and lowered regional transportation emissions by 40%.',
              badge: 'Campus Case Study',
              emoji: '🎓'
            },
            {
              title: 'Community recycling success stories',
              summary: 'Local communities leveraged THADAM Smart Recycling Bins to recycle 18.2 Tons of municipal waste in 6 months.',
              badge: 'Community Success',
              emoji: '♻️'
            },
            {
              title: 'AI-driven waste sorting improvements',
              summary: 'THADAM Waste Scanner helped sorting plants reduce plastic contamination metrics by over 25%.',
              badge: 'Technology Integration',
              emoji: '🧠'
            },
            {
              title: 'Smart machine deployment impact',
              summary: 'Deploying 48 smart machines across key transport hubs generated massive carbon offsets and engaged 2,500 active users.',
              badge: 'Urban Development',
              emoji: '🏙️'
            },
            {
              title: 'Carbon reduction through behavioral insights',
              summary: 'How nudges and Carbon Twin recommendations motivated users to switch to eco-friendly habits.',
              badge: 'Behavioral Science',
              emoji: '👣'
            }
          ].map((story, idx) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard padding="var(--space-xl)" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                    <span style={{ fontSize: '12px', background: 'rgba(16,185,129,0.1)', color: 'var(--primary)', padding: '4px 10px', borderRadius: 12, fontWeight: 600 }}>{story.badge}</span>
                    <span style={{ fontSize: '24px' }}>{story.emoji}</span>
                  </div>
                  <h3 className="font-heading" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-sm)', color: 'var(--text)', lineHeight: 1.3 }}>{story.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>{story.summary}</p>
                </div>
                <div style={{ marginTop: 'var(--space-lg)' }}>
                  <Link href="/blogs"><Button variant="ghost" size="sm">Read Story</Button></Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION: SUSTAINABILITY KNOWLEDGE TIMELINE */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Sustainability Knowledge Timeline</h2>
        <GlassCard padding="var(--space-2xl)">
          <div style={{ display: 'flex', gap: 'var(--space-xl)', overflowX: 'auto', paddingBottom: 16 }}>
            {[
              { year: '2015', title: 'Climate Awareness', desc: 'Global commitments set foundations for public emissions mapping.' },
              { year: '2018', title: 'AI & Environment', desc: 'Machine learning starts optimizing energy grids and resource models.' },
              { year: '2020', title: 'Smart Cities', desc: 'IoT integration launches automated urban waste sorting.' },
              { year: '2022', title: 'Carbon Intelligence', desc: 'Personal carbon score tracking rises to meet corporate green standards.' },
              { year: '2024', title: 'Sustainable AI', desc: 'Energy-efficient model training methods reduce global AI server footprint.' },
              { year: '2026', title: 'THADAM Carbon Twin', desc: 'AI-driven realtime carbon twins predict personal climate impacts instantly.' }
            ].map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{ minWidth: 260, borderLeft: '3px solid var(--primary)', paddingLeft: 'var(--space-lg)', position: 'relative' }}
              >
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', opacity: 0.8, lineHeight: 1, marginBottom: 8 }}>{item.year}</div>
                <h4 style={{ fontSize: 'var(--text-lg)', marginBottom: 8, color: 'var(--text)' }}>{item.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* SECTION 12: LEARNING PATHS */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Learning Paths</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-md)' }}>
          {[
            { level: 'Beginner', title: 'Carbon Basics', progress: 0 },
            { level: 'Intermediate', title: 'Waste Management', progress: 40 },
            { level: 'Advanced', title: 'Climate Science', progress: 100 }
          ].map(path => (
            <GlassCard key={path.level} padding="var(--space-lg)">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: 'var(--primary)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase' }}>{path.level}</span>
                <span style={{ color: 'var(--dim)', fontSize: 'var(--text-xs)' }}>{path.progress}%</span>
              </div>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 16 }}>{path.title}</h3>
              <div style={{ width: '100%', height: 4, background: 'var(--surface)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${path.progress}%`, background: path.progress === 100 ? 'var(--warning)' : 'var(--primary)' }} />
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION 10: FACTS CAROUSEL */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <GlassCard padding="var(--space-2xl)" style={{ textAlign: 'center', background: 'linear-gradient(45deg, var(--surface) 0%, rgba(16,185,129,0.05) 100%)' }}>
          <h3 style={{ color: 'var(--primary)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-md)' }}>Did You Know?</h3>
          <div style={{ height: 60, position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={factIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ position: 'absolute', width: '100%', color: 'var(--text)', fontSize: 'var(--text-lg)', fontStyle: 'italic' }}
              >
                &quot;{FACTS[factIndex]}&quot;
              </motion.div>
            </AnimatePresence>
          </div>
        </GlassCard>
      </section>
      
      </>
      )}

      {/* SECTION 13: NEWSLETTER */}
      <section className="container" style={{ marginBottom: 'var(--space-4xl)' }}>
        <GlassCard padding="var(--space-3xl)" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
           <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'var(--primary)', opacity: 0.1, borderRadius: '50%', filter: 'blur(40px)' }} />
           <h2 className="font-heading" style={{ fontSize: 'var(--text-3xl)', color: 'var(--text)', marginBottom: 'var(--space-sm)' }}>GET WEEKLY SUSTAINABILITY INSIGHTS</h2>
           <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-xl)' }}>Join 2,500+ users receiving our curated environmental research and actionable tips.</p>
           <form style={{ display: 'flex', gap: 8, maxWidth: 500, margin: '0 auto' }} onSubmit={e => { e.preventDefault(); alert('Subscribed!'); }}>
              <input type="email" required placeholder="Enter your email" style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--radius-md)', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', outline: 'none' }} />
              <Button variant="primary">Subscribe</Button>
           </form>
        </GlassCard>
      </section>

      {/* SECTION 14: CTA */}
      <section className="container" style={{ textAlign: 'center' }}>
        <h2 className="font-heading text-gradient" style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-lg)' }}>SMALL ACTIONS.<br/>BIG IMPACT.</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
           <Link href="/blogs"><Button variant="outline">Explore Articles</Button></Link>
           <Link href="/dashboard"><Button variant="primary">Start Tracking Carbon</Button></Link>
           <Link href="/chat"><Button variant="ghost">Talk To THADAM AI</Button></Link>
        </div>
      </section>

    </div>
  );
}
