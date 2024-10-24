import {
    dashboardsApi,
    useAddPostsToDashboardMutation,
    useCreateFavoritesDashboardMutation,
} from '@/shared/api/dashboards'
import { useCallback } from 'react'

interface Options {
    dashboardName: string
    dashboardId: string
    usersId: string
    postsId: string
}

export const useAddPostsToDashboard = (options: Options) => {
    const { dashboardName, dashboardId, usersId, postsId } = options

    const { mutate: createFavoritesDashboard } =
        useCreateFavoritesDashboardMutation({ usersId })

    const { mutate: addToDashboard, getIsPending } =
        useAddPostsToDashboardMutation({
            usersId,
            postsId,
            dashboardId,
        })

    const addPostToDashboard = useCallback(async () => {
        if (dashboardName === 'Избранное') {
            if (!dashboardId) {
                createFavoritesDashboard()
                const data = await dashboardsApi.getDashboardsListByCookie()

                if (data?.favorites?.dashboardId) {
                    addToDashboard({
                        postsId,
                        dashboardId: data.favorites.dashboardId,
                    })
                }
                return
            }
        }

        addToDashboard({ postsId, dashboardId })
    }, [
        addToDashboard,
        createFavoritesDashboard,
        dashboardId,
        dashboardName,
        postsId,
    ])

    return { addPostToDashboard, getIsPending }
}
