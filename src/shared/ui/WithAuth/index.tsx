'use client'

import { useGetIsAuthSelector } from '@/shared/store/auth'
import { ReactNode } from 'react'

interface WithAuthProps {
    fallback?: ReactNode
    children?: ReactNode
}
/** Проверяет авторизацию, если пользователь не авторизован -
 * отображается fallback */
export const WithAuth = (props: WithAuthProps) => {
    const { children, fallback } = props
    const isAuth = useGetIsAuthSelector()

    if (!isAuth) {
        return <>{fallback}</>
    } else {
        return <>{children}</>
    }
}
