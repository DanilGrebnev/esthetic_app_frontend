'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useScrollDirection } from '@/shared/hooks/useScrollDirection'
import { MasonryVirtual } from '@/shared/ui/MasonryVirtual'
import { type TMasonryVirtualProps } from '@/shared/ui/MasonryVirtual'
import { type JSX, type Ref, useRef } from 'react'
import { type VirtuosoGridHandle } from 'react-virtuoso'

import { useCalculateColumnsAmountByScreenSize } from '../../model/utils/useCalculateColumnsAmountByScreenSize'
import { PostsListSkeleton } from '../PostsListSkeleton'
import { ToTopBtn } from './ToTopBtn'
import s from './posts-list.module.scss'

interface PostsListRenderProps<TData extends any[]>
    extends TMasonryVirtualProps<TData> {
    zeroDataTitle?: string
    children: (data: TData[number]) => JSX.Element
    loading?: boolean
    useWindowScroll?: boolean
    enabled?: boolean
    ref?: Ref<VirtuosoGridHandle>
    enabledToTopBtn?: boolean
}

export const PostsListRender = <TData extends any[]>(
    props: PostsListRenderProps<TData>,
) => {
    const {
        children,
        endReached,
        data,
        loading,
        zeroDataTitle,
        enabledToTopBtn = false,
        itemKey,
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
                itemKey={itemKey}
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
