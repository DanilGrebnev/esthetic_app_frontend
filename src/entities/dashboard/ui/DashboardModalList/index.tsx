'use client'

import {
    useAddPostsToCustomDashboard,
    useAddPostsToFavoritesDashboard,
    useGetProfileDashboardsList,
} from '@/shared/api/dashboards'
import { useGetPrivateProfileQuery } from '@/shared/api/users'
import { clsx } from 'clsx'
import { type FC, useEffect } from 'react'

import { DashboardGroupContainer } from './DashboardGroupContainer'
import { DashboardItem } from './DashboardItem'
import s from './DashboardList.module.scss'
import { DashboardListSkeleton } from './DashboardListSkeleton'

interface DashboardListProps {
    className?: string
    onClick?: () => void
    postsId: string
}

export const DashboardModalList: FC<DashboardListProps> = (props) => {
    const { className, postsId } = props

    const { data: privateProfile } = useGetPrivateProfileQuery()

    const {
        data: dashboardsData,
        isPending,
        isFetching,
        isLoading: initialDashboardListLoading,
    } = useGetProfileDashboardsList(privateProfile?.user?.userId)

    const { mutate, isPending: addToFavoritePending } =
        useAddPostsToFavoritesDashboard()

    const {
        mutate: addPostToCustomDashboard,
        isPending: pendingAddPostsToCustomDashboard,
    } = useAddPostsToCustomDashboard()

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={clsx(s['dashboard-container'], className)}
        >
            <h2 className={s['container-title']}>Сохранение</h2>
            <div className={s['dashboard-list']}>
                <DashboardGroupContainer groupName='Быстрое сохранение'>
                    <DashboardItem
                        onClick={() => mutate(postsId)}
                        image={dashboardsData?.favorites?.url?.[0]}
                        loading={addToFavoritePending}
                        skeleton={initialDashboardListLoading}
                        dashboardName='Избранное'
                    />
                </DashboardGroupContainer>

                <DashboardGroupContainer groupName='Сохранение на доске'>
                    {initialDashboardListLoading && (
                        <DashboardListSkeleton amount={5} />
                    )}
                    {dashboardsData?.dashboards.map((dashboard) => {
                        const { dashboardId, dashboardName } = dashboard

                        return (
                            <DashboardItem
                                key={dashboardId}
                                loading={
                                    pendingAddPostsToCustomDashboard ||
                                    isPending ||
                                    isFetching
                                }
                                onClick={() => {
                                    addPostToCustomDashboard({
                                        dashboardId,
                                        postsId,
                                    })
                                }}
                                image={dashboard?.url?.[0]}
                                dashboardName={dashboardName}
                            />
                        )
                    })}
                </DashboardGroupContainer>
            </div>
        </div>
    )
}

DashboardModalList.displayName = 'DashboardList'
