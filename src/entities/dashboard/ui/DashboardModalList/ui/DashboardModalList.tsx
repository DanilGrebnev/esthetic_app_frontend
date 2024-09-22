'use client'

import { useCheckAuthQuery } from '@/shared/api/auth'
import {
    useAddPostsToCustomDashboardMutation,
    useAddPostsToFavoritesDashboardMutation,
    useCheckPostInDashboard,
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
        isPending: pendingInitialDashboardList,
        isError: getDashboardsError,
    } = useGetDashboardListByCookieQuery({ enabled: !!authData?.isAuth })

    const {
        data: postsCheck,
        isPending: pendingPostCheck,
        isFetching: fetchingPostsCheck,
    } = useCheckPostInDashboard({ postsId, enabled: !!dashboardsData })

    const { data: privateProfile } = useGetPrivateProfileQuery()

    const { mutate: addToFavorite, isPending: pendingAddToFavorite } =
        useAddPostsToFavoritesDashboardMutation(privateProfile?.userId || '')

    const {
        mutateAsync: addToCustomDashboard,
        isPending: pendingAddToCustomDashboard,
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
                            dashboardId={''}
                            postsId={postsId}
                            image={dashboardsData?.favorites?.url}
                            loading={pendingAddToFavorite || fetchingPostsCheck}
                            skeleton={pendingInitialDashboardList}
                            dashboardName='Избранное'
                            deleteBtn={postsCheck?.inFavorites}
                        />
                    </DashboardGroupContainer>

                    <DashboardGroupContainer groupName='Сохранение на доске'>
                        {pendingInitialDashboardList && (
                            <DashboardListSkeleton amount={5} />
                        )}
                        {dashboardsData?.dashboards?.map((dashboard) => {
                            const { dashboardId, dashboardName } = dashboard

                            return (
                                <DashboardItem
                                    key={dashboardId}
                                    loading={
                                        pendingAddToCustomDashboard ||
                                        fetchingPostsCheck
                                    }
                                    dashboardId={dashboardId}
                                    postsId={postsId}
                                    onClick={() => {
                                        addToCustomDashboard({
                                            dashboardId,
                                            postsId,
                                        })
                                    }}
                                    deleteBtn={postsCheck?.inDashboards.includes(
                                        dashboardId,
                                    )}
                                    dashboardName={dashboardName}
                                    image={dashboard?.url}
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
