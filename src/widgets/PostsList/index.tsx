'use client'

import { useGetRecommendedPosts } from '@/shared/api/posts'
import { VirtualGrid } from '@/shared/ui/VirtualGrid'
import { PostsCard } from '@/widgets/PostsCard'
import { useMemo } from 'react'

export const PostsList = () => {
    const { data, isPending, fetchNextPage } = useGetRecommendedPosts()

    const dataList = useMemo(() => {
        return data?.pages.map((page) => page.posts).flat(1)
    }, [data?.pages.length])

    if (!dataList?.length || isPending) {
        return <h1>Загрузка</h1>
    }

    return (
        <VirtualGrid
            gap='10px'
            totalCount={dataList.length}
            columnAmount={7}
            onEndScroll={fetchNextPage}
        >
            {(index) => {
                const item = dataList[index]

                return (
                    <PostsCard
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
