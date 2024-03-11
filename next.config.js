/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'imgv3.fotor.com', 
      'icon-library.com', 
      'res.cloudinary.com', 
      '*.giphy.com', 
      'utillities.netlify.app'
    ],
  }
}

module.exports = nextConfig
