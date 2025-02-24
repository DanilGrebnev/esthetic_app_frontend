'use client'

import { PostsListRender } from '@/entities/posts'
import { useGetPostsQuery } from '@/shared/api/posts'
import { useGetSearchPostsPayloadFromActiveTags } from '@/shared/store/posts'
import { PostsCard } from '@/widgets/PostsCard'
import { memo, useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'

export const HomePagePostsList = memo(() => {
    const search = useGetSearchPostsPayloadFromActiveTags()

    const { data, isPending, fetchNextPage, isError } = useGetPostsQuery({
        querySearchParam: search,
    })

    const getItemKey = useCallback<(data: { uniqueId: string }) => any>(
        (data) => data.uniqueId,
        [],
    )

    useEffect(() => {
        if (isError) toast.error('Ошибка получения постов')
    }, [isError, isPending])

    return (
        <PostsListRender
            key={search}
            itemKey={getItemKey}
            endReached={fetchNextPage}
            data={data?.posts ?? []}
        >
            {(post) => {
                return (
                    <PostsCard
                        key={post.postId}
                        name='test'
                        {...post}
                    />
                )
            }}
        </PostsListRender>
    )
})

HomePagePostsList.displayName = 'HomePagePostsList'
