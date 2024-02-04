/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tasks.vitasoftsolutions.com',
        pathname: '/media/profile_pictures/**',
      },
    ],
  },
};

export default nextConfig;
