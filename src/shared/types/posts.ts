import { FileOptions } from '@/shared/types/fileOptions'
import { TAuthor } from '@/shared/types/user'
import { Tag } from '@/shared/ui/InputWithTags/types'

/* Базовй тип поста */
export interface TPosts {
    postId: string
    name: string
    description: string
    link: string
    likeCount: number
    commentCount: number
    tags: Tag[]
    author: TAuthor
    media: {
        type: 'img' | 'video'
        url: string
        options: FileOptions
    }
}

export interface TPostsDetail extends TPosts {
    likeCount: number
    commentsCount: number
}

/* Тип для карточки поста */
export interface TPostsCard {
    postId: string
    contentType: string
    url: string
    options: FileOptions
}

/* Список постов */
export interface TPostsList {
    postsAmount: number
    posts: TPostsCard[]
}

/* Создание поста */
export interface TCreatePosts {
    file: File
    link: string
    name: string
    description: string
    aspectRatio: string
}
