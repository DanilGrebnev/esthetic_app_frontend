'use client'

import { routes } from '@/shared/routes'
import { Button } from '@/shared/ui/Button'
import { usePathname } from 'next/navigation'

export const LeftNavigationGroup = () => {
    const patch = usePathname()

    return (
        <>
            <Button
                active={patch === routes.main}
                heightSize='full'
                href={routes.main}
            >
                Главная
            </Button>
            <Button
                active={patch === routes.createPost}
                heightSize='full'
                href={routes.createPost}
            >
                Создать
            </Button>
        </>
    )
}
