import { UserAvatar } from '@/features/user'
import { clsx } from 'clsx'
import { type FC } from 'react'

import s from './s.module.scss'

interface CommentariesItemProps {
    className?: string
}

export const CommentariesItem: FC<CommentariesItemProps> = (props) => {
    const { className } = props

    return (
        <div className={clsx(s.commentaries, className)}>
            <div className={s.content}>
                <div className={s['user-info']}>
                    <UserAvatar
                        size='s'
                        className={s.avatar}
                    />
                    <span className={s['commentaries-text']}>
                        <p className={s.username}>Данил</p> Съешь ещё этих
                        магких французских булок, да выпей чаю
                    </span>
                </div>
            </div>
        </div>
    )
}
