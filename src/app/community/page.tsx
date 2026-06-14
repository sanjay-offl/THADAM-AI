'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';

const IMPACT_STATS = [
  { icon: '🤝', title: 'People Helped', value: '12,450', sub: '+340 this month' },
  { icon: '📉', title: 'Carbon Saved', value: '124 Tons', sub: '+8.2T this month' },
  { icon: '🌳', title: 'Trees Equivalent', value: '15,000', sub: 'Virtually planted' },
  { icon: '♻️', title: 'Waste Recycled', value: '18.2 Tons', sub: '+1.4T this month' },
];

const GLOBAL_LEADERS = [
  { rank: 1, name: 'Sarah Jenkins', score: 9850, location: 'New York', badge: '🏆', streak: 42 },
  { rank: 2, name: 'David Chen', score: 9420, location: 'San Francisco', badge: '🥈', streak: 38 },
  { rank: 3, name: 'Elena Rodriguez', score: 8900, location: 'London', badge: '🥉', streak: 35 },
  { rank: 4, name: 'Marcus Johnson', score: 8750, location: 'Toronto', badge: '', streak: 29 },
  { rank: 5, name: 'Aisha Patel', score: 8600, location: 'Mumbai', badge: '', streak: 27 },
  { rank: 6, name: 'Kenji Tanaka', score: 8200, location: 'Tokyo', badge: '', streak: 24 },
  { rank: 7, name: 'Sanjay S', score: 8100, location: 'Chennai', badge: '', streak: 22 },
  { rank: 8, name: 'Li Wei', score: 7950, location: 'Beijing', badge: '', streak: 20 },
];

const LOCAL_LEADERS = [
  { rank: 1, name: 'Sanjay S', score: 8100, location: 'Chennai', badge: '🏆', streak: 22 },
  { rank: 2, name: 'Priya Sharma', score: 7600, location: 'Chennai', badge: '🥈', streak: 18 },
  { rank: 3, name: 'Karthik R', score: 7200, location: 'Chennai', badge: '🥉', streak: 15 },
  { rank: 4, name: 'Deepa M', score: 6800, location: 'Chennai', badge: '', streak: 12 },
  { rank: 5, name: 'Ravi Kumar', score: 6500, location: 'Chennai', badge: '', streak: 10 },
];

type RankingTab = 'global' | 'local';

export default function CommunityPage() {
  const [tab, setTab] = useState<RankingTab>('global');
  const leaders = tab === 'global' ? GLOBAL_LEADERS : LOCAL_LEADERS;

  return (
    <main aria-label="Community Impact" style={{ padding: 'calc(var(--navbar-height) + var(--space-3xl)) 0 var(--space-4xl)', minHeight: '100vh' }}>
      <div className="container">
        {/* Hero */}
        <header style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ fontSize: 48, marginBottom: 'var(--space-md)' }}>🌍</div>
            <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 'var(--space-md)', background: 'linear-gradient(135deg, var(--text) 0%, var(--primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Community Impact
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 650, margin: '0 auto' }}>
              Join 2,500+ active users competing to make the biggest environmental impact. Every action counts.
            </p>
          </motion.div>
        </header>

        {/* Impact Stats */}
        <section aria-label="Community statistics" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-3xl)' }}>
          {IMPACT_STATS.map((stat, idx) => (
            <motion.div key={stat.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.08 }}>
              <GlassCard padding="var(--space-xl)" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 'var(--space-sm)' }}>{stat.icon}</div>
                <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{stat.title}</h3>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>{stat.value}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)', marginTop: 4 }}>{stat.sub}</div>
              </GlassCard>
            </motion.div>
          ))}
        </section>

        {/* Leaderboard */}
        <section aria-label="Leaderboard">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>Leaderboard</h2>
            <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', borderRadius: 12, padding: 4 }} role="tablist" aria-label="Leaderboard scope">
              {(['global', 'local'] as RankingTab[]).map(t => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: '8px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 'var(--text-sm)',
                    background: tab === t ? 'var(--primary)' : 'transparent',
                    color: tab === t ? '#fff' : 'var(--muted)',
                    transition: 'all 0.2s'
                  }}
                >
                  {t === 'global' ? '🌍 Global' : '📍 Local'}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <GlassCard padding="0" style={{ overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 120px 100px', padding: '12px 20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', fontWeight: 700, fontSize: 'var(--text-xs)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <span>Rank</span>
                  <span>User</span>
                  <span style={{ textAlign: 'center' }}>Streak</span>
                  <span style={{ textAlign: 'right' }}>Score</span>
                </div>
                {leaders.map((user, idx) => (
                  <motion.div
                    key={user.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '50px 1fr 120px 100px',
                      alignItems: 'center',
                      padding: '16px 20px',
                      borderBottom: idx < leaders.length - 1 ? '1px solid var(--border)' : 'none',
                      background: user.name === 'Sanjay S' ? 'rgba(16,185,129,0.06)' : 'transparent',
                    }}
                  >
                    <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: idx < 3 ? 'var(--primary)' : 'var(--muted)' }}>
                      {user.badge || `#${user.rank}`}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: `linear-gradient(135deg, hsl(${user.rank * 40}, 70%, 50%), hsl(${user.rank * 40 + 30}, 70%, 60%))`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{user.name}</div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>{user.location}</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--warning)', fontWeight: 600 }}>🔥 {user.streak} days</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--primary)' }}>{user.score.toLocaleString()}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>Eco Points</div>
                    </div>
                  </motion.div>
                ))}
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
