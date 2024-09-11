'use client'

import { useCheckAuth } from '@/shared/api/auth'
import { type FC, type ReactNode, useEffect } from 'react'

import { useSetAuth } from '../model/slice'

interface AuthProviderProps {
    children?: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
    const { children } = props
    const setAuth = useSetAuth()
    const { data } = useCheckAuth()

    useEffect(() => {
        if (!data) return
        setAuth(data.isAuth)
    }, [data, setAuth])

    return children
}
