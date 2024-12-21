import { ReactNode } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'

import { Footer } from './Footer'
import { Item } from './Item'
import { List } from './List'

export interface IVirtualGridProps {
    itemHeight?: string
    columnAmount: number
    gap?: string
    totalCount: number | undefined
    enabled?: boolean
    increaseViewportBy?: number
    useWindowScroll?: boolean
    endReached?: () => void
    children?: (index: number) => JSX.Element
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
export const VirtualGrid = (props: IVirtualGridProps) => {
    const {
        columnAmount,
        gap,
        itemHeight,
        totalCount,
        useWindowScroll,
        enabled = true,
        increaseViewportBy = { top: 0, bottom: 0 },
        children,
        endReached,
    } = props

    return (
        <VirtuosoGrid
            useWindowScroll={useWindowScroll}
            increaseViewportBy={increaseViewportBy}
            style={{ height: '100%', flexGrow: 1 }}
            totalCount={totalCount}
            endReached={() => (enabled ? endReached?.() : () => {})}
            components={{
                List,
                Item: ({ children }) => (
                    <Item
                        itemHeight={itemHeight}
                        width={100 / columnAmount + '%'}
                        gap={gap}
                    >
                        {children}
                    </Item>
                ),
            }}
            itemContent={children}
        />
    )
}
