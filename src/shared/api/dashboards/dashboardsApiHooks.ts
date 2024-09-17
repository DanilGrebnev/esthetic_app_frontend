import { queryKeys } from '@/shared/api/QueryKeys'
import { createBaseResponse } from '@/shared/types/apiResponses'
import { ArgsWithEnabled } from '@/shared/types/commonApiTypes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryOptions } from '@tanstack/react-query'
import { Params } from 'express-serve-static-core'
import { useMemo } from 'react'

import { dashboardsApi } from './dashboardsApi'

interface Option {
    onSuccess?: () => void
}

// ### GET ###
export const useGetProfileDashboardsList = (userId: string = '') => {
    return useQuery({
        queryKey: [queryKeys.dashboards.profileDashboardsList],
        queryFn: ({ signal }) =>
            dashboardsApi.getProfileDashboardsList({ userId, signal }),
        retry: false,
        enabled: !!userId,
    })
}

export const useGetAllDashboardsByCookie = (args?: ArgsWithEnabled) => {
    return useQuery({
        queryFn: ({ signal }) =>
            dashboardsApi.getDashboardsByCookie({ signal }),
        queryKey: [queryKeys.dashboards.dashboardsByCookie] as const,
        retry: false,
        enabled: args?.enabled,
    })
}

// ### POST ##
export const useCreateDashboardMutation = (option?: Option) => {
    const queryClient = useQueryClient()
    const controller = useMemo(() => new AbortController(), [])

    return useMutation({
        mutationFn: async (dashboardName: string) => {
            const res = await dashboardsApi.createDashboard({
                dashboardName,
                signal: controller.signal,
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
                queryKey: [queryKeys.dashboards.profileDashboardsList],
            })
            option?.onSuccess?.()
        },
    })
}

export const useAddPostsToFavoritesDashboard = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: dashboardsApi.addPostsToFavoritesDashboard,
        retry: false,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    queryKeys.dashboards.profileDashboardsList,
                    queryKeys.dashboards.dashboardsByCookie,
                ],
            })
        },
    })
}

export const useAddPostsToCustomDashboard = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: dashboardsApi.addPostsToCustomDashboard,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    queryKeys.dashboards.profileDashboardsList,
                    queryKeys.dashboards.dashboardsByCookie,
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
        },
    })
}
