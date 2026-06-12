// ============================================
// THADAM AI — Auth Helper Utilities (Server-side)
// ============================================

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from './firebase-admin';
import prisma from './prisma';

const SESSION_COOKIE_NAME = 'thadam-session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// ---- Types ----
export interface AuthUser {
  id: string;
  firebaseUid: string;
  email: string;
  name: string | null;
  avatar: string | null;
  role: string;
  carbonScore: number;
  rewardPoints: number;
  ecoRank: string;
}

// ---- Session Management ----

/**
 * Create a session cookie from a Firebase ID token
 */
export async function createSessionCookie(idToken: string): Promise<string> {
  try {
    const expiresIn = SESSION_MAX_AGE * 1000; // milliseconds
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    return sessionCookie;
  } catch (error) {
    console.warn('[Firebase Admin] Failed to create session cookie (likely missing service account key). Falling back to raw ID token for local development.', error);
    return idToken; // Fallback for local development
  }
}

/**
 * Set the session cookie in the response
 */
export async function setSessionCookie(sessionCookie: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionCookie, {
    maxAge: SESSION_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
}

/**
 * Get the session cookie value
 */
export async function getSessionCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

/**
 * Clear the session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// ---- Token Verification ----

/**
 * Verify a Firebase ID token and return the decoded claims
 */
export async function verifyIdToken(idToken: string) {
  return adminAuth.verifyIdToken(idToken);
}

/**
 * Verify the session cookie and return the decoded claims
 */
export async function verifySessionCookie(sessionCookie: string) {
  try {
    return await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch (error) {
    // Fallback: Check if it's a raw ID token (from our local development fallback)
    try {
      return await adminAuth.verifyIdToken(sessionCookie);
    } catch (fallbackError) {
      throw error; // Throw original error if fallback fails
    }
  }
}

// ---- User Resolution ----

/**
 * Get the current authenticated user from the session cookie.
 * Returns null if no valid session exists.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const sessionCookie = await getSessionCookie();
    if (!sessionCookie) return null;

    const decodedClaims = await verifySessionCookie(sessionCookie);

    const user = await prisma.user.findUnique({
      where: { firebaseUid: decodedClaims.uid },
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

    return user;
  } catch {
    return null;
  }
}

// ---- Route Protection ----

/**
 * Require authentication for an API route. Returns the user or an error response.
 */
export async function requireAuth(
  _request: NextRequest,
): Promise<{ user: AuthUser } | { error: NextResponse }> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 },
      ),
    };
  }

  return { user };
}

/**
 * Require admin role for an API route
 */
export async function requireAdmin(
  request: NextRequest,
): Promise<{ user: AuthUser } | { error: NextResponse }> {
  const result = await requireAuth(request);

  if ('error' in result) return result;

  if (result.user.role !== 'admin') {
    return {
      error: NextResponse.json(
        { error: 'Forbidden', message: 'Admin access required' },
        { status: 403 },
      ),
    };
  }

  return result;
}
