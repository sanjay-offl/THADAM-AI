'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Button from '@/components/ui/Button';

import lightLogo from '@/assets/light_logo .jpeg';
import darkLogo from '@/assets/dark_logo.jpeg';

/* ─── Data ─── */
const rings = [
  { label: 'Carbon Score', percent: 87, color: '#22C55E', radius: 100, width: 8 },
  { label: 'Carbon Saved', percent: 72, color: '#38BDF8', radius: 120, width: 7 },
  { label: 'Eco Rank', percent: 91, color: '#F59E0B', radius: 138, width: 6 },
  { label: 'Rewards', percent: 64, color: '#A855F7', radius: 155, width: 5 },
];

const kpis = [
  { label: 'Carbon Score', value: 87, suffix: '/100', color: '#22C55E', pos: 'top' },
  { label: 'Carbon Saved', value: 248, suffix: 'kg CO₂', color: '#38BDF8', pos: 'right' },
  { label: 'Reward Wallet', value: 2450, prefix: '₹', suffix: '', color: '#A855F7', pos: 'bottom' },
  { label: 'Eco Rank', value: 8, suffix: '%', prefix: 'Top ', color: '#F59E0B', pos: 'left' },
];

/* ─── Animated Counter ─── */
function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, value, duration]);

  return <>{count.toLocaleString()}</>;
}

/* ─── Radial Ring SVG ─── */
function RadialRing({ radius, width, percent, color, delay }: {
  radius: number; width: number; percent: number; color: string; delay: number;
}) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <g>
      {/* Track */}
      <circle
        cx="200" cy="200" r={radius}
        fill="none"
        stroke="var(--border)"
        strokeWidth={width}
        opacity={0.3}
      />
      {/* Progress */}
      <motion.circle
        cx="200" cy="200" r={radius}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: '200px 200px',
          filter: `drop-shadow(0 0 6px ${color}40)`,
        }}
      />
    </g>
  );
}

