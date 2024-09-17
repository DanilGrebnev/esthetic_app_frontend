'use client'

import { ButtonGroup } from '@/features/user/ui/UserHeaderLayout/ui/ButtonGroup/ButtonGroup'
import { useGetPublicProfileQuery } from '@/shared/api/users'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { type FC } from 'react'

import s from './UserHeaderLayout.module.scss'
import { Navigation } from './navigation'

interface UserHeaderLayoutProps {
    userId: string
}

export const UserHeaderLayout: FC<UserHeaderLayoutProps> = ({ userId }) => {
    const { data, isPending } = useGetPublicProfileQuery({ userId })

    if (data && !('user' in data))
        return <h1>Ошикба получения профиля пользователя</h1>
    const user = data?.user

    return (
        <header className={s.header}>
            <UserAvatar
                size='xl'
                placeholder={isPending}
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

            <ButtonGroup
                isOwner={data?.guest?.isOwner}
                userId={user?.userId}
            />
            <Navigation
                userId={userId}
                className={s['navigation-group']}
            />
        </header>
    )
}

UserHeaderLayout.displayName = 'UserHeaderLayout'
