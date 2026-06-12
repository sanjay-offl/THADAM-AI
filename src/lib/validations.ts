import { z } from 'zod';

// ---- Environment Validation ----
export const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
  GOOGLE_AI_API_KEY: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional(),
  MQTT_BROKER_URL: z.string().optional(),
});

// ---- Auth Validation ----
export const loginSchema = z.object({
  idToken: z.string().min(1, 'Firebase ID token is required'),
});

// ---- Carbon Assessment Validation ----
export const carbonAssessmentSchema = z.object({
  transportation: z.number().min(0).max(10000),
  electricity: z.number().min(0).max(50000),
  food: z.number().min(0).max(10000),
  shopping: z.number().min(0).max(10000),
  waste: z.number().min(0).max(5000),
});

// ---- Reward Validation ----
export const redeemRewardSchema = z.object({
  rewardId: z.string().min(1),
  points: z.number().int().positive(),
  type: z.string().min(1),
});

// ---- Machine Validation ----
export const createMachineSchema = z.object({
  name: z.string().min(1).max(100),
  location: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  status: z.enum(['online', 'offline', 'maintenance', 'full']).default('online'),
  capacity: z.number().positive().default(100),
});

export const updateMachineStatusSchema = z.object({
  machineId: z.string().min(1),
  status: z.enum(['online', 'offline', 'maintenance', 'full']),
});

export const nearbyMachinesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  radiusKm: z.number().positive().max(100).default(10),
});

// ---- Machine Transaction Validation ----
export const machineTransactionSchema = z.object({
  machineId: z.string().min(1),
  wasteType: z.string().min(1),
  weight: z.number().positive(),
});

// ---- Gemini Chat Validation ----
export const geminiChatSchema = z.object({
  message: z.string().min(1).max(5000),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      }),
    )
    .optional()
    .default([]),
});

// ---- Scanner Validation ----
export const scannerAnalyzeSchema = z.object({
  image: z.string().min(1, 'Base64 image data is required'),
  mimeType: z.enum(['image/jpeg', 'image/png', 'image/webp']).default('image/jpeg'),
});

// ---- Admin Validation ----
export const adminUserUpdateSchema = z.object({
  userId: z.string().min(1),
  role: z.enum(['user', 'admin']).optional(),
  ecoRank: z.string().optional(),
});

// ---- Type Exports ----
export type LoginInput = z.infer<typeof loginSchema>;
export type CarbonAssessmentInput = z.infer<typeof carbonAssessmentSchema>;
export type RedeemRewardInput = z.infer<typeof redeemRewardSchema>;
export type CreateMachineInput = z.infer<typeof createMachineSchema>;
export type UpdateMachineStatusInput = z.infer<typeof updateMachineStatusSchema>;
export type NearbyMachinesInput = z.infer<typeof nearbyMachinesSchema>;
export type MachineTransactionInput = z.infer<typeof machineTransactionSchema>;
export type GeminiChatInput = z.infer<typeof geminiChatSchema>;
export type ScannerAnalyzeInput = z.infer<typeof scannerAnalyzeSchema>;
export type AdminUserUpdateInput = z.infer<typeof adminUserUpdateSchema>;
