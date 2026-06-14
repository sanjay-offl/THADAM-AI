import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllMachines, getMachineById, findNearbyMachines, createMachine, updateMachineStatus, processTransaction } from '@/services/machine.service';
import prisma from '@/lib/prisma';
import * as mqtt from '@/lib/mqtt';
import * as rewardService from '@/services/reward.service';

vi.mock('@/lib/prisma', () => ({
  default: {
    machine: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    machineTransaction: {
      create: vi.fn(),
    },
  },
}));

vi.mock('@/lib/firebase-admin', () => ({
  adminFirestore: {
    collection: vi.fn(() => ({
      add: vi.fn(),
    })),
  },
}));

vi.mock('@/lib/mqtt', () => ({
  publish: vi.fn(),
  MQTT_TOPICS: {
    MACHINE_STATUS: 'thadam/machine/status',
    MACHINE_REWARD: 'thadam/machine/reward',
  },
}));

vi.mock('@/services/reward.service', () => ({
  calculateRewardPoints: vi.fn(),
  earnPoints: vi.fn(),
}));

describe('Machine Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllMachines', () => {
    it('should return all machines', async () => {
      const mockMachines = [{ id: '1', name: 'Machine 1' }];
      vi.mocked(prisma.machine.findMany).mockResolvedValueOnce(mockMachines as any);

      const result = await getAllMachines();
      expect(prisma.machine.findMany).toHaveBeenCalled();
      expect(result).toEqual(mockMachines);
    });
  });

  describe('findNearbyMachines', () => {
    it('should calculate distance and return nearby machines', async () => {
      // 1 deg latitude is ~111km
      const mockMachines = [
        { id: '1', latitude: 10, longitude: 10, status: 'online' },
        { id: '2', latitude: 10.5, longitude: 10.5, status: 'online' }, // far away
      ];
      vi.mocked(prisma.machine.findMany).mockResolvedValueOnce(mockMachines as any);

      const result = await findNearbyMachines(10, 10, 10);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
      expect(result[0].distanceKm).toBe(0);
    });
  });

  describe('createMachine', () => {
    it('should create machine and log to firestore', async () => {
      const mockInput = { name: 'M1', location: 'L1', latitude: 1, longitude: 1, status: 'online' as const, capacity: 100 };
      const mockMachine = { id: 'm-1', ...mockInput };
      vi.mocked(prisma.machine.create).mockResolvedValueOnce(mockMachine as any);

      const result = await createMachine(mockInput);
      expect(prisma.machine.create).toHaveBeenCalled();
      expect(result).toEqual(mockMachine);
    });
  });

  describe('updateMachineStatus', () => {
    it('should update status and publish mqtt', async () => {
      const mockMachine = { id: 'm-1', name: 'M1', status: 'maintenance' };
      vi.mocked(prisma.machine.update).mockResolvedValueOnce(mockMachine as any);

      const result = await updateMachineStatus('m-1', 'maintenance');
      expect(prisma.machine.update).toHaveBeenCalled();
      expect(mqtt.publish).toHaveBeenCalledWith(mqtt.MQTT_TOPICS.MACHINE_STATUS, expect.any(Object));
      expect(result).toEqual(mockMachine);
    });
  });

  describe('processTransaction', () => {
    it('should create transaction and award points', async () => {
      const mockInput = { machineId: 'm-1', wasteType: 'plastic', weight: 2 };
      const mockTransaction = { id: 't-1' };
      
      vi.mocked(rewardService.calculateRewardPoints).mockReturnValue(20);
      vi.mocked(prisma.machineTransaction.create).mockResolvedValueOnce(mockTransaction as any);
      vi.mocked(rewardService.earnPoints).mockResolvedValueOnce({ totalPoints: 100 } as any);

      const result = await processTransaction('user-1', mockInput);

      expect(rewardService.calculateRewardPoints).toHaveBeenCalledWith('plastic', 2);
      expect(prisma.machineTransaction.create).toHaveBeenCalled();
      expect(rewardService.earnPoints).toHaveBeenCalledWith('user-1', 20, 'machine:plastic');
      expect(mqtt.publish).toHaveBeenCalledWith(mqtt.MQTT_TOPICS.MACHINE_REWARD, expect.any(Object));
      
      expect(result.transaction).toEqual(mockTransaction);
      expect(result.rewardPoints).toBe(20);
      expect(result.totalPoints).toBe(100);
    });
  });
});
