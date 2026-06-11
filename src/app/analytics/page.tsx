import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function AnalyticsPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">Data Insights</div>
        <h1 className="section-title">Impact Analytics</h1>
        <p className="section-subtitle">Deep dive into your environmental data with comprehensive charts and trends.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-3xl)' }}>
        <GlassCard padding="var(--space-xl)">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Carbon Saved Over Time</h3>
          <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ color: 'var(--muted)' }}>[Area Chart Placeholder]</span>
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-xl)">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Waste Recycled by Category</h3>
          <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ color: 'var(--muted)' }}>[Pie Chart Placeholder]</span>
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-xl)">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Reward Points Earned</h3>
          <div style={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ color: 'var(--muted)' }}>[Bar Chart Placeholder]</span>
          </div>
        </GlassCard>
      </div>

      <GlassCard padding="var(--space-2xl)" variant="glow">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)' }}>Year-over-Year Comparison</h3>
          <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
            <Button variant="secondary" size="sm">2023</Button>
            <Button variant="primary" size="sm">2024</Button>
          </div>
        </div>
        <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
          <span style={{ color: 'var(--muted)' }}>[Multi-Line Chart Placeholder]</span>
        </div>
      </GlassCard>
    </div>
  );
}
