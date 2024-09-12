'use client'

import { useCheckAuthQuery } from '@/shared/api/auth'
import { useGetPrivateProfile } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { DropDownMenu } from '../DropDownMenu'
import s from './s.module.scss'

/* Иконка пользователя используемая в главном хедере */
export const UserProfileIcon = () => {
    const [openModal, setOpenModal] = useState(false)
    const router = useRouter()

    const { data: authData } = useCheckAuthQuery()
    const { data } = useGetPrivateProfile()

    const user = data?.user

    console.log('private profile', user)

    const onClick = () => {
        if (authData?.isAuth && user) {
            router.push(routes.userSavedPosts.getRoute(user.userId))
            return
        }
        router.push(routes.login.getRoute())
    }

    return (
        <div
            onFocus={() => setOpenModal(true)}
            onMouseEnter={() => setOpenModal(true)}
            onMouseLeave={() => setOpenModal(false)}
            className={s['profile-icon']}
        >
            <div
                onClick={onClick}
                className={s['user-icon-wrapper']}
            >
                <UserAvatar
                    word={user?.firstName[0]?.toUpperCase()}
                    size='s'
                />
            </div>
            <DropDownMenu
                auth={authData?.isAuth}
                userId={data?.user.userId}
                className={clsx(s.modal, { [s.open]: openModal })}
            />
        </div>
    )
}
