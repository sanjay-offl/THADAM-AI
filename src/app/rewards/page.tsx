import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function RewardsPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">Marketplace</div>
        <h1 className="section-title">Rewards Marketplace</h1>
        <p className="section-subtitle">Turn your sustainable actions into real-world rewards.</p>
      </div>

      <GlassCard padding="var(--space-2xl)" variant="glow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3xl)' }}>
        <div>
          <div className="stat-label">Available Points</div>
          <div className="stat-value" style={{ fontSize: 'var(--text-5xl)' }}>450 <span style={{ fontSize: 'var(--text-2xl)', color: 'var(--muted)' }}>THADAM Coins</span></div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
          <Button variant="secondary">Redeem History</Button>
          <Button variant="primary">How to Earn</Button>
        </div>
      </GlassCard>

      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-xl)' }}>Featured Rewards</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
        <GlassCard padding="var(--space-xl)">
          <div style={{ fontSize: 48, marginBottom: 'var(--space-md)' }}>🛒</div>
          <h4 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Amazon ₹100 Voucher</h4>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-lg)' }}>Coupons & Cashback</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontWeight: 600 }}>200 Coins</span>
            <Button variant="primary" size="sm">Redeem</Button>
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-xl)">
          <div style={{ fontSize: 48, marginBottom: 'var(--space-md)' }}>🌳</div>
          <h4 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Plant a Tree</h4>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-lg)' }}>Eco Action</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontWeight: 600 }}>50 Coins</span>
            <Button variant="primary" size="sm">Redeem</Button>
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-xl)">
          <div style={{ fontSize: 48, marginBottom: 'var(--space-md)' }}>💧</div>
          <h4 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Eco Water Bottle</h4>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-lg)' }}>Sustainable Products</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontWeight: 600 }}>350 Coins</span>
            <Button variant="primary" size="sm">Redeem</Button>
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-xl)">
          <div style={{ fontSize: 48, marginBottom: 'var(--space-md)' }}>🎵</div>
          <h4 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>Spotify Premium (1 Mo)</h4>
          <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-lg)' }}>Digital Subscription</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontWeight: 600 }}>300 Coins</span>
            <Button variant="primary" size="sm">Redeem</Button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
