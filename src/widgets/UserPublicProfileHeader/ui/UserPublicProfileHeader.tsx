import { getUserPublicProfileServerAction } from '@/shared/api/users'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { type FC } from 'react'

import { ButtonGroup } from './ButtonGroup/ButtonGroup'
import s from './UserPublicProfileHeader.module.scss'
import { Navigation } from './navigation'

interface UserHeaderLayoutProps {
    userId: string
}

export const UserPublicProfileHeader: FC<UserHeaderLayoutProps> = async ({
    userId,
}) => {
    const data = await getUserPublicProfileServerAction(userId)

    if (data && !('user' in data))
        return <h1>Ошикба получения профиля пользователя</h1>

    const user = data?.user

    return (
        <header className={s.header}>
            <UserAvatar
                size='xl'
                word={user?.firstName[0].toUpperCase()}
                href={user?.avatar}
            />
            <p className={s['full-name']}>
                {user?.firstName + ' ' + user?.lastName}
            </p>
            <p className={s['username']}>{user?.userName}</p>
            <p className={s.subscriptions}>
                подписки: {user?.subscribersAmount}
            </p>

            <ButtonGroup userId={user?.userId} />
            <Navigation
                userId={userId}
                className={s['navigation-group']}
            />
        </header>
    )
}

UserPublicProfileHeader.displayName = 'UserHeaderLayout'
