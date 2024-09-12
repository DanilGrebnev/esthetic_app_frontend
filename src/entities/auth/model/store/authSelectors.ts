import { useAuthStore } from '@/entities/auth/model/store/slice'

export const useGetIsAuthSelector = () => {
    return useAuthStore((state) => state.auth)
}

export const useSetAuthSelector = () => {
    return useAuthStore((state) => state.setAuth)
}
