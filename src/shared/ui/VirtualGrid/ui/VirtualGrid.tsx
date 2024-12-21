import { ReactNode } from 'react'
import { VirtuosoGrid } from 'react-virtuoso'

import { Footer } from './Footer'
import { Item } from './Item'
import { List } from './List'

export interface IVirtualGridProps {
    itemHeight?: string
    columnAmount: number
    gap?: string
    loader?: ReactNode
    totalCount: number | undefined
    enabled?: boolean
    onEndScroll?: () => void
    children?: (index: number) => JSX.Element
}

export const VirtualGrid = (props: IVirtualGridProps) => {
    const {
        columnAmount,
        gap,
        itemHeight,
        totalCount,
        enabled,
        loader,
        children,
        onEndScroll,
    } = props

    return (
        <VirtuosoGrid
            style={{ height: '100%', flexGrow: 1 }}
            totalCount={totalCount}
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
                Footer: () => (
                    <Footer
                        inViewAction={onEndScroll}
                        enabled={enabled}
                    />
                ),
            }}
            itemContent={children}
        />
    )
}
