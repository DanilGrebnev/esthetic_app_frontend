import HeartIcon from '@/shared/assets/heart-icon.svg'
import clsx from 'clsx'
import { MouseEventHandler } from 'react'

import s from './comment-like-btn.module.scss'

interface CommentLikeBtnProps {
    likeCount?: number
    onClick?: MouseEventHandler<HTMLDivElement>
    className?: string
    isLiked?: boolean
}

export const CommentLikeBtn = (props: CommentLikeBtnProps) => {
    const { likeCount, onClick, isLiked, className } = props

    return (
        <div
            className={clsx(s['btn-container'], className)}
            onClick={onClick}
        >
            <HeartIcon className={clsx(s.icon, { [s.active]: isLiked })} />
            <p className={s['like-amount']}>{likeCount}</p>
        </div>
    )
}
