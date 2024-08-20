'use client'

import { routes } from '@/shared/routes'
import { type Layout } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'
import { useRouter } from 'next/navigation'

import s from './userLayout.module.scss'

export default function UserLayout({ children }: Layout) {
    const router = useRouter()

    return (
        <div id='User layout'>
            <div className={s['user-layout']}>
                <Button
                    href={routes.main.getRoute()}
                    variant='standart'
                >
                    На главную
                </Button>
                {/*<Button*/}
                {/*    onClick={() => {*/}
                {/*        router.back()*/}
                {/*    }}*/}
                {/*    variant='standart'*/}
                {/*>*/}
                {/*    Назад*/}
                {/*</Button>*/}
            </div>
            {children}
        </div>
    )
}
