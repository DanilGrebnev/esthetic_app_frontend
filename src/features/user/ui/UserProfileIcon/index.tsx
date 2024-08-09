'use client'

import { routes } from '@/shared/routes'
import { CircleIcon } from '@/shared/ui/CircleIcon'
import { UserAvatar } from '@/shared/ui/UserAvatar'

import s from './s.module.scss'

export const UserProfileIcon = () => {
    return (
        <CircleIcon href={routes.userSavedPosts.getRoute('321')}>
            <UserAvatar size='s' />
        </CircleIcon>
    )
}
