import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  carbonAssessmentSchema,
  redeemRewardSchema,
  createMachineSchema,
  updateMachineStatusSchema,
  nearbyMachinesSchema,
  machineTransactionSchema,
  geminiChatSchema,
  scannerAnalyzeSchema,
  adminUserUpdateSchema,
} from '@/lib/validations';

describe('Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should accept valid login input', () => {
      const result = loginSchema.safeParse({ idToken: 'valid-token-123' });
      expect(result.success).toBe(true);
    });

    it('should reject empty token', () => {
      const result = loginSchema.safeParse({ idToken: '' });
      expect(result.success).toBe(false);
    });

    it('should reject missing token', () => {
      const result = loginSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  describe('carbonAssessmentSchema', () => {
    it('should accept valid assessment', () => {
      const result = carbonAssessmentSchema.safeParse({
        transportation: 100,
        electricity: 200,
        food: 50,
        shopping: 30,
        waste: 10,
      });
      expect(result.success).toBe(true);
    });

    it('should reject negative values', () => {
      const result = carbonAssessmentSchema.safeParse({
        transportation: -1,
        electricity: 200,
        food: 50,
        shopping: 30,
        waste: 10,
      });
      expect(result.success).toBe(false);
    });

    it('should reject values exceeding maximum', () => {
      const result = carbonAssessmentSchema.safeParse({
        transportation: 100,
        electricity: 60000,
        food: 50,
        shopping: 30,
        waste: 10,
      });
      expect(result.success).toBe(false);
    });

    it('should accept zero values', () => {
      const result = carbonAssessmentSchema.safeParse({
        transportation: 0,
        electricity: 0,
        food: 0,
        shopping: 0,
        waste: 0,
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing fields', () => {
      const result = carbonAssessmentSchema.safeParse({
        transportation: 100,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('redeemRewardSchema', () => {
    it('should accept valid redemption', () => {
      const result = redeemRewardSchema.safeParse({
        rewardId: 'reward-1',
        points: 100,
        type: 'voucher',
      });
      expect(result.success).toBe(true);
    });

    it('should reject zero points', () => {
      const result = redeemRewardSchema.safeParse({
        rewardId: 'reward-1',
        points: 0,
        type: 'voucher',
      });
      expect(result.success).toBe(false);
    });

    it('should reject negative points', () => {
      const result = redeemRewardSchema.safeParse({
        rewardId: 'reward-1',
        points: -10,
        type: 'voucher',
      });
      expect(result.success).toBe(false);
    });

    it('should reject non-integer points', () => {
      const result = redeemRewardSchema.safeParse({
        rewardId: 'reward-1',
        points: 10.5,
        type: 'voucher',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('createMachineSchema', () => {
    it('should accept valid machine input', () => {
      const result = createMachineSchema.safeParse({
        name: 'Test Machine',
        location: 'Chennai',
        latitude: 13.08,
        longitude: 80.27,
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid latitude', () => {
      const result = createMachineSchema.safeParse({
        name: 'Test',
        latitude: 100,
        longitude: 80,
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid longitude', () => {
      const result = createMachineSchema.safeParse({
        name: 'Test',
        latitude: 13,
        longitude: 200,
      });
      expect(result.success).toBe(false);
    });

    it('should accept valid status values', () => {
      const statuses = ['online', 'offline', 'maintenance', 'full'];
      statuses.forEach((status) => {
        const result = createMachineSchema.safeParse({
          name: 'Test',
          latitude: 13,
          longitude: 80,
          status,
        });
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid status', () => {
      const result = createMachineSchema.safeParse({
        name: 'Test',
        latitude: 13,
        longitude: 80,
        status: 'broken',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty name', () => {
      const result = createMachineSchema.safeParse({
        name: '',
        latitude: 13,
        longitude: 80,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('updateMachineStatusSchema', () => {
    it('should accept valid status update', () => {
      const result = updateMachineStatusSchema.safeParse({
        machineId: 'machine-1',
        status: 'maintenance',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid status', () => {
      const result = updateMachineStatusSchema.safeParse({
        machineId: 'machine-1',
        status: 'destroyed',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('nearbyMachinesSchema', () => {
    it('should accept valid coordinates', () => {
      const result = nearbyMachinesSchema.safeParse({
        latitude: 13.08,
        longitude: 80.27,
      });
      expect(result.success).toBe(true);
    });

    it('should accept custom radius', () => {
      const result = nearbyMachinesSchema.safeParse({
        latitude: 13.08,
        longitude: 80.27,
        radiusKm: 50,
      });
      expect(result.success).toBe(true);
    });

    it('should reject radius exceeding 100', () => {
      const result = nearbyMachinesSchema.safeParse({
        latitude: 13.08,
        longitude: 80.27,
        radiusKm: 150,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('machineTransactionSchema', () => {
    it('should accept valid transaction', () => {
      const result = machineTransactionSchema.safeParse({
        machineId: 'machine-1',
        wasteType: 'plastic',
        weight: 2.5,
      });
      expect(result.success).toBe(true);
    });

    it('should reject zero weight', () => {
      const result = machineTransactionSchema.safeParse({
        machineId: 'machine-1',
        wasteType: 'plastic',
        weight: 0,
      });
      expect(result.success).toBe(false);
    });

    it('should reject negative weight', () => {
      const result = machineTransactionSchema.safeParse({
        machineId: 'machine-1',
        wasteType: 'plastic',
        weight: -1,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('geminiChatSchema', () => {
    it('should accept valid chat message', () => {
      const result = geminiChatSchema.safeParse({
        message: 'How can I reduce my carbon footprint?',
      });
      expect(result.success).toBe(true);
    });

    it('should accept message with history', () => {
      const result = geminiChatSchema.safeParse({
        message: 'Tell me more',
        conversationHistory: [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Hi!' },
        ],
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty message', () => {
      const result = geminiChatSchema.safeParse({
        message: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject message exceeding max length', () => {
      const result = geminiChatSchema.safeParse({
        message: 'a'.repeat(5001),
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid role in history', () => {
      const result = geminiChatSchema.safeParse({
        message: 'Hello',
        conversationHistory: [
          { role: 'system', content: 'You are a bot' },
        ],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('scannerAnalyzeSchema', () => {
    it('should accept valid scan input', () => {
      const result = scannerAnalyzeSchema.safeParse({
        image: 'base64-encoded-image-data',
      });
      expect(result.success).toBe(true);
    });

    it('should accept valid mime types', () => {
      const types = ['image/jpeg', 'image/png', 'image/webp'];
      types.forEach((mimeType) => {
        const result = scannerAnalyzeSchema.safeParse({
          image: 'base64data',
          mimeType,
        });
        expect(result.success).toBe(true);
      });
    });

    it('should reject empty image', () => {
      const result = scannerAnalyzeSchema.safeParse({
        image: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid mime type', () => {
      const result = scannerAnalyzeSchema.safeParse({
        image: 'base64data',
        mimeType: 'image/gif',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('adminUserUpdateSchema', () => {
    it('should accept valid admin update', () => {
      const result = adminUserUpdateSchema.safeParse({
        userId: 'user-1',
        role: 'admin',
      });
      expect(result.success).toBe(true);
    });

    it('should accept partial update', () => {
      const result = adminUserUpdateSchema.safeParse({
        userId: 'user-1',
        ecoRank: 'Earth Guardian',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid role', () => {
      const result = adminUserUpdateSchema.safeParse({
        userId: 'user-1',
        role: 'superadmin',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing userId', () => {
      const result = adminUserUpdateSchema.safeParse({
        role: 'admin',
      });
      expect(result.success).toBe(false);
    });
  });
});
