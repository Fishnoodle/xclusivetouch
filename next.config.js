/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['xclusivetouch-s3.s3.us-east-2.amazonaws.com'],
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
  // Remove custom webpack configuration unless necessary
  // If you need it, ensure it's correctly set up without conflicting cacheGroups
};

module.exports = nextConfig;