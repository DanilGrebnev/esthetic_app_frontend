'use client'

import {
    CommentariesWriteField,
    useGetAnswerInfoSelector,
    useGetPostIdSelector,
} from '@/features/commentaries'
import { useCreateCommentsMutation } from '@/shared/api/comments'
import toast from 'react-hot-toast'

export const CommentsWriteFielSection = () => {
    const answerInfo = useGetAnswerInfoSelector()
    const postId = useGetPostIdSelector()
    const { mutate } = useCreateCommentsMutation()

    return (
        <CommentariesWriteField
            onSubmit={async (text) =>
                new Promise((res, rej) => {
                    mutate(
                        {
                            postId,
                            body: { text },
                        },
                        {
                            onSuccess: res,
                            onError: rej,
                        },
                    )
                })
            }
            onSuccessSubmit={() => {
                toast.success('Комментарий опубликован')
            }}
            onErrorSubmit={() => {
                toast.error('Ошибка публикации комментария')
            }}
            disabled={!!answerInfo.userName}
        />
    )
}
