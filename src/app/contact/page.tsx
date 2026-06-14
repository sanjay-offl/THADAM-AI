'use client';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-2xl) 0', minHeight: '80vh' }}>
      <section style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -100, right: 0, width: '100%', maxWidth: 400, height: 400, background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)', opacity: 0.1, zIndex: -1, pointerEvents: 'none' }} />
        
        <motion.h1 
          className="section-title text-gradient"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: 'var(--space-md)' }}
        >
          LET&apos;S BUILD A GREENER FUTURE TOGETHER
        </motion.h1>
        <p style={{ color: 'var(--muted)', fontSize: 'var(--text-lg)', maxWidth: 600, margin: '0 auto' }}>
          Questions about sustainability? Interested in smart recycling infrastructure? Looking for partnership opportunities? We&apos;d love to hear from you.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-2xl)' }}>
        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <GlassCard padding="var(--space-lg)">
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 4, color: 'var(--text)' }}>General Inquiries</h3>
            <a href="mailto:hello@thadam.ai" style={{ color: 'var(--primary)', textDecoration: 'none' }}>hello@thadam.ai</a>
          </GlassCard>
          
          <GlassCard padding="var(--space-lg)">
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 4, color: 'var(--text)' }}>Partnerships</h3>
            <a href="mailto:partners@thadam.ai" style={{ color: 'var(--primary)', textDecoration: 'none' }}>partners@thadam.ai</a>
          </GlassCard>

          <GlassCard padding="var(--space-lg)">
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 4, color: 'var(--text)' }}>Technical Support</h3>
            <a href="mailto:support@thadam.ai" style={{ color: 'var(--primary)', textDecoration: 'none' }}>support@thadam.ai</a>
          </GlassCard>

          <GlassCard padding="var(--space-lg)">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <span style={{ fontSize: 24 }}>📍</span>
              <div>
                <h3 style={{ fontSize: 'var(--text-md)', margin: 0, color: 'var(--text)' }}>Location</h3>
                <p style={{ color: 'var(--muted)', margin: 0 }}>Tamil Nadu, India</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
              <span style={{ fontSize: 24 }}>⚡</span>
              <div>
                <h3 style={{ fontSize: 'var(--text-md)', margin: 0, color: 'var(--text)' }}>Response Time</h3>
                <p style={{ color: 'var(--muted)', margin: 0 }}>Within 24–48 Hours</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Contact Form */}
        <GlassCard padding="var(--space-2xl)">
          <h2 className="font-heading" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-xl)', color: 'var(--text)' }}>Send a Message</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }} onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: 4 }}>Name</label>
              <input id="name" required aria-label="Name" className="input-field" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
            </div>
            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: 4 }}>Email</label>
              <input id="email" type="email" required aria-label="Email" className="input-field" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
            </div>
            <div>
              <label htmlFor="subject" style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: 4 }}>Subject</label>
              <input id="subject" required aria-label="Subject" className="input-field" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
            </div>
            <div>
              <label htmlFor="message" style={{ display: 'block', fontSize: '12px', color: 'var(--muted)', marginBottom: 4 }}>Message</label>
              <textarea id="message" required aria-label="Message" style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', minHeight: 120 }} />
            </div>
            <Button variant="primary" style={{ marginTop: 'var(--space-sm)' }}>Send Message</Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
