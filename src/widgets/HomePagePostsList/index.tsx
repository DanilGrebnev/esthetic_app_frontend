'use client'

import { PostsListRender } from '@/entities/posts'
import { useGetPostsQuery } from '@/shared/api/posts'
import { useGetSearchPostsPayloadFromActiveTags } from '@/shared/store/posts'
import { PostsCard } from '@/widgets/PostsCard'

export const PostsList = () => {
    const search = useGetSearchPostsPayloadFromActiveTags()

    const { data, isPending, fetchNextPage } = useGetPostsQuery({
        querySearchParam: search,
    })

    const dataList = data?.pages.map((page) => page.posts).flat(1) ?? []

    return (
        <PostsListRender
            data={dataList}
            endReached={fetchNextPage}
            loading={isPending}
            render={({ postId, url, urlBlur }) => (
                <PostsCard
                    name=''
                    postId={postId}
                    url={url}
                    urlBlur={urlBlur}
                />
            )}
        />
    )
}
