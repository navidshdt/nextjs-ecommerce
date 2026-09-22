/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'free-images.com',
      },
      {
        protocol: 'https',
        hostname: 'aquapure-zeta.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'wazwpydmgfsbaaqmddyt.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
};

export default nextConfig;
