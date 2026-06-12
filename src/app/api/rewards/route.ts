// ============================================
// THADAM AI — Rewards API
// GET /api/rewards — Get reward summary
// POST /api/rewards — Earn reward points
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { earnPoints, getRewardSummary } from '@/services/reward.service';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const summary = await getRewardSummary(authResult.user.id);

    return NextResponse.json({
      success: true,
      ...summary,
    });
  } catch (error) {
    console.error('[Rewards] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rewards' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const body = await request.json();
    const { points, type } = body;

    if (!points || !type || points <= 0) {
      return NextResponse.json(
        { error: 'Invalid input', message: 'points (positive number) and type are required' },
        { status: 400 },
      );
    }

    const result = await earnPoints(authResult.user.id, points, type);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('[Rewards Earn] Error:', error);
    return NextResponse.json(
      { error: 'Failed to earn points' },
      { status: 500 },
    );
  }
}
