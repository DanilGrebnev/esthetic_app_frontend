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
            <UserAvatar
                size='s'
                className={s.avatar}
            />
            <div className={s.content}>
                <div className={s['comm-text']}>
                    <p className={s.username}>Данил</p> Съешь ещё этих мягких
                    французских булок, да выпей чаю
                </div>
                <div className={s['comm-info']}>
                    <p>1 мес назад</p>
                    <button className={'comm-res-btn'}>Ответить</button>
                </div>
            </div>
        </div>
    )
}
