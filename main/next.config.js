/** @type {import('next').NextConfig} */
module.exports = {
  compress: true,
  reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
        },
      ],
    }
  }