// ============================================
// THADAM AI — Gemini Chat API
// POST /api/gemini/chat
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { geminiChatSchema } from '@/lib/validations';
import { chat } from '@/services/gemini.service';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limit — stricter for AI calls
    const rateLimited = checkRateLimit(getClientIdentifier(request), {
      maxRequests: 15,
      windowSeconds: 60,
    });
    if (rateLimited) return rateLimited;

    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const body = await request.json();
    const parsed = geminiChatSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await chat(
      parsed.data.message,
      parsed.data.conversationHistory,
      authResult.user.firebaseUid,
    );

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('[Gemini Chat] Error:', error);
    return NextResponse.json(
      { error: 'AI service unavailable' },
      { status: 503 },
    );
  }
}
