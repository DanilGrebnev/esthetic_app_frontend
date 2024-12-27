import { UserAvatar } from '@/shared/ui/UserAvatar'
import { clsx } from 'clsx'
import { CSSProperties, memo } from 'react'

import { CommentInfo } from './CommentInfo'
import { CommentText } from './CommentText'
import { UserName } from './UserName'
import s from './s.module.scss'

interface CommentariesItemProps {
    className?: string
    style?: CSSProperties
}

export const CommentariesItem = memo((props: CommentariesItemProps) => {
    const { className, style } = props

    return (
        <div
            style={style}
            className={clsx(s.comm, className)}
        >
            <UserAvatar
                size='s'
                className={s.avatar}
            />
            <div className={s.content}>
                <div className={s['comm-text']}>
                    <UserName>Данил Гребнев</UserName>
                    <CommentText>
                        Съешь ещё этих мягких французских булок, да выпей чаю
                    </CommentText>
                </div>
                <CommentInfo date='1 мес назад' />
            </div>
        </div>
    )
})

CommentariesItem.displayName = 'CommentariesItem'
