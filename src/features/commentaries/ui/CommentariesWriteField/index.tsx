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

    return (
        <div className={clsx(s['write-comment'], className)}>
            <div className={s.avatar}>Д</div>
            <input
                type='text'
                className={s.input}
                placeholder='Добавить комментарий'
            />
        </div>
    )
}
