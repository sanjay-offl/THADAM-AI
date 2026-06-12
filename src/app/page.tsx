import Link from 'next/link';
import Hero from '@/components/sections/Hero';
import AboutVideo from '@/components/ui/AboutVideo';
import { mockStats, smartMachinesList, rewardsCatalog } from '@/data/mock';

export default function Home() {
  const features = [
    {
      title: 'Carbon Intelligence',
      desc: 'Track and understand your environmental impact with real-time carbon analytics.',
      icon: '🌍',
      color: 'var(--primary)'
    },
    {
      title: 'Gemini AI Assistant',
      desc: 'Get personalized sustainability recommendations powered by Gemini AI.',
      icon: '✨',
      color: 'var(--accent)'
    },
    {
      title: 'Smart Waste Scanner',
      desc: 'Scan waste items and receive instant recycling guidance.',
      icon: '📷',
      color: '#3B82F6'
    },
    {
      title: 'Rewards System',
      desc: 'Earn points for sustainable actions and redeem eco-friendly rewards.',
      icon: '🎁',
      color: '#A855F7'
    },
    {
      title: 'Smart Bin Locator',
      desc: 'Find nearby recycling centers and smart collection points.',
      icon: '🤖',
      color: '#F59E0B'
    },
    {
      title: 'Environmental Insights',
      desc: 'Visualize your sustainability journey through powerful dashboards and analytics.',
      icon: '📊',
      color: '#10B981'
    }
  ];

  return (
    <>
      <Hero />

      {/* About Section */}
      <section id="about" style={{ padding: 'var(--space-3xl) 0', borderTop: '1px solid var(--border)', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-lg)', position: 'relative', zIndex: 10 }}>
          <div className="about-grid">
            
            <AboutVideo />

            {/* Content */}
            <div>
              <span className="section-tag" style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '14px', marginBottom: '16px', display: 'inline-block' }}>About THADAM AI</span>
              <h2 className="font-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text)', marginBottom: 'var(--space-md)', lineHeight: 1.2 }}>
                AI-Powered Sustainability for a Greener Tomorrow
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', lineHeight: 1.7, marginBottom: 'var(--space-xl)' }}>
                THADAM AI helps individuals and communities understand, track, and reduce their carbon footprint through intelligent insights, waste scanning, smart recycling systems, and real-time sustainability analytics powered by Gemini AI.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  'Carbon Tracking',
                  'AI Waste Detection',
                  'Smart Recycling Guidance',
                  'Gemini Sustainability Assistant',
                  'Reward Ecosystem',
                  'Smart Bin Monitoring',
                  'Real-Time Environmental Analytics'
                ].map(feature => (
                  <li key={feature} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0, marginTop: 2 }}>
                      ✓
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: 'var(--space-3xl) 0', borderTop: '1px solid var(--border)', background: 'var(--bg)', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="section-tag" style={{ color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '14px', marginBottom: '16px', display: 'inline-block' }}>Platform Features</span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: 'var(--text)', marginBottom: '1rem' }}>Intelligent Eco-System</h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>Explore the powerful tools and features designed to accelerate your sustainability journey.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)' }}>
            {features.map(f => (
              <div key={f.title} className="glass feature-card" style={{ padding: 'var(--space-xl)', borderRadius: 'var(--radius-lg)', transition: 'all 0.3s ease', cursor: 'default' }}>
                <div style={{ width: 56, height: 56, borderRadius: '16px', background: `${f.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: 'var(--space-lg)', color: f.color, border: `1px solid ${f.color}30` }}>
                  {f.icon}
                </div>
                <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--text)' }}>{f.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Metrics */}
      <section style={{ padding: 'var(--space-3xl) 0', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 var(--space-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
            <span className="section-tag">global metrics</span>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-4xl)', color: 'var(--text)' }}>Collective Eco Impact</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-xl)' }}>
            <div className="glass" style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
              <div className="stat-value">{mockStats.totalUsers.toLocaleString()}</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="glass" style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
              <div className="stat-value">{mockStats.carbonSavedKg.toLocaleString()} kg</div>
              <div className="stat-label">CO2 Prevented</div>
            </div>
            <div className="glass" style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
              <div className="stat-value">₹{mockStats.rewardsDistributedINR.toLocaleString()}</div>
              <div className="stat-label">Rewards Distributed</div>
            </div>
            <div className="glass" style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
              <div className="stat-value">{mockStats.wasteProcessedTons} Tons</div>
              <div className="stat-label">Waste Processed</div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 4rem;
          align-items: center;
        }
        
        @media (max-width: 768px) {
          .about-grid {
            gap: 2rem;
            grid-template-columns: 1fr;
          }
        }

        /* Feature Card Hover Glow */
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
        }
        
        /* Smooth Scroll */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
}
