import { FileOptions } from '@/shared/types/fileOptions'
import { type ChangeUserDTO } from '@/shared/types/user'
import { TInputWithTagsTagItemList } from '@/shared/ui/InputWithTags'

export interface Post {
    postId: string
    name: string
    description: string
    link: string
    likeCount: number
    commentCount: number
    tags: TInputWithTagsTagItemList
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
    tags: TInputWithTagsTagItemList
}

interface Author extends ChangeUserDTO {
    userId: string
    avatar: string
}
