import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((body, init) => ({ body, init })),
  },
}));

describe('Rate Limiter', () => {
  beforeEach(() => {
    // Reset rate limit store before each test if possible
    // Wait, it's an internal Map. We can test it by using unique keys.
    vi.clearAllMocks();
  });

  it('should allow requests under the limit', () => {
    const key = `test-ip-${Date.now()}`;
    const result = checkRateLimit(key, { maxRequests: 2 });
    expect(result).toBeNull();
    
    const result2 = checkRateLimit(key, { maxRequests: 2 });
    expect(result2).toBeNull();
  });

  it('should block requests over the limit', () => {
    const key = `blocked-ip-${Date.now()}`;
    checkRateLimit(key, { maxRequests: 1 });
    const result = checkRateLimit(key, { maxRequests: 1 });
    
    expect(result).not.toBeNull();
    expect((result as any).init.status).toBe(429);
    expect((result as any).body.error).toBe('Too Many Requests');
  });

  it('should extract client identifier correctly', () => {
    const reqWithForwarded = {
      headers: { get: (k: string) => k === 'x-forwarded-for' ? '1.2.3.4, 5.6.7.8' : null }
    } as unknown as Request;
    expect(getClientIdentifier(reqWithForwarded)).toBe('1.2.3.4');

    const reqWithRealIp = {
      headers: { get: (k: string) => k === 'x-real-ip' ? '10.0.0.1' : null }
    } as unknown as Request;
    expect(getClientIdentifier(reqWithRealIp)).toBe('10.0.0.1');

    const reqEmpty = {
      headers: { get: () => null }
    } as unknown as Request;
    expect(getClientIdentifier(reqEmpty)).toBe('unknown');
  });
});
