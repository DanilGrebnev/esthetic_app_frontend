import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import {
    AnswerInfoType,
    ICommentsStore,
    TEditingInfo,
} from './commentsStoreType'

export const useCommentsStore = create<ICommentsStore>()(
    immer((set) => ({
        answerInfo: {
            userName: null,
            commentId: null,
        },
        commentIdOnDeletionList: new Set(),
        editingInfo: {
            text: null,
            commentId: null,
        },
        commentContent: '',
        addCommentIdInQueueDeleteList(commentId) {
            set((state) => {
                state.commentIdOnDeletionList.add(commentId)
            })
        },
        clearCommentIdQueueDeleteList() {
            set((state) => {
                state.commentIdOnDeletionList.clear()
            })
        },
        filterCommentIdOnQueueDeleteList(commentId: string) {
            set((state) => {
                state.commentIdOnDeletionList.delete(commentId)
            })
        },
        setAnswerCommentId(commentId) {
            set((state) => {
                state.answerInfo.commentId = commentId
            })
        },
        setAnswerInfo(fields) {
            set((state) => {
                Object.entries(fields).forEach(([k, v]) => {
                    state.answerInfo[k as keyof AnswerInfoType] = v
                })
            })
        },
        setEditingInfo(fields) {
            set((state) => {
                Object.entries(fields).forEach(([k, v]) => {
                    state.editingInfo[k as keyof TEditingInfo] = v
                })
            })
        },
        setAnswerName: (name) => {
            set((state) => {
                state.answerInfo.userName = name
            })
        },
        setCommentContent(text) {
            set((state) => {
                state.commentContent = text
            })
        },
    })),
)
