'use client'

import { useCheckAuthQuery } from '@/shared/api/auth'
import {
    useCheckPostInDashboard,
    useGetDashboardsByCookieQuery,
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

export const DashboardModalList = (props: DashboardListProps) => {
    const { className, postsId } = props
    const { data: authData } = useCheckAuthQuery()

    const {
        data: dashboardsByCookie,
        isPending: pendingInitialDashboardList,
        isError: dashboardsError,
    } = useGetDashboardsByCookieQuery({ enabled: !!authData?.isAuth })

    const { data: postsCheck, isFetching: fetchingPostsCheck } =
        useCheckPostInDashboard({ postsId, enabled: !!dashboardsByCookie })

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={clsx(s['dashboard-container'], className)}
        >
            <h2 className={s['container-title']}>Сохранение</h2>
            {dashboardsError && <h2>Ошибка получения досок</h2>}
            {!dashboardsError && (
                <div className={s['dashboard-list']}>
                    <DashboardGroupContainer groupName='Сохранение на доске'>
                        {pendingInitialDashboardList && (
                            <DashboardListSkeleton amount={5} />
                        )}
                        <DashboardItem
                            postsId={postsId}
                            loading={fetchingPostsCheck}
                            skeleton={pendingInitialDashboardList}
                            deleteBtn={postsCheck?.inFavorites}
                            dashboardName='Избранное'
                            urlBlur={dashboardsByCookie?.favorites?.urlsBlur[0]}
                            dashboardId={
                                dashboardsByCookie?.favorites?.dashboardId || ''
                            }
                            url={dashboardsByCookie?.favorites?.urls[0]}
                        />
                        {dashboardsByCookie?.dashboards?.map((dashboard) => {
                            return (
                                <DashboardItem
                                    key={dashboard.dashboardId}
                                    loading={fetchingPostsCheck}
                                    postsId={postsId}
                                    url={dashboard.urls[0]}
                                    urlBlur={dashboard.urlsBlur[0]}
                                    deleteBtn={postsCheck?.inDashboards.includes(
                                        dashboard.dashboardId,
                                    )}
                                    {...dashboard}
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
