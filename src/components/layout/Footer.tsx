'use client';

import Link from 'next/link';
import Logo from '@/components/ui/Logo';

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Support Center', href: '/support' },
      { label: 'GitHub', href: '/github' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: 'var(--space-4xl) 0 var(--space-2xl)',
      position: 'relative',
      zIndex: 1,
    }}>
      <div className="container" style={{ maxWidth: 'var(--container-max)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-2xl)',
          marginBottom: 'var(--space-3xl)',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: 'var(--space-md)' }}>
              <Logo />
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', letterSpacing: '0.05em', lineHeight: 1 }}>
                <span className="text-gradient">THADAM</span>
                <span style={{ color: 'var(--muted)' }}> AI</span>
              </span>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 'var(--text-sm)', lineHeight: 1.7, maxWidth: 280 }}>
              Track Your Carbon. Transform Your Future. AI-powered sustainability intelligence for a greener planet.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map(group => (
            <div key={group.title}>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--text-sm)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 'var(--space-lg)',
                color: 'var(--text)',
              }}>
                {group.title}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                {group.links.map(link => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      color: 'var(--muted)',
                      fontSize: 'var(--text-sm)',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--primary)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted)'; }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 'var(--space-xl)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
        }}>
          <p style={{ color: 'var(--dim)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>
            © {new Date().getFullYear()} THADAM AI. Built for a sustainable future.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
            <span style={{ color: 'var(--dim)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>
              🇮🇳 Made in India
            </span>
            <span style={{ color: 'var(--dim)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>
              Built with Google AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
