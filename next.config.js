/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
  reactStrictMode: true,
  // یہ حصہ ٹربو پیک کو زبردستی بند کر کے ویب پیک چلائے گا
  experimental: {
    turbo: {
      enabled: false
    }
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = withPWA(nextConfig);
