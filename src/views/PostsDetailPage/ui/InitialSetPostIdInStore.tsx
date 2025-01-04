'use client'

import { useSetPostIdSelector } from '@/shared/store/posts'
import { useEffect } from 'react'

export const InitialSetPostIdInStore = ({ postId }: { postId: string }) => {
    const setPostId = useSetPostIdSelector()

    useEffect(() => {
        setPostId(postId)
    }, [postId, setPostId])

    return <></>
}
