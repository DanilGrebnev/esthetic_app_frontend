import { useToggleLikeCommentMutation } from '@/shared/api/comments'
import HeartIcon from '@/shared/assets/heart-icon.svg'
import { useGetPostIdSelector } from '@/shared/store/posts'
import clsx from 'clsx'
import { MouseEventHandler } from 'react'

import s from './comment-like-btn.module.scss'

interface CommentLikeBtnProps {
    likeCount?: number
    onClick?: MouseEventHandler<HTMLDivElement>
    className?: string
    isLiked?: boolean
    commentId: string
    isOwner?: boolean
}

export const CommentLikeBtn = (props: CommentLikeBtnProps) => {
    const { likeCount, commentId, isOwner, isLiked, className } = props
    const postId = useGetPostIdSelector()

    const { mutate } = useToggleLikeCommentMutation()

    return (
        <div className={clsx(s['btn-container'], className)}>
            <HeartIcon
                onClick={() => {
                    mutate({ commentId, postId })
                }}
                className={clsx(s.icon, {
                    [s.liked]: isLiked,
                    [s.unactive]: isOwner,
                })}
            />
            <p className={s['like-amount']}>{likeCount}</p>
        </div>
    )
}
