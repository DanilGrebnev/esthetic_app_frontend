'use client'

import { useDeletePostsFromDashboardMutation } from '@/shared/api/dashboards'
import { Button } from '@/shared/ui/Button'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { Skeleton } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import { type FC, useEffect } from 'react'

import { getDashboardItemTitle } from '../model/utils'
import { Placeholder } from './Placeholder'
import s from './s.module.scss'

interface DashboardItemProps {
    loading?: boolean
    disabled?: boolean
    dashboardName: string
    skeleton?: boolean
    image?: string
    onClick?: () => void
    deleteBtn?: boolean
    dashboardId: string
    postsId: string
}

export const DashboardItem: FC<DashboardItemProps> = (props) => {
    const {
        loading,
        dashboardName,
        onClick,
        deleteBtn,
        image,
        disabled,
        skeleton,
        dashboardId,
        postsId,
    } = props

    const {
        mutate: deletePostFromDashboard,
        isPending: pendingDeletePostFromDashboard,
    } = useDeletePostsFromDashboardMutation()

    const isLoadingStatus = pendingDeletePostFromDashboard || loading

    return (
        <div
            title={getDashboardItemTitle(disabled, dashboardName)}
            onClick={() => {
                !deleteBtn && onClick?.()
            }}
            className={clsx(s['dashboard-item'], {
                [s.disabled]: disabled,
                [s.inactive]: isLoadingStatus,
            })}
        >
            <div className={clsx(s.content)}>
                {skeleton && <Skeletons />}
                {!skeleton && (
                    <>
                        {image && (
                            <Image
                                className={s['dashboard-item__img']}
                                src={image}
                                width={40}
                                height={40}
                                alt='test'
                            />
                        )}
                        {!image && <Placeholder />}
                        <p className='text-ellipsis'>{dashboardName}</p>
                    </>
                )}
            </div>
            {isLoadingStatus && <CircularProgress sizesVariant='s' />}
            {deleteBtn && !isLoadingStatus && (
                <Button
                    size='m'
                    variant='red'
                    onClick={() => {
                        deletePostFromDashboard({ dashboardId, postsId })
                    }}
                >
                    Удалить
                </Button>
            )}
        </div>
    )
}

function Skeletons() {
    return (
        <>
            <Skeleton
                width={40}
                height={40}
                variant='rounded'
            />
            <Skeleton
                width={100}
                height={12}
                variant='rounded'
            />
        </>
    )
}
