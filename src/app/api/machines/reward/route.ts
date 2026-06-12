// ============================================
// THADAM AI — Machine Reward (Transaction) API
// POST /api/machines/reward
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { machineTransactionSchema } from '@/lib/validations';
import { processTransaction } from '@/services/machine.service';
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const rateLimited = checkRateLimit(getClientIdentifier(request), {
      maxRequests: 10,
      windowSeconds: 60,
    });
    if (rateLimited) return rateLimited;

    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const body = await request.json();
    const parsed = machineTransactionSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const result = await processTransaction(authResult.user.id, parsed.data);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error('[Machine Reward] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process transaction' },
      { status: 500 },
    );
  }
}
