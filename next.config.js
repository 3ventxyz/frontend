/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    minimumCacheTTL: 120,
    domains: [
      'firebasestorage.googleapis.com',
      'www.gravatar.com',
      'maps.googleapis.com',
      'res.cloudinary.com',
      'cloudflare-ipfs.com',
      'loremflickr.com'
    ],
    formats: ['image/webp']
  }
}

module.exports = nextConfig
