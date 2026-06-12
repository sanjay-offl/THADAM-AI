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
import { auditEnvironment } from '@/lib/env-validator';
import ConfigErrorPage from '@/components/errors/ConfigErrorPage';

export const metadata: Metadata = {
  metadataBase: new URL("https://thadam-ai.vercel.app"),

  title: "THADAM AI",
  description:
    "Track, understand, and reduce your carbon footprint with AI-powered insights.",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "THADAM AI",
    description:
      "Track, understand, and reduce your carbon footprint with AI-powered insights.",
    url: "https://thadam-ai.vercel.app",
    siteName: "THADAM AI",
    images: [
      {
        url: "https://thadam-ai.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "THADAM AI",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "THADAM AI",
    description:
      "Track, understand, and reduce your carbon footprint with AI-powered insights.",
    images: ["https://thadam-ai.vercel.app/og-image.png"],
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
  const envReport = auditEnvironment();

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {!envReport.isValid ? (
          <ConfigErrorPage report={envReport} />
        ) : (
          <ThemeProvider>
            <GradientMesh />
            <FloatingLeaves />
            <Navbar />
            <main style={{ minHeight: '100vh', paddingTop: 'var(--navbar-height)' }}>
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        )}
      </body>
    </html>
  );
}
