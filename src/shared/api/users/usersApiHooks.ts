import { queryKeys } from '@/shared/api/QueryKeys'
import { paginationPostsAmount } from '@/shared/consts'
import type { UserProfile, UsersLoginBody } from '@/shared/types/user'
import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'

import { PostsAmount } from './../../../views/DashboardsDetailPage/ui/PostsAmount/index'
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

export const useLoginMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: UsersLoginBody) => usersApi.login(body),
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
        mutationFn: usersApi.registration,
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

        select: ({ pageParams, pages }) => {
            const posts = pages.map((page) => page.posts).flat()
            const postsAmount = pages[0].postsAmount
            const next = pages.at(-1)?.posts.length === pageParams.at(-1)?.limit

            return { posts, postsAmount, next }
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

export const useDeleteProfileAvatarMutation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: usersApi.deleteProfileAvatar,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.users.profileByCookie],
            })
        },
    })
}
