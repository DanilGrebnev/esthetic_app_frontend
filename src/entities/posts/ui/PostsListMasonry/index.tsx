import { MasonryContainerWithBreakPoints } from '@/entities/posts/ui/MasonryContainerWithBreakPoints'
import type { TPostsCard } from '@/shared/types/posts'
import { PostsCard } from '@/widgets/PostsCard'
import { type FC, ReactNode } from 'react'

interface PostsListMasonryProps {
    className?: string
    loading?: boolean
    posts: TPostsCard[] | []
    children?: ReactNode
}

export const PostsListMasonry: FC<PostsListMasonryProps> = (props) => {
    const { posts, className, loading, children } = props

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
            {loading && children}
        </MasonryContainerWithBreakPoints>
    )
}

PostsListMasonry.displayName = 'PostsListMasonry'
