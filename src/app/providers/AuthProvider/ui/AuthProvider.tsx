'use client'

import { useSetAuth } from '@/features/user'
import { useCheckAuth } from '@/shared/api/auth'
import { ReactNode, useEffect } from 'react'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const setAuth = useSetAuth()
    const { data } = useCheckAuth()

    useEffect(() => {
        if (!data) return
        setAuth(data?.isAuth)
    }, [data, setAuth])

    return children
}
