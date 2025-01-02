'use client'

import { ReactNode, memo } from 'react'

interface CommentTextProps {
    children: ReactNode
}
export const CommentText = memo((props: CommentTextProps) => {
    const { children } = props

    return <p>{children}</p>
})

CommentText.displayName = 'CommentText'
