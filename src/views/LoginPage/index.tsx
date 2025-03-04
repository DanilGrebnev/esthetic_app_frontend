'use client'

import { LoginForm } from '@/features/SignIn/LoginForm'
import { routes } from '@/shared/routes'
import { useRouter } from 'next/navigation'

export const LoginPage = () => {
    const router = useRouter()

    return (
        <LoginForm
            onSuccess={() => {
                setTimeout(() => {
                    router.push(routes.main.getRoute())
                }, 1500)
            }}
        />
    )
}
