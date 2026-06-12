// ============================================
// THADAM AI — Carbon Service
// ============================================

import prisma from '@/lib/prisma';
import { adminFirestore } from '@/lib/firebase-admin';
import type { CarbonAssessmentInput } from '@/lib/validations';

// ---- Eco Rank Thresholds ----
const ECO_RANKS = [
  { min: 0, max: 20, rank: 'Eco Beginner' },
  { min: 21, max: 40, rank: 'Green Warrior' },
  { min: 41, max: 60, rank: 'Climate Champion' },
  { min: 61, max: 80, rank: 'Earth Guardian' },
  { min: 81, max: 100, rank: 'Planet Protector' },
] as const;

// ---- Carbon Emission Factors (kgCO2 per unit) ----
const EMISSION_FACTORS = {
  transportation: 0.21, // per km
  electricity: 0.82, // per kWh
  food: 0.5, // per meal score
  shopping: 0.3, // per item score
  waste: 0.7, // per kg
};

/**
 * Calculate carbon score (0-100, higher = better / lower footprint)
 */
function calculateCarbonScore(input: CarbonAssessmentInput): number {
  const totalEmission =
    input.transportation * EMISSION_FACTORS.transportation +
    input.electricity * EMISSION_FACTORS.electricity +
    input.food * EMISSION_FACTORS.food +
    input.shopping * EMISSION_FACTORS.shopping +
    input.waste * EMISSION_FACTORS.waste;

  // National average monthly carbon footprint benchmark (kgCO2)
  const nationalAverage = 500;

  // Score: 100 if zero emissions, 0 if at 2x national average
  const score = Math.max(0, Math.min(100, Math.round(100 * (1 - totalEmission / (nationalAverage * 2)))));

  return score;
}

/**
 * Get eco rank from score
 */
function getEcoRank(score: number): string {
  const found = ECO_RANKS.find((r) => score >= r.min && score <= r.max);
  return found?.rank || 'Eco Beginner';
}

/**
 * Calculate total carbon footprint in kgCO2
 */
function calculateTotalCarbon(input: CarbonAssessmentInput): number {
  return parseFloat(
    (
      input.transportation * EMISSION_FACTORS.transportation +
      input.electricity * EMISSION_FACTORS.electricity +
      input.food * EMISSION_FACTORS.food +
      input.shopping * EMISSION_FACTORS.shopping +
      input.waste * EMISSION_FACTORS.waste
    ).toFixed(2),
  );
}

/**
 * Create a new carbon assessment
 */
export async function createAssessment(userId: string, input: CarbonAssessmentInput) {
  const totalCarbon = calculateTotalCarbon(input);
  const carbonScore = calculateCarbonScore(input);
  const ecoRank = getEcoRank(carbonScore);

  // Save assessment
  const assessment = await prisma.carbonAssessment.create({
    data: {
      userId,
      transportation: input.transportation,
      electricity: input.electricity,
      food: input.food,
      shopping: input.shopping,
      waste: input.waste,
      totalCarbon,
    },
  });

  // Update user score and rank
  await prisma.user.update({
    where: { id: userId },
    data: {
      carbonScore,
      ecoRank,
    },
  });

  // Calculate carbon saved relative to baseline
  const baselineCarbon = 500; // kg CO2 per month baseline
  const carbonSaved = Math.max(0, parseFloat((baselineCarbon - totalCarbon).toFixed(2)));

  // Log to Firestore for realtime
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      await adminFirestore.collection('carbon_logs').add({
        userId: user.firebaseUid,
        totalCarbon,
        carbonScore,
        ecoRank,
        createdAt: new Date().toISOString(),
      });

      // Update user document in Firestore
      await adminFirestore.collection('users').doc(user.firebaseUid).update({
        carbonScore,
        ecoRank,
      });
    }
  } catch (err) {
    console.error('[Carbon Service] Firestore sync failed:', err);
  }

  return {
    assessment,
    carbonScore,
    carbonSaved,
    ecoRank,
    totalCarbon,
  };
}

/**
 * Get assessment history for a user
 */
export async function getAssessmentHistory(userId: string, limit = 20) {
  return prisma.carbonAssessment.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Get the current carbon score for a user
 */
export async function getCarbonScore(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      carbonScore: true,
      ecoRank: true,
    },
  });

  if (!user) throw new Error('User not found');

  // Get total carbon saved from all assessments
  const result = await prisma.carbonAssessment.aggregate({
    where: { userId },
    _sum: { totalCarbon: true },
    _count: true,
  });

  const totalAssessments = result._count;
  const totalFootprint = result._sum.totalCarbon || 0;
  const baselineTotal = totalAssessments * 500;
  const carbonSaved = Math.max(0, parseFloat((baselineTotal - totalFootprint).toFixed(2)));

  return {
    carbonScore: user.carbonScore,
    carbonSaved,
    ecoRank: user.ecoRank,
    totalAssessments,
  };
}
