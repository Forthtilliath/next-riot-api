/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: false,
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        port: '',
        pathname: '**',
      },
    ],
    minimumCacheTTL: 60,
  },
  i18n,

  async redirects() {
    return [
    
      {
        source: '/',
        destination: '/champions/all',
        permanent: true,
      },
      {
        source: '/champions',
        destination: '/champions/all',
        permanent: true,
      },
      {
        source: '/_errors',
        destination: '/',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;
