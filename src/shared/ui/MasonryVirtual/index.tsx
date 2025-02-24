import { Masonry, useInfiniteLoader } from 'masonic'

import type { TData, TMasonryVirtualProps } from './MasonryVirtualTypes'

export type { TMasonryVirtualProps } from './MasonryVirtualTypes'

export const MasonryVirtual = <T extends TData>(
    props: TMasonryVirtualProps<T>,
) => {
    const {
        endReached,
        children,
        columnCount,
        data,
        gap = 0,
        defaultData,
        itemKey,
    } = props
    const infiniteLoader = useInfiniteLoader(() => endReached?.())

    return (
        <Masonry
            itemKey={itemKey}
            columnCount={columnCount}
            items={data ?? defaultData ?? []}
            columnGutter={gap}
            render={children}
            onRender={infiniteLoader}
        />
    )
}
