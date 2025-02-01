import { queryKeys } from '@/shared/api/QueryKeys'
import { postsApi } from '@/shared/api/posts/postsApi'
import { paginationPostsAmount } from '@/shared/consts'
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'

import { revalidatePostsDetailPage } from './postsApiServerActions'

// ### GET ###
export const useGetDetailPostsQuery = (postId: string) => {
    return useQuery({
        queryKey: [queryKeys.posts.postsDetail(postId)],
        queryFn: ({ signal }) => postsApi.getPostDetail({ signal, postId }),
    })
}

// Получение постов по тэгам пользователя
export const useGetPostsQuery = (args?: {
    enabled?: boolean
    querySearchParam: string
}) => {
    return useInfiniteQuery({
        queryKey: [queryKeys.posts.recommendedPosts, args?.querySearchParam],
        enabled: args?.enabled,
        queryFn: ({ pageParam }) => {
            return postsApi.getPosts({
                ...pageParam,
                search: args?.querySearchParam ?? '',
            })
        },
        getNextPageParam: (_, __, lastPageParam) => {
            return {
                offset: lastPageParam.offset + paginationPostsAmount,
                limit: lastPageParam.limit,
            }
        },
        getPreviousPageParam: (_, __, lastPageParam) => {
            if (!lastPageParam.offset) return
            return {
                offset: lastPageParam.offset - paginationPostsAmount,
                limit: lastPageParam.limit,
            }
        },
        initialPageParam: { offset: 0, limit: paginationPostsAmount },
    })
}

// ### POST ###
export const useCreatePostsMutation = (userId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (formData: FormData) => postsApi.createPost(formData),

        onSuccess: () => {
            // инвалидируем список созданных пользователем постов
            queryClient.invalidateQueries({
                queryKey: [queryKeys.users.createdPosts(userId)],
            })
        },
        retry: false,
    })
}

export const useDeletePostsMutation = ({
    usersId,
    dashboardsId,
}: {
    usersId: string
    dashboardsId: string[] | []
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postsApi.deletePosts,

        onSuccess: () => {
            // Инвалидируем список созданных пользователем постов
            queryClient.invalidateQueries({
                queryKey: [queryKeys.users.createdPosts(usersId)],
            })

            // Инвалидируем список досок пользователя
            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList(usersId)],
            })

            // Инвалидируем главную страницу с постами
            queryClient.invalidateQueries({
                queryKey: [queryKeys.posts.recommendedPosts],
            })

            // После удаления поста, инвалидируем все доски, в которых есть пост
            dashboardsId.forEach((dashboardId) => {
                queryClient.invalidateQueries({
                    queryKey: [
                        queryKeys.dashboards.dashboardsDetail(dashboardId),
                    ],
                })
            })
        },
    })
}

// ### PUT ###
export const useUpdatePostsMutation = ({ postsId }: { postsId: string }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postsApi.editPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.posts.postsDetail(postsId)],
            })

            revalidatePostsDetailPage(postsId)
        },
    })
}

export const useToggleLikeOnPostMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postsApi.toggleLikeOnPost,
        onSuccess: ({ postId }) => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.posts.postsDetail(postId)],
            })

            revalidatePostsDetailPage(postId)
        },
    })
}
