import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

const { mockPush, mockRefresh } = vi.hoisted(() => ({
  mockPush: vi.fn(),
  mockRefresh: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
    refresh: mockRefresh,
  })),
}));

// Mock firebase auth popup
vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    getAuth: vi.fn(() => ({})),
    signInWithPopup: vi.fn(),
    signInWithRedirect: vi.fn(),
    GoogleAuthProvider: class {
      setCustomParameters = vi.fn();
    },
  };
});

describe('GoogleLoginButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset fetch mock
    global.fetch = vi.fn();
  });

  it('should render the login button', async () => {
    const GoogleLoginButton = (await import('@/components/auth/GoogleLoginButton')).default;
    render(<GoogleLoginButton />);
    expect(screen.getByText('Continue with Google')).toBeInTheDocument();
  });

  it('should handle successful login flow', async () => {
    const { signInWithPopup } = await import('firebase/auth');
    const { useRouter } = await import('next/navigation');
    
    // Mock Firebase returning a user token
    (signInWithPopup as any).mockResolvedValueOnce({
      user: { getIdToken: vi.fn().mockResolvedValue('mock-token') }
    });

    // Mock API returning success
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true })
    });

    const GoogleLoginButton = (await import('@/components/auth/GoogleLoginButton')).default;
    render(<GoogleLoginButton />);
    
    fireEvent.click(screen.getByRole('button', { name: /continue with google/i }));
    
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/login', expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ idToken: 'mock-token' })
      }));
      // Should redirect to dashboard
      expect(mockPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should handle API failure gracefully', async () => {
    const { signInWithPopup } = await import('firebase/auth');
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock Firebase returning a user token
    (signInWithPopup as any).mockResolvedValueOnce({
      user: { getIdToken: vi.fn().mockResolvedValue('mock-token') }
    });

    // Mock API returning failure
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: vi.fn().mockResolvedValue({ message: 'Server error' })
    });

    const GoogleLoginButton = (await import('@/components/auth/GoogleLoginButton')).default;
    render(<GoogleLoginButton />);
    
    fireEvent.click(screen.getByRole('button', { name: /continue with google/i }));
    
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('Login failed: Server error'));
      expect(screen.getByText('Continue with Google')).toBeInTheDocument(); // State reset
    });

    alertMock.mockRestore();
    consoleErrorMock.mockRestore();
  });
});
