/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fimgs.net",
        pathname: "/mdimg/perfume/**",
      },
      {
        protocol: "https",
        hostname: "**.fragrantica.com",
      },
    ],
  },
};
module.exports = nextConfig;
