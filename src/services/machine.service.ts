// ============================================
// THADAM AI — Machine Service
// ============================================

import prisma from '@/lib/prisma';
import { adminFirestore } from '@/lib/firebase-admin';
import { publish, MQTT_TOPICS } from '@/lib/mqtt';
import { calculateRewardPoints, earnPoints } from './reward.service';
import type { CreateMachineInput, MachineTransactionInput } from '@/lib/validations';

/**
 * Get all machines
 */
export async function getAllMachines() {
  return prisma.machine.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { transactions: true },
      },
    },
  });
}

/**
 * Get machine by ID
 */
export async function getMachineById(id: string) {
  return prisma.machine.findUnique({
    where: { id },
    include: {
      _count: {
        select: { transactions: true },
      },
    },
  });
}

/**
 * Find nearby machines using Haversine distance formula
 */
export async function findNearbyMachines(lat: number, lng: number, radiusKm = 10) {
  const machines = await prisma.machine.findMany({
    where: {
      status: { not: 'offline' },
    },
  });

  // Calculate distances and filter by radius
  const nearbyMachines = machines
    .map((machine) => {
      const distance = haversineDistance(lat, lng, machine.latitude, machine.longitude);
      return { ...machine, distanceKm: parseFloat(distance.toFixed(2)) };
    })
    .filter((m) => m.distanceKm <= radiusKm)
    .sort((a, b) => a.distanceKm - b.distanceKm);

  return nearbyMachines;
}

/**
 * Create a new machine
 */
export async function createMachine(input: CreateMachineInput) {
  const machine = await prisma.machine.create({
    data: {
      name: input.name,
      location: input.location,
      latitude: input.latitude,
      longitude: input.longitude,
      status: input.status || 'online',
      capacity: input.capacity || 100,
    },
  });

  // Log to Firestore
  try {
    await adminFirestore.collection('machine_logs').add({
      machineId: machine.id,
      event: 'created',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Machine Service] Firestore sync failed:', err);
  }

  return machine;
}

/**
 * Update machine status
 */
export async function updateMachineStatus(machineId: string, status: string) {
  const machine = await prisma.machine.update({
    where: { id: machineId },
    data: { status },
  });

  // Publish status update via MQTT
  try {
    await publish(MQTT_TOPICS.MACHINE_STATUS, {
      machineId: machine.id,
      name: machine.name,
      status: machine.status,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Machine Service] MQTT publish failed:', err);
  }

  // Log to Firestore
  try {
    await adminFirestore.collection('machine_logs').add({
      machineId: machine.id,
      event: 'status_update',
      status: machine.status,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Machine Service] Firestore sync failed:', err);
  }

  return machine;
}

/**
 * Process a machine transaction (waste deposit) and reward the user
 */
export async function processTransaction(userId: string, input: MachineTransactionInput) {
  const points = calculateRewardPoints(input.wasteType, input.weight);

  // Create transaction record
  const transaction = await prisma.machineTransaction.create({
    data: {
      userId,
      machineId: input.machineId,
      wasteType: input.wasteType,
      weight: input.weight,
      rewardPoints: points,
    },
  });

  // Award points to user
  const { totalPoints } = await earnPoints(userId, points, `machine:${input.wasteType}`);

  // Publish reward event via MQTT
  try {
    await publish(MQTT_TOPICS.MACHINE_REWARD, {
      transactionId: transaction.id,
      machineId: input.machineId,
      userId,
      wasteType: input.wasteType,
      weight: input.weight,
      rewardPoints: points,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Machine Service] MQTT reward publish failed:', err);
  }

  return {
    transaction,
    rewardPoints: points,
    totalPoints,
  };
}

// ---- Helper: Haversine Distance (km) ----
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
