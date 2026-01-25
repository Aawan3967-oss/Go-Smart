/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
  reactStrictMode: true,
  // اگر آپ کی فائل میں پہلے سے کچھ اور کوڈ ہے تو وہ یہاں آئے گا
};

module.exports = withPWA(nextConfig);
