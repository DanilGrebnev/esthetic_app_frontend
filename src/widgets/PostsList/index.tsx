import { PostsListMasonryContainer } from '@/entities/posts'
import { mockPosts } from '@/entities/posts/mock'
import { type FC } from 'react'

import { PostsCard } from '../PostsCard'

interface PostsListProps {
    className?: string
    isLoading?: boolean
}

export const PostsList: FC<PostsListProps> = ({ className }) => {
    return (
        <PostsListMasonryContainer className={className}>
            {mockPosts.map(({ url, aspect }, i) => (
                <PostsCard
                    key={i}
                    mediaUrl={url}
                    name={'test_name'}
                    aspect={aspect}
                />
            ))}
        </PostsListMasonryContainer>
    )
}
