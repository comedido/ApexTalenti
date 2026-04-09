import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.10.10.118"],
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
};

export default nextConfig;
