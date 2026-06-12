// ============================================
// THADAM AI — Machines API
// GET /api/machines — List all machines
// POST /api/machines — Create machine (admin)
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, requireAdmin } from '@/lib/auth-helpers';
import { createMachineSchema } from '@/lib/validations';
import { getAllMachines, createMachine } from '@/services/machine.service';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) return authResult.error;

    const machines = await getAllMachines();

    return NextResponse.json({
      success: true,
      machines,
      count: machines.length,
    });
  } catch (error) {
    console.error('[Machines] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch machines' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if ('error' in authResult) return authResult.error;

    const body = await request.json();
    const parsed = createMachineSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const machine = await createMachine(parsed.data);

    return NextResponse.json({
      success: true,
      machine,
    }, { status: 201 });
  } catch (error) {
    console.error('[Machines Create] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create machine' },
      { status: 500 },
    );
  }
}
