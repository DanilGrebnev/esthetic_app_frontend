import { ReactNode } from 'react'

export interface IVirtualGridItemsProps {
    children: ReactNode
    gap?: string
    itemHeight?: string
    width: string
}

export const Item = (props: IVirtualGridItemsProps) => {
    const { children, gap, itemHeight, width } = props
    return (
        <div
            style={{
                padding: gap,
                height: itemHeight,
                width,
                display: 'flex',
                alignContent: 'stretch',
                boxSizing: 'border-box',
            }}
        >
            {children}
        </div>
    )
}

Item.displayName = 'Item'
