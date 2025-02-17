'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useScrollDirection } from '@/shared/hooks/useScrollDirection'
import { CircleButton } from '@/shared/ui/CircleButton'
import { VirtualGrid } from '@/shared/ui/VirtualGrid'
import { type JSX, type Ref, useCallback, useEffect, useRef } from 'react'
import { type VirtuosoGridHandle } from 'react-virtuoso'

import { useCalculateColumnsAmountByScreenSize } from '../../model/utils/useCalculateColumnsAmountByScreenSize'
import { PostsListSkeleton } from '../PostsListSkeleton'
import { ToTopBtn } from './ToTopBtn'
import s from './posts-list.module.scss'

interface PostsListRenderProps<TData extends any[]> {
    render: (data: TData[number]) => JSX.Element
    data?: TData
    endReached: () => void

    zeroDataTitle?: string

    loading?: boolean
    useWindowScroll?: boolean
    enabled?: boolean
    ref?: Ref<VirtuosoGridHandle>
    enabledToTopBtn?: boolean
    increaseViewportBy?: number
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
        ref,
        enabledToTopBtn = false,
        increaseViewportBy,
    } = props

    const { scrollDirection, setEnabled } = useScrollDirection(enabledToTopBtn)

    const virtuoso = useRef<VirtuosoGridHandle>(null)

    const combinedRef = useCombinedRef(virtuoso, ref)

    const columnsAmount = useCalculateColumnsAmountByScreenSize()

    if (loading) {
        return <PostsListSkeleton itemsAmount={10} />
    }

    if (zeroDataTitle && !data?.length && !loading) {
        return <p style={{ fontSize: 'var(--font-350)' }}>{zeroDataTitle}</p>
    }

    return (
        <div className={s.container}>
            <VirtualGrid
                ref={combinedRef}
                gap='5px'
                enabled={enabled}
                increaseViewportBy={increaseViewportBy}
                totalCount={data?.length ?? 0}
                useWindowScroll={useWindowScroll}
                columnAmount={columnsAmount}
                overscan={500}
                endReached={endReached}
                rangeChanged={({ startIndex }) => {
                    if (startIndex !== 0) {
                        setEnabled(true)
                    }
                }}
            >
                {(i) => render(data?.[i])}
            </VirtualGrid>
            <ToTopBtn
                onClick={() => setEnabled(false)}
                show={scrollDirection === 'up'}
                virtuoso={virtuoso}
            />
        </div>
    )
}

PostsListRender.displayName = 'PostsListRender'
