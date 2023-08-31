/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'http',
        hostname: 'file.koreafilm.or.kr',
      },
    ],
  },
}

module.exports = nextConfig