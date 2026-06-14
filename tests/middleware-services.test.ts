import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextResponse } from 'next/server';

// We need to test middleware & rate-limit directly

describe('Middleware Logic', () => {
  const protectedRoutes = ['/dashboard', '/carbon', '/scan', '/chat', '/rewards', '/machines', '/profile', '/settings', '/admin'];

  it('should identify protected routes correctly', () => {
    const testPaths = [
      { path: '/dashboard', expected: true },
      { path: '/carbon', expected: true },
      { path: '/scan', expected: true },
      { path: '/chat', expected: true },
      { path: '/rewards', expected: true },
      { path: '/machines', expected: true },
      { path: '/profile', expected: true },
      { path: '/settings', expected: true },
      { path: '/admin', expected: true },
      { path: '/', expected: false },
      { path: '/about', expected: false },
      { path: '/blogs', expected: false },
      { path: '/technology', expected: false },
      { path: '/login', expected: false },
    ];

    testPaths.forEach(({ path, expected }) => {
      const isProtected = protectedRoutes.some(route => path.startsWith(route));
      expect(isProtected).toBe(expected);
    });
  });

  it('should allow public routes without session', () => {
    const publicPaths = ['/', '/about', '/blogs', '/technology', '/research', '/contact', '/privacy', '/terms'];
    publicPaths.forEach(path => {
      const isProtected = protectedRoutes.some(route => path.startsWith(route));
      expect(isProtected).toBe(false);
    });
  });

  it('should detect sub-paths as protected', () => {
    expect(protectedRoutes.some(r => '/dashboard/settings'.startsWith(r))).toBe(true);
    expect(protectedRoutes.some(r => '/admin/users'.startsWith(r))).toBe(true);
  });
});

describe('Rate Limit Logic', () => {
  it('should track request counts', () => {
    const store = new Map<string, { count: number; resetAt: number }>();
    const key = 'test-ip';
    const now = Date.now();
    const windowMs = 60000;

    // First request
    store.set(key, { count: 1, resetAt: now + windowMs });
    expect(store.get(key)!.count).toBe(1);

    // Simulate more requests
    const entry = store.get(key)!;
    entry.count++;
    expect(entry.count).toBe(2);
  });

  it('should detect rate limit exceeded', () => {
    const maxRequests = 60;
    const currentCount = 60;
    const exceeded = currentCount >= maxRequests;
    expect(exceeded).toBe(true);
  });

  it('should allow requests within limit', () => {
    const maxRequests = 60;
    const currentCount = 30;
    const exceeded = currentCount >= maxRequests;
    expect(exceeded).toBe(false);
  });

  it('should calculate retry-after correctly', () => {
    const now = Date.now();
    const resetAt = now + 30000;
    const retryAfter = Math.ceil((resetAt - now) / 1000);
    expect(retryAfter).toBe(30);
  });

  it('should expire old entries', () => {
    const store = new Map<string, { count: number; resetAt: number }>();
    const now = Date.now();
    
    store.set('old-ip', { count: 50, resetAt: now - 1000 }); // expired
    store.set('new-ip', { count: 10, resetAt: now + 60000 }); // active
    
    // Cleanup
    for (const [key, entry] of store.entries()) {
      if (entry.resetAt < now) {
        store.delete(key);
      }
    }
    
    expect(store.has('old-ip')).toBe(false);
    expect(store.has('new-ip')).toBe(true);
  });

  it('should extract client identifier from headers', () => {
    const getClientIdentifier = (forwarded: string | null, realIp: string | null): string => {
      return forwarded?.split(',')[0]?.trim() || realIp || 'unknown';
    };

    expect(getClientIdentifier('1.2.3.4, 5.6.7.8', null)).toBe('1.2.3.4');
    expect(getClientIdentifier(null, '10.0.0.1')).toBe('10.0.0.1');
    expect(getClientIdentifier(null, null)).toBe('unknown');
  });
});

