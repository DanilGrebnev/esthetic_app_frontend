import { type TAcceptFiles } from '../types/acceptAploadFiles'

const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
const HOST_NAME = process.env.NEXT_PUBLIC_HOSTNAME
const PORT = process.env.NEXT_PUBLIC_PORT

const baseUrl = `${PROTOCOL}://${HOST_NAME}${PORT ? ':' + PORT : ''}/` as const
const baseApiUrl = `http://localhost:8000` as const

export const consts: TConsts = {
    baseUrl,
    pathToImage: baseUrl + 'assets/',
    baseApiUrl,
    commentsIdOnDeleteQueueKey: 'comments-id-on-delete-queue',
    acceptFiles: ['.jpeg', '.jpg', '.png', '.webp'],
} as const

type TConsts = {
    baseUrl: string
    pathToImage: string
    baseApiUrl: string
    commentsIdOnDeleteQueueKey: string
    acceptFiles: TAcceptFiles
}

export const paginationPostsAmount = Number(
    process.env.NEXT_PUBLIC_PAGINATION_AMOUNT,
)
