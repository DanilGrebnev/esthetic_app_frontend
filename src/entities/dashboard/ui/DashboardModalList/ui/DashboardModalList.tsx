'use client'

import { useCheckAuthQuery } from '@/shared/api/auth'
import {
    useAddPostsToCustomDashboardMutation,
    useAddPostsToFavoritesDashboardMutation,
    useGetDashboardListByCookieQuery,
} from '@/shared/api/dashboards'
import { useGetPrivateProfileQuery } from '@/shared/api/users'
import { clsx } from 'clsx'
import { type FC } from 'react'

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

    const { data: authData } = useCheckAuthQuery()

    const {
        data: dashboardsData,
        isPending: initialDashboardListLoading,
        isError: getDashboardsError,
    } = useGetDashboardListByCookieQuery({ enabled: !!authData?.isAuth })

    const { data: privateProfile } = useGetPrivateProfileQuery()

    const { mutate: addToFavorite, isPending: addToFavoritePending } =
        useAddPostsToFavoritesDashboardMutation(privateProfile?.userId || '')

    const {
        mutate: addToCustomDashboard,
        isPending: pendingAddPostsToCustomDashboard,
    } = useAddPostsToCustomDashboardMutation(privateProfile?.userId || '')

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={clsx(s['dashboard-container'], className)}
        >
            <h2 className={s['container-title']}>Сохранение</h2>
            {getDashboardsError && <h2>Ошибка получения досок</h2>}
            {!getDashboardsError && (
                <div className={s['dashboard-list']}>
                    <DashboardGroupContainer groupName='Быстрое сохранение'>
                        <DashboardItem
                            onClick={() => addToFavorite(postsId)}
                            image={dashboardsData?.favorites?.url}
                            loading={addToFavoritePending}
                            skeleton={initialDashboardListLoading}
                            dashboardName='Избранное'
                        />
                    </DashboardGroupContainer>

                    <DashboardGroupContainer groupName='Сохранение на доске'>
                        {initialDashboardListLoading && (
                            <DashboardListSkeleton amount={5} />
                        )}
                        {dashboardsData?.dashboards?.map((dashboard) => {
                            const { dashboardId, dashboardName } = dashboard

                            return (
                                <DashboardItem
                                    key={dashboardId}
                                    loading={pendingAddPostsToCustomDashboard}
                                    onClick={() => {
                                        addToCustomDashboard({
                                            dashboardId,
                                            postsId,
                                        })
                                    }}
                                    image={dashboard?.url}
                                    dashboardName={dashboardName}
                                />
                            )
                        })}
                    </DashboardGroupContainer>
                </div>
            )}
        </div>
    )
}

DashboardModalList.displayName = 'DashboardsList'
