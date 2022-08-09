/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 120,
    domains: ['firebasestorage.googleapis.com', 'maps.googleapis.com'],
    formats: ['image/webp']
  }
}

module.exports = nextConfig
