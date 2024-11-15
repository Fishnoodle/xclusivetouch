/** @type {import('next').NextConfig} */
const crypto = require('crypto'); // Importing the crypto module

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
  },
  webpack: (config, { isServer }) => {
    // Add optimization settings
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          lib: {
            test(module) {
              return module.size() > 160000 &&
                /node_modules[/\\]/.test(module.identifier());
            },
            name(module) {
              const hash = crypto.createHash('sha1'); // Now crypto is defined
              hash.update(module.identifier());
              return hash.digest('hex').substring(0, 8);
            },
            priority: 30,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
}

module.exports = nextConfig