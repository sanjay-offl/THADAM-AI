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
    const generated: Leaf[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 15 + Math.random() * 20,
      size: 14 + Math.random() * 12,
      emoji: LEAF_EMOJIS[Math.floor(Math.random() * LEAF_EMOJIS.length)],
    }));
    setLeaves(generated);
  }, []);

  return (
    <div
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
      aria-hidden="true"
    >
      {leaves.map(leaf => (
        <span
          key={leaf.id}
          style={{
            position: 'absolute',
            left: `${leaf.left}%`,
            top: '-5%',
            fontSize: `${leaf.size}px`,
            animation: `leafFall ${leaf.duration}s linear ${leaf.delay}s infinite`,
            opacity: 0.4,
          }}
        >
          {leaf.emoji}
        </span>
      ))}
    </div>
  );
}
