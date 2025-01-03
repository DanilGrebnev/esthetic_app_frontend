'use client'

import {
    CommentariesWriteField,
    useGetAnswerInfoSelector,
    useGetEditingCommentInfoSelector,
    useGetPostIdSelector,
} from '@/features/commentaries'
import { useCreateCommentsMutation } from '@/shared/api/comments'
import toast from 'react-hot-toast'

export const CommentsWriteFielSection = () => {
    const answerInfo = useGetAnswerInfoSelector()
    const editInfo = useGetEditingCommentInfoSelector()
    const postId = useGetPostIdSelector()
    const { mutate } = useCreateCommentsMutation()

    const disabled = !!answerInfo.userName || !!editInfo.commentId

    return (
        <CommentariesWriteField
            onSubmit={(text) =>
                new Promise((res, rej) => {
                    mutate(
                        {
                            postId,
                            body: { text },
                        },
                        {
                            onSuccess: () => {
                                toast.success('Комментарий опубликован')
                                return res('')
                            },
                            onError: () => {
                                toast.error('Ошибка публикации комментария')
                                return rej()
                            },
                        },
                    )
                })
            }
            disabled={disabled}
        />
    )
}
