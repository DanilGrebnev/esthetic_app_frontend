'use client'

import { Container } from '@/shared/ui/Container'
import { Skeleton } from '@mui/material'
import { clsx } from 'clsx'

import s from './s.module.scss'

function BtnSkeleton() {
    const btn = { width: '130px', height: '48px' }

    return (
        <Skeleton
            style={btn}
            variant='rounded'
        />
    )
}

export const UserPublicProfileHeaderSkeleton = () => {
    const username = { width: '150px', height: '20px' }

    return (
        <Container className={s.container}>
            <Skeleton
                variant='rounded'
                style={{ width: '100px', height: '100px' }}
                className={s.avatar}
            />
            <Skeleton
                className={s.name}
                style={{ width: '200px', height: '48px' }}
                variant='rounded'
            />
            <Skeleton
                variant='rounded'
                style={username}
                className={s.username}
            />
            <Skeleton
                variant='rounded'
                style={username}
                className={s.subscriptions}
            />
            <div className={s.group}>
                <BtnSkeleton />
                <BtnSkeleton />
            </div>
            <div className={clsx(s.group, s['group-2'])}>
                <BtnSkeleton />
                <BtnSkeleton />
            </div>
        </Container>
    )
}
