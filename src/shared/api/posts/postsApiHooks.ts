import { queryKeys } from '@/shared/api/QueryKeys'
import { postsApi } from '@/shared/api/posts/postsApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCreatePostsMutation = (userId: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (formData: FormData) => postsApi.createPost(formData),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.users.createdPosts(userId)],
            })
        },
    })
}

export const useGetDetailPostsQuery = (postId: string) => {
    return useQuery({
        queryKey: [queryKeys.posts.postsDetail],
        queryFn: ({ signal }) => postsApi.getPostDetail({ signal, postId }),
        retry: false,
    })
}

export const useDeletePostsMutation = ({ usersId }: { usersId: string }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postsApi.deletePosts,

        onSuccess: () => {
            queryClient.resetQueries({
                queryKey: [queryKeys.users.createdPosts(usersId)],
            })

            queryClient.resetQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList(usersId)],
            })
        },

        retry: false,
    })
}
