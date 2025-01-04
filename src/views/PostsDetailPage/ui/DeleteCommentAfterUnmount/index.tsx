'use client'

import { useDeleteCommentsMutation } from '@/shared/api/comments'
import { useGetCommentIdQueueDeleteListSelector } from '@/shared/store/comments'
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
        window.addEventListener('unload', () => {
            alert('Hello')
            // mutate()
        })

        return () => {
            mutate()
            console.log('Удаление комментариев')
        }
    }, [mutate])

    return <></>
}
