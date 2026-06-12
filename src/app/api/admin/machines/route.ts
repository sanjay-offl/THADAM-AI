// ============================================
// THADAM AI — Admin Machines API
// GET /api/admin/machines
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if ('error' in authResult) return authResult.error;

    const machines = await prisma.machine.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { transactions: true },
        },
        transactions: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            wasteType: true,
            weight: true,
            rewardPoints: true,
            createdAt: true,
            user: {
              select: { name: true, email: true },
            },
          },
        },
      },
    });

    // Machine status summary
    const statusCounts = await prisma.machine.groupBy({
      by: ['status'],
      _count: true,
    });

    return NextResponse.json({
      success: true,
      machines,
      count: machines.length,
      statusSummary: statusCounts.reduce(
        (acc, item) => {
          acc[item.status] = item._count;
          return acc;
        },
        {} as Record<string, number>,
      ),
    });
  } catch (error) {
    console.error('[Admin Machines] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch machines' },
      { status: 500 },
    );
  }
}
