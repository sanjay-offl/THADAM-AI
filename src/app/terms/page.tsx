'use client';
import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0', minHeight: '80vh' }}>
      <section style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
        <motion.h1 
          className="section-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 'var(--space-md)' }}
        >
          CLEAR RULES FOR A CLEANER FUTURE
        </motion.h1>
        <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 700, margin: '0 auto' }}>
          By using THADAM AI, you agree to use the platform responsibly and accurately to contribute to global sustainability efforts.
        </p>
      </section>

      <GlassCard padding="var(--space-2xl)" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          
          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>Account Responsibilities</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 'var(--space-md)' }}>
              Users are expected to provide accurate information when logging their carbon activities. You are responsible for maintaining the security of your account credentials.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-md)' }}>
              <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ color: 'var(--text)', marginBottom: 8 }}>✅ Users May:</h4>
                <ul style={{ color: 'var(--muted)', paddingLeft: 'var(--space-md)', margin: 0, fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <li>Track carbon emissions</li>
                  <li>Earn sustainability rewards</li>
                  <li>Use smart recycling machines</li>
                  <li>Participate in challenges</li>
                </ul>
              </div>
              <div className="glass-subtle" style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <h4 style={{ color: 'var(--text)', marginBottom: 8 }}>❌ Users May Not:</h4>
                <ul style={{ color: 'var(--muted)', paddingLeft: 'var(--space-md)', margin: 0, fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <li>Manipulate reward systems</li>
                  <li>Upload harmful content</li>
                  <li>Attempt unauthorized access</li>
                  <li>Misrepresent sustainability activities</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>Rewards Program</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              THADAM Points have no cash value and are exclusively redeemable within the THADAM ecosystem. We reserve the right to audit, modify, or revoke points if fraudulent activity is suspected.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>Machine Usage</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              When interacting with physical THADAM Smart Recycling Machines, users must only deposit accepted materials. Vandalism or intentional misuse of the hardware will result in permanent account termination and potential legal action.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>Intellectual Property</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              All software, designs, algorithms, and content on the THADAM platform are the exclusive property of THADAM AI. Open-source components are attributed in accordance with their respective licenses.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>Limitation of Liability</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              While we strive for high accuracy, the carbon footprint estimates and AI recommendations are provided for educational and tracking purposes. THADAM AI is not liable for indirect damages resulting from the use of our services.
            </p>
          </section>

          <section>
            <h2 className="font-heading" style={{ fontSize: 'var(--text-xl)', color: 'var(--primary)', marginBottom: 'var(--space-sm)' }}>Termination</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              We may suspend or terminate your account at any time if you violate these terms. You may also delete your account and data at your discretion.
            </p>
          </section>

        </div>
      </GlassCard>
    </div>
  );
}
