import { useCheckAuthQuery } from '@/shared/api/auth'
import {
    useCheckPostInDashboard,
    useGetDashboardsByCookieQuery,
} from '@/shared/api/dashboards'
import { Text } from '@/shared/ui/Text'
import { useMemo } from 'react'
import { Virtuoso } from 'react-virtuoso'

import { DashboardItem } from '../DashboardItem'
import { DashboardListSkeleton } from '../DashboardListSkeleton'

interface DashboardListRenderProps {
    postsId: string
}

export const DashboardsListRender = ({ postsId }: DashboardListRenderProps) => {
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
        <>
            <Text
                element='h2'
                size='font-400'
                className='text-center'
            >
                Сохранение
            </Text>

            {dashboardsError && (
                <Text
                    element='h2'
                    size='font-300'
                >
                    Ошибка получения досок
                </Text>
            )}
            {dashboardsPending && <DashboardListSkeleton amount={10} />}
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
                            dashboardId={favoritesDashboard?.dashboardId || ''}
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
        </>
    )
}
