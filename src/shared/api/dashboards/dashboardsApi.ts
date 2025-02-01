import { api } from '@/shared/api/Instance'
import { BadRequest, SuccessResponse } from '@/shared/types/apiResponses'
import { ArgsWithSignal } from '@/shared/types/commonApiTypes'
import type {
    CheckPostInDashboardResponse,
    DashboardsByCookie,
    DashboardsDetail,
    TChangeDashboard,
    TChangeDashboardResponse,
    UsersDashboardList,
} from '@/shared/types/dashboards'
import { Pagination } from '@/shared/types/pagination'

interface CreateDashboard {
    dashboardName: string
    signal?: any
}

class DashboardsApi {
    private readonly baseUrl = 'dashboards' as const

    /* Get users dashboard list by userId */
    getProfileDashboardsList = (
        args: ArgsWithSignal<{
            userId: string
            pageParam: { offset: number; limit: number }
        }>,
    ) => {
        const { userId, signal, pageParam } = args

        return api
            .get(this.baseUrl + `/${userId}/list`, {
                signal,
                searchParams: pageParam,
            })
            .json<UsersDashboardList>()
    }

    // Получение списка постов по dashboardId
    getDashboardDetail = ({
        dashboardsId,
        signal,
        searchParams,
    }: ArgsWithSignal<{ dashboardsId: string; searchParams?: Pagination }>) => {
        return api
            .get(this.baseUrl + `/${dashboardsId}`, {
                signal,
                searchParams,
            })
            .json<DashboardsDetail>()
    }

    createDashboard = (args: CreateDashboard) => {
        return api
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
        return api
            .post(this.baseUrl + `/${dashboardId}`, {
                json: { postsId },
                credentials: 'include',
            })
            .json()
    }

    getDashboardsListByCookie = (
        args?: ArgsWithSignal<{
            searchParams: { offset: number; limit: number }
        }>,
    ) => {
        const searchParams = args?.searchParams
            ? {
                  offset: args?.searchParams.offset,
                  limit: args?.searchParams.limit,
              }
            : undefined
        return api
            .get(this.baseUrl, {
                credentials: 'include',
                signal: args?.signal,
                searchParams,
            })
            .json<DashboardsByCookie>()
    }

    deleteDashboard = (dashboardId: string) => {
        return api
            .delete(this.baseUrl + '/' + dashboardId, {
                credentials: 'include',
            })
            .json()
    }

    deletePostsFromDashboard = ({
        dashboardId,
        postsId,
    }: {
        dashboardId: string
        postsId: string
    }) => {
        return api
            .delete(this.baseUrl + `/${dashboardId}/delete-posts`, {
                credentials: 'include',
                json: { postsId },
            })
            .json()
    }

    checkPostInDashboard = (postId: string) => {
        return api
            .get(this.baseUrl + `/check-posts?postid=${postId}`, {
                credentials: 'include',
            })
            .json<CheckPostInDashboardResponse>()
    }

    /* Изменение информации о доске */
    changeDashboard = ({ dashboardId, dashboardName }: TChangeDashboard) =>
        api
            .put(this.baseUrl + '/' + dashboardId, {
                credentials: 'include',
                json: { dashboardName },
            })
            .json<TChangeDashboardResponse>()
}
export const dashboardsApi = new DashboardsApi()
