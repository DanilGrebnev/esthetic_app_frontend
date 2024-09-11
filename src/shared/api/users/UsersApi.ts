import type { UserProfile, UsersLoginBody } from '@/shared/types/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiInstance } from '../Instance'

const usersPath = 'users'

export class UsersApi {
    login(body: UsersLoginBody) {
        return apiInstance
            .post(`${usersPath}/login`, { json: body, credentials: 'include' })
            .json<UserProfile>()
    }
    registration(body: FormData) {
        return apiInstance.post(`${usersPath}/registration`, { body }).json()
    }
}

export const usersApi = new UsersApi()

export const useMutationLoginQuery = (options?: {
    onSuccess?: (data: UserProfile) => void
    onError?: (error: any) => void
}) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: UsersLoginBody) => usersApi.login(body),
        onError: options?.onError,
        onSuccess: (successResponse) => {
            queryClient.invalidateQueries({ queryKey: ['auth'] })
            options?.onSuccess?.(successResponse)
        },
    })
}

export const useMutationRegistrationQuery = () => {
    return useMutation({
        mutationFn: (body: FormData) => usersApi.registration(body),
    })
}
