import { queryKeys } from '@/shared/api/QueryKeys'
import { createBaseResponse } from '@/shared/types/apiResponses'
import { ArgsWithEnabled } from '@/shared/types/commonApiTypes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { dashboardsApi } from './dashboardsApi'

// ### GET ###
export const useGetProfileDashboardListQuery = (userId: string = '') => {
    return useQuery({
        queryKey: [queryKeys.dashboards.profileDashboardsList, userId],
        queryFn: ({ signal }) =>
            dashboardsApi.getProfileDashboardsList({ userId, signal }),
        retry: false,
        enabled: !!userId,
    })
}

export const useCheckPostInDashboard = ({
    postsId,
    enabled,
}: {
    enabled?: boolean
    postsId: string
}) => {
    return useQuery({
        queryKey: [queryKeys.dashboards.checkPostInDashboard, postsId],
        queryFn: () => dashboardsApi.checkPostInDashboard(postsId),
        retry: false,
        enabled: enabled,
    })
}

export const useGetDashboardListByCookieQuery = (args?: ArgsWithEnabled) => {
    return useQuery({
        queryFn: ({ signal }) =>
            dashboardsApi.getDashboardsListByCookie({ signal }),
        queryKey: [queryKeys.dashboards.getDashboardsListByCookie] as const,
        retry: false,
        enabled: args?.enabled,
    })
}

// Получение списка постов по dashboardId
export const useGetDashboardsDetail = (dashboardsId: string) => {
    return useQuery({
        queryFn: ({ signal }) =>
            dashboardsApi.getDashboardDetail({ signal, dashboardsId }),
        queryKey: [queryKeys.dashboards.dashboardsDetail, dashboardsId],
        retry: false,
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
                queryKey: [queryKeys.dashboards.profileDashboardsList, userId],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.getDashboardsListByCookie],
            })
        },
    })
}

export const useDeletePostsFromDashboardMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: dashboardsApi.deletePostsFromDashboard,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: [queryKeys.dashboards.checkPostInDashboard],
            })

            queryClient.refetchQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList],
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
                queryKey: [queryKeys.dashboards.profileDashboardsList, userId],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.checkPostInDashboard],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.getDashboardsListByCookie],
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
                queryKey: [queryKeys.dashboards.getDashboardsListByCookie],
            })
            queryClient.refetchQueries({
                queryKey: [
                    queryKeys.dashboards.profileDashboardsList,
                    profileId,
                ],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.checkPostInDashboard],
            })
        },
    })
}

// ### DELETE ###
export const useDeleteDashboardMutation = (userId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dashboardId: string) => {
            return dashboardsApi.deleteDashboard(dashboardId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList, userId],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.getDashboardsListByCookie],
            })
        },
    })
}
