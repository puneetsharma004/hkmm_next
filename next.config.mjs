/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rkrcdihogyjnpnffpakq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
