import { api } from '@/shared/api/Instance'
import { queryKeys } from '@/shared/api/QueryKeys'
import { useQuery } from '@tanstack/react-query'

interface AuthResponse {
    isAuth: boolean
}

export const useCheckAuthQuery = () => {
    return useQuery({
        queryKey: [queryKeys.auth.checkAuth],

        retry: false,
        queryFn: async () => {
            const response = await api
                .get('auth/check', {
                    credentials: 'include',
                    hooks: {
                        afterResponse: [
                            (_, __, response) => {
                                if (response.status === 401) {
                                    return new Response(response.body)
                                }
                            },
                        ],
                    },
                })
                .json<AuthResponse>()
            return response
        },
    })
}
