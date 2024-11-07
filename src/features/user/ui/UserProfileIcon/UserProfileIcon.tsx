'use client'

import { useCheckAuthQuery } from '@/shared/api/auth'
import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { routes } from '@/shared/routes'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import s from './s.module.scss'

const DropDownMenu = dynamic(
    () =>
        import(
            /* webpackChunkName: "Header-User-DropDown-Menu" */ '../DropDownMenu'
        ).then((d) => d.DropDownMenu),
    { ssr: false },
)

/* Иконка пользователя используемая в главном хедере */
export const UserProfileIcon = () => {
    const [openModal, setOpenModal] = useState(false)

    const router = useRouter()

    const { data: authData } = useCheckAuthQuery()

    const { data: userData, isPending: isPendingUserData } =
        useGetProfileByCookieQuery()

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
            onMouseEnter={() => {
                setOpenModal(true)
            }}
            onMouseLeave={() => setOpenModal(false)}
            className={s['profile-icon']}
        >
            <UserAvatar
                onClick={redirect}
                placeholder={isPendingUserData || !authData?.isAuth}
                href={authData?.isAuth ? userData?.avatar : null}
                word={userData?.firstName[0]?.toUpperCase()}
            />
            <DropDownMenu
                auth={authData?.isAuth}
                userId={userData?.userId}
                open={openModal}
                className={s.modal}
            />
        </div>
    )
}
