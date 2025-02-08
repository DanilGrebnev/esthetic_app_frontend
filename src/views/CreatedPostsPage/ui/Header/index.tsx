'use client'

import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { useGetIsAuthSelector } from '@/shared/store/auth'
import { Button } from '@/shared/ui/Button'
import { memo } from 'react'

interface HeaderProps {
    userId: string
}

export const Header = memo((props: HeaderProps) => {
    const { data, isPending } = useGetProfileByCookieQuery()

    const isAuth = useGetIsAuthSelector()

    const isOwner = data?.userId === props.userId

    if (!isOwner || isPending || !isAuth) {
        return
    }

    return (
        <header>
            <Button
                variant='silver'
                href={routes.createPost}
                size='m'
            >
                Создать
            </Button>
        </header>
    )
})

Header.displayName = 'Header'
