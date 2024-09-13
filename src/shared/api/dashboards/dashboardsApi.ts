import { apiInstance } from '@/shared/api/Instance'
import { SuccessResponse } from '@/shared/types/apiResponses'
import type { UsersDashboardList } from '@/shared/types/dashboards'

class DashboardsApi {
    baseUrl = 'dashboards'

    /* Get users dashboard list by userId */
    getProfileDashboardsList = (userId: string) => {
        return apiInstance
            .get(this.baseUrl + `/${userId}` + '/list')
            .json<UsersDashboardList>()
    }

    createDashboard = (dashboardName: string) => {
        return apiInstance
            .post(this.baseUrl, {
                credentials: 'include',
                json: { dashboardName },
            })
            .json<SuccessResponse>()
    }
    addPostsToFavoriteDashboard = (postId: string) => {
        return apiInstance
            .post(this.baseUrl + '/favorites', {
                credentials: 'include',
                json: { postId },
            })
            .json<SuccessResponse>()
    }
}
export const dashboardsApi = new DashboardsApi()
