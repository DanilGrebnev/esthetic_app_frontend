'use client'

import { routes } from '@/shared/routes'
import { CircleIcon } from '@/shared/ui/CircleIcon'

import s from './s.module.scss'

export const UserProfileIcon = () => {
    return (
        <CircleIcon href={routes.userSavedPosts.getRoute('321')}>
            <div className={s.icon}>Д</div>
        </CircleIcon>
    )
}
