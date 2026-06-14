import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '@/providers/ThemeProvider';

// For mocking Navbar since it has many client dependencies
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  onAuthStateChanged: vi.fn((_, cb) => { cb(null); return vi.fn(); }),
  getRedirectResult: vi.fn().mockResolvedValue(null),
}));

vi.mock('@/lib/firebase', () => ({
  auth: {},
}));

describe('Layout Components', () => {
  it('should render Footer component', async () => {
    const Footer = (await import('@/components/layout/Footer')).default;
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    );
    expect(screen.getAllByText(/THADAM/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Track Your Carbon/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  });

  it('should render Navbar component', async () => {
    const Navbar = (await import('@/components/layout/Navbar')).default;
    render(
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
    );
    expect(screen.getAllByText(/THADAM/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
