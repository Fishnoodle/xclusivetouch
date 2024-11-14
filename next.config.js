/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React Strict Mode
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xclusivetouch-s3.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'export'
  // ...other configurations
};

module.exports = nextConfig;