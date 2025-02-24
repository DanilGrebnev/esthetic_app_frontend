import { Masonry, useInfiniteLoader } from 'masonic'

import type { TData, TProps } from './MasonryVirtualTypes'

export const MasonryVirtual = <T extends TData>(props: TProps<T>) => {
    const {
        endReached,
        children,
        columnCount,
        data,
        gap = 0,
        defaultData,
    } = props
    const infiniteLoader = useInfiniteLoader(() => endReached?.())

    return (
        <Masonry
            columnCount={columnCount}
            items={data ?? defaultData ?? []}
            columnGutter={gap}
            render={children}
            onRender={infiniteLoader}
        />
    )
}
