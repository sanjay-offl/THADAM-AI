import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function ScanPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">Computer Vision</div>
        <h1 className="section-title">AI Waste Scanner</h1>
        <p className="section-subtitle">Instantly identify waste type, recyclability, and carbon impact using Gemini Vision.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)' }}>
        <GlassCard padding="var(--space-2xl)" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, border: '2px dashed var(--border)' }}>
          <span style={{ fontSize: 48, marginBottom: 'var(--space-md)' }}>📸</span>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>Upload or Take Photo</h3>
          <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: 'var(--space-xl)', maxWidth: 300 }}>
            Take a picture of any item to scan its environmental footprint.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
            <Button variant="primary">📷 Camera Upload</Button>
            <Button variant="secondary">📁 Browse Files</Button>
          </div>
        </GlassCard>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          <GlassCard padding="var(--space-xl)" variant="glow">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Gemini Vision Analysis</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>Detected Material:</span>
                <span style={{ fontWeight: 600 }}>Awaiting Scan...</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>Recyclability:</span>
                <span style={{ fontWeight: 600 }}>--</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--muted)' }}>Disposal Method:</span>
                <span style={{ fontWeight: 600 }}>--</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Carbon Impact Report</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-2xl)' }}>
                🌱
              </div>
              <div>
                <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-xs)' }}>Estimated footprint reduction if recycled correctly:</p>
                <div style={{ fontSize: 'var(--text-2xl)', color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>-- kg CO₂</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
