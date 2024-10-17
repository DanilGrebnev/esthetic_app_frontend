'use client'

import {
    MasonryContainerWithBreakPoints,
    PostsCardSkeleton,
} from '@/entities/posts'
import { useGetRecommendedPosts } from '@/shared/api/posts'
import { Container } from '@/shared/ui/Container'
import { InfiniteScrollContainer } from '@/shared/ui/InfiniteScrollContainer'
import { PostsCard } from '@/widgets/PostsCard'
import { useMemo } from 'react'

export const Home = () => {
    const { data, fetchNextPage, isFetching, isLoading } =
        useGetRecommendedPosts()

    const postsAmount = useMemo(() => data?.pages[0].postsAmount, [])

    return (
        <Container>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <InfiniteScrollContainer
                    skip={isFetching}
                    action={fetchNextPage}
                >
                    <MasonryContainerWithBreakPoints isLoading={isFetching}>
                        {data?.pages?.map((page) =>
                            page.posts.map((post, i) => (
                                <PostsCard
                                    key={post.postId}
                                    mediaUrl={post.url}
                                    name={''}
                                    aspect={post.aspectRatio}
                                    postId={post.postId}
                                />
                            )),
                        )}
                        {isLoading &&
                            Array(15)
                                .fill('')
                                .map((_, i) => {
                                    return <PostsCardSkeleton key={i} />
                                })}
                    </MasonryContainerWithBreakPoints>
                </InfiniteScrollContainer>
            </div>
        </Container>
    )
}
