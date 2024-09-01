import { ResponsiveMasonry } from '@/shared/ui/ResponsiveMasonry'
import type { FC, ReactNode } from 'react'

interface MasonryContainerWithBreakPointsProps {
    children?: ReactNode
    className?: string
}

export const MasonryContainerWithBreakPoints: FC<
    MasonryContainerWithBreakPointsProps
> = ({ children, className }) => {
    return (
        <ResponsiveMasonry
            className={className}
            gutter='10px'
            columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
        >
            {children}
        </ResponsiveMasonry>
    )
}
