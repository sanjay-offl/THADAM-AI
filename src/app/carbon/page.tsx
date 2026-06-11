import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function CarbonPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">Carbon Tracker</div>
        <h1 className="section-title">Measure Your Impact</h1>
        <p className="section-subtitle">Detailed breakdown of your carbon emissions across all activities.</p>
      </div>

      <GlassCard padding="var(--space-3xl)" style={{ marginBottom: 'var(--space-3xl)' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-xl)', textAlign: 'center' }}>Carbon Calculator</h2>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
          <Button variant="primary" size="lg">Add Manual Entry</Button>
          <Button variant="secondary" size="lg">Connect APIs</Button>
        </div>
      </GlassCard>

      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-xl)' }}>Emissions by Category</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-3xl)' }}>
        <GlassCard padding="var(--space-xl)">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
            <span style={{ fontSize: 32 }}>🚗</span>
            <h4 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>Transportation</h4>
          </div>
          <div className="progress-bar" style={{ marginBottom: 'var(--space-sm)' }}>
            <div className="progress-fill" style={{ width: '45%' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
            <span>45% of total</span>
            <span>12.4 kg CO₂</span>
          </div>
        </GlassCard>
        
        <GlassCard padding="var(--space-xl)">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
            <span style={{ fontSize: 32 }}>⚡</span>
            <h4 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>Electricity Usage</h4>
          </div>
          <div className="progress-bar" style={{ marginBottom: 'var(--space-sm)' }}>
            <div className="progress-fill" style={{ width: '30%', background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
            <span>30% of total</span>
            <span>8.2 kg CO₂</span>
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-xl)">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
            <span style={{ fontSize: 32 }}>🍔</span>
            <h4 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>Food Habits</h4>
          </div>
          <div className="progress-bar" style={{ marginBottom: 'var(--space-sm)' }}>
            <div className="progress-fill" style={{ width: '15%', background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
            <span>15% of total</span>
            <span>4.1 kg CO₂</span>
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-xl)">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
            <span style={{ fontSize: 32 }}>🛍️</span>
            <h4 style={{ fontSize: 'var(--text-xl)', fontWeight: 600 }}>Shopping Habits</h4>
          </div>
          <div className="progress-bar" style={{ marginBottom: 'var(--space-sm)' }}>
            <div className="progress-fill" style={{ width: '10%', background: 'linear-gradient(90deg, #8B5CF6 0%, #6D28D9 100%)' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>
            <span>10% of total</span>
            <span>2.8 kg CO₂</span>
          </div>
        </GlassCard>
      </div>

      <GlassCard padding="var(--space-2xl)">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)' }}>Carbon Trends</h3>
        <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
          <span style={{ color: 'var(--muted)' }}>[Line Chart Placeholder]</span>
        </div>
      </GlassCard>
    </div>
  );
}
