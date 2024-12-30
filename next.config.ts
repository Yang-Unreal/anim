import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // or 'http' if needed
        hostname: "minio.limingcn.com",
      },
    ],
  },
};

export default nextConfig;
