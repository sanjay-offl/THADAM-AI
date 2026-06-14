import { describe, it, expect } from 'vitest';
import {
  formatNumber,
  formatCurrency,
  formatCarbon,
  treesEquivalent,
  timeAgo,
  generateId,
  clamp,
  sleep,
  debounce,
  getRankColor,
  getStatusColor,
  getRarityColor,
  cn,
} from '@/lib/utils';

describe('Utility Functions', () => {
  describe('formatNumber', () => {
    it('should format numbers with Indian locale', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(0)).toBe('0');
    });

    it('should format large numbers', () => {
      const result = formatNumber(1234567);
      expect(result).toContain('12');
    });

    it('should handle negative numbers', () => {
      const result = formatNumber(-500);
      expect(result).toContain('500');
    });
  });

  describe('formatCurrency', () => {
    it('should format with rupee symbol', () => {
      expect(formatCurrency(1000)).toBe('₹1,000');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('₹0');
    });
  });

  describe('formatCarbon', () => {
    it('should format in kg for values under 1000', () => {
      expect(formatCarbon(500)).toBe('500.0kg CO₂');
    });

    it('should format in tons for values 1000+', () => {
      expect(formatCarbon(1500)).toBe('1.5 tons CO₂');
    });

    it('should handle zero', () => {
      expect(formatCarbon(0)).toBe('0.0kg CO₂');
    });

    it('should handle decimals correctly', () => {
      expect(formatCarbon(42.7)).toBe('42.7kg CO₂');
    });
  });

  describe('treesEquivalent', () => {
    it('should calculate trees from carbon saved', () => {
      expect(treesEquivalent(22)).toBe(1);
      expect(treesEquivalent(44)).toBe(2);
      expect(treesEquivalent(110)).toBe(5);
    });

    it('should round to nearest integer', () => {
      expect(treesEquivalent(30)).toBe(1);
    });

    it('should handle zero', () => {
      expect(treesEquivalent(0)).toBe(0);
    });
  });

  describe('timeAgo', () => {
    it('should return "just now" for recent dates', () => {
      expect(timeAgo(new Date())).toBe('just now');
    });

    it('should return minutes ago', () => {
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
      expect(timeAgo(fiveMinAgo)).toBe('5 minutes ago');
    });

    it('should return hours ago', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 3600 * 1000);
      expect(timeAgo(twoHoursAgo)).toBe('2 hours ago');
    });

    it('should return days ago', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 86400 * 1000);
      expect(timeAgo(threeDaysAgo)).toBe('3 days ago');
    });

    it('should handle singular form', () => {
      const oneHourAgo = new Date(Date.now() - 3600 * 1000);
      expect(timeAgo(oneHourAgo)).toBe('1 hour ago');
    });
  });

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
    });

    it('should contain a timestamp component', () => {
      const id = generateId();
      expect(id).toContain('-');
    });
  });

  describe('clamp', () => {
    it('should clamp values within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should handle equal min/max', () => {
      expect(clamp(5, 5, 5)).toBe(5);
    });

    it('should handle boundary values', () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });

  describe('sleep', () => {
    it('should resolve after delay', async () => {
      const start = Date.now();
      await sleep(50);
      const elapsed = Date.now() - start;
      expect(elapsed).toBeGreaterThanOrEqual(40);
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let callCount = 0;
      const fn = debounce(() => { callCount++; }, 50);

      fn();
      fn();
      fn();

      expect(callCount).toBe(0);
      await sleep(100);
      expect(callCount).toBe(1);
    });
  });

  describe('getRankColor', () => {
    it('should return correct colors for each rank', () => {
      expect(getRankColor('Eco Beginner')).toBe('#86EFAC');
      expect(getRankColor('Green Warrior')).toBe('#4ADE80');
      expect(getRankColor('Climate Champion')).toBe('#22C55E');
      expect(getRankColor('Earth Guardian')).toBe('#16A34A');
      expect(getRankColor('Planet Protector')).toBe('#15803D');
    });

    it('should return default color for unknown rank', () => {
      expect(getRankColor('Unknown')).toBe('#22C55E');
    });
  });

  describe('getStatusColor', () => {
    it('should return correct colors for machine statuses', () => {
      expect(getStatusColor('online')).toBe('#22C55E');
      expect(getStatusColor('offline')).toBe('#EF4444');
      expect(getStatusColor('maintenance')).toBe('#F59E0B');
      expect(getStatusColor('full')).toBe('#F97316');
    });

    it('should return default for unknown status', () => {
      expect(getStatusColor('unknown')).toBe('#94A3B8');
    });
  });

  describe('getRarityColor', () => {
    it('should return correct colors for rarities', () => {
      expect(getRarityColor('common')).toBe('#94A3B8');
      expect(getRarityColor('rare')).toBe('#3B82F6');
      expect(getRarityColor('epic')).toBe('#A855F7');
      expect(getRarityColor('legendary')).toBe('#F59E0B');
    });

    it('should return default for unknown rarity', () => {
      expect(getRarityColor('mythic')).toBe('#94A3B8');
    });
  });

  describe('cn', () => {
    it('should combine class names', () => {
      expect(cn('a', 'b', 'c')).toBe('a b c');
    });

    it('should filter falsy values', () => {
      expect(cn('a', undefined, 'b', null, 'c', false)).toBe('a b c');
    });

    it('should return empty string for no classes', () => {
      expect(cn()).toBe('');
    });

    it('should handle single class', () => {
      expect(cn('only')).toBe('only');
    });
  });
});
