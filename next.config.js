/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xclusivetouch-s3.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // Disable image optimization
  },
  turbopack: {
    root: __dirname,
  },
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: __dirname,
  },
};

module.exports = nextConfig;