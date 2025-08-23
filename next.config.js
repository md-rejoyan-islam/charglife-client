/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    // domains: ["localhost", "backend.charglife.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.charglife.com",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
      },
    ],
  },
};

module.exports = nextConfig;
