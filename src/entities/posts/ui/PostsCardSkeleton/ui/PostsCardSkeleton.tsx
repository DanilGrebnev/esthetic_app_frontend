'use client'

import { getRandomElementFromArray as ran } from '@/shared/utils/getRandomElementFromArr'
import { Skeleton, StyledEngineProvider } from '@mui/material'
import { nanoid } from 'nanoid'
import { type FC } from 'react'

import s from './PostsCardSkeleton.module.scss'

interface PostsCardSkeletonProps {}

export const PostsCardSkeleton: FC<PostsCardSkeletonProps> = (props) => {
    const asp = ['9/16', '2/3', '3/4', '4/5', '1/1']

    return (
        <StyledEngineProvider
            key={nanoid()}
            injectFirst
        >
            <Skeleton
                variant='rounded'
                className={s.skeleton}
                style={{
                    aspectRatio: ran(asp),
                }}
            />
        </StyledEngineProvider>
    )
}

PostsCardSkeleton.displayName = 'PostsCardSkeleton'
