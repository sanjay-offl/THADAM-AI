// ============================================
// THADAM AI — Environment Variable Validator
// ============================================

export interface EnvVariableStatus {
  name: string;
  required: boolean;
  status: 'Loaded' | 'Missing';
  currentValueSnippet?: string;
  recommendedValue: string;
  description: string;
}

export interface EnvAuditReport {
  isValid: boolean;
  hasCriticalMissing: boolean;
  variables: EnvVariableStatus[];
  missingCritical: string[];
}

export function auditEnvironment(): EnvAuditReport {
  const variables: EnvVariableStatus[] = [
    {
      name: 'DATABASE_URL',
      required: true,
      status: process.env.DATABASE_URL ? 'Loaded' : 'Missing',
      currentValueSnippet: getSnippet(process.env.DATABASE_URL),
      recommendedValue: 'file:./prisma/dev.db (for local SQLite) or postgresql://...',
      description: 'Prisma database connection string. Required to store user accounts, carbon points, and smart bin logs.',
    },
    {
      name: 'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      required: true,
      status: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Loaded' : 'Missing',
      currentValueSnippet: getSnippet(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
      recommendedValue: 'thadam-b4626 (or your project ID)',
      description: 'Firebase Project ID for client-side authentication initialization.',
    },
    {
      name: 'NEXT_PUBLIC_FIREBASE_API_KEY',
      required: true,
      status: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Loaded' : 'Missing',
      currentValueSnippet: getSnippet(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
      recommendedValue: 'AIzaSy...',
      description: 'Firebase Web API Key. Required for client-side Google Auth Sign-In.',
    },
    {
      name: 'JWT_SECRET',
      required: true,
      status: process.env.JWT_SECRET ? 'Loaded' : 'Missing',
      currentValueSnippet: getSnippet(process.env.JWT_SECRET),
      recommendedValue: 'any-long-random-secure-string',
      description: 'Secret key used to sign the secure session JWT cookies fallback for local development.',
    },
    {
      name: 'FIREBASE_CLIENT_EMAIL',
      required: false,
      status: process.env.FIREBASE_CLIENT_EMAIL ? 'Loaded' : 'Missing',
      currentValueSnippet: getSnippet(process.env.FIREBASE_CLIENT_EMAIL),
      recommendedValue: 'firebase-adminsdk-...@gserviceaccount.com',
      description: 'Firebase Admin Service Account Email. Required for server-side security signature checks on production.',
    },
    {
      name: 'FIREBASE_PRIVATE_KEY',
      required: false,
      status: process.env.FIREBASE_PRIVATE_KEY ? 'Loaded' : 'Missing',
      currentValueSnippet: getSnippet(process.env.FIREBASE_PRIVATE_KEY),
      recommendedValue: '-----BEGIN PRIVATE KEY-----\\n...',
      description: 'Firebase Admin Private Key. Required for server-side security signature checks on production.',
    },
    {
      name: 'GOOGLE_AI_API_KEY',
      required: false,
      status: process.env.GOOGLE_AI_API_KEY ? 'Loaded' : 'Missing',
      currentValueSnippet: getSnippet(process.env.GOOGLE_AI_API_KEY),
      recommendedValue: 'AIzaSy...',
      description: 'Gemini Generative AI API Key. Required for AI scanner material analytics and chatbot features.',
    }
  ];

  // Critical variables that will break core backend operations (like auth and db) if missing
  const criticalKeys = ['DATABASE_URL', 'NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'NEXT_PUBLIC_FIREBASE_API_KEY', 'JWT_SECRET'];
  
  const missingCritical = variables
    .filter(v => v.required && v.status === 'Missing')
    .map(v => v.name);

  // Log audit to server console for troubleshooting
  if (missingCritical.length > 0) {
    console.error(`[Startup Validation] ⚠️ Critical Configuration Missing: ${missingCritical.join(', ')}`);
  } else {
    console.log('[Startup Validation] ✅ All critical server variables loaded successfully.');
  }

  return {
    isValid: missingCritical.length === 0,
    hasCriticalMissing: missingCritical.length > 0,
    variables,
    missingCritical
  };
}

function getSnippet(value?: string): string | undefined {
  if (!value) return undefined;
  if (value.length <= 8) return '***';
  return `${value.substring(0, 4)}...${value.substring(value.length - 4)}`;
}
