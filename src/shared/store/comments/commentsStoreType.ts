interface TCommentsStoreState {
    /* this is a commentId */
    answerInfo: {
        commentId: string | null
        userName: string | null
    }
    commentIdOnDeletionList: Set<string>
    editingInfo: {
        commentId: string | null
        text: string | null
    }
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
    addCommentIdInQueueDeleteList: (commentId: string) => void
    filterCommentIdOnQueueDeleteList: (commentId: string) => void
    clearCommentIdQueueDeleteList: () => void
}

export type ICommentsStore = TCommentsStoreState & CommentsStoreActions
