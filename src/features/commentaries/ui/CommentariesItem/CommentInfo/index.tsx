import clsx from 'clsx'

import s from './comment-info.module.scss'

interface CommentInfoProps {
    date: string
    className?: string
}
export const CommentInfo = (props: CommentInfoProps) => {
    const { date, className } = props

    return (
        <div className={clsx(className, s['comm-info'])}>
            <p>{date}</p>
            <button className={s['comm-res-btn']}>Ответить</button>
        </div>
    )
}
