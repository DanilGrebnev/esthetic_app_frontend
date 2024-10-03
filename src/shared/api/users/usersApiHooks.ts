import { queryKeys } from '@/shared/api/QueryKeys'
import type { UserProfile, UsersLoginBody } from '@/shared/types/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { usersApi } from './usersApi'

export const useGetProfileByCookieQuery = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: [queryKeys.users.profileByCookie],
        retry: false,
        enabled: options?.enabled,
        queryFn: usersApi.profileByCookie,
    })
}

export const useGetPublicProfileQuery = (args: { userId: string }) => {
    return useQuery({
        queryKey: [queryKeys.users.publicProfile(args.userId)],
        queryFn: () => usersApi.publicProfile(args.userId),
    })
}

export const useLoginMutation = (options?: {
    onSuccess?: (data: UserProfile) => void
    onError?: (error: any) => void
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: UsersLoginBody) => usersApi.login(body),
        onError: options?.onError,
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.auth.checkAuth],
            })

            queryClient.invalidateQueries({
                queryKey: [queryKeys.users.profileByCookie],
            })
            options?.onSuccess?.(successResponse)
        },
    })
}

export const useLogoutMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: usersApi.logout,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.auth.checkAuth],
            })
            queryClient.invalidateQueries({
                queryKey: [queryKeys.users.profileByCookie],
            })
        },
    })
}

export const useRegistrationMutation = () => {
    return useMutation({
        mutationFn: (body: FormData) => usersApi.registration(body),
    })
}

export const useGetCreatedUserPostsQuery = (userId: string) => {
    return useQuery({
        queryKey: [queryKeys.users.createdPosts(userId)],
        queryFn: ({ signal }) =>
            usersApi.getAllCreatedUsersPosts({ userId, signal }),
    })
}

export const useChangeUserProfileData = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: usersApi.changeProfileData,
        onSuccess: () => {
            queryClient.refetchQueries({
                queryKey: [queryKeys.users.profileByCookie],
            })
        },
    })
}