/* ─── Leaf Cursor SVG ─── */
function LeafCursor({ x, y, isDark }: { x: number; y: number; isDark: boolean }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        zIndex: 10,
        transform: 'translate(-12px, -12px)',
      }}
      animate={{
        rotate: [0, 8, -5, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.24 20 15.63 15.22 17 8Z"
          fill={isDark ? 'rgba(34,197,94,0.5)' : 'rgba(22,163,74,0.4)'}
        />
        <path
          d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.24 20 15.63 15.22 17 8Z"
          stroke={isDark ? '#22C55E' : '#16A34A'}
          strokeWidth="0.8"
          fill="none"
        />
        {/* Leaf vein */}
        <path
          d="M10 15C10.5 12.5 12 10 17 8"
          stroke={isDark ? '#22C55E' : '#16A34A'}
          strokeWidth="0.5"
          opacity="0.6"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

/* ─── HERO ─── */
export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);

  // Leaf cursor position
  const [leafPos, setLeafPos] = useState({ x: -100, y: -100 });
  const [showLeaf, setShowLeaf] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      setLeafPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  }, []);

  const logoSrc = mounted && theme === 'dark' ? darkLogo : lightLogo;
  const isDark = mounted && theme === 'dark';

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowLeaf(true)}
      onMouseLeave={() => setShowLeaf(false)}
      style={{
        minHeight: 'calc(100vh - var(--navbar-height))',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      {/* Leaf cursor */}
      {showLeaf && mounted && (
        <LeafCursor x={leafPos.x} y={leafPos.y} isDark={isDark} />
      )}

      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-2xl)',
          alignItems: 'center',
          maxWidth: 'var(--container-wide)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ──── Left — Content ──── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
            lineHeight: 1.05,
            marginBottom: 'var(--space-lg)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}>
            <span style={{ display: 'block', color: 'var(--text)' }}>YOUR FOOTPRINT</span>
            <span style={{ display: 'block', color: 'var(--text)' }}>IS A STORY.</span>
            <span style={{ display: 'block', marginTop: '0.15em' }} className="text-gradient">
              {"LET'S REWRITE IT."}
            </span>
          </h1>

          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--muted)',
            lineHeight: 1.7,
            maxWidth: 480,
            marginBottom: 'var(--space-2xl)',
          }}>
            Track, understand, and reduce your environmental impact with AI-powered sustainability intelligence.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginBottom: 'var(--space-3xl)' }}>
            <Link href="/carbon">
              <Button variant="primary" size="lg">Start Tracking</Button>
            </Link>
            <Link href="/chat">
              <Button variant="secondary" size="lg">Chat with Gemini</Button>
            </Link>
          </div>

          {/* Stats row */}
          <motion.div
            style={{
              display: 'flex',
              gap: 'var(--space-2xl)',
              paddingTop: 'var(--space-xl)',
              borderTop: '1px solid var(--border)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: 'Users', value: 12847, suffix: '+' },
              { label: 'CO₂ Saved', value: 89, suffix: '.4T' },
              { label: 'Trees Equiv.', value: 31, suffix: '' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-2xl)',
                  color: 'var(--text)',
                }}>
                  <AnimatedCounter value={stat.value} />{stat.suffix}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ──── Right — Radial Climate Intelligence Hub ──── */}
        <motion.div
          className="hero-hub"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 520,
            aspectRatio: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* ── Radial Rings SVG ── */}
          <svg
            viewBox="0 0 400 400"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            {rings.map((ring, i) => (
              <g
                key={ring.label}
                onMouseEnter={() => setHoveredRing(i)}
                onMouseLeave={() => setHoveredRing(null)}
                style={{ cursor: 'pointer' }}
              >
                <RadialRing
                  radius={ring.radius}
                  width={hoveredRing === i ? ring.width + 3 : ring.width}
                  percent={ring.percent}
                  color={ring.color}
                  delay={0.3 + i * 0.15}
                />
              </g>
            ))}
          </svg>

          {/* ── Hovered Ring Tooltip ── */}
          {hoveredRing !== null && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: 'absolute',
                top: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                padding: '6px 14px',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                backdropFilter: 'blur(12px)',
                borderRadius: 8,
                border: `1px solid ${rings[hoveredRing].color}40`,
                zIndex: 5,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: rings[hoveredRing].color,
                letterSpacing: '0.05em',
              }}>
                {rings[hoveredRing].label} — {rings[hoveredRing].percent}%
              </span>
            </motion.div>
          )}

          {/* ── Center Logo ── */}
          <motion.div
            whileHover={{ scale: 1.04 }}
            animate={{ scale: [1, 1.015, 1] }}
            transition={{
              scale: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
            }}
            style={{
              position: 'relative',
              zIndex: 2,
              width: 160,
              height: 160,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              boxShadow: isDark
                ? '0 0 30px rgba(34,197,94,0.06), 0 8px 32px rgba(0,0,0,0.4)'
                : '0 8px 32px rgba(0,0,0,0.08)',
              background: isDark
                ? 'rgba(255,255,255,0.03)'
                : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
            }}
          >
            <Image
              src={logoSrc}
              alt="THADAM AI"
              width={140}
              height={140}
              priority
              style={{ objectFit: 'contain', width: '100%', height: '100%', borderRadius: '50%' }}
            />
          </motion.div>

          {/* ── KPI Cards at compass points ── */}
          {kpis.map((kpi, i) => {
            const positionStyles: Record<string, React.CSSProperties> = {
              top: { top: -10, left: '50%', transform: 'translateX(-50%)' },
              right: { right: -10, top: '50%', transform: 'translateY(-50%)' },
              bottom: { bottom: -10, left: '50%', transform: 'translateX(-50%)' },
              left: { left: -10, top: '50%', transform: 'translateY(-50%)' },
            };
            return (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                whileHover={{
                  scale: 1.08,
                  boxShadow: isDark
                    ? `0 0 20px ${kpi.color}20, 0 8px 24px rgba(0,0,0,0.3)`
                    : `0 0 20px ${kpi.color}15, 0 8px 24px rgba(0,0,0,0.08)`,
                }}
                style={{
                  position: 'absolute',
                  ...positionStyles[kpi.pos],
                  padding: '12px 18px',
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  minWidth: 120,
                  textAlign: 'center',
                  zIndex: 3,
                  cursor: 'default',
                  boxShadow: isDark
                    ? '0 4px 16px rgba(0,0,0,0.3)'
                    : '0 4px 16px rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  color: 'var(--dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginBottom: 3,
                }}>
                  {kpi.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-lg)',
                  color: kpi.color,
                  lineHeight: 1,
                }}>
                  {kpi.prefix || ''}<AnimatedCounter value={kpi.value} duration={2200} />{kpi.suffix}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          #hero .container {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          #hero .container > div:first-child p,
          #hero .container > div:first-child > div {
            justify-content: center;
          }
          .hero-hub {
            max-width: 360px !important;
          }
        }
        @media (max-width: 640px) {
          .hero-hub {
            max-width: 300px !important;
          }
          #hero { cursor: auto !important; }
        }
      `}</style>
    </section>
  );
}
