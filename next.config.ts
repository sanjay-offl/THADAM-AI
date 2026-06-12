import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'recharts'],
  },
  async redirects() {
    return [
      {
        source: '/profile',
        destination: '/dashboard/settings',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
