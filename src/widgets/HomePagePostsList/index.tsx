'use client'

import { PostsListRender } from '@/entities/posts'
import { useGetPostsQuery } from '@/shared/api/posts'
import { useGetSearchPostsPayloadFromActiveTags } from '@/shared/store/posts'
import { PostsCard } from '@/widgets/PostsCard'
import { memo, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'

export const HomePagePostsList = memo(() => {
    const search = useGetSearchPostsPayloadFromActiveTags()

    const { data, isPending, fetchNextPage, isError } = useGetPostsQuery({
        querySearchParam: search,
    })

    useEffect(() => {
        if (!isError || isPending) return
        toast.error('Ошибка получения постов')
    }, [isError, isPending])

    return (
        <PostsListRender
            increaseViewportBy={1000}
            enabledToTopBtn={true}
            data={data?.posts}
            enabled={!isPending || !isError}
            useWindowScroll={true}
            endReached={fetchNextPage}
            loading={isPending || isError}
            render={(post) => (
                <PostsCard
                    name=''
                    // Если передать ownerId, то отобразится блок с информацией о пользователе
                    // ownerId='123'
                    postId={post?.postId}
                    url={post?.url}
                    urlBlur={post?.urlBlur}
                />
            )}
        />
    )
})

HomePagePostsList.displayName = 'HomePagePostsList'
