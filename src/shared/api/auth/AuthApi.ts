import { apiInstance } from '@/shared/api/Instance'
import { useQuery } from '@tanstack/react-query'

interface AuthResponse {
    isAuth: boolean
    status: number
}

export const useCheckAuth = () => {
    return useQuery({
        queryKey: ['auth'],
        queryFn: () =>
            apiInstance
                .get('auth/check', { credentials: 'include' })
                .json<AuthResponse>(),
    })
}
