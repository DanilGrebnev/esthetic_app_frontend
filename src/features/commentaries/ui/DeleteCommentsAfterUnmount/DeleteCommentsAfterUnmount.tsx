'use client'

import { useDeleteCommentsByCommentsIdListMutation } from '@/shared/api/comments'
import { useEffect } from 'react'

interface DeleteCommentsAfterUnmountProps {
    postId: string
}

export const DeleteCommentsAfterUnmount = (
    props: DeleteCommentsAfterUnmountProps,
) => {
    const { mutate } = useDeleteCommentsByCommentsIdListMutation()

    useEffect(() => {
        return () => {
            mutate(props.postId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <></>
}
