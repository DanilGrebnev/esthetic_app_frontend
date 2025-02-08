'use client'

import { routes } from '@/shared/routes'
import { Button } from '@/shared/ui/Button'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import s from './s.module.scss'

interface INavigationGroup {
    className?: string
}

export const NavigationGroup = ({ className }: INavigationGroup) => {
    const patch = usePathname()

    return (
        <div className={clsx(s['btn-nav-group'], className)}>
            <Button
                className={s.home}
                activeVariant='active-underline'
                active={routes.main.math(patch)}
                heightSize='full'
                href={routes.main.getRoute()}
            >
                Главная
            </Button>
            <Button
                className={s.create}
                activeVariant='active-underline'
                active={patch === routes.createPost}
                heightSize='full'
                href={routes.createPost}
            >
                Создать
            </Button>
        </div>
    )
}
