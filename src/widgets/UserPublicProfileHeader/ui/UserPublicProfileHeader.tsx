'use client'

import { UserFullName } from '@/features/user'
import { getUserPublicProfileServerAction } from '@/shared/api/users'
import { useGetPublicProfileQuery } from '@/shared/api/users'
import { UserPublicProfile } from '@/shared/types/user'
import { UserAvatar } from '@/shared/ui/UserAvatar'

import { ButtonGroup } from './ButtonGroup/ButtonGroup'
import { Navigation } from './Navigation'
import s from './UserPublicProfileHeader.module.scss'

interface UserHeaderLayoutProps {
    userId: string
}

export const UserPublicProfileHeader = ({ userId }: UserHeaderLayoutProps) => {
    const { data } = useGetPublicProfileQuery({ userId })

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
            <UserFullName
                size='big'
                firstName={user?.firstName}
                lastName={user?.lastName}
            />
            <p className={s.username}>{user?.userName}</p>
            <p className={s.subscriptions}>
                подписки: {user?.subscribersAmount}
            </p>

            <ButtonGroup userId={userId} />
            <Navigation
                className={s['navigation-group']}
                userId={userId}
            />
        </header>
    )
}

UserPublicProfileHeader.displayName = 'UserHeaderLayout'
