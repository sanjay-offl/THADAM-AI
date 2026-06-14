import { describe, it, expect, vi, beforeEach } from 'vitest';
import { calculateRewardPoints, earnPoints, redeemPoints, getRewardSummary } from '@/services/reward.service';
import prisma from '@/lib/prisma';

vi.mock('@/lib/prisma', () => ({
  default: {
    reward: {
      create: vi.fn(),
      findMany: vi.fn(),
      aggregate: vi.fn(),
    },
    user: {
      update: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

vi.mock('@/lib/firebase-admin', () => ({
  adminFirestore: {
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        update: vi.fn(),
      })),
    })),
  },
}));

describe('Reward Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('calculateRewardPoints', () => {
    it('should calculate points based on waste type and weight', () => {
      expect(calculateRewardPoints('plastic', 2)).toBe(20);
      expect(calculateRewardPoints('electronic', 1.5)).toBe(30);
      expect(calculateRewardPoints('unknown', 10)).toBe(20); // rate 2
    });
  });

  describe('earnPoints', () => {
    it('should create reward, update user points, and sync to firestore', async () => {
      const mockReward = { id: 'r-1', points: 20 };
      const mockUser = { rewardPoints: 120, firebaseUid: 'fb-user-1' };

      vi.mocked(prisma.reward.create).mockResolvedValueOnce(mockReward as any);
      vi.mocked(prisma.user.update).mockResolvedValueOnce(mockUser as any);

      const result = await earnPoints('user-1', 20, 'scan');

      expect(prisma.reward.create).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalled();
      expect(result.reward).toEqual(mockReward);
      expect(result.totalPoints).toBe(120);
    });
  });

  describe('redeemPoints', () => {
    it('should redeem points if sufficient balance', async () => {
      const mockUser = { rewardPoints: 100, firebaseUid: 'fb-user-1' };
      const mockReward = { id: 'r-2', points: -50 };
      const mockUpdatedUser = { rewardPoints: 50 };

      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(mockUser as any);
      vi.mocked(prisma.reward.create).mockResolvedValueOnce(mockReward as any);
      vi.mocked(prisma.user.update).mockResolvedValueOnce(mockUpdatedUser as any);

      const result = await redeemPoints('user-1', 50, 'voucher');

      expect(prisma.reward.create).toHaveBeenCalled();
      expect(result.remainingPoints).toBe(50);
    });

    it('should throw error if insufficient balance', async () => {
      const mockUser = { rewardPoints: 10, firebaseUid: 'fb-user-1' };
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(mockUser as any);

      await expect(redeemPoints('user-1', 50, 'voucher')).rejects.toThrow('Insufficient points');
    });
  });

  describe('getRewardSummary', () => {
    it('should return reward summary for user', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({ rewardPoints: 50 } as any);
      vi.mocked(prisma.reward.aggregate)
        .mockResolvedValueOnce({ _sum: { points: 100 }, _count: 2 } as any) // earned
        .mockResolvedValueOnce({ _sum: { points: -50 }, _count: 1 } as any); // redeemed

      const result = await getRewardSummary('user-1');

      expect(result.currentBalance).toBe(50);
      expect(result.totalEarned).toBe(100);
      expect(result.totalRedeemed).toBe(50);
      expect(result.totalTransactions).toBe(3);
    });
  });
});
