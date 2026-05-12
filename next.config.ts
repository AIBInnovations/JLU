import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // EC2 box (1 GB RAM) cannot reliably Sharp-resize images for cold visitors,
    // so serve images straight from S3 instead of via /_next/image proxy.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 750, 828, 1080, 1200, 1440, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    qualities: [50, 65, 75, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jlu.edu.in',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jlu-website-media.s3.ap-south-1.amazonaws.com',
        pathname: '/website-content/**',
      },
    ],
  },
};

export default nextConfig;
