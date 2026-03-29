/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
   compress: true, 
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rkrcdihogyjnpnffpakq.supabase.co",
      },
    ],
    formats: ["image/avif", "image/webp"]
  },
};

export default nextConfig;
