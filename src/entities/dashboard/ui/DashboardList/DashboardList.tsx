'use client'

import { DashboardTile, FavoritesTile } from '@/entities/posts'
import { useGetProfileDashboardsList } from '@/shared/api/dashboards'
import { routes } from '@/shared/routes'
import { type FC } from 'react'

import { DashboardsContainer } from '../DashboardsContainer'

interface DashboardListProps {
    userId?: string
}

export const DashboardList: FC<DashboardListProps> = (props) => {
    const { userId } = props

    const { data, isPending } = useGetProfileDashboardsList(userId)
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
                    href={routes.userDashboardDetail.getRoute(
                        'future-user-id',
                        'dashboard-id',
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
