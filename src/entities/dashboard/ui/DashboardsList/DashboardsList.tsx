'use client'

import { useGetProfileDashboardListQuery } from '@/shared/api/dashboards'
import { useGetPublicProfileQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { InfiniteScrollContainer } from '@/shared/ui/InfiniteScrollContainer'
import { DashboardTile, FavoritesTile } from '@/shared/ui/Tiles'
import { type FC } from 'react'

import { DashboardsContainer } from '../DashboardsContainer'
import { DashboardsListSkeleton } from '../DashboardsListSkeleton'

interface DashboardListProps {
    userId?: string
}

export const DashboardsList: FC<DashboardListProps> = (props) => {
    const { userId = '' } = props

    const {
        data: dashboards,
        fetchNextPage,
        isPending,
    } = useGetProfileDashboardListQuery({
        userId,
    })

    const { data: profileData, isPending: profilePending } =
        useGetPublicProfileQuery({ userId })

    if (isPending) return <DashboardsListSkeleton />
    const favorites = dashboards?.pages[0].favorites

    return (
        <DashboardsContainer>
            <FavoritesTile
                href={routes.userDashboardDetail.getRoute(
                    userId,
                    favorites?.dashboardId || 'empty-dashboard',
                )}
                images={favorites?.urls || []}
                title='Избранное'
                postsCount={favorites?.postsAmount || 0}
                date='3'
            />
            <InfiniteScrollContainer
                skip={!userId}
                action={fetchNextPage}
            >
                {dashboards?.pages.map((page) => {
                    return page.dashboards.map((dashboard, i) => {
                        return (
                            <DashboardTile
                                key={dashboard.dashboardId}
                                dashboardId={dashboard.dashboardId}
                                dotMenu={
                                    !profilePending &&
                                    profileData?.guest?.isOwner
                                }
                                href={routes.userDashboardDetail.getRoute(
                                    userId,
                                    dashboard.dashboardId,
                                )}
                                images={dashboard.urls}
                                blureImages={dashboard.urlsBlur}
                                postsCount={dashboard.postsAmount}
                                title={dashboard.dashboardName}
                                date='1'
                            />
                        )
                    })
                })}
            </InfiniteScrollContainer>
        </DashboardsContainer>
    )
}

DashboardsList.displayName = 'DashboardsList'
