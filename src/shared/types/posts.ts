import { FileOptions } from '@/shared/types/fileOptions'
import { type ChangeUserDTO } from '@/shared/types/user'
import { Tag } from '@/shared/ui/InputWithTags/types'

export interface Post {
    postId: string
    name: string
    description: string
    link: string
    likeCount: number
    commentCount: number
    tags: Tag[]
    author: Author
    media: {
        type: 'img' | 'video'
        url: string
        options: FileOptions
    }
}

export interface CreatePost {
    name: string
    file: File
    link: string
    description: string
    fileOptions?: FileOptions
    tags: Tag[]
}

export type TCreatePostForm = Omit<CreatePost, 'fileOptions' | 'tags'>

interface Author extends Omit<ChangeUserDTO, 'avatar'> {
    userId: string
    avatar: string
}
