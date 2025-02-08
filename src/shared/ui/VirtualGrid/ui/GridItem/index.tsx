import { ReactNode, memo } from 'react'

import s from './grid-item.module.scss'

export interface IVirtualGridItemsProps {
    children: ReactNode
    gap?: string
    itemHeight?: string
    width: string
}

export const GridItem = memo((props: IVirtualGridItemsProps) => {
    const { children, gap, itemHeight, width } = props
    return (
        <div
            className={s.grid_item}
            style={{
                padding: gap,
                height: itemHeight,
                width,
            }}
        >
            {children}
        </div>
    )
})

GridItem.displayName = 'Item'
