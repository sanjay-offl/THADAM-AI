'use client';

import { useEffect, useState } from 'react';

interface Leaf {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
}

const LEAF_EMOJIS = ['🍃', '🌿', '🍂', '☘️', '🌱'];

export default function FloatingLeaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const generated: Leaf[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 18 + Math.random() * 22,
      size: 12 + Math.random() * 8,
      emoji: LEAF_EMOJIS[Math.floor(Math.random() * LEAF_EMOJIS.length)],
    }));
    setLeaves(generated);
  }, []);

  return (
    <>
      <div className="floating-leaves-container" aria-hidden="true">
        {leaves.map(leaf => (
          <span
            key={leaf.id}
            className="floating-leaf"
            style={{
              left: `${leaf.left}%`,
              fontSize: `${leaf.size}px`,
              animationDuration: `${leaf.duration}s`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            {leaf.emoji}
          </span>
        ))}
      </div>
      <style>{`
        .floating-leaves-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: -1;
          overflow: hidden;
        }
        .floating-leaf {
          position: absolute;
          top: -5%;
          opacity: 0.2;
          animation-name: leafFall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          filter: none;
        }

        /* Dark theme: subtle emerald glow */
        :root .floating-leaf {
          filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.3));
          opacity: 0.15;
        }

        /* Light theme: soft green tint */
        [data-theme='light'] .floating-leaf {
          filter: none;
          opacity: 0.25;
        }

        @keyframes leafFall {
          0% {
            transform: translateY(-10vh) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% { opacity: var(--leaf-opacity, 0.2); }
          90% { opacity: var(--leaf-opacity, 0.2); }
          100% {
            transform: translateY(110vh) rotate(720deg) translateX(80px);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floating-leaf {
            animation: none !important;
            display: none;
          }
        }
      `}</style>
    </>
  );
}
