import { FC, type ReactNode } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

type ResponsiveMasonryWrapper = Parameters<typeof ResponsiveMasonry>[0] &
    Parameters<typeof Masonry>[0] & {
        children: ReactNode
    }

export const ResponsiveMasonryWrapper: FC<ResponsiveMasonryWrapper> = (
    props,
) => {
    const { children, gutter, ...other } = props
    return (
        <ResponsiveMasonry {...other}>
            <Masonry gutter={gutter}>{children}</Masonry>
        </ResponsiveMasonry>
    )
}
