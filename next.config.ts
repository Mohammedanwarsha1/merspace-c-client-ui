import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mernspace-project123.s3.ap-southeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
