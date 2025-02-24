import HeartIcon from '@/shared/assets/heart-icon.svg'
import clsx from 'clsx'
import { MouseEventHandler } from 'react'
import { Ref } from 'react'

import s from './like-btn.module.scss'

interface CommentLikeBtnProps {
    likeCount?: number
    enableLikeCount?: boolean
    onClick?: MouseEventHandler<SVGElement>
    className?: string
    isLiked?: boolean
    disabled?: boolean
    unactive?: boolean
    ref?: Ref<HTMLDivElement> | undefined
}

export const LikeBtn = (props: CommentLikeBtnProps) => {
    const {
        likeCount,
        onClick,
        disabled,
        enableLikeCount,
        unactive,
        isLiked,
        className,
        ref,
    } = props

    return (
        <div
            ref={ref}
            className={clsx(s.btn_container, className)}
        >
            <HeartIcon
                onClick={onClick}
                className={clsx(s.icon, {
                    [s.liked]: isLiked,
                    [s.unactive]: unactive,
                })}
            />
            {enableLikeCount && <p className={s.like_amount}>{likeCount}</p>}
        </div>
    )
}
