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
  title: {
    template: '%s | THADAM AI',
    default: 'THADAM AI | AI Powered Sustainability Platform',
  },
  description: 'Track, analyze, and reduce your carbon footprint using Gemini AI, smart recycling, sustainability analytics, and intelligent recommendations.',
  keywords: [
    'Carbon Footprint', 'Sustainability', 'Climate Tech', 'Waste Management', 
    'Gemini AI', 'Recycling', 'Environmental Analytics', 'Smart Bins', 
    'Green Technology', 'Carbon Tracking'
  ],
  authors: [{ name: 'THADAM AI' }],
  openGraph: {
    title: 'THADAM AI',
    description: 'AI Powered Sustainability Platform',
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

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
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
