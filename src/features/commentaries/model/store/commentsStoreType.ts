type CommentsStoreState = {
    /* this is a commentId */
    answerCommentId: string | null
    commentContent: string
}

type CommentsStoreActions = {
    setAnswerCommentId: (commentId: string) => void
    setCommentContent: (text: string) => void
}

export type CommentsStore = CommentsStoreState & CommentsStoreActions
