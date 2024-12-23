// @ts-check

/** @type {import('next').NextConfig} */
import { SWGRWebpackConfig } from './webpackConfig/SWGRWebpackConfig.js'

const nextConfig = {
    reactStrictMode: false,
    // output: 'standalone',
    experimental: {},
    images: {
        remotePatterns: [
            {
                // @ts-ignore
                // protocol: process.env.NEXT_PUBLIC_PROTOCOL,
                // protocol: '',
                // @ts-ignore
                // hostname: process.env.NEXT_PUBLIC_HOSTNAME,
                hostname: '*',
                // port: process.env.NEXT_PUBLIC_PORT,
                pathname: '/**',
            },
        ],
    },

    webpack(config) {
        SWGRWebpackConfig(config)

        return config
    },
}

export default nextConfig
