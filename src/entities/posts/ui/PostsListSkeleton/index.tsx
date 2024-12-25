import { Skeleton } from '@mui/material'
import { CSSProperties } from 'react'

import s from './s.module.scss'

interface PostsListSkeletonProps {
    withMasonryContainer?: boolean
    className?: string
    style?: CSSProperties
    itemsAmount?: number
}

export const PostsListSkeleton = (props: PostsListSkeletonProps) => {
    const { itemsAmount = 25, ...otherProps } = props

    return (
        <div className={s['card-skeleton-wrapper']}>
            {Array(itemsAmount)
                .fill(null)
                .map((_, i) => {
                    return (
                        <Skeleton
                            key={i}
                            style={{
                                height: 'var(--posts-card-height)',
                            }}
                            {...otherProps}
                            variant='rounded'
                        />
                    )
                })}
        </div>
    )
}
