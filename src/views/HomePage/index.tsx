'use client'

import { MasonryContainerWithBreakPoints } from '@/entities/posts'
import { postsApi, useGetRecommendedPosts } from '@/shared/api/posts'
import { Container } from '@/shared/ui/Container'
import { InfiniteScrollContainer } from '@/shared/ui/InfiniteScrollContainer'
import { PostsCard } from '@/widgets/PostsCard'
import { useMemo } from 'react'

import { Item } from './Item'

export const Home = () => {
    const { data, fetchNextPage, isFetching } = useGetRecommendedPosts()

    const postsAmount = useMemo(
        () => data?.pages[0].postsAmount,
        [data?.pages[0].postsAmount],
    )

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
                    {data?.pages.map((page) => {
                        return page.posts.map((post) => (
                            <Item
                                id={post.id}
                                key={post.id}
                                name={post.name}
                            />
                        ))
                    })}
                </InfiniteScrollContainer>
            </div>

            {isFetching && <div>Loading...</div>}

            <MasonryContainerWithBreakPoints>
                {/*{recommendedPosts?.posts?.map((post) => {*/}
                {/*    return (*/}
                {/*        <PostsCard*/}
                {/*            key={post.postId}*/}
                {/*            mediaUrl={post.url}*/}
                {/*            name={''}*/}
                {/*            aspect={post.aspectRatio}*/}
                {/*            postId={post.postId}*/}
                {/*        />*/}
                {/*    )*/}
                {/*})}*/}
            </MasonryContainerWithBreakPoints>
        </Container>
    )
}
