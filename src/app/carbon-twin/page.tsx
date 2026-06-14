'use client';
import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

interface HabitSlider {
  id: string;
  label: string;
  icon: string;
  current: number;
  optimized: number;
  unit: string;
  carbonPerUnit: number; // kg CO2 per unit per year
}

const HABITS: HabitSlider[] = [
  { id: 'transport', label: 'Daily Car Commute', icon: '🚗', current: 40, optimized: 8, unit: 'km/day', carbonPerUnit: 0.21 * 365 },
  { id: 'electricity', label: 'Electricity Usage', icon: '⚡', current: 300, optimized: 150, unit: 'kWh/mo', carbonPerUnit: 0.82 * 12 },
  { id: 'meat', label: 'Meat Consumption', icon: '🥩', current: 5, optimized: 1, unit: 'meals/wk', carbonPerUnit: 7.2 * 52 },
  { id: 'flights', label: 'Annual Flights', icon: '✈️', current: 4, optimized: 1, unit: 'flights/yr', carbonPerUnit: 255 },
  { id: 'waste', label: 'Weekly Waste', icon: '🗑️', current: 12, optimized: 3, unit: 'kg/wk', carbonPerUnit: 0.58 * 52 },
  { id: 'water', label: 'Daily Water Usage', icon: '💧', current: 200, optimized: 80, unit: 'liters/day', carbonPerUnit: 0.0003 * 365 },
];

function CircularGauge({ value, max, color, size = 140, label }: { value: number; max: number; color: string; size?: number; label: string }) {
  const pct = Math.min(value / max, 1);
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);

  return (
    <div style={{ position: 'relative', width: size, height: size }} role="meter" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface)" strokeWidth={10} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={circ} strokeLinecap="round"
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <motion.span
          style={{ fontSize: size > 120 ? 'var(--text-3xl)' : 'var(--text-xl)', fontWeight: 800, fontFamily: 'var(--font-heading)', color }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        >
          {value.toFixed(1)}
        </motion.span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>tons CO₂</span>
      </div>
    </div>
  );
}

