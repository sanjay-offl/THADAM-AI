'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

const DAILY_QUESTS = [
  { title: 'Use Public Transport', icon: '🚌', points: 50, difficulty: 'Easy', carbon: '2.3 kg CO₂', category: 'Transport' },
  { title: 'Recycle 3 Items', icon: '♻️', points: 30, difficulty: 'Easy', carbon: '0.8 kg CO₂', category: 'Waste' },
  { title: 'Skip Red Meat Today', icon: '🥗', points: 40, difficulty: 'Easy', carbon: '3.6 kg CO₂', category: 'Food' },
  { title: 'Air-Dry Laundry', icon: '👕', points: 20, difficulty: 'Easy', carbon: '1.2 kg CO₂', category: 'Energy' },
];

const WEEKLY_QUESTS = [
  { title: 'Reduce Plastic Usage', icon: '🚫', points: 150, difficulty: 'Medium', carbon: '4.5 kg CO₂', category: 'Waste' },
  { title: 'Walk 30km This Week', icon: '🚶', points: 200, difficulty: 'Medium', carbon: '8.2 kg CO₂', category: 'Transport' },
  { title: 'Cook 5 Plant-Based Meals', icon: '🌿', points: 180, difficulty: 'Medium', carbon: '12 kg CO₂', category: 'Food' },
  { title: 'Track Energy Usage Daily', icon: '📊', points: 100, difficulty: 'Easy', carbon: '3.0 kg CO₂', category: 'Energy' },
];

const MONTHLY_QUESTS = [
  { title: 'Zero Waste Week', icon: '🏆', points: 500, difficulty: 'Hard', carbon: '25 kg CO₂', category: 'Waste' },
  { title: 'Car-Free Month', icon: '🚴', points: 1000, difficulty: 'Hard', carbon: '120 kg CO₂', category: 'Transport' },
  { title: 'Grow Your Own Herbs', icon: '🌱', points: 300, difficulty: 'Medium', carbon: '5 kg CO₂', category: 'Food' },
  { title: 'Switch to Green Energy', icon: '⚡', points: 800, difficulty: 'Hard', carbon: '200 kg CO₂', category: 'Energy' },
];

const STREAKS = [
  { title: 'Recycling Streak', days: 7, icon: '♻️', target: 7, color: '#10b981' },
  { title: 'Carbon Tracking', days: 12, icon: '👣', target: 14, color: '#3b82f6' },
  { title: 'Green Commuter', days: 5, icon: '🚲', target: 30, color: '#f59e0b' },
  { title: 'Plant-Based Meals', days: 3, icon: '🥦', target: 7, color: '#8b5cf6' },
  { title: 'Zero Waste Days', days: 2, icon: '🗑️', target: 10, color: '#ef4444' },
];

const ECO_SCORE_FACTORS = [
  { label: 'Transport', score: 85, icon: '🚗', weight: 25 },
  { label: 'Energy', score: 72, icon: '⚡', weight: 20 },
  { label: 'Food', score: 90, icon: '🍽️', weight: 15 },
  { label: 'Waste', score: 68, icon: '🗑️', weight: 15 },
  { label: 'Shopping', score: 55, icon: '🛒', weight: 10 },
  { label: 'Recycling', score: 92, icon: '♻️', weight: 10 },
  { label: 'Water', score: 78, icon: '💧', weight: 5 },
];

