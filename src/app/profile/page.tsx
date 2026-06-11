import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">User Account</div>
        <h1 className="section-title">Your Profile</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-2xl)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          <GlassCard padding="var(--space-xl)" style={{ textAlign: 'center' }}>
            <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', margin: '0 auto var(--space-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
              👤
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-xs)' }}>Sanjay Kumar</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-md)' }}>demo@thadam.ai</p>
            <div className="badge" style={{ marginBottom: 'var(--space-xl)' }}>🏆 Climate Champion</div>
            <Button variant="secondary" style={{ width: '100%' }}>Edit Profile</Button>
          </GlassCard>

          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-md)' }}>Carbon History</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--muted)' }}>Total Saved</span>
              <span style={{ fontWeight: 600 }}>124 kg CO₂</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--muted)' }}>Items Recycled</span>
              <span style={{ fontWeight: 600 }}>89</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0' }}>
              <span style={{ color: 'var(--muted)' }}>Current Streak</span>
              <span style={{ fontWeight: 600 }}>14 Days</span>
            </div>
          </GlassCard>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Achievements</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 'var(--space-md)' }}>
              <div style={{ textAlign: 'center', padding: 'var(--space-md)', background: 'var(--card)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 32, marginBottom: 'var(--space-xs)' }}>📷</div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>First Scan</div>
              </div>
              <div style={{ textAlign: 'center', padding: 'var(--space-md)', background: 'var(--card)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 32, marginBottom: 'var(--space-xs)' }}>🔥</div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>Week Warrior</div>
              </div>
              <div style={{ textAlign: 'center', padding: 'var(--space-md)', background: 'var(--card)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 32, marginBottom: 'var(--space-xs)' }}>✂️</div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>Carbon Cutter</div>
              </div>
              <div style={{ textAlign: 'center', padding: 'var(--space-md)', background: 'var(--card)', borderRadius: 'var(--radius-md)', opacity: 0.3 }}>
                <div style={{ fontSize: 32, marginBottom: 'var(--space-xs)' }}>🤖</div>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>Machine Master</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Reward History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-md)', background: 'var(--card)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Recycled 5 Plastic Bottles</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>Today, 10:30 AM</div>
                </div>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>+50 Coins</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-md)', background: 'var(--card)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Redeemed Amazon Voucher</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--muted)' }}>Yesterday, 2:15 PM</div>
                </div>
                <span style={{ color: 'var(--danger)', fontWeight: 600 }}>-200 Coins</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
