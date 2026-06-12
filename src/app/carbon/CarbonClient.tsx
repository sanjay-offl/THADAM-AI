'use client';

import { useState } from 'react';
import { AuthUser } from '@/lib/auth-helpers';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Target, TrendingDown, TrendingUp, Edit2, Plus, Zap, Car, Utensils, Trash2, ShoppingBag } from 'lucide-react';

interface CarbonClientProps {
  user: AuthUser;
}

// Mock Data
const overviewData = [
  { time: 'Mon', usage: 12, target: 15 },
  { time: 'Tue', usage: 19, target: 15 },
  { time: 'Wed', usage: 15, target: 15 },
  { time: 'Thu', usage: 10, target: 15 },
  { time: 'Fri', usage: 22, target: 15 },
  { time: 'Sat', usage: 8, target: 15 },
  { time: 'Sun', usage: 14, target: 15 },
];

const monthlyData = [
  { month: 'Jan', electricity: 400, transport: 240, food: 200 },
  { month: 'Feb', electricity: 300, transport: 139, food: 221 },
  { month: 'Mar', electricity: 200, transport: 980, food: 229 },
  { month: 'Apr', electricity: 278, transport: 390, food: 200 },
  { month: 'May', electricity: 189, transport: 480, food: 218 },
  { month: 'Jun', electricity: 239, transport: 380, food: 250 },
];

const sourceData = [
  { name: 'Transportation', value: 40, color: '#10B981', icon: Car },
  { name: 'Electricity', value: 30, color: '#34D399', icon: Zap },
  { name: 'Food', value: 15, color: '#059669', icon: Utensils },
  { name: 'Shopping', value: 10, color: '#065F46', icon: ShoppingBag },
  { name: 'Waste', value: 5, color: '#A7F3D0', icon: Trash2 },
];

export default function CarbonClient({ user }: CarbonClientProps) {
  const [timeframe, setTimeframe] = useState<'daily'|'weekly'|'monthly'|'yearly'>('weekly');
  const [goals, setGoals] = useState([
    { id: 1, title: 'Reduce Plastic Usage', target: 50, current: 20, unit: 'items/month' },
    { id: 2, title: 'Cycle to Work', target: 20, current: 15, unit: 'days/month' },
    { id: 3, title: 'Energy Efficiency', target: 300, current: 250, unit: 'kWh/month' },
  ]);

  return (
    <div className="container" style={{ padding: 'var(--space-xl) 0' }}>
      <div className="section-header" style={{ marginBottom: 'var(--space-2xl)' }}>
        <h1 className="section-title">Carbon Tracker</h1>
        <p style={{ color: 'var(--muted)' }}>Monitor your footprint, analyze sources, and achieve your sustainability goals.</p>
      </div>

      {/* Overview Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
        <GlassCard padding="var(--space-lg)">
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginBottom: 'var(--space-xs)' }}>Total Footprint (YTD)</div>
          <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
            1,245 <span style={{ fontSize: 'var(--text-lg)', color: 'var(--muted)' }}>kg CO₂</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--primary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-xs)' }}>
            <TrendingDown size={16} /> -12% vs last year
          </div>
        </GlassCard>
        
        <GlassCard padding="var(--space-lg)">
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginBottom: 'var(--space-xs)' }}>Monthly Average</div>
          <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'bold', color: 'var(--text)', fontFamily: 'var(--font-heading)' }}>
            184 <span style={{ fontSize: 'var(--text-lg)', color: 'var(--muted)' }}>kg CO₂</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warning)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-xs)' }}>
            <TrendingUp size={16} /> +5% vs last month
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-lg)">
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)', marginBottom: 'var(--space-xs)' }}>Goal Completion</div>
          <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 'bold', color: 'var(--secondary)', fontFamily: 'var(--font-heading)' }}>
            68<span style={{ fontSize: 'var(--text-lg)', color: 'var(--muted)' }}>%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--surface)', borderRadius: '3px', marginTop: 'var(--space-sm)' }}>
            <div style={{ width: '68%', height: '100%', background: 'var(--secondary)', borderRadius: '3px' }}></div>
          </div>
        </GlassCard>
      </div>

      <div className="carbon-grid">
        {/* Main Charts Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {/* Emission Trend (Area Chart) */}
          <GlassCard padding="var(--space-xl)">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)' }}>Emission Trend</h3>
              <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                {['daily', 'weekly', 'monthly', 'yearly'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setTimeframe(t as any)}
                    style={{ 
                      padding: '4px 12px', 
                      borderRadius: 'var(--radius-full)', 
                      fontSize: 'var(--text-xs)', 
                      background: timeframe === t ? 'var(--primary)' : 'var(--surface)',
                      color: timeframe === t ? '#fff' : 'var(--text)',
                      textTransform: 'capitalize'
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={overviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="time" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="usage" stroke="var(--primary)" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={3} />
                  <Line type="step" dataKey="target" stroke="var(--warning)" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Sources Breakdown (Bar Chart) */}
          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Historical Breakdown</h3>
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }} cursor={{ fill: 'var(--surface)' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="transport" stackId="a" fill="#10B981" />
                  <Bar dataKey="electricity" stackId="a" fill="#34D399" />
                  <Bar dataKey="food" stackId="a" fill="#065F46" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {/* Pie Chart Sources */}
          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Emission Sources</h3>
            <div style={{ width: '100%', height: '220px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>100%</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>Tracked</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'var(--space-md)' }}>
              {sourceData.map(source => (
                <div key={source.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${source.color}20`, color: source.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <source.icon size={16} />
                    </div>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500 }}>{source.name}</span>
                  </div>
                  <span style={{ fontWeight: 'bold' }}>{source.value}%</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Carbon Goals */}
          <GlassCard padding="var(--space-xl)">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)' }}>Active Goals</h3>
              <Button variant="ghost" size="sm" style={{ padding: '4px 8px' }}><Plus size={16} /></Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              {goals.map(goal => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={goal.id} style={{ padding: 'var(--space-md)', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{goal.title}</span>
                      <Button variant="ghost" size="sm" style={{ padding: 0, height: 'auto', color: 'var(--muted)' }}><Edit2 size={14} /></Button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--muted)', marginBottom: '8px' }}>
                      <span>{goal.current} / {goal.target} {goal.unit}</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.2)', borderRadius: '3px' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>
      <style>{`
        .carbon-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: var(--space-xl);
        }
        @media (max-width: 1024px) {
          .carbon-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
