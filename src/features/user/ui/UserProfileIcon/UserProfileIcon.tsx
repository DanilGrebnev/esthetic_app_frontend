'use client'

import { useCheckAuthQuery } from '@/shared/api/auth'
import { useGetPrivateProfileQuery } from '@/shared/api/users'
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

    const { data: userData, isPending: isPendingUserData } =
        useGetPrivateProfileQuery()

    const redirect = () => {
        if (authData?.isAuth && userData) {
            router.push(routes.userDashboards.getRoute(userData.userId))
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
            <UserAvatar
                onClick={redirect}
                placeholder={isPendingUserData || !authData?.isAuth}
                href={userData?.avatar}
                word={userData?.firstName[0]?.toUpperCase()}
            />
            <DropDownMenu
                auth={authData?.isAuth}
                userId={userData?.userId}
                className={clsx(s.modal, { [s.open]: openModal })}
            />
        </div>
    )
}