'use client'

import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'

import s from './s.module.scss'

interface CommentariesWriteFieldProps {
    className?: string
}

export const CommentariesWriteField = (props: CommentariesWriteFieldProps) => {
    const { className } = props

    const { data: profileData } = useGetProfileByCookieQuery()

    return (
        <div className={clsx(s['write-comment'], className)}>
            <UserAvatar href={profileData?.avatar} />
            <textarea
                // type='text'
                className={s.input}
                placeholder='Добавить комментарий'
            />
        </div>
    )
}
