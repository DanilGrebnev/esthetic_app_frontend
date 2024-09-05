'use client'

import { routes } from '@/shared/routes'
import { Button } from '@/shared/ui/Button'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { type FC } from 'react'

import s from './s.module.sass'

interface INavigationGroup {
    className?: string
}

export const NavigationGroup: FC<INavigationGroup> = ({ className }) => {
    const patch = usePathname()

    return (
        <div className={clsx(s['btn-nav-group'], className)}>
            <Button
                className={s.home}
                active={routes.main.math(patch)}
                heightSize='full'
                href={routes.main.getRoute()}
            >
                Главная
            </Button>
            <Button
                className={s.create}
                active={patch === routes.createPost}
                heightSize='full'
                href={routes.createPost}
            >
                Создать
            </Button>
        </div>
    )
}
