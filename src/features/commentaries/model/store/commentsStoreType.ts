type CommentsStoreState = {
    /* this is a commentId */
    answerInfo: {
        commentId: string | null
        userName: string | null
    }
    commentContent: string
}

type CommentsStoreActions = {
    setAnswerCommentId: (commentId: string | null) => void
    setCommentContent: (text: string) => void
    setAnswerName: (name: string | null) => void
    clearAnswerInfo: () => void
}

export type ICommentsStore = CommentsStoreState & CommentsStoreActions
