import { routes } from '@/shared/routes'
import { type Layout } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'

import s from './userLayout.module.scss'

export default function UserLayout({ children }: Layout) {
    return (
        <section
            id='Users layout'
            className={s.container}
            style={{ height: '100%' }}
        >
            <header className={s.header}>
                <Button
                    href={routes.main.getRoute()}
                    variant='silver'
                >
                    На главную
                </Button>
            </header>
            {children}
        </section>
    )
}
