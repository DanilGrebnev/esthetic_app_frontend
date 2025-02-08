import { useCallback } from 'react'

import { useAuthStore } from './authStore'

export const useGetIsAuthSelector = () => useAuthStore((s) => s.auth)
export const useSetIsAuthSelector = () => {
    const setAuth = useAuthStore((s) => s.setAuth)

    return useCallback(setAuth, [])
}
