'use client'

import { VirtualGrid } from '@/shared/ui/VirtualGrid'
import { JSX, memo, useCallback, useMemo } from 'react'

import { useCalculateColumnsAmountByScreenSize } from '../../model/utils/useCalculateColumnsAmountByScreenSize'
import { PostsListSkeleton } from '../PostsListSkeleton'

interface PostsListRenderProps<TData extends any[]> {
    render: (data: TData[number]) => JSX.Element
    data?: TData
    endReached: () => void

    zeroDataTitle?: string

    loading?: boolean
    useWindowScroll?: boolean
    enabled?: boolean
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
        enabled,
    } = props

    const columnsAmount = useCalculateColumnsAmountByScreenSize()

    const renderCallback = useCallback(
        (i: number) => render(data?.[i]),
        [data, render],
    )

    if (loading) {
        return <PostsListSkeleton itemsAmount={10} />
    }

    if (zeroDataTitle && !data?.length && !loading) {
        return <p style={{ fontSize: 'var(--font-350)' }}>{zeroDataTitle}</p>
    }

    return (
        <VirtualGrid
            gap='5px'
            enabled={enabled}
            totalCount={data?.length ?? 0}
            useWindowScroll={useWindowScroll}
            columnAmount={columnsAmount}
            endReached={endReached}
        >
            {renderCallback}
        </VirtualGrid>
    )
}

PostsListRender.displayName = 'PostsListRender'
