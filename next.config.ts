import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint during builds - we'll run it separately
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