export default function CarbonTwinPage() {
  const [isFuture, setIsFuture] = useState(false);
  const [habits, setHabits] = useState(() =>
    HABITS.reduce((acc, h) => ({ ...acc, [h.id]: h.current }), {} as Record<string, number>)
  );

  const updateHabit = useCallback((id: string, val: number) => {
    setHabits(prev => ({ ...prev, [id]: val }));
  }, []);

  const currentCarbon = useMemo(() => {
    return HABITS.reduce((sum, h) => sum + habits[h.id] * h.carbonPerUnit, 0) / 1000;
  }, [habits]);

  const futureCarbon = useMemo(() => {
    return HABITS.reduce((sum, h) => sum + h.optimized * h.carbonPerUnit, 0) / 1000;
  }, []);

  const reductionPct = ((currentCarbon - futureCarbon) / currentCarbon * 100);
  const moneySaved = Math.round((currentCarbon - futureCarbon) * 8500);
  const treesEquiv = Math.round((currentCarbon - futureCarbon) * 1000 / 22);

  return (
    <main aria-label="Carbon Twin AI" style={{ padding: 'calc(var(--navbar-height) + var(--space-3xl)) 0 var(--space-4xl)', minHeight: '100vh' }}>
      <div className="container">
        {/* Hero */}
        <header style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ fontSize: 48, marginBottom: 'var(--space-md)' }}>🪞</div>
            <h1 className="font-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 'var(--space-md)', background: 'linear-gradient(135deg, var(--text) 0%, var(--primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Carbon Twin AI
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 650, margin: '0 auto', lineHeight: 1.6 }}>
              Your digital sustainability mirror. Adjust your lifestyle habits below and watch your carbon future transform in real-time.
            </p>
          </motion.div>
        </header>

        {/* Twin Comparison */}
        <section aria-label="Carbon comparison" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-3xl)', alignItems: 'start' }}>
          {/* Current You */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <GlassCard padding="var(--space-2xl)" style={{ border: !isFuture ? '2px solid var(--danger)' : '1px solid var(--border)', transition: 'all 0.5s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
                <div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--danger)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em' }}>Current Trajectory</span>
                  <h2 style={{ fontSize: 'var(--text-2xl)', margin: '4px 0 0' }}>Current You</h2>
                </div>
                <span style={{ fontSize: 48 }}>🚶</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-xl)' }}>
                <CircularGauge value={currentCarbon} max={20} color="var(--danger)" label="Current annual carbon emissions" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Annual Emissions</span>
                  <span style={{ fontWeight: 700, color: 'var(--danger)' }}>{currentCarbon.toFixed(1)} Tons CO₂</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Fuel &amp; Energy Costs</span>
                  <span style={{ fontWeight: 600 }}>₹{(currentCarbon * 8500).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Health Impact</span>
                  <span style={{ fontWeight: 600, color: currentCarbon > 8 ? 'var(--danger)' : 'var(--warning)' }}>{currentCarbon > 10 ? 'High Risk' : currentCarbon > 6 ? 'Moderate' : 'Low'}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Center CTA */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-xl)' }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              <motion.div
                animate={{ rotate: isFuture ? 360 : 0 }}
                transition={{ duration: 1 }}
                style={{ width: '100%', height: '100%', borderRadius: '50%', border: '3px dashed var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}
              >
                {isFuture ? '🌱' : '🔄'}
              </motion.div>
            </div>
            <Button
              variant="primary"
              onClick={() => setIsFuture(!isFuture)}
              aria-label={isFuture ? 'Reset to current timeline' : 'Simulate future timeline'}
              style={{ padding: '16px 40px', borderRadius: 30, fontSize: 'var(--text-md)', fontWeight: 700 }}
            >
              {isFuture ? '⏪ Reset Timeline' : '⏩ Simulate Future'}
            </Button>
            <AnimatePresence>
              {isFuture && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>-{reductionPct.toFixed(0)}%</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Carbon Reduction</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Future You */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <GlassCard padding="var(--space-2xl)" style={{ border: isFuture ? '2px solid var(--primary)' : '1px solid var(--border)', background: isFuture ? 'rgba(16,185,129,0.04)' : 'var(--card)', transition: 'all 0.5s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
                <div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em' }}>Optimized Lifestyle</span>
                  <h2 style={{ fontSize: 'var(--text-2xl)', margin: '4px 0 0', color: isFuture ? 'var(--primary)' : 'var(--text)' }}>Future You</h2>
                </div>
                <span style={{ fontSize: 48 }}>🦸</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-xl)' }}>
                <CircularGauge value={futureCarbon} max={20} color="var(--primary)" label="Future annual carbon emissions" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Annual Emissions</span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{futureCarbon.toFixed(1)} Tons CO₂</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Fuel &amp; Energy Costs</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>₹{(futureCarbon * 8500).toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Health Impact</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Excellent</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Impact Summary Cards */}
        <AnimatePresence>
          {isFuture && (
            <motion.section
              aria-label="Projected savings"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-3xl)' }}
            >
              {[
                { icon: '💰', title: 'Money Saved', value: `₹${moneySaved.toLocaleString('en-IN')}`, sub: 'Annually' },
                { icon: '🌳', title: 'Trees Equivalent', value: `${treesEquiv} Trees`, sub: 'Carbon offset' },
                { icon: '📉', title: 'Carbon Reduced', value: `-${reductionPct.toFixed(0)}%`, sub: 'vs. current trajectory' },
                { icon: '❤️', title: 'Health Score', value: 'Excellent', sub: 'Reduced air pollution exposure' },
              ].map((card, i) => (
                <motion.div key={card.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
                  <GlassCard padding="var(--space-xl)" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 36, marginBottom: 8 }}>{card.icon}</div>
                    <h3 style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.title}</h3>
                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>{card.value}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)', marginTop: 4 }}>{card.sub}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Habit Sliders */}
        <section aria-label="Adjust your habits">
          <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>Adjust Your Habits</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-xl)', fontSize: 'var(--text-sm)' }}>
            Move the sliders to see how changes in your daily habits affect your carbon footprint in real-time.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-lg)' }}>
            {HABITS.map((habit) => {
              const val = habits[habit.id];
              const impactKg = (val * habit.carbonPerUnit / 1000);
              return (
                <GlassCard key={habit.id} padding="var(--space-lg)">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                    <span style={{ fontSize: 28 }}>{habit.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 'var(--text-md)' }}>{habit.label}</div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>{val} {habit.unit} → {impactKg.toFixed(1)} tons CO₂/yr</div>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={habit.current * 2}
                    value={val}
                    onChange={(e) => updateHabit(habit.id, Number(e.target.value))}
                    aria-label={`Adjust ${habit.label}`}
                    style={{ width: '100%', accentColor: 'var(--primary)' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>
                    <span>0</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Optimized: {habit.optimized} {habit.unit}</span>
                    <span>{habit.current * 2}</span>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
