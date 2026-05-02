/** @type {import('next').NextConfig} */
module.exports = {
  compress: true,
  reactStrictMode: false,
  experimental: {
    serverComponentsExternalPackages: ['patchright', '@sparticuz/chromium'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  }
}