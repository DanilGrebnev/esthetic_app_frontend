'use client'

import {
    useFilterCommentIdInQueueDeleteListSelector,
    useGetCommentIdQueueDeleteListSelector,
} from '@/shared/store/comments'
import clsx from 'clsx'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'

import s from './delete-comment-dialog.module.scss'

interface DeleteCommentDialogProps {
    commentId: string
}
export const DeleteCommentDialog = (props: DeleteCommentDialogProps) => {
    const { commentId } = props
    const commentsIdList = useGetCommentIdQueueDeleteListSelector()
    const deleteCommentId = useFilterCommentIdInQueueDeleteListSelector()
    const isOpen = commentsIdList.has(commentId)

    const animate = {
        initial: { height: '0%' },
        animate: { height: '100%' },
    }

    return (
        <AnimatePresence>
            {isOpen ? (
                <m.div
                    key='box'
                    transition={{}}
                    animate={animate.animate}
                    exit={animate.initial}
                    className={clsx(s['delete-block'])}
                >
                    <p>Комментарий удалён.</p>
                    <button
                        onClick={() => deleteCommentId(commentId)}
                        className={clsx('bottom-line', s.btn)}
                    >
                        Восстановить
                    </button>
                </m.div>
            ) : null}
        </AnimatePresence>
    )
}
