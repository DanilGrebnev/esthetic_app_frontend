import { queryKeys } from '@/shared/api/QueryKeys'
import { postsApi } from '@/shared/api/posts/postsApi'
import { useGetPrivateProfileQuery } from '@/shared/api/users'
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

export const useDeletePostsMutation = () => {
    const queryClient = useQueryClient()

    const { data: privateProfile } = useGetPrivateProfileQuery()

    return useMutation({
        mutationFn: postsApi.deletePosts,

        onSuccess: () => {
            queryClient.resetQueries({
                queryKey: [
                    queryKeys.users.createdPosts(privateProfile?.userId || ''),
                ],
            })

            queryClient.resetQueries({
                queryKey: [
                    queryKeys.dashboards.profileDashboardsList,
                    privateProfile?.userId,
                ],
            })
        },

        retry: false,
    })
}
