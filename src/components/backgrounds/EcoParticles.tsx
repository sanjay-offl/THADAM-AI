'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}

export default function EcoParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      opacity: 0.15 + Math.random() * 0.25,
      duration: 25 + Math.random() * 35,
      delay: Math.random() * 20,
      drift: -20 + Math.random() * 40,
    }));
    setParticles(generated);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {particles.map(p => (
        <span
          key={p.id}
          className="eco-particle"
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'var(--primary)',
            opacity: p.opacity,
            animationName: 'particleDrift',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes particleDrift {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: var(--particle-opacity, 0.3);
          }
          90% {
            opacity: var(--particle-opacity, 0.3);
          }
          100% {
            transform: translateY(-120vh) translateX(var(--drift, 20px));
            opacity: 0;
          }
        }
        [data-theme='light'] .eco-particle {
          background: rgba(0, 0, 0, 0.12) !important;
        }
      `}</style>
    </div>
  );
}
