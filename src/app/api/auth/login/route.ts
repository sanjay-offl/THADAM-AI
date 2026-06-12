// ============================================
// THADAM AI — Auth Login API
// POST /api/auth/login
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations';
import { handleGoogleLogin } from '@/services/auth.service';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const rateLimited = checkRateLimit(getClientIdentifier(request), {
      maxRequests: 10,
      windowSeconds: 60,
    });
    if (rateLimited) return rateLimited;

    const body = await request.json();

    // Validate input
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // Handle login
    const user = await handleGoogleLogin(parsed.data.idToken);

    return NextResponse.json({
      success: true,
      user,
      message: 'Login successful',
    });
  } catch (error: any) {
    console.error('[Auth Login] Error:', error);
    return NextResponse.json(
      { error: 'Authentication failed', message: error.message || 'Invalid or expired token', stack: error.stack },
      { status: 500 },
    );
  }
}
