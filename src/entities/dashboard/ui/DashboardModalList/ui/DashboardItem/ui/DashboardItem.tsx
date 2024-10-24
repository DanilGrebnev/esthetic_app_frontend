'use client'

import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { Skeleton } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import { type FC } from 'react'

import { useAddPostsToDashboard } from '../model/hooks'
import { getDashboardItemTitle } from '../model/utils'
import { DeletePostFromDashboardBtn } from './DeletePostFromDashboardBtn/DeletePostFromDashboardBtn'
import { Placeholder } from './Placeholder'
import s from './s.module.scss'

interface DashboardItemProps {
    loading?: boolean
    disabled?: boolean
    dashboardName: string
    skeleton?: boolean
    url?: string | null
    onClick?: () => void
    deleteBtn?: boolean
    dashboardId: string
    postsId: string
}

export const DashboardItem: FC<DashboardItemProps> = (props) => {
    const {
        dashboardName,
        deleteBtn,
        url,
        disabled,
        skeleton,
        dashboardId,
        postsId,
    } = props

    const { data: profileByCookie } = useGetProfileByCookieQuery()
    const usersId = profileByCookie?.userId || ''

    const { addPostToDashboard, getIsPending } = useAddPostsToDashboard({
        postsId,
        usersId,
        dashboardId,
        dashboardName,
    })

    const isAddToDashboardPending = getIsPending(dashboardId)

    return (
        <div
            title={getDashboardItemTitle(disabled, dashboardName)}
            onClick={() => {
                !deleteBtn && addPostToDashboard()
            }}
            className={clsx(s['dashboard-item'], {
                [s.disabled]: disabled,
                // [s.inactive]: isPending,
            })}
        >
            <div className={clsx(s.content)}>
                {skeleton && <Skeletons />}
                {!skeleton && (
                    <>
                        {url ? (
                            <Image
                                className={s['dashboard-item__img']}
                                src={url}
                                width={40}
                                height={40}
                                alt='test'
                            />
                        ) : (
                            <Placeholder />
                        )}
                        <p className='text-ellipsis'>{dashboardName}</p>
                    </>
                )}
            </div>
            {isAddToDashboardPending && <CircularProgress sizesVariant='s' />}
            {deleteBtn && !isAddToDashboardPending && (
                <DeletePostFromDashboardBtn
                    usersId={usersId}
                    dashboardId={dashboardId}
                    postsId={postsId}
                />
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
