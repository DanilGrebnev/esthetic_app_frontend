'use client'

import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { type FC } from 'react'

import s from './s.module.scss'

interface CommentariesWriteFieldProps {
    className?: string
}

export const CommentariesWriteField: FC<CommentariesWriteFieldProps> = (
    props,
) => {
    const { className } = props

    const { data: profileData } = useGetProfileByCookieQuery()

    return (
        <div className={clsx(s['write-comment'], className)}>
            <UserAvatar href={profileData?.avatar} />
            <input
                type='text'
                className={s.input}
                placeholder='Добавить комментарий'
            />
        </div>
    )
}
