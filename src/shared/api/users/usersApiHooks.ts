import { queryKeys } from '@/shared/api/QueryKeys'
import type { UserProfile, UsersLoginBody } from '@/shared/types/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { usersApi } from './usersApi'

export const useGetPrivateProfileQuery = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: [queryKeys.users.privateProfile],
        retry: false,
        enabled: options?.enabled,
        queryFn: usersApi.privateProfile,
    })
}

export const useGetPublicProfile = (args: { userId: string }) => {
    return useQuery({
        queryKey: [queryKeys.users.publicProfile],
        queryFn: () => usersApi.publicProfile(args.userId),
    })
}

export const useMutationLoginQuery = (options?: {
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
                queryKey: [queryKeys.users.privateProfile],
            })
            options?.onSuccess?.(successResponse)
        },
    })
}

export const useMutationLogout = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: usersApi.logout,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.auth.checkAuth],
            })
        },
    })
}

export const useMutationRegistrationQuery = () => {
    return useMutation({
        mutationFn: (body: FormData) => usersApi.registration(body),
    })
}

export const useGetAllCreatedUsersPosts = (userId: string) => {
    return useQuery({
        queryKey: [queryKeys.users.createdPosts],
        queryFn: ({ signal }) =>
            usersApi.getAllCreatedUsersPosts({ userId, signal }),
    })
}
