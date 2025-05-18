import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/:path*'
            : '/api/',
      },
    ]
  },
  images: {
    domains: ['instagram.fjog3-1.fna.fbcdn.net'],
    remotePatterns: [new URL('https://instagram.fjog3-1.fna.fbcdn.net/**')]
  },
};

export default nextConfig;
