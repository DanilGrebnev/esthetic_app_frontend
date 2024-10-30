'use client'

import {
    MasonryContainerWithBreakPoints,
    PostsCardSkeleton,
} from '@/entities/posts'
import { useGetRecommendedPosts } from '@/shared/api/posts'
import { Container } from '@/shared/ui/Container'
import { InfiniteScrollContainer } from '@/shared/ui/InfiniteScrollContainer'
import { PostsCard } from '@/widgets/PostsCard'
import { m } from 'framer-motion'
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
                        {data?.pages.map((page) =>
                            page.posts.map((post) => (
                                <m.div
                                    key={post.postId}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        duration: 0.3,
                                    }}
                                >
                                    <PostsCard
                                        url={post.url}
                                        urlBlur={post.urlBlur}
                                        name={''}
                                        aspectRatio={post.aspectRatio}
                                        postId={post.postId}
                                    />
                                </m.div>
                            )),
                        )}
                        {isFetching &&
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
