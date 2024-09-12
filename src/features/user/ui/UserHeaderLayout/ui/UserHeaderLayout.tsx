import { getUserPublicProfileServerAction } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { Button } from '@/shared/ui/Button'
import { type FC } from 'react'

import s from './UserHeaderLayout.module.scss'
import { Navigation } from './navigation'

interface UserHeaderLayoutProps {
    userId: string
}

export const UserHeaderLayout: FC<UserHeaderLayoutProps> = async ({
    userId,
}) => {
    const data = await getUserPublicProfileServerAction(userId)

    if (!('user' in data)) return <h1>Ошикба получения профиля пользователя</h1>

    const user = data?.user
    return (
        <header className={s.header}>
            <div className={s.avatar}>{user?.firstName[0].toUpperCase()}</div>
            <p className={s['full-name']}>
                {user?.firstName + ' ' + user?.lastName}
            </p>
            <p className={s['username']}>{user?.userName}</p>
            <p className={s.subscriptions}>{user?.subscribersAmount}</p>

            <div className={s['btn-group']}>
                <Button variant='silver'>Поделиться</Button>
                <Button
                    href={routes.editUserInfo.getRoute(user?.userId)}
                    variant='silver'
                >
                    Изменить
                </Button>
            </div>

            <Navigation
                userId={userId}
                className={s['navigation-group']}
            />
        </header>
    )
}

UserHeaderLayout.displayName = 'UserHeaderLayout'
