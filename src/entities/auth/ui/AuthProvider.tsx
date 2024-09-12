'use client'

import { useCheckAuthQuery } from '@/shared/api/auth'
import { useGetPrivateProfile } from '@/shared/api/users'
import { type FC, type ReactNode } from 'react'

interface AuthProviderProps {
    children?: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
    const { children } = props

    const { data } = useCheckAuthQuery()

    useGetPrivateProfile({ enabled: data?.isAuth })

    return children
}
