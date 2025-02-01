import { useToggleLikeCommentMutation } from '@/shared/api/comments'
import { useGetPostIdSelector } from '@/shared/store/posts'
import { LikeBtn } from '@/shared/ui/LikeBtn/LikeBtn'
import { MouseEventHandler } from 'react'

interface CommentLikeBtnProps {
    likeCount?: number
    onClick?: MouseEventHandler<HTMLDivElement>
    className?: string
    isLiked?: boolean
    commentId: string
    isOwner?: boolean
}

export const CommentLikeBtn = (props: CommentLikeBtnProps) => {
    const { likeCount, commentId, isOwner, isLiked, className } = props
    const postId = useGetPostIdSelector()

    const { mutate } = useToggleLikeCommentMutation()

    return (
        <LikeBtn
            className={className}
            unactive={isOwner}
            isLiked={isLiked}
            enableLikeCount={true}
            likeCount={likeCount}
            onClick={() => mutate({ commentId, postId })}
        />
    )
}
