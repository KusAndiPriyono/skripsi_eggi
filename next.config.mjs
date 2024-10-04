/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'https://smpadang-main-production.up.railway.app/api/:path*', // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
