import { clsx } from 'clsx'
import { type FC } from 'react'

import s from './s.module.scss'

interface UserAvatarProps {
    word?: string
    size?: 'l' | 'm' | 's'
    className?: string
}

export const UserAvatar: FC<UserAvatarProps> = (props) => {
    const { size = 'l', word = 'Д', className } = props

    return <div className={clsx(s.avatar, s[size], className)}>{word}</div>
}
