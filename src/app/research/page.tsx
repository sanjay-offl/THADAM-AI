'use client';
import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const RESEARCH_TOPICS = [
  {
    title: 'Climate Reports',
    icon: '📊',
    desc: 'Annual reports examining regional warming trends, carbon emissions, and climate mitigation strategies.',
    stat: 'Updated Q2 2026'
  },
  {
    title: 'Carbon Analytics',
    icon: '📈',
    desc: 'Quantitative datasets showing community carbon offsets, transport emissions, and industrial impact.',
    stat: '124,000 kg CO2 offset'
  },
  {
    title: 'Environmental Studies',
    icon: '🌱',
    desc: 'Peer-reviewed studies on ecosystem preservation, microplastics in urban waste streams, and biodiversity.',
    stat: '4 major publications'
  },
  {
    title: 'Carbon Insights',
    icon: '🧠',
    desc: 'Deep analytical forecasting of individual and municipal carbon reduction goals using machine learning models.',
    stat: '98.4% forecast accuracy'
  },
  {
    title: 'Climate Data',
    icon: '🌍',
    desc: 'Publicly accessible API endpoints offering real-time atmospheric carbon levels, regional temperature changes, and environmental stats.',
    stat: 'Real-time API live'
  }
];

export default function ResearchPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0', minHeight: '80vh' }}>
      <section style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 800, height: 600, background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)', opacity: 0.1, zIndex: -1, pointerEvents: 'none' }} />
        
        <motion.h1 
          className="section-title text-gradient font-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 'var(--space-md)' }}
        >
          CLIMATE RESEARCH & INSIGHTS
        </motion.h1>
        <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
          Explore THADAM&apos;s academic papers, regional environmental studies, and real-time carbon datasets.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-4xl)' }}>
        {RESEARCH_TOPICS.map((topic, idx) => (
          <motion.div 
            key={topic.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <GlassCard padding="var(--space-2xl)" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                <span style={{ fontSize: '32px' }}>{topic.icon}</span>
                <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', margin: 0, color: 'var(--text)' }}>
                  {topic.title}
                </h2>
              </div>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, margin: '0 0 var(--space-lg) 0', flex: 1 }}>
                {topic.desc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-md)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)', fontWeight: 600 }}>{topic.stat}</span>
                <Link href="/blogs/research"><Button variant="ghost" size="sm">Read Publications</Button></Link>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
