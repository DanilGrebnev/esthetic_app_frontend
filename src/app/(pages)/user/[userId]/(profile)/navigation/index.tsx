'use client'

import { routes } from '@/shared/routes'
import { Button } from '@/shared/ui/Button'
import { usePathname } from 'next/navigation'
import { type FC } from 'react'

interface NavigationProps {
    className?: string
}

export const Navigation: FC<NavigationProps> = ({ className }) => {
    const pathname = usePathname()

    return (
        <div className={className}>
            <Button
                href={routes.userCreatedPosts.getRoute('123')}
                active={routes.userCreatedPosts.math(pathname)}
                activeVariant='active-underline'
            >
                Созданные
            </Button>
            <Button
                href={routes.userSavedPosts.getRoute('321')}
                active={routes.userSavedPosts.math(pathname)}
                activeVariant='active-underline'
            >
                Сохранённые
            </Button>
        </div>
    )
}
