'use client'

import { PostsListRender } from '@/entities/posts'
import '@/entities/posts'
import { useGetCreatedUserPostsQuery } from '@/shared/api/users'
import { Container } from '@/shared/ui/Container'
import { PostsCard } from '@/widgets/PostsCard'

import { Header } from './Header'

interface CreatedPostsPageProps {
    userId: string
}

export const CreatedPostsPage = (props: CreatedPostsPageProps) => {
    const { data, fetchNextPage, isPending } = useGetCreatedUserPostsQuery(
        props.userId,
    )

    return (
        <Container>
            <Header userId={props.userId} />
            <PostsListRender
                zeroDataTitle='У пользователя нет созданных постов.'
                data={data?.posts}
                useWindowScroll={true}
                loading={isPending}
                enabled={data?.next}
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
