import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: "https://dummyjson.com/",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "mysupersecretkey123456789",
  },
  images: {
    domains: ["cdn.dummyjson.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
