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
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};
module.exports = nextConfig;
