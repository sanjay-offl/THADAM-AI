'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '@/constants';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="glass-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--navbar-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 'var(--z-sticky)',
        padding: '0 var(--space-lg)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div style={{
        width: '100%',
        maxWidth: 'var(--container-wide)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <Logo />
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-xl)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}>
            <span className="text-gradient">THADAM</span>
            <span style={{ color: 'var(--muted)', marginLeft: 4 }}>AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-xs)',
        }}
          className="desktop-nav"
        >
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: 'var(--space-sm) var(--space-md)',
                fontSize: 'var(--text-sm)',
                color: 'var(--muted)',
                borderRadius: 'var(--radius-sm)',
                transition: 'all var(--transition-base)',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text)';
                e.currentTarget.style.background = 'var(--card)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--muted)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <ThemeToggle />
          <div className="desktop-nav">
            <Link href="/dashboard">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              padding: 8,
              background: 'none',
              border: 'none',
            }}
            aria-label="Toggle navigation"
          >
            <motion.span
              style={{ width: 24, height: 2, background: 'var(--text)', borderRadius: 2, display: 'block' }}
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              style={{ width: 24, height: 2, background: 'var(--text)', borderRadius: 2, display: 'block' }}
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              style={{ width: 24, height: 2, background: 'var(--text)', borderRadius: 2, display: 'block' }}
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="glass-strong"
            style={{
              position: 'absolute',
              top: 'var(--navbar-height)',
              left: 'var(--space-md)',
              right: 'var(--space-md)',
              padding: 'var(--space-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-sm)',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                style={{
                  padding: 'var(--space-md)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--text)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/dashboard" onClick={() => setIsOpen(false)} style={{ marginTop: 'var(--space-sm)' }}>
              <Button variant="primary" style={{ width: '100%' }}>
                Get Started
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
