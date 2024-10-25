export const imagesConfig = {
    remotePatterns: [
        {
            // @ts-ignore
            protocol: process.env.NEXT_PUBLIC_PROTOCOL,
            // @ts-ignore
            // hostname: process.env.NEXT_PUBLIC_HOSTNAME,
            hostname: '*',
            // port: process.env.NEXT_PUBLIC_PORT,
            pathname: '/**',
        },
    ],
}
