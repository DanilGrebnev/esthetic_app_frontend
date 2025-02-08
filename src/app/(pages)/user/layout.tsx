import { routes } from '@/shared/routes'
import { type Layout } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'

import s from './userLayout.module.scss'

export default function UserLayout({ children }: Layout) {
    return (
        <section
            id='Users layout'
            className='flex flex-col grow'
            style={{ height: '100%' }}
        >
            <header
                id='User layout header'
                className={s['user-layout-header']}
            >
                <Button
                    href={routes.main.getRoute()}
                    variant='standart'
                >
                    На главную
                </Button>
            </header>
            {children}
        </section>
    )
}
