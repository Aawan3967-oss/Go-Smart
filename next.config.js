const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // یہ حصہ ورسل کو بتائے گا کہ ٹربو پیک استعمال نہ کرے
  experimental: {
    turbo: {
      rules: {},
    },
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = withPWA(nextConfig);
