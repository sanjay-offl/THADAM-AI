// ============================================
// THADAM AI — Auth Session API
// GET /api/auth/session
// ============================================

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-helpers';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 200 },
      );
    }

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (error) {
    console.error('[Auth Session] Error:', error);
    return NextResponse.json(
      { authenticated: false, user: null },
      { status: 200 },
    );
  }
}
