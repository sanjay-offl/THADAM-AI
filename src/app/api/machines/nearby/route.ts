// ============================================
// THADAM AI — Nearby Machines API
// POST /api/machines/nearby
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-helpers';
import { nearbyMachinesSchema } from '@/lib/validations';
import { findNearbyMachines } from '@/services/machine.service';

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const body = await request.json();
    const parsed = nearbyMachinesSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const machines = await findNearbyMachines(
      parsed.data.latitude,
      parsed.data.longitude,
      parsed.data.radiusKm,
    );

    return NextResponse.json({
      success: true,
      machines,
      count: machines.length,
    });
  } catch (error) {
    console.error('[Nearby Machines] Error:', error);
    return NextResponse.json(
      { error: 'Failed to find nearby machines' },
      { status: 500 },
    );
  }
}