type QuestTab = 'daily' | 'weekly' | 'monthly';

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<QuestTab>('daily');
  const [completedQuests, setCompletedQuests] = useState<Set<string>>(new Set());

  const quests = useMemo(() => {
    switch (activeTab) {
      case 'daily': return DAILY_QUESTS;
      case 'weekly': return WEEKLY_QUESTS;
      case 'monthly': return MONTHLY_QUESTS;
    }
  }, [activeTab]);

  const overallEcoScore = useMemo(() => {
    return Math.round(ECO_SCORE_FACTORS.reduce((sum, f) => sum + f.score * f.weight, 0) / 100);
  }, []);

  const toggleQuest = (title: string) => {
    setCompletedQuests(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title); else next.add(title);
      return next;
    });
  };

  return (
    <main aria-label="Climate Quests and Challenges" style={{ padding: 'calc(var(--navbar-height) + var(--space-3xl)) 0 var(--space-4xl)', minHeight: '100vh' }}>
      <div className="container">
        {/* Hero */}
        <header style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ fontSize: 48, marginBottom: 'var(--space-md)' }}>🏋️</div>
            <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 'var(--space-md)', background: 'linear-gradient(135deg, var(--text) 0%, var(--primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Climate Quests
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 650, margin: '0 auto' }}>
              Complete daily missions, maintain your streaks, and earn rewards while reducing your environmental impact.
            </p>
          </motion.div>
        </header>

        {/* Daily Eco Score */}
        <section aria-label="Daily Eco Score" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)' }}>Daily Eco Score</h2>
          <GlassCard padding="var(--space-2xl)">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2xl)', flexWrap: 'wrap' }}>
              {/* Big Score */}
              <div style={{ textAlign: 'center', minWidth: 160 }}>
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                  style={{ width: 140, height: 140, borderRadius: '50%', background: `conic-gradient(var(--primary) ${overallEcoScore * 3.6}deg, var(--surface) 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}
                >
                  <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'var(--card)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{overallEcoScore}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>/100</span>
                  </div>
                </motion.div>
                <div style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--primary)' }}>Great Progress!</div>
              </div>

              {/* Factor Breakdown */}
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {ECO_SCORE_FACTORS.map((factor) => (
                    <div key={factor.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                      <span style={{ fontSize: 18, width: 28 }}>{factor.icon}</span>
                      <span style={{ fontSize: 'var(--text-sm)', width: 80, color: 'var(--text)' }}>{factor.label}</span>
                      <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${factor.score}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: factor.score > 80 ? 'var(--primary)' : factor.score > 60 ? 'var(--warning)' : 'var(--danger)', borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: factor.score > 80 ? 'var(--primary)' : factor.score > 60 ? 'var(--warning)' : 'var(--danger)', width: 32, textAlign: 'right' }}>{factor.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Streaks */}
        <section aria-label="Sustainability Streaks" style={{ marginBottom: 'var(--space-3xl)' }}>
          <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)' }}>Sustainability Streaks 🔥</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-lg)' }}>
            {STREAKS.map((streak, idx) => (
              <motion.div key={streak.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }}>
                <GlassCard padding="var(--space-lg)" style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 60, height: 60, background: `linear-gradient(135deg, ${streak.color}20, transparent)`, borderBottomLeftRadius: 40 }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                    <span style={{ fontSize: 28 }}>{streak.icon}</span>
                    <div>
                      <h3 style={{ fontSize: 'var(--text-md)', margin: 0, fontWeight: 600 }}>{streak.title}</h3>
                      <span style={{ fontSize: 'var(--text-xs)', color: streak.color, fontWeight: 700 }}>{streak.days} Day Streak 🔥</span>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: 6, background: 'var(--surface)', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((streak.days / streak.target) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                      style={{ height: '100%', background: streak.color, borderRadius: 3 }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>
                    <span>{streak.days}/{streak.target} days</span>
                    <span>{streak.days >= streak.target ? '✅ Complete!' : `${streak.target - streak.days} days left`}</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quest Tabs */}
        <section aria-label="Climate Missions">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>Active Missions</h2>
            <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', borderRadius: 12, padding: 4 }} role="tablist" aria-label="Mission period">
              {(['daily', 'weekly', 'monthly'] as QuestTab[]).map(tab => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '8px 20px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 'var(--text-sm)',
                    background: activeTab === tab ? 'var(--primary)' : 'transparent',
                    color: activeTab === tab ? '#fff' : 'var(--muted)',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}
            >
              {quests.map((quest, idx) => {
                const done = completedQuests.has(quest.title);
                return (
                  <motion.div key={quest.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.08 }}>
                    <GlassCard padding="var(--space-xl)" style={{ display: 'flex', flexDirection: 'column', height: '100%', opacity: done ? 0.6 : 1, transition: 'opacity 0.3s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-md)' }}>
                        <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                          <span style={{ fontSize: 'var(--text-xs)', background: 'rgba(16,185,129,0.1)', color: 'var(--primary)', padding: '3px 8px', borderRadius: 8, fontWeight: 600 }}>{quest.category}</span>
                          <span style={{ fontSize: 'var(--text-xs)', background: quest.difficulty === 'Hard' ? 'rgba(239,68,68,0.1)' : quest.difficulty === 'Medium' ? 'rgba(245,158,11,0.1)' : 'rgba(59,130,246,0.1)', color: quest.difficulty === 'Hard' ? 'var(--danger)' : quest.difficulty === 'Medium' ? 'var(--warning)' : 'var(--info)', padding: '3px 8px', borderRadius: 8, fontWeight: 600 }}>{quest.difficulty}</span>
                        </div>
                        <span style={{ color: 'var(--warning)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>+{quest.points} pts</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)', flex: 1 }}>
                        <span style={{ fontSize: 32 }}>{quest.icon}</span>
                        <div>
                          <h3 style={{ fontSize: 'var(--text-lg)', margin: 0, textDecoration: done ? 'line-through' : 'none' }}>{quest.title}</h3>
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)' }}>Saves {quest.carbon}</span>
                        </div>
                      </div>

                      <Button
                        variant={done ? 'ghost' : 'outline'}
                        onClick={() => toggleQuest(quest.title)}
                        aria-label={done ? `Undo ${quest.title}` : `Complete ${quest.title}`}
                        style={{ width: '100%' }}
                      >
                        {done ? '✅ Completed!' : 'Mark Complete'}
                      </Button>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
