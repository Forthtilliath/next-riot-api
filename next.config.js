/** @type {import('next').NextConfig} */

import i18n from './next-i18next.config';

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ddragon.leagueoflegends.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  i18n,
};

module.exports = nextConfig;
