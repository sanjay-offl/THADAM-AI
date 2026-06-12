// ============================================
// THADAM AI — Auth Service
// ============================================

import prisma from '@/lib/prisma';
import { adminFirestore } from '@/lib/firebase-admin';
import {
  createSessionCookie,
  setSessionCookie,
  clearSessionCookie,
  verifyIdToken,
  type AuthUser,
} from '@/lib/auth-helpers';

interface GoogleUserInfo {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

/**
 * Handle Google login — verify token, upsert user, create session
 */
export async function handleGoogleLogin(idToken: string): Promise<AuthUser> {
  // 1. Verify the Firebase ID token
  const decodedToken = await verifyIdToken(idToken);

  const email = decodedToken.email || `${decodedToken.uid}@thadam-temp.ai`;
  const userInfo: GoogleUserInfo = {
    uid: decodedToken.uid,
    email: email,
    displayName: decodedToken.name || email.split('@')[0],
    photoURL: decodedToken.picture || undefined,
  };

  // 2. Upsert user in PostgreSQL
  const user = await prisma.user.upsert({
    where: { firebaseUid: userInfo.uid },
    update: {
      name: userInfo.displayName || undefined,
      avatar: userInfo.photoURL || undefined,
      updatedAt: new Date(),
    },
    create: {
      firebaseUid: userInfo.uid,
      email: userInfo.email,
      name: userInfo.displayName || null,
      avatar: userInfo.photoURL || null,
    },
    select: {
      id: true,
      firebaseUid: true,
      email: true,
      name: true,
      avatar: true,
      role: true,
      carbonScore: true,
      rewardPoints: true,
      ecoRank: true,
    },
  });

  // 3. Sync to Firestore for realtime features
  try {
    await adminFirestore.collection('users').doc(userInfo.uid).set(
      {
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        carbonScore: user.carbonScore,
        rewardPoints: user.rewardPoints,
        ecoRank: user.ecoRank,
        lastLogin: new Date().toISOString(),
      },
      { merge: true },
    );
  } catch (err) {
    console.error('[Auth Service] Firestore sync failed:', err);
    // Non-critical — don't fail the login
  }

  // 4. Create session cookie
  const sessionCookie = await createSessionCookie(idToken);
  await setSessionCookie(sessionCookie);

  return user;
}

/**
 * Handle user logout — clear session
 */
export async function handleLogout(): Promise<void> {
  await clearSessionCookie();
}

/**
 * Get user by Firebase UID
 */
export async function getUserByFirebaseUid(uid: string): Promise<AuthUser | null> {
  return prisma.user.findUnique({
    where: { firebaseUid: uid },
    select: {
      id: true,
      firebaseUid: true,
      email: true,
      name: true,
      avatar: true,
      role: true,
      carbonScore: true,
      rewardPoints: true,
      ecoRank: true,
    },
  });
}

/**
 * Get user by internal ID
 */
export async function getUserById(id: string): Promise<AuthUser | null> {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firebaseUid: true,
      email: true,
      name: true,
      avatar: true,
      role: true,
      carbonScore: true,
      rewardPoints: true,
      ecoRank: true,
    },
  });
}
