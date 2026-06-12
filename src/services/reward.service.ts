// ============================================
// THADAM AI — Reward Service
// ============================================

import prisma from '@/lib/prisma';
import { adminFirestore } from '@/lib/firebase-admin';

// ---- Reward Point Rates ----
const WASTE_REWARD_RATES: Record<string, number> = {
  plastic: 10,
  paper: 5,
  glass: 8,
  metal: 12,
  electronic: 20,
  organic: 3,
  textile: 7,
  other: 2,
};

/**
 * Calculate reward points based on waste type and weight
 */
export function calculateRewardPoints(wasteType: string, weightKg: number): number {
  const rate = WASTE_REWARD_RATES[wasteType.toLowerCase()] || WASTE_REWARD_RATES.other;
  return Math.round(rate * weightKg);
}

/**
 * Earn reward points for a user
 */
export async function earnPoints(
  userId: string,
  points: number,
  type: string,
): Promise<{ reward: typeof reward; totalPoints: number }> {
  // Create reward entry
  const reward = await prisma.reward.create({
    data: {
      userId,
      points,
      type,
    },
  });

  // Update user's total reward points
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      rewardPoints: { increment: points },
    },
    select: { rewardPoints: true, firebaseUid: true },
  });

  // Sync to Firestore
  try {
    await adminFirestore.collection('users').doc(updatedUser.firebaseUid).update({
      rewardPoints: updatedUser.rewardPoints,
    });
  } catch (err) {
    console.error('[Reward Service] Firestore sync failed:', err);
  }

  return {
    reward,
    totalPoints: updatedUser.rewardPoints,
  };
}

/**
 * Redeem reward points
 */
export async function redeemPoints(
  userId: string,
  points: number,
  type: string,
): Promise<{ reward: typeof reward; remainingPoints: number }> {
  // Check balance
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { rewardPoints: true, firebaseUid: true },
  });

  if (!user) throw new Error('User not found');
  if (user.rewardPoints < points) {
    throw new Error(`Insufficient points. Available: ${user.rewardPoints}, Required: ${points}`);
  }

  // Create redemption record
  const reward = await prisma.reward.create({
    data: {
      userId,
      points: -points,
      type: `redeem:${type}`,
      redeemed: true,
    },
  });

  // Deduct points
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      rewardPoints: { decrement: points },
    },
    select: { rewardPoints: true },
  });

  // Sync to Firestore
  try {
    await adminFirestore.collection('users').doc(user.firebaseUid).update({
      rewardPoints: updatedUser.rewardPoints,
    });
  } catch (err) {
    console.error('[Reward Service] Firestore sync failed:', err);
  }

  return {
    reward,
    remainingPoints: updatedUser.rewardPoints,
  };
}

/**
 * Get reward history for a user
 */
export async function getRewardHistory(userId: string, limit = 50) {
  return prisma.reward.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Get reward summary for a user
 */
export async function getRewardSummary(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { rewardPoints: true },
  });

  const earned = await prisma.reward.aggregate({
    where: { userId, points: { gt: 0 } },
    _sum: { points: true },
    _count: true,
  });

  const redeemed = await prisma.reward.aggregate({
    where: { userId, redeemed: true },
    _sum: { points: true },
    _count: true,
  });

  return {
    currentBalance: user?.rewardPoints || 0,
    totalEarned: earned._sum.points || 0,
    totalRedeemed: Math.abs(redeemed._sum.points || 0),
    totalTransactions: earned._count + redeemed._count,
  };
}
