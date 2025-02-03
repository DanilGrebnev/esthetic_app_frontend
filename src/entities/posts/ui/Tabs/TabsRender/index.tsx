import { JSX } from 'react'
import s from './tabs-render.module.scss'

type TData = any[]
interface TabRenderProps<
    TData extends any[],
    TChildren = (item: TData[number]) => JSX.Element,
> {
    data: TData
    children: TChildren
}

export const TabsRender = <T extends TData>({
    children,
    data,
}: TabRenderProps<T>) => {
    return (
        <ul className={s['tabs-list']}>{data.map((item) => children(item))}</ul>
    )
}
