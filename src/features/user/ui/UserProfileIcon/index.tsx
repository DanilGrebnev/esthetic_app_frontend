'use client'

import { routes } from '@/shared/routes'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useGetIsAuth } from '../../model/slice'
import { UserProfileModal } from './UserProfileModal/UserProfileModal'
import s from './s.module.scss'

/* Иконка пользователя для используемая в главном хедере */
export const UserProfileIcon = () => {
    const [openModal, setOpenModal] = useState(false)
    const router = useRouter()
    const auth = useGetIsAuth()

    const onOpenModal = () => {
        setOpenModal(true)
    }

    const onMouseLeave = () => {
        setOpenModal(false)
    }

    const onClick = () => {
        router.push(routes.userSavedPosts.getRoute('321'))
    }

    return (
        <div
            onFocus={onOpenModal}
            onMouseEnter={onOpenModal}
            onMouseLeave={onMouseLeave}
            className={s['profile-icon']}
        >
            <div
                onClick={onClick}
                className={s['user-icon-wrapper']}
            >
                <UserAvatar size='s' />
            </div>
            <UserProfileModal
                auth={auth}
                className={clsx(s.modal, { [s.open]: openModal })}
            />
        </div>
    )
}
