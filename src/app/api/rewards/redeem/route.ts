// ============================================
// THADAM AI — Redeem Rewards API
// POST /api/rewards/redeem
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { redeemRewardSchema } from '@/lib/validations';
import { redeemPoints } from '@/services/reward.service';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const rateLimited = checkRateLimit(getClientIdentifier(request), {
      maxRequests: 5,
      windowSeconds: 60,
    });
    if (rateLimited) return rateLimited;

    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const body = await request.json();
    const parsed = redeemRewardSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await redeemPoints(
      authResult.user.id,
      parsed.data.points,
      parsed.data.type,
    );

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to redeem';
    const status = message.includes('Insufficient') ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
