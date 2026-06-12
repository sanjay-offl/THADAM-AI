// ============================================
// THADAM AI — Auth Logout API
// POST /api/auth/logout
// ============================================

import { NextResponse } from 'next/server';
import { handleLogout } from '@/services/auth.service';

export async function POST() {
  try {
    await handleLogout();

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('[Auth Logout] Error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 },
    );
  }
}
