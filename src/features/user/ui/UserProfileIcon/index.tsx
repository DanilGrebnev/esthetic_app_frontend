'use client'

import { useGetIsAuth } from '@/entities/auth'
import { useGetProfile } from '@/features/user'
import { routes } from '@/shared/routes'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { UserProfileModal } from './UserProfileModal/UserProfileModal'
import s from './s.module.scss'

/* Иконка пользователя для используемая в главном хедере */
export const UserProfileIcon = () => {
    const [openModal, setOpenModal] = useState(false)
    const router = useRouter()
    const auth = useGetIsAuth()
    const userProfile = useGetProfile()

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
                <UserAvatar
                    word={userProfile?.firstName[0]}
                    size='s'
                />
            </div>
            <UserProfileModal
                auth={auth}
                className={clsx(s.modal, { [s.open]: openModal })}
            />
        </div>
    )
}
