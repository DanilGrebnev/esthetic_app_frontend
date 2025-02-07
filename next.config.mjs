// @ts-check

/** @type {import('next').NextConfig} */
import { unauthorized } from 'next/navigation.js'

import { SWGRWebpackConfig } from './webpackConfig/SWGRWebpackConfig.js'

const nextConfig = {
    ...toggleLinting(getEnv('LINT', process.env.LINT)),
    ...setOutput(getEnv('MODE', process.env.MODE)),
    reactStrictMode: false,
    experimental: {},
    env: {
        ...getEnvConfig(getEnv('MODE', process.env.MODE)),
    },

    images: {
        unauthorized: true,
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

    return v
}
// hard set env variables for docker file
function getEnvConfig(mode) {
    let env = {}
    console.log({ mode })

    const buildMode = {
        ['production:remote']: 'production:remote',
        ['production:local']: 'production:local',
    }

    if (mode === buildMode['production:remote']) {
        env = {
            NEXT_PUBLIC_PROTOCOL: 'https',
            NEXT_PUBLIC_HOSTNAME: '91.202.207.229',
            NEXT_PUBLIC_PORT: '3000',
            NEXT_PUBLIC_APP_NAME: 'Postes',
            NEXT_PUBLIC_PAGINATION_AMOUNT: 30,
            NEXT_PUBLIC_FETCH_URL: 'https:postes.ru/api',
            NEXT_SHARP_PATH: '/tmp/node_modules/sharp',
        }
    }
    if (mode === buildMode['production:local']) {
        env = {
            NEXT_PUBLIC_PROTOCOL: 'http',
            NEXT_PUBLIC_HOSTNAME: 'localhost',
            NEXT_PUBLIC_PORT: '3000',
            NEXT_PUBLIC_APP_NAME: 'Postes',
            NEXT_PUBLIC_PAGINATION_AMOUNT: 30,
            NEXT_PUBLIC_FETCH_URL: 'http://localhost:8000/api',
            NEXT_SHARP_PATH: '/tmp/node_modules/sharp',
        }
    }

    return env
}
