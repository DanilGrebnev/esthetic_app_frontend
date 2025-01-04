'use client'

import { useCheckAuthQuery } from '@/shared/api/auth'
import {
    useCheckPostInDashboard,
    useGetDashboardsByCookieQuery,
} from '@/shared/api/dashboards'
import { clsx } from 'clsx'
import { useMemo } from 'react'
import { Virtuoso } from 'react-virtuoso'

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
        data: dashboardsPage,
        isPending: dashboardsPending,
        isError: dashboardsError,
        fetchNextPage,
    } = useGetDashboardsByCookieQuery({ enabled: !!authData?.isAuth })

    const dashboardsList = dashboardsPage?.pages
        .map((page) => page)
        .map(({ dashboards }) => dashboards)
        .flat(1)

    const favoritesDashboard = useMemo(
        () => dashboardsPage?.pages.map((page) => page)[0].favorites,
        [dashboardsPage],
    )

    const { data: postsCheck, isFetching: fetchingPostsCheck } =
        useCheckPostInDashboard({ postsId, enabled: !!dashboardsList?.length })

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={clsx(s['dashboard-container'], className)}
        >
            <h2 className={s['container-title']}>Сохранение</h2>
            {dashboardsError && <h2>Ошибка получения досок</h2>}
            {dashboardsPending && <DashboardListSkeleton amount={10} />}
            <div className='grow h-full'>
                <Virtuoso
                    endReached={() => fetchNextPage()}
                    data={dashboardsList}
                    components={{
                        Header: () => (
                            <DashboardItem
                                postsId={postsId}
                                loading={fetchingPostsCheck}
                                skeleton={dashboardsPending}
                                deleteBtn={postsCheck?.inFavorites}
                                dashboardName='Избранное'
                                urlBlur={favoritesDashboard?.urlsBlur[0]}
                                dashboardId={
                                    favoritesDashboard?.dashboardId || ''
                                }
                                url={favoritesDashboard?.urls[0]}
                            />
                        ),
                    }}
                    itemContent={(_, dashboard) => {
                        return (
                            <DashboardItem
                                key={dashboard?.dashboardId}
                                dashboardId={dashboard?.dashboardId}
                                dashboardName={dashboard?.dashboardName}
                                loading={fetchingPostsCheck}
                                postsId={postsId}
                                url={dashboard?.urls[0]}
                                urlBlur={dashboard?.urlsBlur[0]}
                                deleteBtn={postsCheck?.inDashboards.includes(
                                    dashboard?.dashboardId,
                                )}
                            />
                        )
                    }}
                />
            </div>
        </div>
    )
}

DashboardModalList.displayName = 'DashboardsList'
