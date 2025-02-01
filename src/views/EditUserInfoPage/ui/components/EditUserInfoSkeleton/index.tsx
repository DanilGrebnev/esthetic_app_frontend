'use client'

import { Skeleton } from '@mui/material'
import { type FC } from 'react'

import s from './s.module.scss'

interface EditUserInfoSkeletonProps {}

export const EditUserInfoSkeleton: FC<EditUserInfoSkeletonProps> = (props) => {
    return (
        <div className={s.wrapper}>
            <Skeleton
                variant='rectangular'
                className={s.avatar}
            />
            <Skeleton
                variant='rectangular'
                className={s.text}
            />
            <Skeleton
                variant='rectangular'
                className={s.text}
            />
            <Skeleton
                variant='rectangular'
                className={s.text}
            />
            <Skeleton
                variant='rectangular'
                className={s.text}
            />
            <Skeleton
                variant='rectangular'
                className={s.text}
            />
        </div>
    )
}

EditUserInfoSkeleton.displayName = 'EditUserInfoSkeleton'
