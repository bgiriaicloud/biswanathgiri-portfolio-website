import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Enabled for Static Firebase Hosting
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
