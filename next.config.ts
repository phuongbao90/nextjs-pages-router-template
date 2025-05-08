import type { NextConfig } from "next";
import { i18n } from "./next-i18next.config";

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
  i18n,
  // Add trailing slashes for better SEO
  trailingSlash: true,
  // Add language alternates for SEO
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
  // Add language alternates for SEO
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:locale(en|vi)/:path*",
          destination: "/:path*?locale=:locale",
        },
      ],
    };
  },
};

export default nextConfig;