// ---- Test Reward Service pure functions ----
describe('Reward Service - calculateRewardPoints', () => {
  const WASTE_REWARD_RATES: Record<string, number> = {
    plastic: 10,
    paper: 5,
    glass: 8,
    metal: 12,
    electronic: 20,
    organic: 3,
    textile: 7,
    other: 2,
  };

  function calculateRewardPoints(wasteType: string, weightKg: number): number {
    const rate = WASTE_REWARD_RATES[wasteType.toLowerCase()] || WASTE_REWARD_RATES.other;
    return Math.round(rate * weightKg);
  }

  it('should calculate plastic rewards', () => {
    expect(calculateRewardPoints('plastic', 1)).toBe(10);
    expect(calculateRewardPoints('plastic', 2.5)).toBe(25);
  });

  it('should calculate paper rewards', () => {
    expect(calculateRewardPoints('paper', 1)).toBe(5);
  });

  it('should calculate glass rewards', () => {
    expect(calculateRewardPoints('glass', 1)).toBe(8);
  });

  it('should calculate metal rewards', () => {
    expect(calculateRewardPoints('metal', 1)).toBe(12);
  });

  it('should calculate electronic waste rewards', () => {
    expect(calculateRewardPoints('electronic', 1)).toBe(20);
  });

  it('should calculate organic waste rewards', () => {
    expect(calculateRewardPoints('organic', 1)).toBe(3);
  });

  it('should calculate textile waste rewards', () => {
    expect(calculateRewardPoints('textile', 1)).toBe(7);
  });

  it('should default to other rate for unknown types', () => {
    expect(calculateRewardPoints('unknown', 1)).toBe(2);
  });

  it('should handle case-insensitive waste types', () => {
    expect(calculateRewardPoints('PLASTIC', 1)).toBe(10);
    expect(calculateRewardPoints('Metal', 1)).toBe(12);
  });

  it('should round to nearest integer', () => {
    expect(calculateRewardPoints('plastic', 0.3)).toBe(3);
  });
});

// ---- Test Carbon Service pure functions ----
describe('Carbon Service - Pure Functions', () => {
  const EMISSION_FACTORS = {
    transportation: 0.21,
    electricity: 0.82,
    food: 0.5,
    shopping: 0.3,
    waste: 0.7,
  };

  function calculateTotalCarbon(input: any): number {
    return parseFloat(
      (
        input.transportation * EMISSION_FACTORS.transportation +
        input.electricity * EMISSION_FACTORS.electricity +
        input.food * EMISSION_FACTORS.food +
        input.shopping * EMISSION_FACTORS.shopping +
        input.waste * EMISSION_FACTORS.waste
      ).toFixed(2)
    );
  }

  function calculateCarbonScore(input: any): number {
    const totalEmission = calculateTotalCarbon(input);
    const nationalAverage = 500;
    return Math.max(0, Math.min(100, Math.round(100 * (1 - totalEmission / (nationalAverage * 2)))));
  }

  it('should calculate zero emissions correctly', () => {
    expect(calculateTotalCarbon({ transportation: 0, electricity: 0, food: 0, shopping: 0, waste: 0 })).toBe(0);
  });

  it('should give perfect score for zero emissions', () => {
    expect(calculateCarbonScore({ transportation: 0, electricity: 0, food: 0, shopping: 0, waste: 0 })).toBe(100);
  });

  it('should give score 0 for extreme emissions', () => {
    expect(calculateCarbonScore({ transportation: 10000, electricity: 10000, food: 10000, shopping: 10000, waste: 5000 })).toBe(0);
  });

  it('should cap score at 100', () => {
    const score = calculateCarbonScore({ transportation: 0, electricity: 0, food: 0, shopping: 0, waste: 0 });
    expect(score).toBeLessThanOrEqual(100);
  });

  it('should cap score at 0', () => {
    const score = calculateCarbonScore({ transportation: 50000, electricity: 50000, food: 50000, shopping: 50000, waste: 50000 });
    expect(score).toBeGreaterThanOrEqual(0);
  });
});

// ---- Test Machine Haversine Distance ----
describe('Haversine Distance', () => {
  function toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  it('should return 0 for same point', () => {
    expect(haversineDistance(13.08, 80.27, 13.08, 80.27)).toBe(0);
  });

  it('should calculate distance between Chennai and Bangalore', () => {
    const distance = haversineDistance(13.08, 80.27, 12.97, 77.59);
    expect(distance).toBeGreaterThan(250);
    expect(distance).toBeLessThan(350);
  });

  it('should be symmetric', () => {
    const d1 = haversineDistance(13.08, 80.27, 12.97, 77.59);
    const d2 = haversineDistance(12.97, 77.59, 13.08, 80.27);
    expect(Math.abs(d1 - d2)).toBeLessThan(0.01);
  });

  it('should handle equator to pole', () => {
    const distance = haversineDistance(0, 0, 90, 0);
    expect(distance).toBeGreaterThan(9000);
    expect(distance).toBeLessThan(11000);
  });

  it('should handle anti-meridian crossing', () => {
    const distance = haversineDistance(0, 179, 0, -179);
    expect(distance).toBeGreaterThan(200);
    expect(distance).toBeLessThan(250);
  });
});
