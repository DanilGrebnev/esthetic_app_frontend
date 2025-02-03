// @ts-check

/** @type {import('next').NextConfig} */
import { SWGRWebpackConfig } from './webpackConfig/SWGRWebpackConfig.js'

const nextConfig = {
    reactStrictMode: false,
    experimental: {},
    images: {
        remotePatterns: [
            {
                hostname: '*',
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
