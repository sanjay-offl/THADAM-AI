import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function CommunityPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">Global Impact</div>
        <h1 className="section-title">Community</h1>
        <p className="section-subtitle">See what the THADAM AI network is achieving together.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-3xl)' }}>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">12,847</div>
        </GlassCard>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Total Machines</div>
          <div className="stat-value">156</div>
        </GlassCard>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Waste Recycled</div>
          <div className="stat-value">45.2T</div>
        </GlassCard>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Carbon Reduced</div>
          <div className="stat-value" style={{ color: 'var(--primary)' }}>89.4T</div>
        </GlassCard>
      </div>

      <GlassCard padding="var(--space-2xl)">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-xl)' }}>Live Community Feed</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div style={{ padding: 'var(--space-md)', background: 'var(--card)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div className="avatar">P</div>
            <div>
              <p><strong>Priya</strong> recycled 12 plastic bottles at <span style={{ color: 'var(--primary)' }}>Phoenix Mall Machine</span>.</p>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>2 minutes ago</span>
            </div>
          </div>
          <div style={{ padding: 'var(--space-md)', background: 'var(--card)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div className="avatar">A</div>
            <div>
              <p><strong>Arjun</strong> just unlocked the <span className="badge">Planet Saver</span> badge!</p>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>15 minutes ago</span>
            </div>
          </div>
          <div style={{ padding: 'var(--space-md)', background: 'var(--card)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <div className="avatar">S</div>
            <div>
              <p><strong>Sarah</strong> completed the <span style={{ color: 'var(--accent)' }}>Carbon Slasher</span> weekly challenge.</p>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>1 hour ago</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
          <Button variant="secondary">Load More Activity</Button>
        </div>
      </GlassCard>
    </div>
  );
}
