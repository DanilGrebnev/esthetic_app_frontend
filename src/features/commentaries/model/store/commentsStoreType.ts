interface TCommentsStoreState {
    /* this is a commentId */
    answerInfo: {
        commentId: string | null
        userName: string | null
    }
    editingInfo: {
        commentId: string | null
        text: string | null
    }
    postId: string
    commentContent: string
}
export type AnswerInfoType = TCommentsStoreState['answerInfo']
export type TEditingInfo = TCommentsStoreState['editingInfo']
type TSetAnswerFields = {
    [key in keyof AnswerInfoType]?: AnswerInfoType[key]
}
type TSetEditingFields = {
    [key in keyof TEditingInfo]?: TEditingInfo[key]
}

type CommentsStoreActions = {
    setAnswerCommentId: (commentId: string | null) => void
    setCommentContent: (text: string) => void
    setAnswerName: (name: string | null) => void
    setAnswerInfo: (fields: TSetAnswerFields) => void
    setEditingInfo: (fields: TSetEditingFields) => void
    setPostId: (postId: string) => void
}

export type ICommentsStore = TCommentsStoreState & CommentsStoreActions
