'use client'

import { Skeleton } from '@mui/material'
import { CSSProperties, type FC } from 'react'

interface PostsListSkeletonProps {
    withMasonryContainer?: boolean
    className?: string
    style?: CSSProperties
    itemsAmount?: number
}

export const PostsListSkeleton: FC<PostsListSkeletonProps> = (props) => {
    const { itemsAmount = 15, ...otherProps } = props

    return (
        <div
            style={{
                display: 'grid',
                gap: '20px',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            }}
        >
            {Array(itemsAmount)
                .fill('')
                .map((_, i) => {
                    return (
                        <Skeleton
                            key={i}
                            style={{ height: '400px' }}
                            {...otherProps}
                            variant='rounded'
                        />
                    )
                })}
        </div>
    )
}
