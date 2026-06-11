import type { Metadata } from 'next';
import { ThemeProvider } from '@/providers/ThemeProvider';
import GradientMesh from '@/components/backgrounds/GradientMesh';
import FloatingLeaves from '@/components/backgrounds/FloatingLeaves';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';
import '@/styles/glassmorphism.css';
import '@/styles/animations.css';
import '@/styles/components.css';

export const metadata: Metadata = {
  title: 'THADAM AI — Track Your Carbon. Transform Your Future.',
  description: 'AI-powered sustainability intelligence platform. Track, understand, reduce, and improve your environmental impact with carbon analytics, smart recycling, and Gemini AI coaching.',
  keywords: ['sustainability', 'carbon footprint', 'recycling', 'AI', 'environment', 'carbon tracking', 'green technology'],
  authors: [{ name: 'THADAM AI' }],
  openGraph: {
    title: 'THADAM AI — Track Your Carbon. Transform Your Future.',
    description: 'AI-powered sustainability intelligence platform.',
    type: 'website',
    locale: 'en_US',
    siteName: 'THADAM AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THADAM AI',
    description: 'Track Your Carbon. Transform Your Future.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>
          <GradientMesh />
          <FloatingLeaves />
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: 'var(--navbar-height)' }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
