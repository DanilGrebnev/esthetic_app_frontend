const port = process.env.NEXT_PUBLIC_PORT
const path = `${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_HOSTNAME}${port ? ':' + port : ''}/assets/`

export const consts = {
    pathToImage: path,
} as const
