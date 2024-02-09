/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['imgv3.fotor.com', 'icon-library.com'],
  }
}

module.exports = nextConfig
