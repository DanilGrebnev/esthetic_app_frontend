import { apiInstance } from '@/shared/api/Instance'
import { BadRequest, SuccessResponse } from '@/shared/types/apiResponses'
import { ArgsWithSignal } from '@/shared/types/commonApiTypes'
import type {
    DashboardsByCookie,
    UsersDashboardList,
} from '@/shared/types/dashboards'

interface CreateDashboard {
    dashboardName: string
    signal?: any
}

class DashboardsApi {
    readonly baseUrl = 'dashboards' as const

    /* Get users dashboard list by userId */
    getProfileDashboardsList = (args: ArgsWithSignal<{ userId: string }>) => {
        const { userId, signal } = args

        return apiInstance
            .get(this.baseUrl + `/${userId}` + '/list', { signal })
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

    addPostsToFavoritesDashboard = (postsId: string) => {
        return apiInstance
            .post(this.baseUrl + '/favorites', {
                credentials: 'include',
                json: { postsId },
            })
            .json<SuccessResponse>()
    }

    addPostsToCustomDashboard = ({
        postsId,
        dashboardId,
    }: {
        postsId: string
        dashboardId: string
    }) => {
        return apiInstance.post(this.baseUrl + `/${dashboardId}`, {
            json: { postsId },
            credentials: 'include',
        })
    }

    getDashboardsByCookie = (args: ArgsWithSignal) => {
        const { signal } = args
        return apiInstance
            .get(this.baseUrl, {
                credentials: 'include',
                signal,
            })
            .json<DashboardsByCookie>()
    }

    deleteDashboard = (dashboardId: string) => {
        return apiInstance.delete(this.baseUrl + '/' + dashboardId, {
            credentials: 'include',
        })
    }
}
export const dashboardsApi = new DashboardsApi()
