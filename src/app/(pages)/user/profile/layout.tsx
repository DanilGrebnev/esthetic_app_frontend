import { Navigation } from '@/app/(pages)/user/profile/navigation'
import { routes } from '@/shared/routes'
import { Layout } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'
import { type FC } from 'react'

import s from './profile-layout.module.scss'

const UserLayout: FC<Layout> = ({ children }) => {
    return (
        <div id='User layout'>
            <Button
                href={routes.main}
                variant='standart'
            >
                На главную
            </Button>
            <header className={s.header}>
                <div className={s.avatar}>Д</div>
                <p className={s['full-name']}>Данил Гребнев</p>
                <p className={s['username']}>danilgrebnev60</p>
                <p className={s.subscriptions}>0 подписок</p>

                <div className={s['btn-group']}>
                    <Button variant='silver'>Поделиться</Button>
                    <Button variant='silver'>Изменить</Button>
                </div>

                <Navigation className={s['navigation-group']} />
            </header>
            {children}
        </div>
    )
}

export default UserLayout
