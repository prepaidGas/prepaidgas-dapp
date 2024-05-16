/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, _) => {
    config = {
      ...config,
      watchOptions: {
        ...config.watchOptions,
        poll: 800,
        aggregateTimeout: 300,
      }
    }
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  outdir: "export",
  images: { unoptimized: true }
}

module.exports = nextConfig
