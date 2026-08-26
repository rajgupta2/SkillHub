import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/materials",
        destination: "/resources",
        permanent: true, // redirect
      },
      {
        source: "/materials/:slug/:id",
        destination: "/resources/:slug/:id",
        permanent: true, // redirect
      },
      {
        source: "/course/:slug/:id",
        destination: "/tutorials/:slug/:id",
        permanent: true, // redirect
      },
    ];
  },
};

export default nextConfig;