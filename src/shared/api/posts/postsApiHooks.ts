import { queryKeys } from '@/shared/api/QueryKeys'
import { postsApi } from '@/shared/api/posts/postsApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreatePostsMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (formData: FormData) => postsApi.createPost(formData),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: [queryKeys.dashboards.profileDashboardsList],
            }),
    })
}
