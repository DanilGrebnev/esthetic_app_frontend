'use client'

import { UserFullName } from '@/entities/user'
import { useGetPublicProfileQuery } from '@/shared/api/users'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { memo } from 'react'

import { ButtonGroup } from './ButtonGroup/ButtonGroup'
import { Navigation } from './NavigationButtonGroup'
import s from './UserPublicProfileHeader.module.scss'

interface UserHeaderLayoutProps {
    userId: string
}

export const UserPublicProfileHeader = memo(
    ({ userId }: UserHeaderLayoutProps) => {
        const { data, isPending } = useGetPublicProfileQuery({ userId })

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
                    loading={isPending}
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
    },
)

UserPublicProfileHeader.displayName = 'UserHeaderLayout'
