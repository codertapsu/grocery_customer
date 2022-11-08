const path = require('path');
const runtimeCaching = require('next-pwa/cache');

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' checkout.stripe.com;
  style-src 'self';
  img-src 'self' *.stripe.com;
  connect-src checkout.stripe.com;
  frame-src checkout.stripe.com;
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  /**
   * @doc https://nextjs.org/docs/api-reference/next.config.js/environment-variables
   */
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ['raw.githubusercontent.com', 'nest.botble.com', 'botble.b-cdn.net'],
  },
  experimental: {},
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Important: return the modified config
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
    );
    return config;
  },
  headers: async () => {
    return [
      // {
      //   source: '/',
      //   headers: [
      //     {
      //       key: 'Content-Security-Policy',
      //       value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
      //     },
      //   ],
      // },
    ];
  },
};
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [/middleware-manifest.json$/],
});

module.exports = withPWA(nextConfig);
