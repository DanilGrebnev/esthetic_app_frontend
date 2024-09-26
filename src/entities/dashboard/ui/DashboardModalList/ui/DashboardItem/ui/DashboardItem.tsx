'use client'

import {
    useAddPostsToDashboardMutation,
    useCreateFavoritesDashboardMutation,
    useGetDashboardsByCookieQuery,
} from '@/shared/api/dashboards'
import { useGetPrivateProfileQuery } from '@/shared/api/users'
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
        deleteBtn,
        image,
        disabled,
        skeleton,
        dashboardId,
        postsId,
    } = props

    const { data: privateProfile } = useGetPrivateProfileQuery()
    const usersId = privateProfile?.userId || ''

    const { data: dashboardsListByCookie } = useGetDashboardsByCookieQuery()

    const { mutate: addToDashboard, isPending: pendingAddToDashboard } =
        useAddPostsToDashboardMutation({
            usersId,
            postsId,
        })
    const { mutateAsync: createFavoritesDashboard } =
        useCreateFavoritesDashboardMutation({ usersId })

    const addPostToDashboard = () => {
        if (dashboardName === 'Избранное') {
            if (dashboardsListByCookie?.favorites) {
                addToDashboard({ postsId, dashboardId })
            } else {
                createFavoritesDashboard().then(() =>
                    addToDashboard({ postsId, dashboardId }),
                )
            }
            return
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
