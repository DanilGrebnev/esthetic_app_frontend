'use client'

// import { DropDownMenu } from '@/features/user/ui/DropDownMenu'
import { useCheckAuthQuery } from '@/shared/api/auth'
import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { useMounted } from '@/shared/hooks/useMounted'
import { routes } from '@/shared/routes'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import s from './s.module.scss'

const DropDownMenu = dynamic(
    () =>
        import(
            /* webpackChunkName: "Header-DropDown-menu" */ '../DropDownMenu'
        ).then((d) => d.DropDownMenu),
    { ssr: false },
)

/* Иконка пользователя используемая в главном хедере */
export const UserProfileIcon = () => {
    const [openModal, setOpenModal] = useState(false)
    const mounted = useMounted()

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
            {mounted && (
                <DropDownMenu
                    auth={authData?.isAuth}
                    userId={userData?.userId}
                    open={openModal}
                    // className={clsx(s.modal, { [s.open]: openModal })}
                    className={s.modal}
                />
            )}
        </div>
    )
}
