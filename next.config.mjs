/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
<<<<<<< HEAD
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
=======
    unoptimized: true,
>>>>>>> dev
  },
};

export default nextConfig;
