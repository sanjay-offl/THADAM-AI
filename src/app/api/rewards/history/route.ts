// ============================================
// THADAM AI — Reward History API
// GET /api/rewards/history
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { getRewardHistory } from '@/services/reward.service';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const history = await getRewardHistory(authResult.user.id, limit);

    return NextResponse.json({
      success: true,
      history,
      count: history.length,
    });
  } catch (error) {
    console.error('[Reward History] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reward history' },
      { status: 500 },
    );
  }
}
