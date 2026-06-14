import { describe, it, expect, vi, beforeEach } from 'vitest';
import { middleware } from '@/middleware';
import { NextRequest } from 'next/server';

vi.mock('next/server', () => ({
  NextResponse: {
    next: vi.fn(() => 'NEXT'),
    redirect: vi.fn((url) => `REDIRECT:${url.toString()}`),
  },
}));

describe('Middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function createRequest(pathname: string, sessionCookie?: string) {
    return {
      nextUrl: { pathname },
      url: `http://localhost:3000${pathname}`,
      cookies: {
        get: vi.fn((name) => (name === 'thadam-session' && sessionCookie ? { value: sessionCookie } : undefined)),
      },
    } as unknown as NextRequest;
  }

  it('should allow public routes', async () => {
    const req = createRequest('/');
    const result = await middleware(req);
    expect(result).toBe('NEXT');
  });

  it('should redirect protected routes if no session', async () => {
    const req = createRequest('/dashboard');
    const result = await middleware(req);
    expect(result).toBe('REDIRECT:http://localhost:3000/');
  });

  it('should allow protected routes if session exists', async () => {
    const req = createRequest('/dashboard', 'valid-session');
    const result = await middleware(req);
    expect(result).toBe('NEXT');
  });

  it('should protect deep sub-routes', async () => {
    const req = createRequest('/admin/users');
    const result = await middleware(req);
    expect(result).toBe('REDIRECT:http://localhost:3000/');
  });
});
