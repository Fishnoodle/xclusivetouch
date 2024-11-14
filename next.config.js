/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['api.xclusivetouch.ca'],
    unoptimized: true
  },
  webpack: (config) => {
    // Attempt to resolve module resolution issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

module.exports = nextConfig