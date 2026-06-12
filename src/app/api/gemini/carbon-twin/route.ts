// ============================================
// THADAM AI — Gemini Carbon Twin API
// POST /api/gemini/carbon-twin
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { getCarbonTwinAnalysis } from '@/services/gemini.service';
import { getCarbonScore } from '@/services/carbon.service';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const rateLimited = checkRateLimit(getClientIdentifier(request), {
      maxRequests: 5,
      windowSeconds: 60,
    });
    if (rateLimited) return rateLimited;

    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    // Get user's latest assessment for category breakdown
    const latestAssessment = await prisma.carbonAssessment.findFirst({
      where: { userId: authResult.user.id },
      orderBy: { createdAt: 'desc' },
    });

    const scoreData = await getCarbonScore(authResult.user.id);

    const categories = latestAssessment
      ? {
          transportation: latestAssessment.transportation,
          electricity: latestAssessment.electricity,
          food: latestAssessment.food,
          shopping: latestAssessment.shopping,
          waste: latestAssessment.waste,
        }
      : {
          transportation: 0,
          electricity: 0,
          food: 0,
          shopping: 0,
          waste: 0,
        };

    const currentFootprint = latestAssessment?.totalCarbon || 0;

    const analysis = await getCarbonTwinAnalysis(currentFootprint, categories);

    return NextResponse.json({
      success: true,
      currentScore: scoreData.carbonScore,
      ecoRank: scoreData.ecoRank,
      ...analysis,
    });
  } catch (error) {
    console.error('[Carbon Twin] Error:', error);
    return NextResponse.json(
      { error: 'AI analysis unavailable' },
      { status: 503 },
    );
  }
}
