'use client'

import { DashboardItemSkeleton } from '@/entities/dashboard/ui/DashboardModalList/ui/DashboardItemSkeleton'
import { useCheckAuthQuery } from '@/shared/api/auth'
import {
    useCheckPostInDashboard,
    useGetDashboardListByCookieQuery,
} from '@/shared/api/dashboards'
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
        data: dashboardsByCookieData,
        isPending: pendingInitialDashboardList,
        isError: getDashboardsError,
    } = useGetDashboardListByCookieQuery({ enabled: !!authData?.isAuth })

    const { data: postsCheck, isFetching: fetchingPostsCheck } =
        useCheckPostInDashboard({ postsId, enabled: !!dashboardsByCookieData })

    console.log(postsCheck?.inDashboards)

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
                        {pendingInitialDashboardList && (
                            <DashboardItemSkeleton />
                        )}
                        {!pendingInitialDashboardList && (
                            <DashboardItem
                                dashboardId={
                                    dashboardsByCookieData?.favorites
                                        ?.dashboardId || ''
                                }
                                postsId={postsId}
                                image={dashboardsByCookieData?.favorites?.url}
                                loading={fetchingPostsCheck}
                                skeleton={pendingInitialDashboardList}
                                dashboardName='Избранное'
                                deleteBtn={postsCheck?.inFavorites}
                            />
                        )}
                    </DashboardGroupContainer>

                    <DashboardGroupContainer groupName='Сохранение на доске'>
                        {pendingInitialDashboardList && (
                            <DashboardListSkeleton amount={5} />
                        )}
                        {dashboardsByCookieData?.dashboards?.map(
                            (dashboard) => {
                                const { dashboardId, dashboardName } = dashboard

                                return (
                                    <DashboardItem
                                        key={dashboardId}
                                        loading={fetchingPostsCheck}
                                        dashboardId={dashboardId}
                                        postsId={postsId}
                                        deleteBtn={postsCheck?.inDashboards.includes(
                                            dashboardId,
                                        )}
                                        dashboardName={dashboardName}
                                        image={dashboard?.url}
                                    />
                                )
                            },
                        )}
                    </DashboardGroupContainer>
                </div>
            )}
        </div>
    )
}

DashboardModalList.displayName = 'DashboardsList'
