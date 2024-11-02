'use client'

import {
    MasonryContainerWithBreakPoints,
    PostsCardSkeleton,
} from '@/entities/posts'
import { useGetRecommendedPosts } from '@/shared/api/posts'
import { InfiniteScrollContainer } from '@/shared/ui/InfiniteScrollContainer'
import { PostsCard } from '@/widgets/PostsCard'
import { m } from 'framer-motion'

export const RecommendedPostsList = () => {
    const { data, fetchNextPage, isFetching, isLoading } =
        useGetRecommendedPosts()

    return (
        <InfiniteScrollContainer
            skip={isFetching}
            action={fetchNextPage}
            rootMargin='100%'
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
                                key={post.postId}
                                url={post.url}
                                urlBlur={post.urlBlur}
                                name={''}
                                aspectRatio={post.aspectRatio}
                                postId={post.postId}
                            />
                        </m.div>
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
    )
}
