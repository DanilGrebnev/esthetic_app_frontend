import { type JSX, type Ref, memo, useMemo } from 'react'
import { VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'

import { useEndReachedCallback } from '../hooks'
import { GridItem } from './GridItem'
import { List } from './List'

export interface IVirtualGridProps {
    listClassName?: string
    itemHeight?: string
    columnAmount: number
    gap?: string
    totalCount: number | undefined
    enabled?: boolean
    increaseViewportBy?: number
    useWindowScroll?: boolean
    overscan?: number
    endReached?: () => void
    children?: (index: number) => JSX.Element
    isScrolling?: (isScrolling: boolean) => void
    rangeChanged?: (arg: { startIndex: number; endIndex: number }) => void
    ref?: Ref<VirtuosoGridHandle>
}
/**
 * usage example:
 * @example
 *  import { useGetRecommendedPosts } from '@/shared/api/posts'
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
             useWindowScroll={true}
             columnAmount={7}
             endReached={fetchNextPage}
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
 */
export const VirtualGrid = memo((props: IVirtualGridProps) => {
    const {
        columnAmount,
        gap,
        itemHeight,
        enabled = true,
        children,
        endReached,
        // НЕ УБИРАТЬ! Иначе возникает ошибка с top.
        increaseViewportBy = {
            top: 0,
            bottom: 0,
        },
        ...otherProps
    } = props

    const endReachedCallback = useEndReachedCallback({ enabled, endReached })

    const w = useMemo(() => 100 / columnAmount + '%', [columnAmount])

    const increaseViewportByCb = useMemo(() => increaseViewportBy, [])

    return (
        <VirtuosoGrid
            style={{ height: '100%', flexGrow: 1 }}
            endReached={endReachedCallback}
            itemContent={children}
            increaseViewportBy={increaseViewportByCb}
            {...otherProps}
            components={{
                List,
                Item: ({ children }) => (
                    <GridItem
                        itemHeight={itemHeight}
                        width={w}
                        gap={gap}
                    >
                        {children}
                    </GridItem>
                ),
            }}
        />
    )
})

VirtualGrid.displayName = 'VirtualGrid'
