import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "10.10.10.118",
    "localhost:3000",
    "127.0.0.1:3000",
    "apextalenti.nube53.com",
  ],
  turbopack: {
    root: path.join(__dirname, "../.."),
  },
};

export default nextConfig;
