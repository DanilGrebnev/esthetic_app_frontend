import { PostsCardSkeleton } from '@/entities/posts'
import { MasonryContainerWithBreakPoints } from '@/entities/posts/ui/MasonryContainerWithBreakPoints'
import type { TPostsCard } from '@/shared/types/posts'
import { PostsCard } from '@/widgets/PostsCard'
import { type FC } from 'react'

interface PostsListMasonryProps {
    className?: string
    loading?: boolean
    posts: TPostsCard[] | []
}

const SkeletonComponent = () => {
    return (
        <>
            {Array(20)
                .fill('')
                .map((_, i) => (
                    <PostsCardSkeleton key={i} />
                ))}
        </>
    )
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
            {loading && <SkeletonComponent />}
        </MasonryContainerWithBreakPoints>
    )
}

PostsListMasonry.displayName = 'PostsListMasonry'
