import { queryKeys } from '@/shared/api/QueryKeys'
import { useMutation, useQuery } from '@tanstack/react-query'

import { dashboardsApi } from './dashboardsApi'

export const useCreateDashboardMutation = () => {
    return useMutation({
        mutationFn: (dashboardName: string) =>
            dashboardsApi.createDashboard(dashboardName),
    })
}

export const useGetProfileDashboardsList = (userId?: string) => {
    return useQuery({
        queryKey: [queryKeys.dashboards.dashboardsList],
        queryFn: () => dashboardsApi.getProfileDashboardsList(userId || ''),
    })
}
