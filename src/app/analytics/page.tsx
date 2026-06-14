'use client';
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const STATS = [
  { title: 'Carbon Saved', value: 124000, suffix: ' kg', prefix: '', icon: '📉', color: 'var(--primary)' },
  { title: 'Waste Recycled', value: 18200, suffix: ' kg', prefix: '', icon: '♻️', color: '#10b981' },
  { title: 'Smart Machines', value: 48, suffix: '', prefix: '', icon: '🤖', color: '#3b82f6' },
  { title: 'Active Users', value: 2500, suffix: '+', prefix: '', icon: '👥', color: '#f59e0b' },
  { title: 'Trees Equivalent', value: 15000, suffix: '', prefix: '', icon: '🌳', color: '#22c55e' },
  { title: 'Rewards Distributed', value: 480000, suffix: '', prefix: '₹', icon: '🏆', color: '#ef4444' },
];

const MONTHLY_DATA = [
  { month: 'Jan', carbon: 8200, recycled: 120, score: 62 },
  { month: 'Feb', carbon: 9400, recycled: 145, score: 65 },
  { month: 'Mar', carbon: 10100, recycled: 190, score: 70 },
  { month: 'Apr', carbon: 9800, recycled: 210, score: 68 },
  { month: 'May', carbon: 11500, recycled: 280, score: 75 },
  { month: 'Jun', carbon: 12800, recycled: 320, score: 78 },
  { month: 'Jul', carbon: 11200, recycled: 290, score: 72 },
  { month: 'Aug', carbon: 13500, recycled: 350, score: 80 },
  { month: 'Sep', carbon: 14200, recycled: 380, score: 82 },
  { month: 'Oct', carbon: 13800, recycled: 360, score: 81 },
  { month: 'Nov', carbon: 15600, recycled: 420, score: 85 },
  { month: 'Dec', carbon: 17200, recycled: 480, score: 88 },
];

const CATEGORY_BREAKDOWN = [
  { category: 'Transport', percentage: 35, color: '#3b82f6' },
  { category: 'Energy', percentage: 25, color: '#f59e0b' },
  { category: 'Food', percentage: 18, color: '#22c55e' },
  { category: 'Waste', percentage: 12, color: '#8b5cf6' },
  { category: 'Shopping', percentage: 7, color: '#ef4444' },
  { category: 'Water', percentage: 3, color: '#06b6d4' },
];

export default function AnalyticsPage() {
  const maxCarbon = useMemo(() => Math.max(...MONTHLY_DATA.map(d => d.carbon)), []);

  return (
    <main aria-label="Impact Analytics Dashboard" style={{ padding: 'calc(var(--navbar-height) + var(--space-3xl)) 0 var(--space-4xl)', minHeight: '100vh' }}>
      <div className="container">
        {/* Hero */}
        <header style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ fontSize: 48, marginBottom: 'var(--space-md)' }}>📊</div>
            <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 'var(--space-md)', background: 'linear-gradient(135deg, var(--text) 0%, var(--primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Impact Dashboard
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 650, margin: '0 auto' }}>
              Real-time analytics showcasing THADAM&apos;s global environmental impact, community growth, and sustainability trends.
            </p>
          </motion.div>
        </header>

        {/* Stats Grid */}
        <section aria-label="Global impact statistics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-3xl)' }}>
          {STATS.map((stat, idx) => (
            <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
              <GlassCard padding="var(--space-xl)" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                <div style={{ fontSize: 40, background: 'var(--surface)', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 18, flexShrink: 0 }}>
                  {stat.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', margin: 0, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{stat.title}</h3>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: stat.color, fontFamily: 'var(--font-heading)' }}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </section>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-3xl)' }}>
          {/* Bar Chart */}
          <GlassCard padding="var(--space-2xl)">
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-xl)' }}>Monthly Carbon Savings (kg)</h2>
            <div style={{ height: 280, display: 'flex', alignItems: 'flex-end', gap: 'var(--space-xs)' }} role="img" aria-label="Monthly carbon savings bar chart">
              {MONTHLY_DATA.map((d, i) => (
                <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', fontWeight: 600 }}>{(d.carbon / 1000).toFixed(1)}k</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.carbon / maxCarbon) * 220}px` }}
                    transition={{ duration: 0.8, delay: i * 0.05 }}
                    style={{ width: '100%', background: `linear-gradient(to top, rgba(16,185,129,0.3), var(--primary))`, borderRadius: '4px 4px 0 0', minHeight: 4 }}
                  />
                  <span style={{ fontSize: 9, color: 'var(--muted)' }}>{d.month}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Category Breakdown */}
          <GlassCard padding="var(--space-2xl)">
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-xl)' }}>Emissions by Category</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {CATEGORY_BREAKDOWN.map((cat, idx) => (
                <div key={cat.category}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{cat.category}</span>
                    <span style={{ fontSize: 'var(--text-sm)', color: cat.color, fontWeight: 700 }}>{cat.percentage}%</span>
                  </div>
                  <div style={{ width: '100%', height: 10, background: 'var(--surface)', borderRadius: 5, overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.percentage}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      style={{ height: '100%', background: cat.color, borderRadius: 5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'var(--space-xl)', padding: 'var(--space-md)', background: 'rgba(16,185,129,0.05)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16,185,129,0.1)' }}>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)', fontWeight: 600, marginBottom: 4 }}>💡 AI Insight</div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                Transport accounts for 35% of tracked emissions. Switching to public transit 3 days/week could reduce your footprint by 18%.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Eco Score Trend */}
        <GlassCard padding="var(--space-2xl)">
          <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-xl)' }}>Eco Score Trend</h2>
          <div style={{ height: 200, display: 'flex', alignItems: 'flex-end', gap: 'var(--space-xs)', position: 'relative' }} role="img" aria-label="Monthly eco score trend line chart">
            {/* Grid lines */}
            {[25, 50, 75, 100].map(line => (
              <div key={line} style={{ position: 'absolute', left: 0, right: 0, bottom: `${(line / 100) * 200}px`, borderBottom: '1px dashed var(--border)', zIndex: 0 }}>
                <span style={{ position: 'absolute', left: -28, fontSize: 9, color: 'var(--muted)' }}>{line}</span>
              </div>
            ))}
            {MONTHLY_DATA.map((d, i) => (
              <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 1 }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.score / 100) * 200}px` }}
                  transition={{ duration: 1, delay: i * 0.06 }}
                  style={{ width: '100%', maxWidth: 24, background: d.score > 80 ? 'var(--primary)' : d.score > 65 ? '#f59e0b' : 'var(--danger)', borderRadius: '4px 4px 0 0', position: 'relative' }}
                >
                  <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 700, color: 'var(--text)' }}>{d.score}</div>
                </motion.div>
                <span style={{ fontSize: 9, color: 'var(--muted)' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
