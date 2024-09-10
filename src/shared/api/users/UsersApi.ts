import type { UsersLoginBody } from '@/shared/types/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiInstance } from '../Instance'

const usersPath = 'users'

export class UsersApi {
    login(body: UsersLoginBody) {
        return apiInstance
            .post(`${usersPath}/login`, { json: body, credentials: 'include' })
            .json()
    }
    registration(body: FormData) {
        return apiInstance.post(`${usersPath}/registration`, { body }).json()
    }
}

export const usersApi = new UsersApi()

export const useMutationLoginQuery = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: UsersLoginBody) => usersApi.login(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['auth'] }),
    })
}

export const useMutationRegistrationQuery = () => {
    return useMutation({
        mutationFn: (body: FormData) => usersApi.registration(body),
    })
}
