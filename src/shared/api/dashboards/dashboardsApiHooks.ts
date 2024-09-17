import { queryKeys } from '@/shared/api/QueryKeys'
import { createBaseResponse } from '@/shared/types/apiResponses'
import { ArgsWithEnabled } from '@/shared/types/commonApiTypes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { dashboardsApi } from './dashboardsApi'

interface Options {
    userId: string
}

// ### GET ###
export const useGetProfileDashboardListQuery = (userId: string = '') => {
    return useQuery({
        queryKey: [queryKeys.dashboards.profileDashboardsList(userId)],
        queryFn: ({ signal }) =>
            dashboardsApi.getProfileDashboardsList({ userId, signal }),
        retry: false,
        enabled: !!userId,
    })
}

export const useGetDashboardListByCookieQuery = (args?: ArgsWithEnabled) => {
    return useQuery({
        queryFn: ({ signal }) =>
            dashboardsApi.getDashboardsByCookie({ signal }),
        queryKey: [queryKeys.dashboards.dashboardsByCookie] as const,
        retry: false,
        enabled: args?.enabled,
    })
}

// ### POST ##
export const useCreateDashboardMutation = (userId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (dashboardName: string) => {
            const res = await dashboardsApi.createDashboard({
                dashboardName,
            })

            if (res?.status === 400) {
                return Promise.reject(
                    createBaseResponse(
                        'Доска с таким названием уже существует',
                        400,
                    ),
                )
            }

            return res
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList(userId)],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.dashboardsByCookie],
            })
        },
    })
}

/* Добавление поста в доску избранного */
export const useAddPostsToFavoritesDashboardMutation = (userId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: dashboardsApi.addPostsToFavoritesDashboard,
        retry: false,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList(userId)],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.dashboardsByCookie],
            })
        },
    })
}

/* Добавление поста в кастомную доску */
export const useAddPostsToCustomDashboardMutation = (profileId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: dashboardsApi.addPostsToCustomDashboard,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.dashboardsByCookie],
            })
            queryClient.invalidateQueries({
                queryKey: [
                    queryKeys.dashboards.profileDashboardsList(profileId),
                ],
            })
        },
    })
}

// ### DELETE ###
export const useDeleteDashboardMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dashboardId: string) => {
            return dashboardsApi.deleteDashboard(dashboardId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.dashboardsByCookie],
            })
        },
    })
}
