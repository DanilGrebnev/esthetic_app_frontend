import type { TAspectRatio } from '@/shared/types/media'
import type { TAuthor } from '@/shared/types/user'
import type { Tag } from '@/shared/ui/InputWithTags/types'

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
        urlBlur: string
        aspectRatio: TAspectRatio
    }
}
/* Детальная информация поста */
export interface TPostsDetail {
    post: TPosts
    user: {
        isLike: boolean
        isOwner: boolean
    }
}

/* Тип для карточки поста */
export interface TPostsCard {
    postId: string
    contentType: string
    url: string
    urlBlur: string
    aspectRatio: TAspectRatio
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
    aspectRatio: TAspectRatio
}

// Прневью поста
export interface TPostsPreview {
    contentType: 'img' | 'video'
    aspectRatio: TAspectRatio
    postId: string
    url: string
    urlBlur: string
}

export interface TSearchPostsTags {
    tag: string
    id: string
    active: boolean
}
