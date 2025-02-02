'use client'

import { VirtualGrid } from '@/shared/ui/VirtualGrid'

import { useCalculateColumnsAmountByScreenSize } from '../../model/utils/useCalculateColumnsAmountByScreenSize'
import { PostsListSkeleton } from '../PostsListSkeleton'

interface PostsListRenderProps<TData extends any[]> {
    render: (data: TData[number]) => JSX.Element
    data?: TData
    endReached: () => void

    zeroDataTitle?: string

    loading?: boolean
    useWindowScroll?: boolean
}

export const PostsListRender = <TData extends any[]>(
    props: PostsListRenderProps<TData>,
) => {
    const {
        render,
        endReached,
        data,
        useWindowScroll,
        loading,
        zeroDataTitle,
    } = props
    const columnsAmount = useCalculateColumnsAmountByScreenSize()

    if (loading || !data?.length) {
        return <PostsListSkeleton />
    }

    if (zeroDataTitle && !data?.length && !loading) {
        return <p style={{ fontSize: 'var(--font-350)' }}>{zeroDataTitle}</p>
    }

    return (
        <VirtualGrid
            gap='5px'
            totalCount={data.length}
            useWindowScroll={useWindowScroll}
            columnAmount={columnsAmount}
            endReached={endReached}
        >
            {(i) => render(data[i])}
        </VirtualGrid>
    )
}
