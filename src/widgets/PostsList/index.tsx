'use client'

import {
    PostsListSkeleton,
    useCalculateColumnsAmountByScreenSize,
} from '@/entities/posts'
import { useGetPostsQuery } from '@/shared/api/posts'
import { useGetSearchPostsPayloadFromActiveTags } from '@/shared/store/posts'
import { VirtualGrid } from '@/shared/ui/VirtualGrid'
import { PostsCard } from '@/widgets/PostsCard'
import { useMemo } from 'react'

export const PostsList = () => {
    const search = useGetSearchPostsPayloadFromActiveTags()

    const { data, isPending, fetchNextPage } = useGetPostsQuery({
        querySearchParam: search,
    })

    const columnsAmount = useCalculateColumnsAmountByScreenSize()

    const dataList = useMemo(() => {
        return data?.pages.map((page) => page.posts).flat(1) ?? []
    }, [data?.pages])

    if (!dataList?.length || isPending) {
        return <PostsListSkeleton />
    }

    return (
        <VirtualGrid
            gap='5px'
            totalCount={dataList.length}
            useWindowScroll={true}
            columnAmount={columnsAmount}
            endReached={fetchNextPage}
        >
            {(i) => {
                const item = dataList[i]

                return (
                    <PostsCard
                        key={i}
                        url={item.url}
                        urlBlur={item.urlBlur}
                        postId={item.postId}
                        name=''
                    />
                )
            }}
        </VirtualGrid>
    )
}
