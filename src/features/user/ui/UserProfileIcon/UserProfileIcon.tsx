'use client'

import { useCheckAuthQuery } from '@/shared/api/auth'
import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { DropDownMenu } from '../DropDownMenu'
import s from './s.module.scss'

/* Иконка пользователя используемая в главном хедере */
export const UserProfileIcon = () => {
    const [isOpenModal, setOpenModal] = useState(false)

    const router = useRouter()

    const { data: authData } = useCheckAuthQuery()

    const { data: userData, isPending: isPendingUserData } =
        useGetProfileByCookieQuery()

    const redirect = useCallback(() => {
        if (authData?.isAuth && userData) {
            router.push(routes.userDashboards.getRoute(userData.userId))
            return
        }
        router.push(routes.login.getRoute())
    }, [userData, router, authData?.isAuth])

    const openModal = () => setOpenModal(true)
    const closeModal = () => setOpenModal(false)

    return (
        <div
            className={s['profile-icon']}
            onFocus={openModal}
            onMouseEnter={openModal}
            onMouseLeave={closeModal}
        >
            <UserAvatar
                onClick={redirect}
                blurSrc={userData?.avatarBlur}
                placeholder={isPendingUserData || !authData?.isAuth}
                href={authData?.isAuth ? userData?.avatar : null}
                word={userData?.firstName[0]?.toUpperCase()}
            />
            <DropDownMenu
                className={s.modal}
                auth={authData?.isAuth}
                userId={userData?.userId}
                open={isOpenModal}
            />
        </div>
    )
}
