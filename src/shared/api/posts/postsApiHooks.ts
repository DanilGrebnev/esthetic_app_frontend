import { queryKeys } from '@/shared/api/QueryKeys'
import { postsApi } from '@/shared/api/posts/postsApi'
import { paginationAmount } from '@/shared/consts'
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
        retry: false,
    })
}

// Получение постов по тэгам пользователя
export const useGetRecommendedPosts = () => {
    return useInfiniteQuery({
        queryKey: ['all-posts'],
        queryFn: ({ pageParam }) => {
            return postsApi.recommendedPosts(pageParam)
        },
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.posts.length < paginationAmount) return

            return {
                offset: lastPageParam.offset + paginationAmount,
                limit: lastPageParam.limit + paginationAmount,
            }
        },
        maxPages: 5,
        initialPageParam: { offset: 0, limit: paginationAmount },
        refetchOnWindowFocus: false,
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

        retry: false,
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
