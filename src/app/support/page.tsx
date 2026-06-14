'use client';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useState } from 'react';

const SUPPORT_CATEGORIES = [
  {
    title: 'Getting Started',
    icon: '🚀',
    items: ['How to create an account', 'How Google Sign-In works', 'How to track carbon footprint']
  },
  {
    title: 'Carbon Tracking',
    icon: '📊',
    items: ['Understanding scores', 'Carbon reduction tips', 'Progress reports']
  },
  {
    title: 'Smart Machines',
    icon: '🤖',
    items: ['How recycling rewards work', 'Machine locations', 'Supported waste types']
  },
  {
    title: 'Rewards',
    icon: '🎁',
    items: ['Earning points', 'Redeeming rewards', 'Challenge participation']
  },
  {
    title: 'AI Features',
    icon: '🧠',
    items: ['Using THADAM AI Coach', 'Using Waste Scanner', 'Understanding recommendations']
  }
];

export default function SupportPage() {
  const [search, setSearch] = useState('');

  const filteredCategories = SUPPORT_CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(item => item.toLowerCase().includes(search.toLowerCase()))
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0', minHeight: '80vh' }}>
      <section style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 500, height: 500, background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)', opacity: 0.1, zIndex: -1, pointerEvents: 'none' }} />
        
        <motion.h1 
          className="section-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 'var(--space-md)' }}
        >
          HOW CAN WE HELP?
        </motion.h1>
        
        <div style={{ maxWidth: 500, margin: '0 auto', marginTop: 'var(--space-xl)' }}>
          <input 
            type="text" 
            placeholder="Search for articles, guides, or features..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field" 
            style={{ width: '100%', padding: '16px 20px', borderRadius: 'var(--radius-full)', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 'var(--text-md)', outline: 'none' }} 
            aria-label="Search Support"
          />
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
        {filteredCategories.length > 0 ? filteredCategories.map((category, idx) => (
          <motion.div key={category.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
            <GlassCard padding="var(--space-xl)" style={{ height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                <span style={{ fontSize: 28 }}>{category.icon}</span>
                <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', margin: 0, color: 'var(--text)' }}>{category.title}</h2>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', padding: 0, margin: 0, listStyle: 'none' }}>
                {category.items.map(item => (
                  <li key={item}>
                    <a href="#" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 'var(--text-sm)', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }}
                       onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                       onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted)'}
                    >
                      <span style={{ color: 'var(--border)' }}>→</span> {item}
                    </a>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </motion.div>
        )) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--space-3xl)', color: 'var(--muted)' }}>
            No support articles found matching &quot;{search}&quot;. Please try a different term.
          </div>
        )}
      </div>

      <section style={{ textAlign: 'center', marginTop: 'var(--space-4xl)' }}>
        <h3 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)', color: 'var(--text)' }}>Still need help?</h3>
        <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-lg)' }}>Our support team is ready to assist you.</p>
        <Button variant="primary" onClick={() => window.location.href = '/contact'}>Contact Support</Button>
      </section>
    </div>
  );
}
