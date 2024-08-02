import { type Layout } from '@/shared/types/layout'
import { Button } from '@/shared/ui/Button'
import { type FC } from 'react'

import { Navigation } from './navigation'
import s from './profile-layout.module.scss'

const UserLayout: FC<Layout> = ({ children }) => {
    return (
        <div id='User layout'>
            <header className={s.header}>
                <div className={s.avatar}>Д</div>
                <p className={s['full-name']}>Жора Ишчанов</p>
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
