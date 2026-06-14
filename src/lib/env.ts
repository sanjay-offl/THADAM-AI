import { z } from 'zod';

const envSchema = z.object({
  GOOGLE_AI_API_KEY: z.string().min(1, 'GOOGLE_AI_API_KEY is missing'),
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1, 'NEXT_PUBLIC_FIREBASE_API_KEY is missing'),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1, 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN is missing'),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1, 'NEXT_PUBLIC_FIREBASE_PROJECT_ID is missing'),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1, 'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET is missing'),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, 'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID is missing'),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, 'NEXT_PUBLIC_FIREBASE_APP_ID is missing'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is missing'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

type Env = z.infer<typeof envSchema>;

const processEnv: Record<string, string | undefined> = {
  GOOGLE_AI_API_KEY: process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY,
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
};

let env: Env;

try {
  env = envSchema.parse(processEnv);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Invalid environment variables:', error.flatten().fieldErrors);
    // Don't throw during build or it will fail on Vercel preview if env vars aren't set perfectly
    // but the prompt says: "If key missing: Return: { error: 'Gemini API key missing' } instead of crashing"
    // So we'll just log and maybe set defaults or allow partial, wait, we need it to NOT crash startup.
    // I will make it export a safe env.
  }
}

export function validateGeminiEnv() {
  const key = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('Gemini API key missing. Please configure GOOGLE_AI_API_KEY.');
  }
  return key;
}

export const ENV = processEnv as Env;
