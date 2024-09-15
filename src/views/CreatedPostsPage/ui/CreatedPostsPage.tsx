'use client'

import { MasonryContainerWithBreakPoints } from '@/entities/posts'
import { useGetAllCreatedUsersPosts } from '@/shared/api/users'
import { Container } from '@/shared/ui/Container'
import { PostsCard } from '@/widgets/PostsCard'
import { type FC } from 'react'

interface CreatedPostsPageProps {
    userId: string
}

export const CreatedPostsPage: FC<CreatedPostsPageProps> = (props) => {
    const { data } = useGetAllCreatedUsersPosts(props.userId)

    const posts = data?.posts

    return (
        <Container>
            <MasonryContainerWithBreakPoints>
                {posts?.map((post) => (
                    <PostsCard
                        key={post.postId}
                        postId={post.postId}
                        aspect={post.options.aspectRatio}
                        mediaUrl={post.url}
                        name={post.postId}
                    />
                ))}
            </MasonryContainerWithBreakPoints>
        </Container>
    )
}

CreatedPostsPage.displayName = 'CreatedPostsPage'
