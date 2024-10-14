import { PostsListSkeleton } from '@/entities/posts'
import { ResponsiveMasonry } from '@/shared/ui/ResponsiveMasonry'
import type { FC, ReactNode } from 'react'

interface MasonryContainerWithBreakPointsProps {
    children?: ReactNode
    className?: string
    isLoading?: boolean
}

export const MasonryContainerWithBreakPoints: FC<
    MasonryContainerWithBreakPointsProps
> = ({ children, className, isLoading }) => {
    return (
        <ResponsiveMasonry
            className={className}
            gutter='10px'
            columnsCountBreakPoints={{
                200: 1,
                320: 2,
                500: 3,
                700: 5,
                1000: 6,
            }}
        >
            {children}
        </ResponsiveMasonry>
    )
}
