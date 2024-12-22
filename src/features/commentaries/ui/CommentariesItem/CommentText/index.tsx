interface CommentTextProps {
    children: string
}
export const CommentText = (props: CommentTextProps) => {
    const { children } = props

    return <span className='ml-[5px]'>{children}</span>
}
