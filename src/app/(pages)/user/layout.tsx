'use client'

import { routes } from '@/shared/routes'
import { type Layout } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'

import s from './userLayout.module.scss'

export default function UserLayout({ children }: Layout) {
    return (
        <div id='User layout'>
            <div className={s['user-layout']}>
                <Button
                    href={routes.main.getRoute()}
                    variant='standart'
                >
                    На главную
                </Button>
            </div>
            {children}
        </div>
    )
}
