import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Commented out to enable API routes for publication system
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
