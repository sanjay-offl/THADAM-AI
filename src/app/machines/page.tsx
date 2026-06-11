import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function MachinesPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">IoT Infrastructure</div>
        <h1 className="section-title">Smart Machines</h1>
        <p className="section-subtitle">Locate THADAM AI recycling machines to drop off your waste and earn instant rewards.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-2xl)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <GlassCard padding="var(--space-lg)" style={{ borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
              <h4 style={{ fontWeight: 600 }}>Chennai Central Station</h4>
              <span className="badge">Online</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-md)' }}>2.4 km away</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Capacity: <span style={{ color: 'var(--text)' }}>45%</span></span>
              <Button variant="secondary" size="sm">Directions</Button>
            </div>
          </GlassCard>

          <GlassCard padding="var(--space-lg)" style={{ borderLeft: '4px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
              <h4 style={{ fontWeight: 600 }}>IIT Madras Campus</h4>
              <span className="badge">Online</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-md)' }}>3.8 km away</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Capacity: <span style={{ color: 'var(--text)' }}>82%</span></span>
              <Button variant="secondary" size="sm">Directions</Button>
            </div>
          </GlassCard>

          <GlassCard padding="var(--space-lg)" style={{ borderLeft: '4px solid var(--warning)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
              <h4 style={{ fontWeight: 600 }}>Marina Beach Entrance</h4>
              <span className="badge badge-warning">Maintenance</span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-md)' }}>5.5 km away</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Capacity: <span style={{ color: 'var(--text)' }}>N/A</span></span>
              <Button variant="secondary" size="sm" style={{ opacity: 0.5, pointerEvents: 'none' }}>Directions</Button>
            </div>
          </GlassCard>
        </div>

        <GlassCard padding="0" style={{ overflow: 'hidden', height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card)' }}>
           <div style={{ textAlign: 'center' }}>
             <span style={{ fontSize: 64 }}>🗺️</span>
             <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--muted)', marginTop: 'var(--space-md)' }}>Google Maps Integration</h3>
             <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)' }}>Interactive machine locator</p>
           </div>
        </GlassCard>
      </div>
    </div>
  );
}
