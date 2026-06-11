'use client';

import { motion } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'subtle' | 'strong' | 'glow' | 'float';
  hover?: boolean;
  padding?: string;
  style?: CSSProperties;
  onClick?: () => void;
  delay?: number;
}

export default function GlassCard({
  children,
  className,
  variant = 'default',
  hover = true,
  padding = 'var(--space-xl)',
  style,
  onClick,
  delay = 0,
}: GlassCardProps) {
  const variantClass = {
    default: 'glass',
    subtle: 'glass-subtle',
    strong: 'glass-strong',
    glow: 'glass-glow',
    float: 'glass-float',
  }[variant];

  return (
    <motion.div
      className={cn(variantClass, className)}
      style={{ padding, cursor: onClick ? 'pointer' : undefined, ...style }}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={hover ? { y: -4 } : undefined}
    >
      {children}
    </motion.div>
  );
}
