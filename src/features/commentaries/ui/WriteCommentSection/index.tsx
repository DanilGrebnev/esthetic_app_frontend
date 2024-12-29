'use client'

import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'

import { CommentsField } from '../CommentsInput'
import s from './s.module.scss'

type TOnSubmit = Parameters<typeof CommentsField>[0]['onSubmit']
type TStartWithText = Parameters<typeof CommentsField>[0]['startWithText']
type TAvatarSize = Parameters<typeof UserAvatar>[0]['size']

interface CommentariesWriteFieldProps {
    className?: string
    avatarSize?: TAvatarSize
    startWithText?: TStartWithText
    onSubmit?: TOnSubmit
}

export const CommentariesWriteField = (props: CommentariesWriteFieldProps) => {
    const { className, avatarSize, startWithText, onSubmit } = props

    const { data: profileData } = useGetProfileByCookieQuery()

    return (
        <div className={clsx(s['write-comment-section'], className)}>
            <UserAvatar
                size={avatarSize}
                href={profileData?.avatar}
            />
            <CommentsField
                onSubmit={onSubmit}
                startWithText={startWithText}
            />
        </div>
    )
}
