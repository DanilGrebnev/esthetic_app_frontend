'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useScrollDirection } from '@/shared/hooks/useScrollDirection'
import { MasonryVirtual } from '@/shared/ui/MasonryVirtual'
import { type JSX, type Ref, useRef } from 'react'
import { type VirtuosoGridHandle } from 'react-virtuoso'

import { useCalculateColumnsAmountByScreenSize } from '../../model/utils/useCalculateColumnsAmountByScreenSize'
import { PostsListSkeleton } from '../PostsListSkeleton'
import { ToTopBtn } from './ToTopBtn'
import s from './posts-list.module.scss'

interface PostsListRenderProps<TData extends any[]> {
    data?: TData
    endReached: () => void
    children: (data: TData[number]) => JSX.Element
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
        children,
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
    const columnAmount = useCalculateColumnsAmountByScreenSize()

    if (loading) {
        return <PostsListSkeleton itemsAmount={10} />
    }

    if (zeroDataTitle && !data?.length && !loading) {
        return <p style={{ fontSize: 'var(--font-350)' }}>{zeroDataTitle}</p>
    }

    return (
        <div className={s.container}>
            <MasonryVirtual
                gap={10}
                data={data}
                endReached={endReached}
                columnCount={columnAmount}
            >
                {({ data }) => children(data)}
            </MasonryVirtual>

            <ToTopBtn
                onClick={() => setEnabled(false)}
                show={scrollDirection === 'up'}
                virtuoso={virtuoso}
            />
        </div>
    )
}

PostsListRender.displayName = 'PostsListRender'
