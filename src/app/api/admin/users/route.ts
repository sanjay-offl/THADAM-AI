// ============================================
// THADAM AI — Admin Users API
// GET /api/admin/users
// PATCH /api/admin/users
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth-helpers';
import { adminUserUpdateSchema } from '@/lib/validations';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if ('error' in authResult) return authResult.error;

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firebaseUid: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          carbonScore: true,
          rewardPoints: true,
          ecoRank: true,
          createdAt: true,
          _count: {
            select: {
              carbonAssessments: true,
              rewards: true,
              machineTransactions: true,
            },
          },
        },
      }),
      prisma.user.count(),
    ]);

    return NextResponse.json({
      success: true,
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[Admin Users] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await requireAdmin(request);
    if ('error' in authResult) return authResult.error;

    const body = await request.json();
    const parsed = adminUserUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation Error', details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const updateData: Record<string, string> = {};
    if (parsed.data.role) updateData.role = parsed.data.role;
    if (parsed.data.ecoRank) updateData.ecoRank = parsed.data.ecoRank;

    const user = await prisma.user.update({
      where: { id: parsed.data.userId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('[Admin User Update] Error:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 },
    );
  }
}
