import clsx from 'clsx'
import { MouseEventHandler } from 'react'

import { AnswerBtn } from './Buttons/AnswerBtn'
import { DeleteBtn } from './Buttons/DeleteBtn'
import { EditBtn } from './Buttons/EditBtn'
import s from './comment-info.module.scss'

interface CommentInfoProps {
    date: string
    className?: string
    onResponseClick?: MouseEventHandler<HTMLButtonElement>
    isOwner?: boolean
}
export const CommentControl = (props: CommentInfoProps) => {
    const { date, className, isOwner, onResponseClick } = props

    return (
        <div className={clsx(className, s['comm-info'])}>
            <p>{date}</p>
            <div className={s['btn-control']}>
                {!isOwner && <AnswerBtn onClick={onResponseClick} />}
                {isOwner && (
                    <>
                        <EditBtn />
                        <DeleteBtn />
                    </>
                )}
            </div>
        </div>
    )
}
