'use client'

import { Skeleton } from '@mui/material'
import { StyledEngineProvider } from '@mui/material/styles'
import { clsx } from 'clsx'
import { type FC } from 'react'

import s from './s.module.scss'

interface UserAvatarProps {
    word?: string
    size?: 'l' | 'm' | 's'
    className?: string
    avatar?: string
    loading?: boolean
}

export const UserAvatar: FC<UserAvatarProps> = (props) => {
    const { loading, size = 'l', word = 'Д', className, avatar } = props

    if (loading) {
        return (
            <StyledEngineProvider injectFirst>
                <Skeleton className={clsx(s.skeleton, s[size])} />{' '}
            </StyledEngineProvider>
        )
    }

    return <div className={clsx(s.avatar, s[size], className)}>{word}</div>
}
