const path = require('path');
const runtimeCaching = require('next-pwa/cache');

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
      domains: ['raw.githubusercontent.com'],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
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
  // headers: async() => {
  //   return [
  //     {
  //       source: '/',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: `default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';`
  //         }
  //       ]
  //     }
  //   ];
  // }
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
