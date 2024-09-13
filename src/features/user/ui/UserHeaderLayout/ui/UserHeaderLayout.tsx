import { ButtonGroup } from '@/features/user/ui/UserHeaderLayout/ui/ButtonGroup/ButtonGroup'
import { getUserPublicProfileServerAction } from '@/shared/api/users'
import { type FC } from 'react'

import s from './UserHeaderLayout.module.scss'
import { Navigation } from './navigation'

interface UserHeaderLayoutProps {
    userId: string
}

export const UserHeaderLayout: FC<UserHeaderLayoutProps> = async ({
    userId,
}) => {
    try {
        const data = await getUserPublicProfileServerAction(userId)

        if (!('user' in data))
            return <h1>Ошикба получения профиля пользователя</h1>

        const user = data?.user
        console.log(data)
        return (
            <header className={s.header}>
                <div className={s.avatar}>
                    {user?.firstName[0].toUpperCase()}
                </div>
                <p className={s['full-name']}>
                    {user?.firstName + ' ' + user?.lastName}
                </p>
                <p className={s['username']}>{user?.userName}</p>
                <p className={s.subscriptions}>{user?.subscribersAmount}</p>

                <ButtonGroup
                    isOwner={data?.guest.isOwner}
                    userId={user?.userId}
                />
                <Navigation
                    userId={userId}
                    className={s['navigation-group']}
                />
            </header>
        )
    } catch (err) {
        return <h1>Ошибка получения пользователя</h1>
    }
}

UserHeaderLayout.displayName = 'UserHeaderLayout'
