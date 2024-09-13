'use client'

import { DashboardsContainer } from '@/entities/dashboard'
import { DashboardTile, FavoritesTile } from '@/entities/posts'
import { useGetProfileDashboardsList } from '@/shared/api/dashboards'
import { mockDashboards } from '@/shared/mock/mock'
import { routes } from '@/shared/routes'
import { UsersDashboardList } from '@/shared/types/dashboards'
import { useEffect, useState } from 'react'

interface SavedPosts {
    params: {
        userId: string
    }
}

export default function SavedPosts(props: SavedPosts) {
    const [tiles, setTiles] = useState<UsersDashboardList>(
        {} as UsersDashboardList,
    )

    const { data } = useGetProfileDashboardsList(props.params.userId)

    useEffect(() => {
        mockDashboards().then((data) => {
            setTiles(data)
        })
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <DashboardsContainer>
            {tiles?.favorites && (
                <FavoritesTile
                    href={routes.userAllSavedPosts.getRoute('321')}
                    images={tiles.favorites.url}
                    title={tiles.favorites.dashboardName}
                    postsCount={tiles.favorites.postsAmount}
                    date='3'
                />
            )}
            {tiles?.dashboards?.map((dashboard) => (
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
