'use client'

import { PostsListContainerWithBreakpoints } from '@/entities/posts'
import { useGetCreatedUserPostsQuery } from '@/shared/api/users'
import { Container } from '@/shared/ui/Container'
import { PostsCard } from '@/widgets/PostsCard'
import { type FC } from 'react'

interface CreatedPostsPageProps {
    userId: string
}

export const CreatedPostsPage: FC<CreatedPostsPageProps> = (props) => {
    const { data } = useGetCreatedUserPostsQuery(props.userId)
    const posts = data?.posts

    return (
        <Container>
            <PostsListContainerWithBreakpoints>
                {posts?.map((post) => (
                    <PostsCard
                        key={post.postId}
                        postId={post.postId}
                        url={post.url}
                        urlBlur={post.urlBlur}
                        name={post.postId}
                        aspectRatio='9/16'
                    />
                ))}
            </PostsListContainerWithBreakpoints>
        </Container>
    )
}

CreatedPostsPage.displayName = 'CreatedPostsPage'
