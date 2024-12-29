interface CommentsItemType {
    commentId: string
    text: string
    author: CommentsAuthorType
    answerInfo?: CommentsAnswerInfoType
    likeCount: number
    isLiked: boolean
    dateOfCreation: Date
}

interface CommentsAuthorType {
    authorId: string
    firstName: string
    lastName: string
    userName: string
    avatar: string
    avatarBlur: string
    isOwner: boolean
}

interface CommentsAnswerInfoType {
    commentId: string
    userId: string
    firstName: string
    lastName: string
}

type GetCommentsListResponseType = CommentsItemType[]
