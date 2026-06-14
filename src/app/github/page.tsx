'use client';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function GitHubPage() {
  const techStack = [
    'Next.js', 'TypeScript', 'Firebase', 'Google Gemini', 
    'PostgreSQL', 'Google Maps', 'MQTT', 'Tailwind CSS', 'Framer Motion'
  ];

  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0', minHeight: '80vh' }}>
      <section style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -50, right: '20%', width: '100%', maxWidth: 400, height: 400, background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%)', opacity: 0.5, zIndex: -1, pointerEvents: 'none' }} />
        
        <motion.h1 
          className="section-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 'var(--space-md)' }}
        >
          OPEN TECHNOLOGY FOR A<br/>SUSTAINABLE FUTURE
        </motion.h1>
        <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 700, margin: '0 auto' }}>
          THADAM AI is built using modern web technologies, AI services, and cloud infrastructure. We believe sustainability innovation grows faster through open collaboration.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-xl)', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => window.open('https://github.com/THADAM-AI', '_blank')}>View Repository</Button>
          <Button variant="outline" onClick={() => window.open('https://github.com/THADAM-AI/issues/new', '_blank')}>Report Issue</Button>
          <Button variant="ghost" onClick={() => window.open('https://github.com/THADAM-AI/issues/new?template=feature_request.md', '_blank')}>Request Feature</Button>
        </div>
      </section>

      <div style={{ display: 'grid', gap: 'var(--space-2xl)', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <GlassCard padding="var(--space-2xl)">
          <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Technology Stack</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            {techStack.map((tech, idx) => (
              <motion.span 
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                style={{ 
                  padding: '8px 16px', 
                  background: 'var(--surface)', 
                  border: '1px solid var(--border)', 
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="var(--space-2xl)">
          <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-lg)', color: 'var(--text)' }}>Product Roadmap</h2>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', padding: 0, margin: 0, listStyle: 'none' }}>
            {[
              { status: 'In Progress', name: 'Carbon Forecasting' },
              { status: 'Planned', name: 'Corporate Sustainability Dashboard' },
              { status: 'Planned', name: 'Smart City Integration' },
              { status: 'Exploration', name: 'Advanced AI Recommendations' },
            ].map((item, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <span style={{ 
                  fontSize: '10px', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  background: item.status === 'In Progress' ? 'rgba(16,185,129,0.15)' : 'var(--surface)', 
                  color: item.status === 'In Progress' ? 'var(--primary)' : 'var(--muted)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  width: 90,
                  textAlign: 'center'
                }}>
                  {item.status}
                </span>
                <span style={{ color: 'var(--text)', fontSize: 'var(--text-md)' }}>{item.name}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
