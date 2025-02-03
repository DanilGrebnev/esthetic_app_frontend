export const imagesConfig = {
    remotePatterns: [
        {
            protocol: process.env.NEXT_PUBLIC_PROTOCOL,
            hostname: '*',
            pathname: '/**',
        },
    ],
}
