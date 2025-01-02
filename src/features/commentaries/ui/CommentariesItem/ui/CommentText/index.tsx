import { ReactNode } from 'react'

interface CommentTextProps {
    children: ReactNode
}
export const CommentText = (props: CommentTextProps) => {
    const { children } = props

    return <span className='ml-[5px]'>{children}</span>
}
