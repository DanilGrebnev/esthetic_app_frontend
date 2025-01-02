import clsx from 'clsx'
import { MouseEventHandler } from 'react'

import { CommentLikeBtn } from '../CommentLikeBtn'
import { AnswerBtn } from './Buttons/AnswerBtn'
import { DeleteBtn } from './Buttons/DeleteBtn'
import { EditBtn } from './Buttons/EditBtn'
import s from './comment-control.module.scss'

interface CommentControlProps {
    date: string
    className?: string
    onResponseClick?: MouseEventHandler<HTMLButtonElement>
    onEditClick?: MouseEventHandler<HTMLButtonElement>
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
        onEditClick,
        onResponseClick,
    } = props

    return (
        <div className={clsx(s['comm-control'], className)}>
            <p>{date}</p>
            <div className={s['btn-control']}>
                {!isOwner ? (
                    <AnswerBtn onClick={onResponseClick} />
                ) : (
                    <>
                        <EditBtn onClick={onEditClick} />
                        <DeleteBtn />
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
