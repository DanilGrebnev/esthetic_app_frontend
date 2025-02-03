// @ts-check

/** @type {import('next').NextConfig} */
import { SWGRWebpackConfig } from './webpackConfig/SWGRWebpackConfig.js'

function toggleLint(lint) {
    if (lint) return {}
    else {
        return {
            typescript: {
                ignoreBuildErrors: true,
            },
            eslint: {
                ignoreDuringBuilds: true,
            },
        }
    }
}

const nextConfig = {
    ...toggleLint(process.env.LINT),
    reactStrictMode: false,
    output: 'standalone',
    experimental: {},
    env: {
        NEXT_PUBLIC_PROTOCOL: 'http',
        NEXT_PUBLIC_HOSTNAME: '91.202.207.229',
        NEXT_PUBLIC_PORT: '3000',
        NEXT_PUBLIC_APP_NAME: 'Esthetic',
        NEXT_PUBLIC_PAGINATION_AMOUNT: '30',
        NEXT_PUBLIC_FETCH_URL: 'https://postes.ru/api',
        NEXT_SHARP_PATH: '/tmp/node_modules/sharp',
        NEXT_TELEMETRY_DISABLED: 1,
    },
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
