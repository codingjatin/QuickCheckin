/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a fully static site (emits to ./out)
  output: 'export',

  // If you use <Image>, static export requires this
  images: { unoptimized: true },

  // Keep your existing lint setting from CI
  eslint: { ignoreDuringBuilds: true },

  // Nice-to-haves
  reactStrictMode: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
