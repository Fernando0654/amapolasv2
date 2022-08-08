const withPWA = require('next-pwa');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'i.scdn.co', 'tunecloud.vercel.app'],
    formats: ['image/avif', 'image/webp'],
  },
})

module.exports = nextConfig
