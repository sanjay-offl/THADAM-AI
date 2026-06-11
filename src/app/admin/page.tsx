import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function AdminPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag" style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.1)' }}>Admin Access</div>
        <h1 className="section-title">System Dashboard</h1>
        <p className="section-subtitle">Global oversight of THADAM AI infrastructure and user metrics.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-3xl)' }}>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Total Users</div>
          <div className="stat-value">12,847</div>
          <div style={{ color: 'var(--primary)', fontSize: 'var(--text-sm)' }}>+142 this week</div>
        </GlassCard>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Total Machines</div>
          <div className="stat-value">156</div>
          <div style={{ color: 'var(--warning)', fontSize: 'var(--text-sm)' }}>3 in maintenance</div>
        </GlassCard>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Carbon Saved</div>
          <div className="stat-value">89.4T</div>
          <div style={{ color: 'var(--primary)', fontSize: 'var(--text-sm)' }}>Target: 100T by EOY</div>
        </GlassCard>
        <GlassCard padding="var(--space-xl)">
          <div className="stat-label">Rewards Distributed</div>
          <div className="stat-value">₹1.2M</div>
          <div style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Across 45k transactions</div>
        </GlassCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)', marginBottom: 'var(--space-3xl)' }}>
        <GlassCard padding="var(--space-xl)">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)' }}>Machine Telemetry</h3>
            <span className="badge" style={{ animation: 'pulse 2s infinite' }}>Live</span>
          </div>
          <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ color: 'var(--muted)' }}>[Real-time MQTT Stream Placeholder]</span>
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-xl)">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>AI Usage Metrics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--muted)' }}>Gemini Vision API Calls</span>
              <span style={{ fontWeight: 600 }}>452,890 / mo</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--muted)' }}>Gemini Chat Prompts</span>
              <span style={{ fontWeight: 600 }}>128,400 / mo</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--muted)' }}>Carbon Twin Simulations</span>
              <span style={{ fontWeight: 600 }}>34,200 / mo</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0' }}>
              <span style={{ color: 'var(--muted)' }}>Average Response Time</span>
              <span style={{ fontWeight: 600, color: 'var(--primary)' }}>450ms</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
