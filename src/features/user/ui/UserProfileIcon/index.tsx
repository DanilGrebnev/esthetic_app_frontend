'use client'

import { routes } from '@/shared/routes'
import { CircleIcon } from '@/shared/ui/CircleIcon'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { useState } from 'react'

import { UserProfileModal } from './UserProfileModal/UserProfileModal'
import s from './s.module.scss'

export const UserProfileIcon = () => {
    const [openModal, setOpenModal] = useState(false)

    const isAuth = false

    const onOpenModal = () => {
        setOpenModal(true)
    }

    const onMouseLeave = () => {
        setOpenModal(false)
    }

    return (
        <div
            onFocus={onOpenModal}
            onMouseEnter={onOpenModal}
            onMouseLeave={onMouseLeave}
            className={s['profile-icon']}
        >
            <CircleIcon
                href={
                    isAuth ? routes.userSavedPosts.getRoute('321') : undefined
                }
            >
                <UserAvatar size='s' />
            </CircleIcon>
            <UserProfileModal
                className={clsx(s.modal, { [s.open]: openModal })}
            />
        </div>
    )
}
