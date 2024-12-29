import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { ICommentsStore } from './commentsStoreType'

const useCommentsStore = create<ICommentsStore>()(
    immer((set) => ({
        answerInfo: {
            userName: null,
            commentId: null,
        },
        commentContent: '',
        setAnswerCommentId: (commentId) => {
            set((state) => {
                state.answerInfo.commentId = commentId
            })
        },
        setAnswerName: (name) => {
            set((state) => {
                state.answerInfo.userName = name
            })
        },
        setCommentContent: (text) => {
            set((state) => {
                state.commentContent = text
            })
        },
        clearAnswerInfo: () => {
            set((state) => {
                state.answerInfo = { commentId: null, userName: null }
            })
        },
    })),
)

export const useSetAnswerCommentIdSelector = () =>
    useCommentsStore((s) => s.setAnswerCommentId)
export const useSetCommentContentSelector = () =>
    useCommentsStore((s) => s.setCommentContent)
export const useGetCommentContentSelector = () =>
    useCommentsStore((s) => s.commentContent)
export const useSetAnswerCommentNameSelector = () =>
    useCommentsStore((s) => s.setAnswerName)
export const useClearAnswerInfoSelector = () =>
    useCommentsStore((s) => s.clearAnswerInfo)
export const useGetAnswerInfoSelector = () =>
    useCommentsStore((s) => s.answerInfo)
