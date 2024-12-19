'use client'

import { PostsCardSkeleton } from '@/entities/posts'
import { type FC } from 'react'

interface PostsListSkeletonProps {
    withMasonryContainer?: boolean
}

export const PostsListSkeleton: FC<PostsListSkeletonProps> = (props) => {
    return Array(15)
        .fill('')
        .map((_, i) => {
            return <PostsCardSkeleton key={i} />
        })
}
