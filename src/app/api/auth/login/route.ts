// ============================================
// THADAM AI — Auth Login API
// POST /api/auth/login
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations';
import { handleGoogleLogin } from '@/services/auth.service';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // 1. Verify required environment variables
    const missingEnv = [];
    if (!process.env.DATABASE_URL) {
      console.warn('[Auth Login] DATABASE_URL is missing in environment. Using fallback SQLite path.');
    }
    if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
      missingEnv.push('NEXT_PUBLIC_FIREBASE_PROJECT_ID');
    }
    
    if (missingEnv.length > 0) {
      console.error(`[Auth Login] Missing critical environment variables: ${missingEnv.join(', ')}`);
      return NextResponse.json(
        { 
          error: 'Configuration Error', 
          message: `The server is missing required configuration: ${missingEnv.join(', ')}. Please verify server configuration settings.` 
        },
        { status: 500 }
      );
    }

    // 2. Verify database connection is healthy
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (dbError: any) {
      console.error('[Auth Login] Database connection failed:', dbError);
      return NextResponse.json(
        {
          error: 'Database Error',
          message: 'Failed to connect to the database. Please verify your database connection string and state.',
          details: dbError.message
        },
        { status: 503 }
      );
    }

    // 3. Rate limit
    const rateLimited = checkRateLimit(getClientIdentifier(request), {
      maxRequests: 10,
      windowSeconds: 60,
    });
    if (rateLimited) return rateLimited;

    const body = await request.json();

    // 4. Validate input
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
