'use client'

import { NavigationPaths } from '@/shared/consts/NavigatioPaths'
import { Button } from '@/shared/ui/Button'
import { usePathname } from 'next/navigation'

export const LeftNavigationGroup = () => {
    const patch = usePathname()

    return (
        <>
            <Button
                active={patch === NavigationPaths.main}
                heightSize='full'
                href={NavigationPaths.main}
            >
                Главная
            </Button>
            <Button
                active={patch === NavigationPaths.createPosts}
                heightSize='full'
                href={NavigationPaths.createPosts}
            >
                Создать
            </Button>
        </>
    )
}
