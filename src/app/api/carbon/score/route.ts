// ============================================
// THADAM AI — Carbon Score API
// GET /api/carbon/score
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { getCarbonScore } from '@/services/carbon.service';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const score = await getCarbonScore(authResult.user.id);

    return NextResponse.json({
      success: true,
      ...score,
    });
  } catch (error) {
    console.error('[Carbon Score] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch score' },
      { status: 500 },
    );
  }
}
