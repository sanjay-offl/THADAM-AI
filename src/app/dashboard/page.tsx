import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">Dashboard</div>
        <h1 className="section-title">Your Impact</h1>
        <p className="section-subtitle">Track your carbon footprint and environmental progress.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-3xl)' }}>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Carbon Score</div>
          <div className="stat-value">82/100</div>
          <div style={{ color: 'var(--primary)', fontSize: 'var(--text-sm)' }}>+5 pts this week</div>
        </GlassCard>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Carbon Saved</div>
          <div className="stat-value">124kg</div>
          <div style={{ color: 'var(--primary)', fontSize: 'var(--text-sm)' }}>Equivalent to 6 trees</div>
        </GlassCard>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Eco Rank</div>
          <div className="stat-value" style={{ fontSize: 'var(--text-2xl)' }}>Climate Champion</div>
          <div style={{ color: 'var(--accent)', fontSize: 'var(--text-sm)' }}>Top 15% of users</div>
        </GlassCard>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Reward Wallet</div>
          <div className="stat-value">₹450</div>
          <div style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Available to redeem</div>
        </GlassCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-2xl)' }}>
        <GlassCard padding="var(--space-2xl)">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)' }}>Weekly Progress</h3>
          <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ color: 'var(--muted)' }}>[Progress Chart Placeholder]</span>
          </div>
        </GlassCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Nearby Machines</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <li style={{ padding: 'var(--space-md)', background: 'var(--card)', borderRadius: 'var(--radius-md)' }}>
                <strong>Chennai Central Station</strong>
                <div style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>2.4 km away • Online</div>
              </li>
              <li style={{ padding: 'var(--space-md)', background: 'var(--card)', borderRadius: 'var(--radius-md)' }}>
                <strong>Phoenix Mall</strong>
                <div style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>5.1 km away • Online</div>
              </li>
            </ul>
            <Button variant="ghost" style={{ marginTop: 'var(--space-md)', width: '100%' }}>View All Map</Button>
          </GlassCard>

          <GlassCard padding="var(--space-xl)" variant="glow">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>AI Recommendations</h3>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
              Switching to public transport for your daily commute can reduce your carbon footprint by 45% this week.
            </p>
            <Button variant="primary" style={{ marginTop: 'var(--space-md)', width: '100%' }}>Talk to AI Coach</Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
