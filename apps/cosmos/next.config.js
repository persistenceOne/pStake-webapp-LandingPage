// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  transpilePackages: ["ui", "tailwindconfig", "hooks", "utils"],
  basePath: "",
  assetPrefix: "/",
  trailingSlash: false,
  async rewrites() {
    console.log("NODE_ENV");
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/eth",
            destination:
              "https://p-stake-webapp-landing-page-ethereum.vercel.app/eth",
          },
        ]
      : [];
  },
};

module.exports = nextConfig;
