/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5050",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "http://160.30.137.8",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
