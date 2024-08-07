const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
const HOST_NAME = process.env.NEXT_PUBLIC_HOSTNAME
const PORT = process.env.NEXT_PUBLIC_PORT

const baseUrl = `${PROTOCOL}://${HOST_NAME}${PORT ? ':' + PORT : ''}/`

export const consts = {
    baseUrl,
    pathToImage: baseUrl + 'assets/',
} as const
