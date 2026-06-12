// ============================================
// THADAM AI — Machine Status API
// PATCH /api/machines/status
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { updateMachineStatusSchema } from '@/lib/validations';
import { updateMachineStatus } from '@/services/machine.service';

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if ('error' in authResult) return authResult.error;

    const body = await request.json();
    const parsed = updateMachineStatusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const machine = await updateMachineStatus(parsed.data.machineId, parsed.data.status);

    return NextResponse.json({
      success: true,
      machine,
    });
  } catch (error) {
    console.error('[Machine Status] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update machine status' },
      { status: 500 },
    );
  }
}
