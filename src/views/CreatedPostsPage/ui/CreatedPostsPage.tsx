'use client'

import { PostsListRender } from '@/entities/posts'
import { useGetCreatedUserPostsQuery } from '@/shared/api/users'
import { TPostsCard } from '@/shared/types/posts'
import { Container } from '@/shared/ui/Container'
import { PostsCard } from '@/widgets/PostsCard'
import { memo, useCallback } from 'react'

import { Header } from './Header'

interface CreatedPostsPageProps {
    userId: string
}

export const CreatedPostsPage = memo((props: CreatedPostsPageProps) => {
    const { data, fetchNextPage, isPending } = useGetCreatedUserPostsQuery(
        props.userId,
    )

    const render = useCallback(
        ({ postId, url, urlBlur }: TPostsCard) => (
            <PostsCard
                name=''
                postId={postId}
                url={url}
                urlBlur={urlBlur}
            />
        ),
        [],
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
                render={render}
            />
        </Container>
    )
})

CreatedPostsPage.displayName = 'CreatedPostsPage'
