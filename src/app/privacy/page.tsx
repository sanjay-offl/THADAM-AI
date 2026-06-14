'use client';
import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0', minHeight: '80vh' }}>
      <section style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
        <motion.h1 
          className="section-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 'var(--space-md)' }}
        >
          YOUR DATA.<br/>YOUR IMPACT.<br/>YOUR CONTROL.
        </motion.h1>
        <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 700, margin: '0 auto' }}>
          THADAM AI collects only the information required to provide sustainability insights, carbon tracking, rewards, and smart recycling services.
        </p>
      </section>

      <GlassCard padding="var(--space-2xl)" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          
          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>Data Collection</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
              We believe in minimal data collection. We may collect:
            </p>
            <ul style={{ color: 'var(--muted)', paddingLeft: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Account information (Name, Email, Optional Phone)</li>
              <li>Usage analytics (App performance and interactions)</li>
              <li>Carbon assessment data (To calculate your carbon footprint)</li>
              <li>Machine interaction data (When using THADAM Smart Recycling Machines)</li>
              <li>Reward activity (Points earned and redeemed)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>Data Usage</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Your data is exclusively used to power the AI coach, provide accurate carbon tracking, and manage your sustainability rewards. <strong>We never sell personal information.</strong>
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>Data Security</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              We use secure authentication, encrypted communication, and industry-standard security practices to ensure your environmental data remains strictly confidential and secure against unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>User Rights</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              You have full control over your data. You may request to view, export, or permanently delete your account and associated sustainability data at any time via the Settings page.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>Cookies</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              We use essential cookies strictly for maintaining user sessions and securing your account. We do not use third-party tracking cookies for advertising.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>Third-Party Services</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              We integrate with secure services like Google Firebase for authentication and Gemini AI for intelligent insights. These services comply with strict data protection guidelines.
            </p>
          </section>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-lg)', marginTop: 'var(--space-md)' }}>
            <p style={{ color: 'var(--dim)', fontSize: 'var(--text-sm)', margin: 0 }}>
              Last Updated: June 2026
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
