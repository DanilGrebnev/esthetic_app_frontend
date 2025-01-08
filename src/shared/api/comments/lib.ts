import { TCommentsItem } from '@/shared/types/comments'

export const toggleCommentLike = (comment: TCommentsItem) => {
    if (comment.isLiked) {
        return {
            ...comment,
            isLiked: false,
            likeCount: comment.likeCount - 1,
        }
    }
    return {
        ...comment,
        isLiked: true,
        likeCount: comment.likeCount + 1,
    }
}
