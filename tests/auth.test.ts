import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleGoogleLogin, handleLogout, getUserByFirebaseUid, getUserById } from '@/services/auth.service';
import prisma from '@/lib/prisma';
import * as authHelpers from '@/lib/auth-helpers';

vi.mock('@/lib/prisma', () => ({
  default: {
    user: {
      upsert: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

vi.mock('@/lib/firebase-admin', () => ({
  adminFirestore: {
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        set: vi.fn(),
      })),
    })),
  },
}));

vi.mock('@/lib/auth-helpers', () => ({
  verifyIdToken: vi.fn(),
  createSessionCookie: vi.fn(),
  setSessionCookie: vi.fn(),
  clearSessionCookie: vi.fn(),
}));

describe('Auth Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleGoogleLogin', () => {
    it('should verify token, upsert user, and create session', async () => {
      const mockToken = 'mock-id-token';
      const decodedToken = { uid: 'mock-uid', email: 'test@example.com', name: 'Test User' };
      const mockUser = { id: 'user-1', firebaseUid: 'mock-uid', email: 'test@example.com' };

      vi.mocked(authHelpers.verifyIdToken).mockResolvedValueOnce(decodedToken as any);
      vi.mocked(prisma.user.upsert).mockResolvedValueOnce(mockUser as any);
      vi.mocked(authHelpers.createSessionCookie).mockResolvedValueOnce('mock-session-cookie');
      vi.mocked(authHelpers.setSessionCookie).mockResolvedValueOnce();

      const result = await handleGoogleLogin(mockToken);

      expect(authHelpers.verifyIdToken).toHaveBeenCalledWith(mockToken);
      expect(prisma.user.upsert).toHaveBeenCalled();
      expect(authHelpers.createSessionCookie).toHaveBeenCalledWith(mockToken);
      expect(authHelpers.setSessionCookie).toHaveBeenCalledWith('mock-session-cookie');
      expect(result).toEqual(mockUser);
    });
  });

  describe('handleLogout', () => {
    it('should clear session cookie', async () => {
      await handleLogout();
      expect(authHelpers.clearSessionCookie).toHaveBeenCalled();
    });
  });

  describe('getUserByFirebaseUid', () => {
    it('should return user', async () => {
      const mockUser = { id: 'user-1', firebaseUid: 'mock-uid' };
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(mockUser as any);

      const result = await getUserByFirebaseUid('mock-uid');
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { firebaseUid: 'mock-uid' }, select: expect.any(Object) });
      expect(result).toEqual(mockUser);
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const mockUser = { id: 'user-1' };
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(mockUser as any);

      const result = await getUserById('user-1');
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 'user-1' }, select: expect.any(Object) });
      expect(result).toEqual(mockUser);
    });
  });
});
