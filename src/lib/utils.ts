// ============================================
// THADAM AI — Utility Functions
// ============================================

/**
 * Format a number with commas for display
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Format currency in INR
 */
export function formatCurrency(amount: number): string {
  return `₹${formatNumber(amount)}`;
}

/**
 * Format carbon weight with appropriate unit
 */
export function formatCarbon(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(1)} tons CO₂`;
  }
  return `${kg.toFixed(1)}kg CO₂`;
}

/**
 * Calculate trees equivalent from CO₂ saved (kg)
 * Average tree absorbs ~22kg CO₂ per year
 */
export function treesEquivalent(carbonKg: number): number {
  return Math.round(carbonKg / 22);
}

/**
 * Get relative time string
 */
export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Sleep for a specified number of milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Get eco rank color
 */
export function getRankColor(rank: string): string {
  const colors: Record<string, string> = {
    'Eco Beginner': '#86EFAC',
    'Green Warrior': '#4ADE80',
    'Climate Champion': '#22C55E',
    'Earth Guardian': '#16A34A',
    'Planet Protector': '#15803D',
  };
  return colors[rank] || '#22C55E';
}

/**
 * Get machine status color
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    online: '#22C55E',
    offline: '#EF4444',
    maintenance: '#F59E0B',
    full: '#F97316',
  };
  return colors[status] || '#94A3B8';
}

/**
 * Get badge rarity color
 */
export function getRarityColor(rarity: string): string {
  const colors: Record<string, string> = {
    common: '#94A3B8',
    rare: '#3B82F6',
    epic: '#A855F7',
    legendary: '#F59E0B',
  };
  return colors[rarity] || '#94A3B8';
}

/**
 * CN utility - combine class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
