'use client'

import { Layout } from '@/shared/types/layout'
import { ResponsiveMasonry } from '@/shared/ui/ResponsiveMasonry'

export const PostsListMasonryContainer = ({ children, className }: Layout) => {
    return (
        <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
            gutter='10px'
            className={className}
        >
            {children}
        </ResponsiveMasonry>
    )
}
