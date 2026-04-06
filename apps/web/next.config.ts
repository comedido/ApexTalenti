import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.10.10.118", "http://10.10.10.118:3000"],
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
};

export default nextConfig;
