'use client'

import {
    useAddPostsToDashboardMutation,
    useCreateFavoritesDashboardMutation,
    useGetDashboardsByCookieQuery,
} from '@/shared/api/dashboards'
import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { CircularProgress } from '@/shared/ui/CircularProgress'
import { Skeleton } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import { type FC } from 'react'

import { getDashboardItemTitle } from '../model/utils'
import { DeletePostFromDashboardBtn } from './DeletePostFromDashboardBtn/DeletePostFromDashboardBtn'
import { Placeholder } from './Placeholder'
import s from './s.module.scss'

interface DashboardItemProps {
    loading?: boolean
    disabled?: boolean
    dashboardName: string
    skeleton?: boolean
    url?: string
    onClick?: () => void
    deleteBtn?: boolean
    dashboardId: string
    postsId: string
}

export const DashboardItem: FC<DashboardItemProps> = (props) => {
    const {
        loading,
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

    const { data: dashboardsByCookie } = useGetDashboardsByCookieQuery()

    const { mutate: addToDashboard, isPending: pendingAddToDashboard } =
        useAddPostsToDashboardMutation({
            usersId,
            postsId,
            dashboardId,
        })

    const { mutateAsync: createFavoritesDashboard } =
        useCreateFavoritesDashboardMutation({ usersId })

    const addPostToDashboard = async () => {
        if (dashboardName === 'Избранное') {
            if (!dashboardsByCookie?.favorites) {
                await createFavoritesDashboard()
            }
        }

        addToDashboard({ postsId, dashboardId })
    }

    const isLoading = pendingAddToDashboard || loading

    return (
        <div
            title={getDashboardItemTitle(disabled, dashboardName)}
            onClick={() => {
                !deleteBtn && addPostToDashboard()
            }}
            className={clsx(s['dashboard-item'], {
                [s.disabled]: disabled,
                [s.inactive]: isLoading,
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
            {isLoading && <CircularProgress sizesVariant='s' />}
            {deleteBtn && !isLoading && (
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
