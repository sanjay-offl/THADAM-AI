import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0' }}>
      <div className="section-header">
        <div className="section-tag">Configuration</div>
        <h1 className="section-title">Settings</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 'var(--space-2xl)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
          <Button variant="primary" style={{ justifyContent: 'flex-start' }}>Account Settings</Button>
          <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>Appearance</Button>
          <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>Notifications</Button>
          <Button variant="ghost" style={{ justifyContent: 'flex-start' }}>Privacy & Security</Button>
          <Button variant="ghost" style={{ justifyContent: 'flex-start', color: 'var(--danger)' }}>Danger Zone</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Account Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--muted)', marginBottom: 'var(--space-xs)' }}>Full Name</label>
                <input type="text" defaultValue="Sanjay Kumar" style={{ width: '100%', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--muted)', marginBottom: 'var(--space-xs)' }}>Email Address</label>
                <input type="email" defaultValue="demo@thadam.ai" style={{ width: '100%', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)' }} />
              </div>
              <Button variant="primary" style={{ alignSelf: 'flex-start', marginTop: 'var(--space-sm)' }}>Save Changes</Button>
            </div>
          </GlassCard>

          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Appearance</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <strong style={{ display: 'block' }}>Theme Preference</strong>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Toggle between light and dark mode automatically based on system preferences.</span>
              </div>
              <Button variant="secondary" size="sm">System Default</Button>
            </div>
          </GlassCard>

          <GlassCard padding="var(--space-xl)">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-lg)' }}>Notifications</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <strong style={{ display: 'block' }}>Email Alerts</strong>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Receive weekly carbon reports.</span>
              </div>
              <div style={{ width: 40, height: 24, background: 'var(--primary)', borderRadius: 12, position: 'relative' }}>
                <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: 2 }}></div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-sm) 0', marginTop: 'var(--space-md)' }}>
              <div>
                <strong style={{ display: 'block' }}>Machine Availability</strong>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted)' }}>Get notified when favorite machines are back online.</span>
              </div>
              <div style={{ width: 40, height: 24, background: 'var(--primary)', borderRadius: 12, position: 'relative' }}>
                <div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, right: 2 }}></div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
