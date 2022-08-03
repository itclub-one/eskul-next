/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/aaaaaaa',
  experimental: {
    images: {
      unoptimized: true
    }
  }
}

module.exports = nextConfig
