/** @type {import('next').NextConfig} */
const path = require('path')
const SWGRWebpackConfig = require('./webpackConfig/SWGRWebpackConfig')

module.exports = {
    reactStrictMode: false,
    experimental: {
        turbo: {},
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: process.env.NEXT_PUBLIC_PROTOCOL,
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
