'use client'

import { useGetProfileByCookieQuery } from '@/shared/api/users'
import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { MouseEventHandler } from 'react'

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
    disabled?: boolean
    onClick?: MouseEventHandler<HTMLDivElement>
    onSuccessSubmit?: () => void
    onErrorSubmit?: () => void
}
export const CommentariesWriteField = (props: CommentariesWriteFieldProps) => {
    const {
        className,
        disabled,
        avatarSize,
        startWithText,
        onClick,
        onSubmit,
        onSuccessSubmit,
        onErrorSubmit,
    } = props

    const { data: profileData } = useGetProfileByCookieQuery()

    return (
        <div
            onClick={onClick}
            className={clsx(s['write-comment-section'], className)}
        >
            <UserAvatar
                size={avatarSize}
                href={profileData?.avatar}
            />
            <CommentsField
                disabled={disabled}
                onSubmit={onSubmit}
                onSuccessSubmit={onSuccessSubmit}
                onErrorSubmit={onErrorSubmit}
                startWithText={startWithText}
            />
        </div>
    )
}
