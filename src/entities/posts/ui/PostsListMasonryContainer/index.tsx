'use client'

import { Layout } from '@/shared/types/layout'
import { ResponsiveMasonry } from '@/shared/ui/ResponsiveMasonry'
import clsx from 'clsx'

export const PostsListMasonryContainer = ({ children, className }: Layout) => {
    return (
        <ResponsiveMasonry
            className={clsx('container', className)}
            columnsCountBreakPoints={{ 300: 2, 500: 3, 700: 4, 900: 5 }}
            gutter='10px'
        >
            {children}
        </ResponsiveMasonry>
    )
}
