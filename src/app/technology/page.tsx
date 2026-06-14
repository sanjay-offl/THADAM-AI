'use client';
import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

const TECHNOLOGIES = [
  {
    name: 'Gemini 1.5 Pro',
    category: 'AI Chat & Coach',
    icon: '✨',
    description: 'Powers the THADAM AI Sustainability Coach, delivering context-aware, hyper-personalized advice on carbon footprint reduction, localized recycling rules, and eco-friendly lifestyle transformations using advanced multimodal reasoning.'
  },
  {
    name: 'Gemini 1.5 Vision',
    category: 'Computer Vision',
    icon: '👁️',
    description: 'Drives the intelligent Waste Scanner. It instantly analyzes user-uploaded images or camera feeds to identify complex waste materials, calculate recyclability confidence scores, and determine precise disposal instructions.'
  },
  {
    name: 'Firebase Authentication',
    category: 'Security & Identity',
    icon: '🔐',
    description: 'Provides enterprise-grade, secure, and frictionless user authentication including Google Sign-In, ensuring that personal carbon tracking data remains private and strictly protected.'
  },
  {
    name: 'Cloud Firestore',
    category: 'Database & Sync',
    icon: '🗄️',
    description: 'A highly scalable NoSQL cloud database that powers real-time synchronization for user profiles, carbon scores, reward points, and chat histories across all devices instantly.'
  },
  {
    name: 'Firebase Storage',
    category: 'Asset Management',
    icon: '📁',
    description: 'Securely stores user profile images and temporary waste scan captures for AI processing, leveraging Google Cloud\'s robust edge-caching infrastructure for lightning-fast retrievals.'
  },
  {
    name: 'Google Maps Platform',
    category: 'Location Intelligence',
    icon: '🗺️',
    description: 'Powers the Smart Machine Locator, rendering customized, high-performance interactive maps. Enables spatial querying, distance calculations, and seamless routing to the nearest THADAM recycling nodes.'
  },
  {
    name: 'Google Cloud Run',
    category: 'Serverless Compute',
    icon: '☁️',
    description: 'Host our scalable containerized backend services, ensuring that the THADAM platform can handle thousands of simultaneous AI interactions and scanner requests with zero downtime.'
  },
  {
    name: 'Vertex AI',
    category: 'Enterprise ML',
    icon: '🔬',
    description: 'Used for predictive analytics and analyzing aggregate anonymized carbon data to generate insights for our Corporate Sustainability Dashboards and Smart City Integrations.'
  }
];

export default function TechnologyPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0', minHeight: '80vh' }}>
      <section style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 800, height: 600, background: 'radial-gradient(circle, var(--primary) 0%, transparent 60%)', opacity: 0.1, zIndex: -1, pointerEvents: 'none' }} />
        
        <motion.h1 
          className="section-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 'var(--space-md)' }}
        >
          POWERED BY GOOGLE
        </motion.h1>
        <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 700, margin: '0 auto', lineHeight: 1.6 }}>
          THADAM AI leverages the cutting-edge ecosystem of Google Cloud and Google AI to deliver a highly scalable, secure, and intelligent sustainability platform.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-xl)', marginBottom: 'var(--space-4xl)' }}>
        {TECHNOLOGIES.map((tech, idx) => (
          <motion.div 
            key={tech.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
          >
            <GlassCard padding="var(--space-2xl)" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                <div style={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 'var(--radius-md)', 
                  background: 'var(--surface)', 
                  border: '1px solid var(--border)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: 24
                }}>
                  {tech.icon}
                </div>
                <div>
                  <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', margin: 0, color: 'var(--text)' }}>
                    {tech.name}
                  </h2>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                    {tech.category}
                  </span>
                </div>
              </div>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, margin: 0, flex: 1 }}>
                {tech.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <section style={{ marginBottom: 'var(--space-4xl)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-3xl)', textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>System Architecture</h2>
        <GlassCard padding="var(--space-2xl)" style={{ overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', minHeight: 400 }}>
            {/* Diagram Background */}
            <svg width="100%" height="100%" viewBox="0 0 1000 600" style={{ fontFamily: 'var(--font-mono)' }}>
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
                </linearGradient>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primary)" />
                </marker>
              </defs>

              {/* Connections */}
              <g stroke="url(#lineGrad)" strokeWidth="2" fill="none" markerEnd="url(#arrow)">
                {/* Client to API */}
                <path d="M 150 300 C 250 300, 300 300, 380 300" strokeDasharray="5,5" />
                {/* API to Firebase Auth */}
                <path d="M 550 280 C 600 280, 650 150, 720 150" />
                {/* API to Firestore */}
                <path d="M 550 300 C 650 300, 650 300, 720 300" />
                {/* API to Gemini */}
                <path d="M 550 320 C 600 320, 650 450, 720 450" />
              </g>

              {/* Client Nodes */}
              <g transform="translate(50, 250)">
                <rect width="120" height="100" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
                <text x="60" y="45" fill="var(--text)" textAnchor="middle" fontSize="16" fontWeight="bold">Next.js</text>
                <text x="60" y="65" fill="var(--muted)" textAnchor="middle" fontSize="12">Client UI</text>
              </g>

              {/* API Gateway */}
              <g transform="translate(400, 220)">
                <rect width="150" height="160" rx="10" fill="rgba(16,185,129,0.1)" stroke="var(--primary)" strokeWidth="2" />
                <text x="75" y="70" fill="var(--text)" textAnchor="middle" fontSize="16" fontWeight="bold">Cloud Run</text>
                <text x="75" y="90" fill="var(--primary)" textAnchor="middle" fontSize="12">API Gateway &</text>
                <text x="75" y="110" fill="var(--primary)" textAnchor="middle" fontSize="12">Server Components</text>
              </g>

              {/* Services */}
              <g transform="translate(740, 100)">
                <rect width="160" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
                <text x="80" y="35" fill="var(--text)" textAnchor="middle" fontSize="16" fontWeight="bold">Firebase Auth</text>
                <text x="80" y="55" fill="var(--muted)" textAnchor="middle" fontSize="12">Identity</text>
              </g>

              <g transform="translate(740, 260)">
                <rect width="160" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
                <text x="80" y="35" fill="var(--text)" textAnchor="middle" fontSize="16" fontWeight="bold">Cloud Firestore</text>
                <text x="80" y="55" fill="var(--muted)" textAnchor="middle" fontSize="12">Real-time DB</text>
              </g>

              <g transform="translate(740, 420)">
                <rect width="160" height="80" rx="10" fill="var(--surface)" stroke="var(--border)" strokeWidth="2" />
                <text x="80" y="35" fill="var(--text)" textAnchor="middle" fontSize="16" fontWeight="bold">Gemini AI</text>
                <text x="80" y="55" fill="var(--muted)" textAnchor="middle" fontSize="12">Vision & LLM</text>
              </g>
            </svg>
          </div>
        </GlassCard>
      </section>

      <section style={{ textAlign: 'center', marginTop: 'var(--space-4xl)', padding: 'var(--space-3xl) 0', borderTop: '1px solid var(--border)' }}>
        <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-md)' }}>Scalable. Secure. Sustainable.</h2>
        <p style={{ color: 'var(--muted)', maxWidth: 600, margin: '0 auto' }}>
          By building natively on Google Cloud, THADAM AI minimizes its own digital carbon footprint while maximizing performance globally.
        </p>
      </section>
    </div>
  );
}
