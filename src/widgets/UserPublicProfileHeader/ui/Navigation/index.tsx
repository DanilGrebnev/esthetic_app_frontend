'use client'

import { routes } from '@/shared/routes'
import { Button } from '@/shared/ui/Button'
import { usePathname } from 'next/navigation'

interface NavigationProps {
    className?: string
    userId: string
}

export const Navigation = ({ className, userId }: NavigationProps) => {
    const pathname = usePathname()

    return (
        <div className={className}>
            <Button
                href={routes.userCreatedPosts.getRoute(userId)}
                active={routes.userCreatedPosts.math(pathname)}
                activeVariant='active-underline'
            >
                Созданные
            </Button>
            <Button
                href={routes.userDashboards.getRoute(userId)}
                active={routes.userDashboards.math(pathname)}
                activeVariant='active-underline'
            >
                Сохранённые
            </Button>
        </div>
    )
}
