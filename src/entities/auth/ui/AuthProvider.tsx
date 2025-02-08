'use client'

import { useCheckAuthQuery } from '@/shared/api/auth'
import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { useSetIsAuthSelector } from '@/shared/store/auth'
import { type ReactNode, useEffect } from 'react'

interface AuthProviderProps {
    children?: ReactNode
}

export const AuthProvider = (props: AuthProviderProps) => {
    const { children } = props

    const setAuth = useSetIsAuthSelector()

    const { data } = useCheckAuthQuery()

    console.log('data?.isAuth', data?.isAuth)

    useEffect(() => {
        setAuth(data?.isAuth ?? false)
    }, [data, setAuth])

    useGetProfileByCookieQuery({ enabled: data?.isAuth })

    return children
}
