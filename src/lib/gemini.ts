// ============================================
// THADAM AI — Google Gemini AI Client
// ============================================

import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY || '';

if (!apiKey) {
  console.warn('[THADAM] GEMINI_API_KEY not set — Gemini features will be unavailable.');
}

const genAI = new GoogleGenerativeAI(apiKey);

/**
 * Get Gemini Flash model for fast text generation (chat, recommendations)
 */
export function getGeminiModel(): GenerativeModel {
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
}

/**
 * Get Gemini Flash model for image analysis (scanner)
 */
export function getGeminiVisionModel(): GenerativeModel {
  return genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
}

export { genAI };
