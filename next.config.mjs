// @ts-check

/** @type {import('next').NextConfig} */
import { SWGRWebpackConfig } from './webpackConfig/SWGRWebpackConfig.js'

const nextConfig = {
    ...toggleLinting(getEnv('LINT', process.env.LINT)),
    ...setOutput(getEnv('MODE', process.env.MODE)),
    reactStrictMode: false,
    experimental: {},
    env: {
        NEXT_PUBLIC_PROTOCOL: getEnv('NEXT_PUBLIC_PROTOCOL', 'https'),
        NEXT_PUBLIC_HOSTNAME: getEnv('NEXT_PUBLIC_HOSTNAME', '91.202.207.229'),
        NEXT_PUBLIC_PORT: getEnv('NEXT_PUBLIC_PORT', '3000'),
        NEXT_PUBLIC_APP_NAME: getEnv('NEXT_PUBLIC_APP_NAME', 'Postes'),
        NEXT_PUBLIC_PAGINATION_AMOUNT: getEnv(
            'NEXT_PUBLIC_PAGINATION_AMOUNT',
            '30',
        ),
        NEXT_PUBLIC_FETCH_URL: getEnv(
            'NEXT_PUBLIC_FETCH_URL',
            'https://postes.ru/api',
        ),
        NEXT_SHARP_PATH: '/tmp/node_modules/sharp',
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

function setOutput(MODE) {
    if (MODE === 'production') {
        return { output: 'standalone' }
    }
    return {}
}

function toggleLinting(LINT) {
    if (LINT === 'false') {
        return {
            typescript: {
                ignoreBuildErrors: true,
            },
            eslint: {
                ignoreDuringBuilds: true,
            },
        }
    } else return {}
}

function getEnv(name, defaultValue) {
    const v = process.env[name] || defaultValue
    console.log({ [name]: v })
    return v
}
