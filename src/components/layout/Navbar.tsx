'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { NAV_ITEMS } from '@/constants';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Logo from '@/components/ui/Logo';
import { Menu, X, LogOut, Settings, ChevronDown, UserIcon } from '@/components/ui/Icons';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle Auth State changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle Redirect Result after Google login fallback
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          setIsLoading(true);
          const idToken = await result.user.getIdToken();
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
          });
          if (!response.ok) {
            console.error('Backend Auth Error after redirect');
            alert('Authentication failed. Please verify your Google OAuth settings and Authorized Domains in Firebase.');
          } else {
            router.push('/dashboard');
            router.refresh();
          }
        }
      } catch (error: any) {
        console.error('Redirect auth error:', error);
        alert(`Login error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    handleRedirect();
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      // Configure provider to always prompt for account selection to avoid hanging sessions
      provider.setCustomParameters({ prompt: 'select_account' });
      
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to synchronize secure session with server.');
      }
      
      setIsOpen(false);
      router.push('/dashboard');
      router.refresh();
    } catch (error: any) {
      console.error('Login error detail:', error);
      
      // Fallback to redirect if popup is blocked or environment doesn't support popups
      if (
        error?.code === 'auth/popup-blocked' ||
        error?.code === 'auth/popup-closed-by-user' ||
        error?.message?.includes('Cross-Origin')
      ) {
        console.log('Popup blocked or closed, falling back to redirect auth...');
        try {
          const provider = new GoogleAuthProvider();
          provider.setCustomParameters({ prompt: 'select_account' });
          await signInWithRedirect(auth, provider);
          return; // Wait for redirect
        } catch (redirectError) {
          console.error('Redirect fallback failed:', redirectError);
        }
      } else if (error?.code === 'auth/unauthorized-domain') {
        alert('Authentication failed: This domain is not authorized for Google Sign-In. Please add localhost (or your production domain) to the Authorized Domains list in your Firebase Console.');
      } else {
        alert(`Login failed: ${error.message || 'Please check your connection and configuration.'}`);
      }
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
      router.refresh();
      setIsDropdownOpen(false);
      setIsOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <nav className="thadam-navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <Logo />
            <span className="navbar-brand">
              <span className="navbar-brand-primary">THADAM</span>
              <span className="navbar-brand-ai">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-links desktop-nav">
            {!user ? (
              <>
                <Link href="/" className="navbar-link">Home</Link>
                <Link href="/#about" className="navbar-link">About</Link>
                <Link href="/#features" className="navbar-link">Features</Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="navbar-link">Dashboard</Link>
                <Link href="/carbon" className="navbar-link">Carbon</Link>
                <Link href="/scan" className="navbar-link">Scan</Link>
                <Link href="/chat" className="navbar-link">Chat</Link>
                <Link href="/rewards" className="navbar-link">Rewards</Link>
                <Link href="/machines" className="navbar-link">Machines</Link>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="navbar-actions">
            <ThemeToggle />

            <div className="desktop-nav">
              {user ? (
                <div ref={dropdownRef} style={{ position: 'relative' }}>
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="navbar-user-btn">
                    {user.photoURL ? (
                      <Image src={user.photoURL} alt="Profile" width={32} height={32} style={{ borderRadius: '50%' }} />
                    ) : (
                      <div className="navbar-avatar">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="navbar-username">{user.displayName || 'User'}</span>
                    <ChevronDown size={14} style={{ opacity: 0.5 }} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="navbar-dropdown"
                      >
                        <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="navbar-dropdown-item">
                          <UserIcon size={16} /> My Account
                        </Link>
                        <Link href="/settings" onClick={() => setIsDropdownOpen(false)} className="navbar-dropdown-item">
                          <Settings size={16} /> Settings
                        </Link>
                        <div className="navbar-dropdown-divider" />
                        <button onClick={handleLogout} className="navbar-dropdown-item navbar-dropdown-danger">
                          <LogOut size={16} /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button onClick={handleGoogleLogin} disabled={isLoading} className="navbar-cta">
                  {isLoading ? 'Connecting...' : 'Continue with Google'}
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="mobile-nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="mobile-overlay"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="mobile-drawer"
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                <button onClick={() => setIsOpen(false)} className="mobile-close-btn"><X size={22} /></button>
              </div>

              {user && (
                <div className="mobile-user-info">
                  {user.photoURL ? (
                    <Image src={user.photoURL} alt="Profile" width={44} height={44} style={{ borderRadius: '50%' }} />
                  ) : (
                    <div className="navbar-avatar" style={{ width: 44, height: 44, fontSize: 18 }}>
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div>
                    <div style={{ fontWeight: 600 }}>{user.displayName || 'User'}</div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{user.email}</div>
                  </div>
                </div>
              )}

              <div className="mobile-nav-links">
                {!user ? (
                  <>
                    <Link href="/" onClick={() => setIsOpen(false)} className="mobile-nav-link">Home</Link>
                    <Link href="/#about" onClick={() => setIsOpen(false)} className="mobile-nav-link">About</Link>
                    <Link href="/#features" onClick={() => setIsOpen(false)} className="mobile-nav-link">Features</Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="mobile-nav-link">Dashboard</Link>
                    <Link href="/carbon" onClick={() => setIsOpen(false)} className="mobile-nav-link">Carbon</Link>
                    <Link href="/scan" onClick={() => setIsOpen(false)} className="mobile-nav-link">Scan</Link>
                    <Link href="/chat" onClick={() => setIsOpen(false)} className="mobile-nav-link">Chat</Link>
                    <Link href="/rewards" onClick={() => setIsOpen(false)} className="mobile-nav-link">Rewards</Link>
                    <Link href="/machines" onClick={() => setIsOpen(false)} className="mobile-nav-link">Machines</Link>
                  </>
                )}
              </div>

              <div className="mobile-nav-footer">
                {user ? (
                  <>
                    <Link href="/settings" onClick={() => setIsOpen(false)} className="mobile-nav-link">
                      <Settings size={18} /> Settings
                    </Link>
                    <button onClick={handleLogout} className="mobile-nav-link" style={{ color: 'var(--danger)' }}>
                      <LogOut size={18} /> Logout
                    </button>
                  </>
                ) : (
                  <button onClick={handleGoogleLogin} disabled={isLoading} className="navbar-cta" style={{ width: '100%' }}>
                    {isLoading ? 'Connecting...' : 'Continue with Google'}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        /* ---- Navbar Core ---- */
        .thadam-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--navbar-height);
          z-index: 50;
          background: var(--navbar-bg);
          border-bottom: 1px solid var(--navbar-border);
          transition: background 0.3s, border-color 0.3s;
        }

        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          gap: 16px;
        }

        /* Logo */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .navbar-brand {
          font-family: var(--font-heading);
          font-size: 18px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          line-height: 1;
        }
        .navbar-brand-primary {
          color: var(--primary);
        }
        .navbar-brand-ai {
          color: var(--muted);
          margin-left: 3px;
        }

        /* Links */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .navbar-link {
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          color: var(--navbar-text-muted);
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          text-decoration: none;
          white-space: nowrap;
        }
        .navbar-link:hover {
          color: var(--navbar-text);
          background: var(--navbar-hover-bg);
        }

        /* Actions */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        /* User Button */
        .navbar-user-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px 4px 4px;
          border-radius: 9999px;
          border: 1px solid var(--border);
          background: var(--surface);
          cursor: pointer;
          transition: all 0.2s;
          color: var(--text);
        }
        .navbar-user-btn:hover {
          border-color: var(--primary);
          background: var(--navbar-hover-bg);
        }
        .navbar-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }
        .navbar-username {
          font-size: 13px;
          font-weight: 500;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* CTA */
        .navbar-cta {
          background: var(--primary);
          border: none;
          padding: 8px 20px;
          border-radius: 9999px;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .navbar-cta:hover {
          background: #059669;
          transform: translateY(-1px);
        }
        .navbar-cta:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Dropdown */
        .navbar-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 200px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 6px;
          box-shadow: var(--shadow-lg);
          z-index: 100;
        }
        .navbar-dropdown-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 8px;
          color: var(--text);
          text-decoration: none;
          font-size: 14px;
          transition: background 0.15s;
          width: 100%;
          text-align: left;
          cursor: pointer;
          background: transparent;
          border: none;
        }
        .navbar-dropdown-item:hover {
          background: var(--navbar-hover-bg);
        }
        .navbar-dropdown-danger {
          color: var(--danger);
        }
        .navbar-dropdown-danger:hover {
          background: rgba(239, 68, 68, 0.08);
        }
        .navbar-dropdown-divider {
          height: 1px;
          background: var(--border);
          margin: 4px 0;
        }

        /* Mobile Toggle */
        .mobile-nav-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--text);
          cursor: pointer;
          padding: 4px;
        }

        /* Mobile Overlay + Drawer */
        .mobile-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 40;
        }
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 280px;
          max-width: 85vw;
          background: var(--card);
          border-left: 1px solid var(--border);
          padding: 20px;
          display: flex;
          flex-direction: column;
          z-index: 50;
          box-shadow: -8px 0 30px rgba(0,0,0,0.3);
          overflow-y: auto;
        }
        .mobile-close-btn {
          background: transparent;
          border: none;
          color: var(--text);
          cursor: pointer;
        }
        .mobile-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border);
        }
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .mobile-nav-link {
          padding: 12px 14px;
          font-size: 15px;
          font-weight: 500;
          color: var(--text);
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.15s;
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          cursor: pointer;
        }
        .mobile-nav-link:hover {
          background: var(--navbar-hover-bg);
        }
        .mobile-nav-footer {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* ---- Responsive ---- */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
          .navbar-inner { padding: 0 16px; }
        }
      `}</style>
    </>
  );
}
