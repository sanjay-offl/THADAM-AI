// ============================================
// THADAM AI — Gemini Recommendations API
// GET /api/gemini/recommendations
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { getRecommendations } from '@/services/gemini.service';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  try {
    const rateLimited = checkRateLimit(getClientIdentifier(request), {
      maxRequests: 10,
      windowSeconds: 60,
    });
    if (rateLimited) return rateLimited;

    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const result = await getRecommendations(
      authResult.user.carbonScore,
      authResult.user.ecoRank,
    );

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('[Recommendations] Error:', error);
    return NextResponse.json(
      { error: 'AI recommendations unavailable' },
      { status: 503 },
    );
  }
}
