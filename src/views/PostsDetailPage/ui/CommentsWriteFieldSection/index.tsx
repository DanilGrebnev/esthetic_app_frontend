'use client'

import {
    CommentariesWriteField,
    useGetAnswerInfoSelector,
} from '@/features/commentaries'

export const CommentsWriteFielSection = () => {
    const answerInfo = useGetAnswerInfoSelector()
    console.log(answerInfo)
    return <CommentariesWriteField />
}
