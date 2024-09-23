'use client'

import { useGetProfileDashboardListQuery } from '@/shared/api/dashboards'
import { useGetPublicProfileQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { DashboardTile, FavoritesTile } from '@/shared/ui/Tiles'
import { type FC } from 'react'

import { DashboardsContainer } from '../DashboardsContainer'
import { DashboardsListSkeleton } from '../DashboardsListSkeleton'

interface DashboardListProps {
    userId?: string
}

export const DashboardsList: FC<DashboardListProps> = (props) => {
    const { userId = '' } = props

    const { data, isPending } = useGetProfileDashboardListQuery({ userId })

    const { data: profileData, isPending: profilePending } =
        useGetPublicProfileQuery({ userId })

    if (isPending) return <DashboardsListSkeleton />
    const favorites = data?.favorites

    return (
        <DashboardsContainer>
            <FavoritesTile
                href={routes.userDashboardDetail.getRoute(
                    userId,
                    favorites?.dashboardId || '',
                )}
                images={favorites?.url || []}
                title='Избранное'
                postsCount={favorites?.postsAmount || 0}
                date='3'
            />
            {data?.dashboards?.map((dashboard) => (
                <DashboardTile
                    key={dashboard.dashboardId}
                    dashboardId={dashboard.dashboardId}
                    dotMenu={!profilePending && profileData?.guest.isOwner}
                    href={routes.userDashboardDetail.getRoute(
                        userId,
                        dashboard.dashboardId,
                    )}
                    images={dashboard.url}
                    postsCount={dashboard.postsAmount}
                    title={dashboard.dashboardName}
                    date='1'
                />
            ))}
        </DashboardsContainer>
    )
}

DashboardsList.displayName = 'DashboardsList'
