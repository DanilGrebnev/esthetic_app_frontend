import type { TPostsCard } from '@/shared/types/posts'
import { PostsCard } from '@/widgets/PostsCard'
import { type FC } from 'react'

import { MasonryContainerWithBreakPoints } from '../MasonryContainerWithBreakPoints'
import { PostsCardSkeleton } from '../PostsCardSkeleton'

interface PostsListMasonryProps {
    className?: string
    loading?: boolean
    posts: TPostsCard[] | []
}

export const PostsListMasonry: FC<PostsListMasonryProps> = (props) => {
    const { posts, className, loading } = props

    return (
        <MasonryContainerWithBreakPoints className={className}>
            {posts?.map(({ url, postId, options }) => (
                <PostsCard
                    key={postId}
                    mediaUrl={url}
                    name={'test_name'}
                    aspect={options.aspectRatio}
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
