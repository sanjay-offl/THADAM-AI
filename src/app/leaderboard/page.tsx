import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function LeaderboardPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">Top Performers</div>
        <h1 className="section-title">Leaderboard</h1>
        <p className="section-subtitle">See how you rank against other eco-warriors in the community.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-3xl)' }}>
        <Button variant="primary">Global</Button>
        <Button variant="secondary">Local (Chennai)</Button>
        <Button variant="secondary">Friends</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 'var(--space-2xl)' }}>
        <GlassCard padding="var(--space-xl)" variant="glow" style={{ height: 'fit-content' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)', textAlign: 'center' }}>Your Rank</h3>
          <div style={{ fontSize: 64, textAlign: 'center', fontFamily: 'var(--font-heading)', color: 'var(--primary)', marginBottom: 'var(--space-md)' }}>#42</div>
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: 'var(--space-xl)' }}>Top 15% globally</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0', borderTop: '1px solid var(--border)' }}>
            <span style={{ color: 'var(--muted)' }}>Score</span>
            <span style={{ fontWeight: 600 }}>82,450</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0' }}>
            <span style={{ color: 'var(--muted)' }}>Eco Rank</span>
            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Climate Champion</span>
          </div>
        </GlassCard>

        <GlassCard padding="0" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', textAlign: 'left' }}>
                <th style={{ padding: 'var(--space-md) var(--space-xl)', color: 'var(--muted)', fontWeight: 500 }}>Rank</th>
                <th style={{ padding: 'var(--space-md) var(--space-xl)', color: 'var(--muted)', fontWeight: 500 }}>User</th>
                <th style={{ padding: 'var(--space-md) var(--space-xl)', color: 'var(--muted)', fontWeight: 500 }}>Eco Rank</th>
                <th style={{ padding: 'var(--space-md) var(--space-xl)', color: 'var(--muted)', fontWeight: 500, textAlign: 'right' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 'var(--space-md) var(--space-xl)', fontSize: 'var(--text-xl)' }}>🥇 1</td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <div className="avatar">E</div>
                    <strong>Elena R.</strong>
                  </div>
                </td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)' }}><span className="badge">Planet Protector</span></td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)', textAlign: 'right', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>124,500</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 'var(--space-md) var(--space-xl)', fontSize: 'var(--text-xl)' }}>🥈 2</td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <div className="avatar">M</div>
                    <strong>Michael T.</strong>
                  </div>
                </td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)' }}><span className="badge">Planet Protector</span></td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)', textAlign: 'right', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>118,200</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 'var(--space-md) var(--space-xl)', fontSize: 'var(--text-xl)' }}>🥉 3</td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <div className="avatar">S</div>
                    <strong>Sarah J.</strong>
                  </div>
                </td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)' }}><span className="badge">Earth Guardian</span></td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)', textAlign: 'right', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>95,400</td>
              </tr>
              <tr style={{ background: 'rgba(34, 197, 94, 0.1)', borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: 'var(--space-md) var(--space-xl)' }}>42</td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <div className="avatar">SK</div>
                    <strong>Sanjay Kumar (You)</strong>
                  </div>
                </td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)' }}><span className="badge badge-accent">Climate Champion</span></td>
                <td style={{ padding: 'var(--space-md) var(--space-xl)', textAlign: 'right', fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>82,450</td>
              </tr>
            </tbody>
          </table>
        </GlassCard>
      </div>
    </div>
  );
}
