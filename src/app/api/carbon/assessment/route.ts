// ============================================
// THADAM AI — Carbon Assessment API
// POST /api/carbon/assessment
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { carbonAssessmentSchema } from '@/lib/validations';
import { createAssessment } from '@/services/carbon.service';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const rateLimited = checkRateLimit(getClientIdentifier(request), {
      maxRequests: 20,
      windowSeconds: 60,
    });
    if (rateLimited) return rateLimited;

    // Auth check
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const body = await request.json();

    // Validate
    const parsed = carbonAssessmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // Create assessment
    const result = await createAssessment(authResult.user.id, parsed.data);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('[Carbon Assessment] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create assessment' },
      { status: 500 },
    );
  }
}
