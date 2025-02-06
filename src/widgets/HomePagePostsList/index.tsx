'use client'

import { PostsListRender } from '@/entities/posts'
import { useGetPostsQuery } from '@/shared/api/posts'
import { useGetSearchPostsPayloadFromActiveTags } from '@/shared/store/posts'
import { PostsCard } from '@/widgets/PostsCard'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export const PostsList = () => {
    const search = useGetSearchPostsPayloadFromActiveTags()

    const { data, isPending, fetchNextPage, isError } = useGetPostsQuery({
        querySearchParam: search,
    })

    useEffect(() => {
        if (!isError) return
        toast.error('Ошибка получения постов')
    }, [isError])

    return (
        <PostsListRender
            data={data?.posts}
            enabled={!isPending || !isError}
            endReached={fetchNextPage}
            loading={isPending || isError}
            render={(post) => (
                <PostsCard
                    name=''
                    postId={post?.postId}
                    url={post?.url}
                    urlBlur={post?.urlBlur}
                />
            )}
        />
    )
}
