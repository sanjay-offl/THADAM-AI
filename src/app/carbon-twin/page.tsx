import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function CarbonTwinPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">AI Predictive Modeling</div>
        <h1 className="section-title">Carbon Twin AI</h1>
        <p className="section-subtitle">Simulate your future environmental impact using our Gemini-powered predictive models.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)', marginBottom: 'var(--space-3xl)' }}>
        <GlassCard padding="var(--space-2xl)" style={{ border: '2px solid rgba(239, 68, 68, 0.2)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', color: 'var(--danger)', marginBottom: 'var(--space-md)', textAlign: 'center' }}>Current You</h3>
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: 'var(--space-xl)' }}>If you continue your current habits</p>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--danger)' }}>3.2 Tons</div>
            <div className="stat-label">Projected Annual CO₂</div>
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-2xl)" variant="glow" style={{ border: '2px solid rgba(34, 197, 94, 0.5)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', color: 'var(--primary)', marginBottom: 'var(--space-md)', textAlign: 'center' }}>Future You</h3>
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: 'var(--space-xl)' }}>If you follow our AI recommendations</p>
          <div className="stat-card">
            <div className="stat-value" style={{ color: 'var(--primary)' }}>1.8 Tons</div>
            <div className="stat-label">Projected Annual CO₂</div>
          </div>
        </GlassCard>
      </div>

      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-xl)' }}>Impact of Changing Habits</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-3xl)' }}>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">CO₂ Reduction</div>
          <div className="stat-value" style={{ fontSize: 'var(--text-3xl)' }}>43.7%</div>
        </GlassCard>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Money Saved</div>
          <div className="stat-value" style={{ fontSize: 'var(--text-3xl)' }}>₹8,500/yr</div>
        </GlassCard>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Trees Equivalent</div>
          <div className="stat-value" style={{ fontSize: 'var(--text-3xl)' }}>12 Trees/yr</div>
        </GlassCard>
      </div>

      <GlassCard padding="var(--space-2xl)">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)' }}>Simulation Chart</h3>
          <Button variant="primary">Generate New Model</Button>
        </div>
        <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
          <span style={{ color: 'var(--muted)' }}>[Comparison Chart Placeholder]</span>
        </div>
      </GlassCard>
    </div>
  );
}
