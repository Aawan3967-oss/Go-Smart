const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
});

const nextConfig = {
  reactStrictMode: true,
  // یہاں ہم نے webpack ہٹا دیا ہے تاکہ Turbopack سے جھگڑا ختم ہو
};

module.exports = withPWA(nextConfig);
