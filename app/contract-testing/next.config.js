/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@solana/wallet-adapter-material-ui', 'lodash-es'],
}

module.exports = nextConfig
