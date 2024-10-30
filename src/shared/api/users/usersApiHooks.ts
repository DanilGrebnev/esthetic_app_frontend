import { queryKeys } from '@/shared/api/QueryKeys'
import { paginationPostsAmount } from '@/shared/consts'
import type { UserProfile, UsersLoginBody } from '@/shared/types/user'
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'

import { usersApi } from './usersApi'

export const useGetProfileByCookieQuery = (options?: { enabled?: boolean }) => {
    return useQuery({
        queryKey: [queryKeys.users.profileByCookie],
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

export const useRegistrationMutation = (options?: {
    onSuccess?: () => void
}) => {
    return useMutation({
        mutationFn: (body: FormData) => usersApi.registration(body),
        onSuccess: options?.onSuccess,
    })
}

export const useGetCreatedUserPostsQuery = (userId: string) => {
    return useInfiniteQuery({
        queryKey: [queryKeys.users.createdPosts(userId)],
        queryFn: ({ signal, pageParam }) =>
            usersApi.getAllCreatedUsersPosts({
                userId,
                signal,
                searchParams: pageParam,
            }),
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if (lastPage.posts.length < paginationPostsAmount) return
            return {
                offset: lastPageParam.offset + paginationPostsAmount,
                limit: paginationPostsAmount,
            }
        },
        initialPageParam: { offset: 0, limit: paginationPostsAmount },
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
