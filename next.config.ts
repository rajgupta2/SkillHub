import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/materials/:slug/:id",
        destination: "/resources/:slug/:id",
        permanent: true, // 301 redirect
      },
      {
        source: "/courses/:slug/:id",
        destination: "/tutorials/:slug/:id",
        permanent: true, // 301 redirect
      }
    ];
  },
};

export default nextConfig;