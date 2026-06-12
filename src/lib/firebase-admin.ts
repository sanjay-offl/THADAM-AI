import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';

let adminApp: App;
let adminAuth: Auth;
let adminFirestore: Firestore;

function getAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // 1. Check for local file (easiest for development)
  const localKeyPath = path.join(process.cwd(), 'firebase-service-account.json');
  if (fs.existsSync(localKeyPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(localKeyPath, 'utf8'));
      return initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    } catch (error) {
      console.error('[Firebase Admin] Failed to parse local service account file', error);
    }
  }

  // 2. Check environment variable (for production)
  const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (serviceAccountEnv) {
    try {
      const parsed = JSON.parse(serviceAccountEnv);
      return initializeApp({
        credential: cert(parsed),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      });
    } catch {
      console.error('[Firebase Admin] Failed to parse service account env var');
    }
  }

  // 3. Fallback to application default credentials
  return initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

adminApp = getAdminApp();
adminAuth = getAuth(adminApp);
adminFirestore = getFirestore(adminApp);

export { adminApp, adminAuth, adminFirestore };
