import { queryKeys } from '@/shared/api/QueryKeys'
import { createBaseResponse } from '@/shared/types/apiResponses'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { dashboardsApi } from './dashboardsApi'

interface Option {
    onSuccess?: () => void
}

export const useCreateDashboardMutation = (option?: Option) => {
    const queryClient = useQueryClient()
    const controller = useMemo(() => new AbortController(), [])

    return {
        ...useMutation({
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
        }),
    }
}

export const useGetProfileDashboardsList = (userId?: string) => {
    return useQuery({
        queryKey: [queryKeys.dashboards.profileDashboardsList],
        queryFn: () => dashboardsApi.getProfileDashboardsList(userId || ''),
    })
}
