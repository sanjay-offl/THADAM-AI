import { describe, it, expect, vi } from 'vitest';
import { calculateCarbonScore, getEcoRank, calculateTotalCarbon, createAssessment, getCarbonScore } from '@/services/carbon.service';
import prisma from '@/lib/prisma';

vi.mock('@/lib/prisma', () => ({
  default: {
    carbonAssessment: {
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
      add: vi.fn(),
      doc: vi.fn(() => ({
        update: vi.fn(),
      })),
    })),
  },
}));

describe('Carbon Service', () => {
  const mockInput = {
    transportation: 100, // 100km -> 21kg
    electricity: 100, // 100kWh -> 82kg
    food: 10, // score 10 -> 5kg
    shopping: 10, // score 10 -> 3kg
    waste: 10, // 10kg -> 7kg
  }; // Total: 21 + 82 + 5 + 3 + 7 = 118kg CO2

  describe('calculateTotalCarbon', () => {
    it('should calculate total carbon correctly', () => {
      expect(calculateTotalCarbon(mockInput)).toBe(118);
    });
  });

  describe('calculateCarbonScore', () => {
    it('should calculate score based on national average', () => {
      const score = calculateCarbonScore(mockInput);
      // Average is 500. Total is 118.
      // Math.max(0, Math.min(100, Math.round(100 * (1 - 118 / (500 * 2)))))
      // 1 - 118/1000 = 1 - 0.118 = 0.882 -> 88
      expect(score).toBe(88);
    });
  });

  describe('getEcoRank', () => {
    it('should return correct rank based on score', () => {
      expect(getEcoRank(10)).toBe('Eco Beginner');
      expect(getEcoRank(30)).toBe('Green Warrior');
      expect(getEcoRank(50)).toBe('Climate Champion');
      expect(getEcoRank(70)).toBe('Earth Guardian');
      expect(getEcoRank(90)).toBe('Planet Protector');
      expect(getEcoRank(-1)).toBe('Eco Beginner');
    });
  });

  describe('createAssessment', () => {
    it('should create assessment and update user', async () => {
      vi.mocked(prisma.carbonAssessment.create).mockResolvedValueOnce({ id: '1', ...mockInput, userId: 'user-1', totalCarbon: 118, createdAt: new Date() });
      vi.mocked(prisma.user.update).mockResolvedValueOnce({} as any);
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({ firebaseUid: 'firebase-user-1' } as any);

      const result = await createAssessment('user-1', mockInput);

      expect(result.totalCarbon).toBe(118);
      expect(result.carbonScore).toBe(88);
      expect(result.ecoRank).toBe('Planet Protector');
      expect(prisma.carbonAssessment.create).toHaveBeenCalled();
      expect(prisma.user.update).toHaveBeenCalled();
    });
  });

  describe('getCarbonScore', () => {
    it('should get score and calculate carbon saved', async () => {
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({ carbonScore: 88, ecoRank: 'Planet Protector' } as any);
      vi.mocked(prisma.carbonAssessment.aggregate).mockResolvedValueOnce({ _sum: { totalCarbon: 118 }, _count: 1 } as any);

      const result = await getCarbonScore('user-1');
      expect(result.carbonScore).toBe(88);
      expect(result.ecoRank).toBe('Planet Protector');
      expect(result.totalAssessments).toBe(1);
      // 500 - 118 = 382
      expect(result.carbonSaved).toBe(382);
    });
  });
});
