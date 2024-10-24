import { queryKeys } from '@/shared/api/QueryKeys'
import { createBaseResponse } from '@/shared/types/apiResponses'
import { ArgsWithEnabled } from '@/shared/types/commonApiTypes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { dashboardsApi } from './dashboardsApi'

// ### GET ###
export const useGetProfileDashboardListQuery = ({
    userId,
}: {
    userId: string
}) => {
    return useQuery({
        queryKey: [queryKeys.dashboards.profileDashboardsList(userId)],
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
        queryKey: [queryKeys.dashboards.checkPostInDashboard(postsId)],
        queryFn: () => dashboardsApi.checkPostInDashboard(postsId),
        retry: false,
        enabled: enabled,
    })
}

export const useGetDashboardsByCookieQuery = (args?: ArgsWithEnabled) => {
    return useQuery({
        queryFn: ({ signal }) =>
            dashboardsApi.getDashboardsListByCookie({ signal }),
        queryKey: [queryKeys.dashboards.getDashboardsListByCookie] as const,
        retry: false,
        ...args,
    })
}

// Получение списка постов по dashboardId
export const useGetDashboardsDetail = ({
    dashboardsId,
}: {
    dashboardsId: string
}) => {
    return useQuery({
        queryFn: ({ signal }) =>
            dashboardsApi.getDashboardDetail({ signal, dashboardsId }),
        queryKey: [queryKeys.dashboards.dashboardsDetail(dashboardsId)],
        retry: false,
    })
}

// ### POST ###
export const useCreateDashboardMutation = ({
    usersId,
}: {
    usersId: string
}) => {
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
                queryKey: [queryKeys.dashboards.profileDashboardsList(usersId)],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.getDashboardsListByCookie],
            })
        },
    })
}

// Создание доски "избранного"
export const useCreateFavoritesDashboardMutation = ({
    usersId,
}: {
    usersId: string
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () =>
            dashboardsApi.createDashboard({
                dashboardName: 'Избранное',
            }),
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList(usersId)],
            })
            queryClient.refetchQueries({
                queryKey: [queryKeys.dashboards.getDashboardsListByCookie],
            })
        },
        retry: false,
    })
}

/* УДАЛЕНИЕ ПОСТА ИЗ ДОСКИ */
export const useDeletePostsFromDashboardMutation = ({
    usersId,
    postsId,
    dashboardId,
}: {
    usersId: string
    postsId: string
    dashboardId: string
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: dashboardsApi.deletePostsFromDashboard,
        onSuccess: async () => {
            const p1 = queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.getDashboardsListByCookie],
            })
            const p2 = queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.checkPostInDashboard(postsId)],
            })

            await Promise.allSettled([p1, p2])

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList(usersId)],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.dashboardsDetail(dashboardId)],
            })
        },
    })
}

/* Добавление поста в доску
 * @params usersId - id профиля пользователя
 * @params postsId - id добавляемого поста
 * @params dashboardId- id доски, в которую добавляется пост
 * */
export const useAddPostsToDashboardMutation = ({
    usersId,
    postsId,
    dashboardId,
}: {
    usersId: string
    postsId: string
    dashboardId: string
}) => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: dashboardsApi.addPostsToDashboard,

        onSuccess: async () => {
            const p1 = queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.getDashboardsListByCookie],
            })
            const p2 = queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.checkPostInDashboard(postsId)],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList(usersId)],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.dashboardsDetail(dashboardId)],
            })

            await Promise.allSettled([p1, p2])
        },
    })

    return {
        mutate: mutation.mutate,
        getIsPending: (dashboardId: string) =>
            mutation.isPending &&
            mutation.variables.dashboardId === dashboardId,
    }
}

// ### DELETE ###
export const useDeleteDashboardMutation = ({ userId }: { userId: string }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dashboardId: string) => {
            return dashboardsApi.deleteDashboard(dashboardId)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList(userId)],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.getDashboardsListByCookie],
            })
        },
    })
}
