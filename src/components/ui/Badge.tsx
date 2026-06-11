'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'warning' | 'danger';
  dot?: boolean;
  className?: string;
}

export default function Badge({ children, variant = 'default', dot, className }: BadgeProps) {
  const variantClass = variant !== 'default' ? `badge-${variant}` : '';

  return (
    <span className={cn('badge', variantClass, className)}>
      {dot && (
        <span style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: 'currentColor',
          flexShrink: 0,
        }} />
      )}
      {children}
    </span>
  );
}
