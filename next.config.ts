import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  images: {
    remotePatterns: [new URL('https://vcloud.vcv.vn:20981/**')],
  },
};

export default nextConfig;
