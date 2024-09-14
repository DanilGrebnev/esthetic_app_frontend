import { apiInstance } from '@/shared/api/Instance'
import { BadRequest, SuccessResponse } from '@/shared/types/apiResponses'
import type { UsersDashboardList } from '@/shared/types/dashboards'

interface CreateDashboard {
    dashboardName: string
    signal?: any
}

class DashboardsApi {
    baseUrl = 'dashboards'

    /* Get users dashboard list by userId */
    getProfileDashboardsList = (userId: string) => {
        return apiInstance
            .get(this.baseUrl + `/${userId}` + '/list')
            .json<UsersDashboardList>()
    }

    createDashboard = (args: CreateDashboard) => {
        return apiInstance
            .post(this.baseUrl, {
                credentials: 'include',
                json: { dashboardName: args.dashboardName },
                signal: args.signal,
                throwHttpErrors: false,
            })
            .json<SuccessResponse | BadRequest>()
    }
    addPostsToFavoriteDashboard = (postId: string) => {
        return apiInstance
            .post(this.baseUrl + '/favorites', {
                credentials: 'include',
                json: { postId },
            })
            .json<SuccessResponse>()
    }

    deleteDashboard = (dashboardId: string) => {
        return apiInstance.delete(this.baseUrl + '/' + dashboardId, {
            credentials: 'include',
        })
    }
}
export const dashboardsApi = new DashboardsApi()
