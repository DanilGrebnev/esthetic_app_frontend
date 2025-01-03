'use client'

import { useGetCommentIdQueueDeleteListSelector } from '@/features/commentaries'
import { useDeleteCommentsMutation } from '@/shared/api/comments'
import { useEffect } from 'react'

interface DeleteCommentAfterUnmountProps {
    postId: string
}

export const DeleteCommentAfterUnmount = (
    props: DeleteCommentAfterUnmountProps,
) => {
    const { postId } = props
    const { mutate } = useDeleteCommentsMutation(postId)

    useEffect(() => {
        window.addEventListener('', () => {
            alert('Hello')
            // mutate()
        })

        return () => {
            mutate()
            console.log('Удаление комментариев')
        }
    }, [])

    return <></>
}
