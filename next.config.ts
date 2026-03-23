import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
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
