'use client'

import { useSetPostIdSelector } from '@/features/commentaries'
import { useEffect } from 'react'

export const InitialSetPostIdInStore = ({ postId }: { postId: string }) => {
    const setPostId = useSetPostIdSelector()

    useEffect(() => {
        setPostId(postId)
    }, [postId])

    return <></>
}
