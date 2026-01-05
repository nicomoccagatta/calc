import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@radix-ui/themes', '@radix-ui/react-icons'],
  },

  // Enable compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Image optimization
  images: {
    formats: ['image/webp'],
  },
}

export default nextConfig
