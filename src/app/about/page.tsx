'use client';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0', minHeight: '80vh' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 600, height: 600, background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.1, zIndex: -1, pointerEvents: 'none' }} />
        
        <motion.h1 
          className="section-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 'var(--space-md)' }}
        >
          WE DON&apos;T JUST TRACK CARBON.<br />WE HELP REDUCE IT.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 800, margin: '0 auto', lineHeight: 1.6 }}
        >
          THADAM AI was created to make sustainability measurable, understandable, and rewarding. Most people want to reduce their environmental impact but lack the tools to understand where emissions come from and what actions make the biggest difference.
        </motion.p>
      </section>

      {/* Story Section */}
      <section style={{ marginBottom: 'var(--space-3xl)' }}>
        <GlassCard padding="var(--space-2xl)">
          <div style={{ display: 'grid', gap: 'var(--space-lg)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            <div>
              <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', color: 'var(--text)', marginBottom: 'var(--space-md)' }}>The THADAM Approach</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
                THADAM combines artificial intelligence, carbon analytics, smart recycling infrastructure, and rewards into a single platform that helps users transform everyday actions into measurable environmental impact.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
                We believe that giving individuals actionable insights and immediate positive reinforcement creates lasting behavioral changes.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {['Track carbon footprint.', 'Reduce waste.', 'Reward sustainability.', 'Build greener communities.'].map((mission, idx) => (
                <div key={idx} className="glass-subtle" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <span style={{ color: 'var(--primary)', fontSize: 'var(--text-xl)' }}>🌱</span>
                  <span style={{ fontWeight: 500, color: 'var(--text)' }}>{mission}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Impact Highlights */}
      <section style={{ marginBottom: 'var(--space-3xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', textAlign: 'center', marginBottom: 'var(--space-xl)' }}>Our Impact So Far</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
          {[
            { label: 'Carbon Saved', value: '124,000 kg', icon: '☁️' },
            { label: 'Recycled Waste', value: '18.2 Tons', icon: '♻️' },
            { label: 'Smart Machines', value: '48', icon: '🤖' },
            { label: 'Active Users', value: '2,500', icon: '👥' },
            { label: 'Tree Equivalents', value: '15,000', icon: '🌳' },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <GlassCard padding="var(--space-lg)" style={{ textAlign: 'center', height: '100%' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-sm)' }}>{stat.icon}</div>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>{stat.value}</div>
                <div style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision & CTA */}
      <section style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>Our Vision</h2>
        <p style={{ color: 'var(--text)', fontSize: 'var(--text-lg)', fontStyle: 'italic', marginBottom: 'var(--space-xl)' }}>
          &quot;A future where every individual understands their environmental impact and has the tools to make meaningful changes.&quot;
        </p>
        <Button variant="primary" onClick={() => window.location.href = '/dashboard'}>Join the Movement</Button>
      </section>
    </div>
  );
}
