import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        // port: '',
        pathname: '/Me-lind/Fullstack-XATA/blob/frontend/frontend/public/assets/**',
      },
    ],
  },
};

export default nextConfig;
