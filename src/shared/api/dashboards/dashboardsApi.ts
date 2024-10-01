import { apiInstance } from '@/shared/api/Instance'
import { BadRequest, SuccessResponse } from '@/shared/types/apiResponses'
import { ArgsWithSignal } from '@/shared/types/commonApiTypes'
import {
    CheckPostInDashboardResponse,
    DashboardsByCookie,
    DashboardsDetail,
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

    // Получение списка постов по dashboardId
    getDashboardDetail = ({
        dashboardsId,
        signal,
    }: ArgsWithSignal<{ dashboardsId: string }>) => {
        return apiInstance
            .get(this.baseUrl + `/${dashboardsId}`, {
                signal,
            })
            .json<DashboardsDetail>()
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

    addPostsToDashboard = ({
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

    getDashboardsListByCookie = (args?: ArgsWithSignal) => {
        return apiInstance
            .get(this.baseUrl, {
                credentials: 'include',
                signal: args?.signal,
            })
            .json<DashboardsByCookie>()
    }

    deleteDashboard = (dashboardId: string) => {
        return apiInstance.delete(this.baseUrl + '/' + dashboardId, {
            credentials: 'include',
        })
    }

    deletePostsFromDashboard = ({
        dashboardId,
        postsId,
    }: {
        dashboardId: string
        postsId: string
    }) => {
        return apiInstance.delete(
            this.baseUrl + `/${dashboardId}/delete-posts`,
            {
                credentials: 'include',
                json: { postsId },
            },
        )
    }

    checkPostInDashboard = (postId: string) => {
        return apiInstance
            .get(this.baseUrl + `/check-posts?postid=${postId}`, {
                credentials: 'include',
            })
            .json<CheckPostInDashboardResponse>()
    }
}
export const dashboardsApi = new DashboardsApi()
