/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '192.168.0.210', 'https://b4b-deck-maker.onrender.com']
  }
}

module.exports = nextConfig
