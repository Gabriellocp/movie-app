import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'image.tmdb.org',
      port: '',
      pathname: '/t/p/**',
      search: '',
    }],
  },
  env: {
    API_URL: 'http://localhost:3001'
  }
};

export default nextConfig;
