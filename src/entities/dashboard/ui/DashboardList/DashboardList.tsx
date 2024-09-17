'use client'

import { useGetProfileDashboardListQuery } from '@/shared/api/dashboards'
import { useGetPublicProfileQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { DashboardTile, FavoritesTile } from '@/shared/ui/Tiles'
import { type FC, createContext } from 'react'

import { DashboardsContainer } from '../DashboardsContainer'

interface DashboardListProps {
    userId?: string
}

export const DashboardList: FC<DashboardListProps> = (props) => {
    const { userId = '' } = props

    const { data, isPending } = useGetProfileDashboardListQuery(userId)

    const { data: profileData, isPending: profilePending } =
        useGetPublicProfileQuery({ userId })

    if (isPending) return <h1>Загрузка</h1>
    const favorites = data?.favorites

    return (
        <DashboardsContainer>
            <FavoritesTile
                href={routes.userAllSavedPosts.getRoute('321')}
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

DashboardList.displayName = 'DashboardList'
