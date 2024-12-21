'use client'

import { PostsListSkeleton } from '@/entities/posts'
import { useGetCreatedUserPostsQuery } from '@/shared/api/users'
import { Container } from '@/shared/ui/Container'
import { VirtualGrid } from '@/shared/ui/VirtualGrid'
import { PostsCard } from '@/widgets/PostsCard'

interface CreatedPostsPageProps {
    userId: string
}

export const CreatedPostsPage = (props: CreatedPostsPageProps) => {
    const { data, fetchNextPage, isPending } = useGetCreatedUserPostsQuery(
        props.userId,
    )

    const postsList = data?.pages.map((page) => page.posts).flat(1)

    if (!postsList?.length && !isPending) {
        return (
            <p style={{ fontSize: 'var(--font-350)' }}>
                У пользователя нет созданных постов.
            </p>
        )
    }

    return (
        <Container
            id='Created users post page'
            className='grow'
        >
            {postsList && (
                <VirtualGrid
                    columnAmount={7}
                    gap='10px'
                    totalCount={postsList?.length}
                    useWindowScroll={true}
                    endReached={fetchNextPage}
                >
                    {(index) => {
                        const post = postsList?.[index]

                        return (
                            <PostsCard
                                name=''
                                postId={post?.postId}
                                url={post?.url}
                                urlBlur={post?.urlBlur}
                            />
                        )
                    }}
                </VirtualGrid>
            )}
            {isPending && <PostsListSkeleton />}
        </Container>
    )
}

CreatedPostsPage.displayName = 'CreatedPostsPage'
