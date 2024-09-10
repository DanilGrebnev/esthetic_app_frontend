// @ts-check
/** @type {import('next').NextConfig} */
import { SWGRWebpackConfig } from './webpackConfig/SWGRWebpackConfig.js'

const nextConfig = {
    reactStrictMode: false,
    experimental: {
    },
    images: {
        remotePatterns: [
            {
                // @ts-ignore
                protocol: process.env.NEXT_PUBLIC_PROTOCOL,
                // @ts-ignore
                hostname: process.env.NEXT_PUBLIC_HOSTNAME,
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
