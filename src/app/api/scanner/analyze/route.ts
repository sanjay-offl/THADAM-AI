// ============================================
// THADAM AI — Scanner Analyze API
// POST /api/scanner/analyze
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { scannerAnalyzeSchema } from '@/lib/validations';
import { analyzeWasteImage } from '@/services/scanner.service';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Strict rate limit for vision API
    const rateLimited = checkRateLimit(getClientIdentifier(request), {
      maxRequests: 10,
      windowSeconds: 60,
    });
    if (rateLimited) return rateLimited;

    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const body = await request.json();
    const parsed = scannerAnalyzeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await analyzeWasteImage(parsed.data.image, parsed.data.mimeType);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('[Scanner] Error:', error);
    return NextResponse.json(
      { error: 'Scanner service unavailable' },
      { status: 503 },
    );
  }
}
