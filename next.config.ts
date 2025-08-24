import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hfdfggwxdvdykpeaxguf.supabase.co',
        port: '',
        // pathname: '/storage/v1/object/public/marketing-assets/**', // Use ** to match any path under marketing-assets
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  turbopack: {
    rules: {
      '**/*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.jsx',
      },
    },
  },
}

export default nextConfig
