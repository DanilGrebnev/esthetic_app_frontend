'use client'

import { MasonryContainerWithBreakPoints } from '@/entities/posts'
import { postsApi, useGetRecommendedPosts } from '@/shared/api/posts'
import { getMockData } from '@/shared/mock/getMockData'
import { Button } from '@/shared/ui/Button'
import { Container } from '@/shared/ui/Container'
import { PostsCard } from '@/widgets/PostsCard'
import {
    keepPreviousData,
    useInfiniteQuery,
    useQuery,
} from '@tanstack/react-query'
import ky from 'ky'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

import { Item } from './Item'

export const Home = () => {
    const { data, fetchNextPage, isFetching, isPending, isLoading } =
        useInfiniteQuery({
            queryKey: ['projects'],
            queryFn: ({ pageParam }) => {
                return getMockData(pageParam)
            },
            getNextPageParam: (lastPage, allPages, lastPageParam) => ({
                offset: lastPageParam.offset + 20,
                limit: lastPageParam.limit + 20,
            }),
            maxPages: 200,
            initialPageParam: { offset: 0, limit: 20 },
            refetchOnWindowFocus: false,
        })

    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.1,
    })

    // useEffect(() => {
    //     console.log('isLoading', isLoading)
    // }, [isLoading])

    useEffect(() => {
        if (isLoading) return
        if (isIntersecting) {
            fetchNextPage()
        }
        console.log('isLoading', isLoading)
    }, [isIntersecting, fetchNextPage])

    return (
        <Container>
            {/*<Button onClick={() => fetchNextPage()}>Next</Button>*/}
            {data?.pages.map((page) => {
                return page.posts.map((post) => (
                    <Item
                        id={post.id}
                        key={post.id}
                        name={post.name}
                    />
                ))
            })}
            <div
                ref={ref}
                style={{ height: '100px', border: '1px solid black' }}
            ></div>
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
