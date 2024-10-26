import {
    MasonryContainerWithBreakPoints,
    PostsCardSkeleton,
} from '@/entities/posts/'
import type { TPostsCard } from '@/shared/types/posts'
import { type FC } from 'react'

import { PostsCard } from '../../PostsCard'

interface PostsListMasonryProps {
    className?: string
    loading?: boolean
    posts: TPostsCard[] | []
}

export const PostsListMasonry: FC<PostsListMasonryProps> = (props) => {
    const { posts, className, loading } = props

    return (
        <MasonryContainerWithBreakPoints className={className}>
            {posts?.map(({ url, postId, urlBlur, aspectRatio }) => (
                <PostsCard
                    key={postId}
                    postId={postId}
                    url={url}
                    urlBlur={urlBlur}
                    name={'test_name'}
                    aspectRatio={aspectRatio}
                />
            ))}
            {loading &&
                Array(20)
                    .fill('')
                    .map((_, i) => <PostsCardSkeleton key={i} />)}
        </MasonryContainerWithBreakPoints>
    )
}

PostsListMasonry.displayName = 'PostsListMasonry'
