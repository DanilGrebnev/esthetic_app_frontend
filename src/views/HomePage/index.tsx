'use client'

import {
    MasonryContainerWithBreakPoints,
    PostsCardSkeleton,
} from '@/entities/posts'
import { useGetRecommendedPosts } from '@/shared/api/posts'
import { Container } from '@/shared/ui/Container'
import { InfiniteScrollContainer } from '@/shared/ui/InfiniteScrollContainer'
import { PostsCard } from '@/widgets/PostsCard'
import { useEffect } from 'react'

export const Home = () => {
    const { data, fetchNextPage, isFetching, isLoading } =
        useGetRecommendedPosts()

    useEffect(() => {
        console.log('From home page', data)
    }, [data])

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
                        {data?.map((post, i) => (
                            <PostsCard
                                key={post.postId}
                                i={i}
                                url={post.url}
                                urlBlur={post.url}
                                name={''}
                                aspectRatio={post.aspectRatio}
                                postId={post.postId}
                            />
                        ))}
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
