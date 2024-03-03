/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, _) => {
    config = {
      ...config,
      watchOptions: {
        ...config.watchOptions,
        poll: 800,
        aggregateTimeout: 300,
      },
    }
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  // basePath: "/prepaidgas",
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/hexadash-nextjs",
  //       basePath: false,
  //       permanent: false,
  //     },
  //   ]
  // },
  // reactStrictMode: true,
  // images: {
  //   domains: ["lh3.googleusercontent.com"],
  // },
}

module.exports = nextConfig
