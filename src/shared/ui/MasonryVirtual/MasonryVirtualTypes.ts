import { type JSX } from 'react'

export type TData = any[] | undefined

export interface TMasonryVirtualProps<T extends TData> {
    endReached?: () => void
    data?: T
    defaultData?: any[]
    gap?: number
    children: TChildrenRender<T>
    columnCount?: number
    itemKey?: (
        data: T extends (infer P)[] ? P : T,
        index: number,
    ) => string | number
}

export type TChildrenRender<T extends any> = (props: {
    index: number
    data: T extends (infer P)[] ? P : T
    width: number
}) => JSX.Element
