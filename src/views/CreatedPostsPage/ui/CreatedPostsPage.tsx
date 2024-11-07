'use client'

import { PostsListContainerWithBreakpoints } from '@/entities/posts'
import { useGetCreatedUserPostsQuery } from '@/shared/api/users'
import { Container } from '@/shared/ui/Container'
import { InfiniteScrollContainer } from '@/shared/ui/InfiniteScrollContainer'
import { PostsCard } from '@/widgets/PostsCard'
import { type FC } from 'react'

interface CreatedPostsPageProps {
    userId: string
}

export const CreatedPostsPage: FC<CreatedPostsPageProps> = (props) => {
    const { data, fetchNextPage, isPending } = useGetCreatedUserPostsQuery(
        props.userId,
    )

    if (!data?.pages[0].posts.length && !isPending) {
        return (
            <p style={{ fontSize: 'var(--font-350)' }}>
                У пользователя нет созданных постов.
            </p>
        )
    }

    return (
        <Container>
            <InfiniteScrollContainer
                skip={isPending}
                action={fetchNextPage}
            >
                <PostsListContainerWithBreakpoints>
                    {data?.pages.map((page) =>
                        page.posts.map((post) => (
                            <PostsCard
                                key={post.postId}
                                postId={post.postId}
                                url={post.url}
                                urlBlur={post.urlBlur}
                                name={post.postId}
                                aspectRatio='9/16'
                            />
                        )),
                    )}
                </PostsListContainerWithBreakpoints>
            </InfiniteScrollContainer>
        </Container>
    )
}

CreatedPostsPage.displayName = 'CreatedPostsPage'
