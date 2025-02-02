'use client'

import { PostsListRender } from '@/entities/posts'
import '@/entities/posts'
import { useGetCreatedUserPostsQuery } from '@/shared/api/users'
import { Container } from '@/shared/ui/Container'
import { PostsCard } from '@/widgets/PostsCard'

interface CreatedPostsPageProps {
    userId: string
}

export const CreatedPostsPage = (props: CreatedPostsPageProps) => {
    const { data, fetchNextPage, isPending } = useGetCreatedUserPostsQuery(
        props.userId,
    )
    const postsList = data?.pages.map((page) => page.posts).flat(1)

    return (
        <Container>
            <PostsListRender
                zeroDataTitle='У пользователя нет созданных постов.'
                data={postsList}
                useWindowScroll={true}
                loading={isPending}
                endReached={fetchNextPage}
                render={({ postId, url, urlBlur }) => (
                    <PostsCard
                        name=''
                        postId={postId}
                        url={url}
                        urlBlur={urlBlur}
                    />
                )}
            />
        </Container>
    )
}

CreatedPostsPage.displayName = 'CreatedPostsPage'
