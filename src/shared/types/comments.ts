export interface TCommentsItem {
    commentId: string
    text: string
    author: TCommentsAuthor
    answerInfo: TCommentsAnswerInfo | null
    likeCount: number
    isLiked: boolean
    dateOfCreation: Date
}

export interface TCommentsAuthor {
    authorId: string
    firstName: string
    lastName: string
    userName: string
    avatar: string | null
    avatarBlur: string | null
    isOwner: boolean
}

export interface TCommentsAnswerInfo {
    commentId: string
    userId: string
    firstName: string
    lastName: string
}

export interface TGetCommentsListResponse {
    commentsAmount: number
    commentsList: TCommentsItem[]
}

export interface TCreateCommentsBody {
    text: string
    answerCommentId?: string
}

export interface TEditCommentsBody {
    text: string
}

export interface TAnswerOnCommentsBody {
    answerCommentId: string
    text: string
}
