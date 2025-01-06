'use client'

import clsx from 'clsx'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { memo } from 'react'

import { useCommentsIdInDeleteQueueList } from '../../../../../model/hooks/useCommentsIdInDeleteQueueList'
import s from './delete-comment-dialog.module.scss'

interface DeleteCommentDialogProps {
    commentId: string
}

export const DeleteCommentDialog = memo((props: DeleteCommentDialogProps) => {
    const { commentId } = props
    const { hasCommentId, removeCommentId } = useCommentsIdInDeleteQueueList()

    const animate = {
        initial: { height: '0%' },
        animate: { height: '100%' },
    }

    return (
        <AnimatePresence>
            {hasCommentId(commentId) ? (
                <m.div
                    key='box'
                    transition={{}}
                    animate={animate.animate}
                    exit={animate.initial}
                    className={clsx(s['delete-block'])}
                >
                    <p>Комментарий удалён.</p>
                    <button
                        onClick={() => removeCommentId(commentId)}
                        className={clsx('bottom-line', s.btn)}
                    >
                        Восстановить
                    </button>
                </m.div>
            ) : null}
        </AnimatePresence>
    )
})

DeleteCommentDialog.displayName = 'DeleteCommentDialog'
