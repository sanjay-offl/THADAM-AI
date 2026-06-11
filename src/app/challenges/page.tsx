import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function ChallengesPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">Gamification</div>
        <h1 className="section-title">Challenges & Missions</h1>
        <p className="section-subtitle">Complete environmental missions to earn badges and extra reward coins.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)', marginBottom: 'var(--space-3xl)' }}>
        <GlassCard padding="var(--space-2xl)" variant="glow">
          <div className="badge badge-accent" style={{ marginBottom: 'var(--space-md)' }}>Weekly Challenge</div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}>Carbon Slasher</h3>
          <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-lg)' }}>Reduce your carbon footprint by 5kg this week.</p>
          
          <div className="progress-bar" style={{ marginBottom: 'var(--space-sm)', height: 12 }}>
            <div className="progress-fill" style={{ width: '60%' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-xl)' }}>
            <span>3kg / 5kg</span>
            <span>2 days left</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>🎁 50 Coins Reward</span>
            <Button variant="primary">View Details</Button>
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-2xl)">
          <div className="badge" style={{ marginBottom: 'var(--space-md)' }}>Monthly Challenge</div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-sm)' }}>Green Month</h3>
          <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-lg)' }}>Maintain a 30-day recycling streak.</p>
          
          <div className="progress-bar" style={{ marginBottom: 'var(--space-sm)', height: 12 }}>
            <div className="progress-fill" style={{ width: '45%' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-xl)' }}>
            <span>14 days / 30 days</span>
            <span>16 days left</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>🎁 200 Coins Reward</span>
            <Button variant="secondary">View Details</Button>
          </div>
        </GlassCard>
      </div>

      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-xl)' }}>Daily Missions</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
        <GlassCard padding="var(--space-lg)" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Recycle 3 Items</h4>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Reward: 15 Coins</p>
          </div>
          <Button variant="primary" size="sm">Start</Button>
        </GlassCard>
        
        <GlassCard padding="var(--space-lg)" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0.7 }}>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Read AI Tip</h4>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Reward: 5 Coins</p>
          </div>
          <Button variant="secondary" size="sm" style={{ cursor: 'default' }}>Completed</Button>
        </GlassCard>

        <GlassCard padding="var(--space-lg)" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Scan Waste</h4>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Reward: 10 Coins</p>
          </div>
          <Button variant="primary" size="sm">Start</Button>
        </GlassCard>
      </div>
    </div>
  );
}
