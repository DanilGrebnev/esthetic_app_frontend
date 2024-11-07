'use client'

import {
    MasonryContainerWithBreakPoints,
    PostsCardSkeleton,
} from '@/entities/posts'
import { RenderPostsList } from '@/entities/posts/ui/RenderPostsList'
import { useGetRecommendedPosts } from '@/shared/api/posts'
import { InfiniteScrollContainer } from '@/shared/ui/InfiniteScrollContainer'
import { PostsCard } from '@/widgets/PostsCard'
import { m } from 'framer-motion'
import { useRef } from 'react'

export const RecommendedPostsList = () => {
    const { data, fetchNextPage, isFetching, isLoading } =
        useGetRecommendedPosts()
    const ref = useRef<HTMLDivElement>(null)

    return (
        <InfiniteScrollContainer
            skip={isFetching}
            action={fetchNextPage}
            rootMargin='100%'
        >
            <RenderPostsList>
                {data?.pages.map((page) =>
                    page.posts.map((post) => (
                        <PostsCard
                            style={{ width: '100%' }}
                            key={post.postId}
                            url={post.url}
                            urlBlur={post.urlBlur}
                            name={''}
                            aspectRatio={'3/4'}
                            postId={post.postId}
                        />
                    )),
                )}
            </RenderPostsList>

            {/*{isLoading &&*/}
            {/*    Array(15)*/}
            {/*        .fill('')*/}
            {/*        .map((_, i) => {*/}
            {/*            return <PostsCardSkeleton key={i} />*/}
            {/*        })}*/}
        </InfiniteScrollContainer>
    )
}
