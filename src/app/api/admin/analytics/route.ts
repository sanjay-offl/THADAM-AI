// ============================================
// THADAM AI — Admin Analytics API
// GET /api/admin/analytics
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if ('error' in authResult) return authResult.error;

    // Aggregate metrics
    const [
      totalUsers,
      totalAssessments,
      totalRewards,
      totalMachines,
      totalTransactions,
      carbonAgg,
      rewardAgg,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.carbonAssessment.count(),
      prisma.reward.count(),
      prisma.machine.count(),
      prisma.machineTransaction.count(),
      prisma.carbonAssessment.aggregate({
        _sum: { totalCarbon: true },
        _avg: { totalCarbon: true },
      }),
      prisma.reward.aggregate({
        where: { points: { gt: 0 } },
        _sum: { points: true },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // last 30 days
          },
        },
      }),
    ]);

    const totalCarbonTracked = carbonAgg._sum.totalCarbon || 0;
    const avgCarbon = carbonAgg._avg.totalCarbon || 0;
    const totalRewardPoints = rewardAgg._sum.points || 0;

    // Baseline: 500kg/month, so carbon saved = baseline * assessments - actual
    const baselineTotal = totalAssessments * 500;
    const carbonSaved = Math.max(0, baselineTotal - totalCarbonTracked);

    return NextResponse.json({
      success: true,
      metrics: {
        totalUsers,
        newUsersLast30Days: recentUsers,
        totalAssessments,
        totalRewards,
        totalRewardPoints,
        totalMachines,
        totalTransactions,
        totalCarbonTracked: parseFloat(totalCarbonTracked.toFixed(2)),
        averageCarbonPerAssessment: parseFloat(avgCarbon.toFixed(2)),
        carbonSaved: parseFloat(carbonSaved.toFixed(2)),
        treesEquivalent: Math.round(carbonSaved / 22),
      },
    });
  } catch (error) {
    console.error('[Admin Analytics] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 },
    );
  }
}
