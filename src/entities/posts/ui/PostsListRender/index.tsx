'use client'

import { useCombinedRef } from '@/shared/hooks/useCombineRef'
import { useScrollDirection } from '@/shared/hooks/useScrollDirection'
import { CircleButton } from '@/shared/ui/CircleButton'
import { VirtualGrid } from '@/shared/ui/VirtualGrid'
import { type JSX, type Ref, useCallback, useRef } from 'react'
import { type VirtuosoGridHandle } from 'react-virtuoso'

import { useCalculateColumnsAmountByScreenSize } from '../../model/utils/useCalculateColumnsAmountByScreenSize'
import { PostsListSkeleton } from '../PostsListSkeleton'
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
    showToTopBtn?: boolean
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
        showToTopBtn,
    } = props
    const { scrollDirection } = useScrollDirection()

    const virtuoso = useRef<VirtuosoGridHandle>(null)

    const combinedVirtuoso = useCombinedRef(virtuoso, ref)

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
        <div className={s.virtual_posts_list_wrapper}>
            <VirtualGrid
                ref={combinedVirtuoso}
                gap='5px'
                enabled={enabled}
                totalCount={data?.length ?? 0}
                useWindowScroll={useWindowScroll}
                columnAmount={columnsAmount}
                endReached={endReached}
            >
                {renderCallback}
            </VirtualGrid>
            {showToTopBtn && scrollDirection !== 'down' && (
                <CircleButton
                    onClick={() => {
                        virtuoso.current?.scrollToIndex({
                            index: 0,
                            behavior: 'smooth',
                        })
                    }}
                    className={s.to_top_btn}
                    icon='arrow'
                />
            )}
        </div>
    )
}

PostsListRender.displayName = 'PostsListRender'
