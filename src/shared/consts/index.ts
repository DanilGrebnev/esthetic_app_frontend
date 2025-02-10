import { type TAcceptFiles } from '../types/acceptAploadFiles'

const PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL
const HOST_NAME = process.env.NEXT_PUBLIC_HOSTNAME
const PORT = process.env.NEXT_PUBLIC_PORT

const baseUrl = `${PROTOCOL}://${HOST_NAME}${PORT ? ':' + PORT : ''}/` as const
const baseApiUrl = `http://localhost:8000` as const

export const consts: TConsts = {
    BASE_URL: baseUrl,
    pathToImage: baseUrl + 'assets/',
    baseApiUrl,
    COMMENTS_ID_ON_DELETE_QUEUE_KEY: 'comments-id-on-delete-queue',
    ACCEPT_FILES: ['.png', '.jpg', '.jpeg', '.webp', '.HEIC', '.HEIF'],
} as const

type TConsts = {
    BASE_URL: string
    pathToImage: string
    baseApiUrl: string
    COMMENTS_ID_ON_DELETE_QUEUE_KEY: string
    ACCEPT_FILES: TAcceptFiles
}

export const paginationPostsAmount = Number(
    process.env.NEXT_PUBLIC_PAGINATION_AMOUNT,
)
