import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { CommentsStore } from './commentsStoreType'

const useCommentsStore = create<CommentsStore>()(
    immer((set) => ({
        answerCommentId: null,
        commentContent: '',
        setAnswerCommentId: (commentId) => {
            set((state) => {
                state.answerCommentId = commentId
            })
        },
        setCommentContent: (text) => {
            set((state) => {
                state.commentContent = text
            })
        },
    })),
)

export const useSetAnswerSelector = () =>
    useCommentsStore((s) => s.setAnswerCommentId)
export const useSetCommentContentSelector = () =>
    useCommentsStore((s) => s.setCommentContent)
export const useGetCommentContentSelector = () =>
    useCommentsStore((s) => s.commentContent)
export const useGetAnswerCommentIdSelector = () =>
    useCommentsStore((s) => s.answerCommentId)
