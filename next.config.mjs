/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Windows: build trace can hit EISDIR/readlink on some setups. Disable it —
  // this is a standalone-output/serverless optimisation we don't need for the demo.
  outputFileTracing: false,
}

export default nextConfig
