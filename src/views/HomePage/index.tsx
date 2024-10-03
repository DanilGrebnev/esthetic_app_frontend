'use client'

import { MasonryContainerWithBreakPoints } from '@/entities/posts'
import { postsApi, useGetRecommendedPosts } from '@/shared/api/posts'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { PostsCard } from '@/widgets/PostsCard'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import ky from 'ky'
import { useCallback, useEffect, useMemo } from 'react'

const array = [
    { id: 1, name: 'Danil' },
    { id: 2, name: 'Ivan' },
    { id: 3, name: 'Yura' },
    { id: 4, name: 'Dima' },
]

function getPosts({ offset, limit }: { offset: number; limit: number }) {
    return Promise.resolve({
        postsAmount: array.length,
        posts: array.slice(offset, limit),
    })
}

export const Home = () => {
    // const { data: recommendedPosts, isPending } = useGetRecommendedPosts()

    const { data: recommendedPosts, fetchNextPage } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: ({ pageParam }) => {
            // return postsApi.recommendedPosts(pageParam)
            return getPosts(pageParam)
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            return {
                offset: lastPageParam.offset + 1,
                limit: lastPageParam.limit + 1,
            }
        },
        getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
            return undefined
        },
        placeholderData: keepPreviousData,
        // maxPages: 3,
        initialPageParam: { offset: 0, limit: 1 },
    })

    useEffect(() => {
        console.log(recommendedPosts)
    }, [recommendedPosts])

    return (
        <Container>
            <Button onClick={() => fetchNextPage()}>Next</Button>

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
