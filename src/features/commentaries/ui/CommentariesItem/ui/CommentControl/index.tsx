import clsx from 'clsx'
import { MouseEventHandler } from 'react'

import { CommentLikeBtn } from '../CommentLikeBtn'
import { AnswerBtn } from './Buttons/AnswerBtn'
import { DeleteBtn } from './Buttons/DeleteBtn'
import { EditBtn } from './Buttons/EditBtn'
import s from './comment-control.module.scss'

type TBtn = MouseEventHandler<HTMLButtonElement>

interface CommentControlProps {
    date: string
    className?: string
    onResponse?: TBtn
    onEdit?: TBtn
    onDelete?: TBtn
    isOwner?: boolean
    likeCount: number
    isLiked: boolean
}

export const CommentControl = (props: CommentControlProps) => {
    const {
        date,
        className,
        isLiked,
        isOwner,
        likeCount,
        onEdit,
        onResponse,
        onDelete,
    } = props

    return (
        <div className={clsx(s['comm-control'], className)}>
            <p>{date}</p>
            <div className={s['btn-control']}>
                {!isOwner ? (
                    <AnswerBtn onClick={onResponse} />
                ) : (
                    <>
                        <EditBtn onClick={onEdit} />
                        <DeleteBtn onClick={onDelete} />
                    </>
                )}

                <CommentLikeBtn
                    isLiked={isLiked}
                    likeCount={likeCount}
                />
            </div>
        </div>
    )
}
