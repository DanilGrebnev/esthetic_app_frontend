'use client'

import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { Skeleton } from '@mui/material'
import clsx from 'clsx'
import { memo } from 'react'

import { useAddPostsToDashboard } from '../model/hooks'
import { getDashboardItemTitle } from '../model/utils'
import { DeletePostFromDashboardBtn } from './DeletePostFromDashboardBtn'
import { Placeholder } from './Placeholder'
import { PreviewImage } from './PreviewImage'
import s from './s.module.scss'

interface DashboardItemProps {
    loading?: boolean
    disabled?: boolean
    dashboardName: string
    skeleton?: boolean
    url?: string
    urlBlur?: string
    onClick?: () => void
    deleteBtn?: boolean
    dashboardId: string
    postsId: string
}

export const DashboardItem = memo((props: DashboardItemProps) => {
    const {
        dashboardName,
        deleteBtn,
        url,
        urlBlur,
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

    const addToDashboardPending = getIsPending(dashboardId)

    return (
        <div
            title={getDashboardItemTitle(disabled, dashboardName)}
            onClick={() => {
                !deleteBtn && addPostToDashboard()
            }}
            className={clsx(s['dashboard-item'], {
                [s.disabled]: disabled,
            })}
        >
            <div className={clsx(s.content)}>
                {skeleton && <Skeletons />}
                {!skeleton && (
                    <>
                        {url && urlBlur ? (
                            <PreviewImage
                                url={url}
                                urlBlur={urlBlur}
                                alt={`${dashboardName} иконка доски`}
                            />
                        ) : (
                            <Placeholder />
                        )}
                        <p className='text-ellipsis'>{dashboardName}</p>
                    </>
                )}
            </div>
            {addToDashboardPending && <CircularProgress sizesVariant='s' />}
            {deleteBtn && !addToDashboardPending && (
                <DeletePostFromDashboardBtn
                    usersId={usersId}
                    dashboardId={dashboardId}
                    postsId={postsId}
                />
            )}
        </div>
    )
})

DashboardItem.displayName = 'DashboardItem'

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
